import express from 'express';
import path from 'path';
import fs from 'fs';
import crypto from 'crypto';
import { createServer as createViteServer } from 'vite';

const app = express();
const PORT = 3000;

// Security Headers Middleware
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');
  res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
  next();
});

// Rate Limiting Utilities
interface RateLimitInfo {
  count: number;
  resetTime: number;
}
const rateLimits = new Map<string, RateLimitInfo>();

function rateLimit(options: { windowMs: number; max: number; message: string }) {
  return (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const ip = (req.headers['x-forwarded-for'] as string) || req.socket.remoteAddress || 'unknown';
    const key = `${req.path}:${ip}`;
    const now = Date.now();
    
    let limit = rateLimits.get(key);
    if (!limit || now > limit.resetTime) {
      limit = { count: 1, resetTime: now + options.windowMs };
      rateLimits.set(key, limit);
      return next();
    }
    
    limit.count++;
    if (limit.count > options.max) {
      return res.status(429).json({ message: options.message });
    }
    next();
  };
}

const loginRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 15,
  message: 'Too many authentication attempts. Please try again in 15 minutes.'
});

const uploadRateLimiter = rateLimit({
  windowMs: 5 * 60 * 1000,
  max: 30,
  message: 'Upload rate limit exceeded. Please wait a few minutes before uploading more media.'
});

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

const UPLOADS_DIR = path.join(process.cwd(), 'public', 'uploads');
if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

// Administrative Session Management
interface Session {
  userId: string;
  username: string;
  expiresAt: number;
}
const sessions = new Map<string, Session>();

setInterval(() => {
  const now = Date.now();
  for (const [token, session] of sessions.entries()) {
    if (now > session.expiresAt) {
      sessions.delete(token);
    }
  }
}, 60 * 60 * 1000);

function generateSalt(): string {
  return crypto.randomBytes(16).toString('hex');
}

function hashPassword(password: string, salt: string): string {
  return crypto.scryptSync(password, salt, 64).toString('hex');
}

function parseCookies(cookieHeader = ''): Record<string, string> {
  const cookies: Record<string, string> = {};
  if (!cookieHeader) return cookies;
  
  cookieHeader.split(';').forEach(cookie => {
    const parts = cookie.split('=');
    const name = parts[0]?.trim();
    const val = parts.slice(1).join('=')?.trim();
    if (name) {
      cookies[name] = decodeURIComponent(val || '');
    }
  });
  return cookies;
}

interface AdminUser {
  id: string;
  username: string;
  passwordHash: string;
  salt: string;
  enabled: boolean;
}

// In-Memory Storage
const defaultSalts = [generateSalt(), generateSalt(), generateSalt()];
const adminUsers: AdminUser[] = [
  { id: 'admin-1', username: 'Jafar', passwordHash: hashPassword('J@9944', defaultSalts[0]), salt: defaultSalts[0], enabled: true },
  { id: 'admin-2', username: 'Jafer', passwordHash: hashPassword('J@9944', defaultSalts[1]), salt: defaultSalts[1], enabled: true },
  { id: 'admin-3', username: 'jaeferali44@gmail.com', passwordHash: hashPassword('J@9944', defaultSalts[2]), salt: defaultSalts[2], enabled: true }
];

let siteContentState: any = null;

// Auth Middleware
function requireAdmin(req: express.Request, res: express.Response, next: express.NextFunction) {
  const cookies = parseCookies(req.headers.cookie);
  let token = cookies['admin_session'];

  if (!token && req.headers.authorization) {
    token = req.headers.authorization.replace(/^Bearer\s+/i, '').trim();
  }
  
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized: No session token provided' });
  }
  
  const session = sessions.get(token);
  if (!session || Date.now() > session.expiresAt) {
    if (session) sessions.delete(token);
    return res.status(401).json({ message: 'Unauthorized: Session invalid or expired' });
  }
  
  const user = adminUsers.find(u => u.id === session.userId);
  if (!user || !user.enabled) {
    sessions.delete(token);
    return res.status(401).json({ message: 'Unauthorized: User account disabled or deleted' });
  }
  
  (req as any).user = user;
  next();
}

// =================== API ENDPOINTS ===================

// GET Content
app.get('/api/content', (req, res) => {
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  res.json(siteContentState || null);
});

// POST Content
app.post('/api/content', requireAdmin, (req, res) => {
  if (!req.body || typeof req.body !== 'object') {
    return res.status(400).json({ message: 'Invalid content payload' });
  }
  siteContentState = req.body;
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  res.json(siteContentState);
});

// Upload media file
app.post('/api/upload', requireAdmin, uploadRateLimiter, (req, res) => {
  try {
    const { name, type, data } = req.body;
    if (!name || !data) {
      return res.status(400).json({ message: 'Filename and base64 data are required' });
    }

    const ext = path.extname(name) || '.png';
    const baseName = path.basename(name, ext).replace(/[^a-zA-Z0-9_-]/g, '_');
    const safeName = `${baseName}_${Date.now()}${ext}`;
    
    let base64Body = data;
    const matches = data.match(/^data:([a-zA-Z0-9-+\/]+);base64,(.+)$/);
    if (matches && matches.length === 3) {
      base64Body = matches[2];
    }
    
    const buffer = Buffer.from(base64Body, 'base64');
    
    try {
      if (!fs.existsSync(UPLOADS_DIR)) {
        fs.mkdirSync(UPLOADS_DIR, { recursive: true });
      }
      const destPath = path.join(UPLOADS_DIR, safeName);
      fs.writeFileSync(destPath, buffer);
    } catch (diskErr) {
      console.warn('Upload directory write skipped:', diskErr);
    }
    
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    res.json({ url: `/uploads/${safeName}` });
  } catch (err) {
    console.error('Upload handler failed:', err);
    res.status(500).json({ message: 'Failed to process media upload' });
  }
});

// GET list of uploaded media files
app.get('/api/media', (req, res) => {
  try {
    const mediaList: any[] = [];
    if (fs.existsSync(UPLOADS_DIR)) {
      const files = fs.readdirSync(UPLOADS_DIR);
      files.filter(file => !file.startsWith('.')).forEach(file => {
        try {
          const filePath = path.join(UPLOADS_DIR, file);
          const stats = fs.statSync(filePath);
          mediaList.push({
            name: file,
            url: `/uploads/${file}`,
            size: stats.size,
            mtime: stats.mtime.toISOString()
          });
        } catch {}
      });
    }

    mediaList.sort((a, b) => new Date(b.mtime).getTime() - new Date(a.mtime).getTime());
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    res.json(mediaList);
  } catch (err) {
    console.error('Error reading media library:', err);
    res.status(500).json({ message: 'Failed to read media library' });
  }
});

// DELETE uploaded media file
app.delete('/api/media/:filename', requireAdmin, (req, res) => {
  try {
    const filename = path.basename(decodeURIComponent(req.params.filename));
    const filePath = path.join(UPLOADS_DIR, filename);

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      res.json({ message: 'File deleted successfully' });
    } else {
      res.status(404).json({ message: 'File not found' });
    }
  } catch (err) {
    console.error('Failed to delete media file:', err);
    res.status(500).json({ message: 'Failed to delete file' });
  }
});

// Auth Login
app.post('/api/auth/login', loginRateLimiter, (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }
  
  const user = adminUsers.find(u => u.username.toLowerCase() === username.toLowerCase());
  if (!user || !user.enabled) {
    return res.status(401).json({ message: 'Invalid credentials or disabled account' });
  }
  
  const verifiedHash = hashPassword(password, user.salt);
  if (verifiedHash !== user.passwordHash) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  
  const token = crypto.randomBytes(32).toString('hex');
  const expiresAt = Date.now() + 24 * 60 * 60 * 1000;
  
  sessions.set(token, { userId: user.id, username: user.username, expiresAt });
  
  res.setHeader('Set-Cookie', `admin_session=${token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=86400`);
  res.json({ id: user.id, username: user.username, enabled: user.enabled, token });
});

// Auth Logout
app.post('/api/auth/logout', (req, res) => {
  const cookies = parseCookies(req.headers.cookie);
  let token = cookies['admin_session'];
  if (!token && req.headers.authorization) {
    token = req.headers.authorization.replace(/^Bearer\s+/i, '').trim();
  }
  
  if (token) {
    sessions.delete(token);
  }
  
  res.setHeader('Set-Cookie', 'admin_session=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0');
  res.json({ message: 'Logged out successfully' });
});

// Check Session
app.get('/api/auth/session', (req, res) => {
  const cookies = parseCookies(req.headers.cookie);
  let token = cookies['admin_session'];
  if (!token && req.headers.authorization) {
    token = req.headers.authorization.replace(/^Bearer\s+/i, '').trim();
  }
  
  if (!token) {
    return res.status(401).json({ loggedIn: false });
  }
  
  const session = sessions.get(token);
  if (!session || Date.now() > session.expiresAt) {
    if (session) sessions.delete(token);
    return res.status(401).json({ loggedIn: false });
  }
  
  const user = adminUsers.find(u => u.id === session.userId);
  if (!user || !user.enabled) {
    return res.status(401).json({ loggedIn: false });
  }
  
  res.json({ id: user.id, username: user.username, enabled: user.enabled, token });
});

// GET Admin Users
app.get('/api/admin/users', requireAdmin, (req, res) => {
  const safeUsers = adminUsers.map(u => ({ id: u.id, username: u.username, enabled: u.enabled }));
  res.json(safeUsers);
});

// POST Admin User
app.post('/api/admin/users', requireAdmin, (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }
  
  const existing = adminUsers.find(u => u.username.toLowerCase() === username.toLowerCase());
  if (existing) {
    return res.status(400).json({ message: 'Username already taken' });
  }
  
  const salt = generateSalt();
  const passwordHash = hashPassword(password, salt);
  const newUser: AdminUser = { id: `admin_${Date.now()}`, username, passwordHash, salt, enabled: true };
  
  adminUsers.push(newUser);
  res.json({ id: newUser.id, username: newUser.username, enabled: newUser.enabled });
});

// PUT Update Admin User
app.put('/api/admin/users/:id', requireAdmin, (req, res) => {
  const { id } = req.params;
  const { username, password, enabled } = req.body;
  
  const user = adminUsers.find(u => u.id === id);
  if (!user) {
    return res.status(404).json({ message: 'Admin user not found' });
  }
  
  if (username && username.toLowerCase() !== user.username.toLowerCase()) {
    const dupe = adminUsers.find(u => u.username.toLowerCase() === username.toLowerCase());
    if (dupe) {
      return res.status(400).json({ message: 'Username already taken' });
    }
    user.username = username;
  }
  
  if (password) {
    const salt = generateSalt();
    user.salt = salt;
    user.passwordHash = hashPassword(password, salt);
  }
  
  if (enabled !== undefined) {
    const sessionUser = (req as any).user as AdminUser;
    if (id === sessionUser.id && !enabled) {
      return res.status(400).json({ message: 'You cannot disable your own admin account' });
    }
    user.enabled = enabled;
  }
  
  res.json({ id: user.id, username: user.username, enabled: user.enabled });
});

// DELETE Admin User
app.delete('/api/admin/users/:id', requireAdmin, (req, res) => {
  const { id } = req.params;
  const sessionUser = (req as any).user as AdminUser;
  
  if (id === sessionUser.id) {
    return res.status(400).json({ message: 'You cannot delete your own admin account' });
  }
  
  const index = adminUsers.findIndex(u => u.id === id);
  if (index === -1) {
    return res.status(404).json({ message: 'Admin user not found' });
  }
  
  adminUsers.splice(index, 1);
  res.json({ message: 'Admin user deleted successfully' });
});

// Dynamic SEO XML Sitemap Endpoint
app.get('/sitemap.xml', (req, res) => {
  try {
    const domain = (process.env.APP_URL || 'https://exploreethiopiatourandtravel.com.et').replace(/\/$/, '');
    let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
    xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;
    
    const corePaths = ['', '/about', '/privacy', '/terms'];
    corePaths.forEach(p => {
      xml += `  <url>\n`;
      xml += `    <loc>${domain}${p}</loc>\n`;
      xml += `    <changefreq>weekly</changefreq>\n`;
      xml += `    <priority>${p === '' ? '1.0' : '0.8'}</priority>\n`;
      xml += `  </url>\n`;
    });
    
    if (siteContentState && siteContentState.destinations && Array.isArray(siteContentState.destinations)) {
      siteContentState.destinations.forEach((d: any) => {
        const slug = d.slug || d.id;
        xml += `  <url>\n`;
        xml += `    <loc>${domain}/destination/${slug}</loc>\n`;
        xml += `    <changefreq>monthly</changefreq>\n`;
        xml += `    <priority>0.7</priority>\n`;
        xml += `  </url>\n`;
      });
    }

    if (siteContentState && siteContentState.tourPackages && Array.isArray(siteContentState.tourPackages)) {
      siteContentState.tourPackages.forEach((p: any) => {
        const slug = p.slug || p.id;
        xml += `  <url>\n`;
        xml += `    <loc>${domain}/package/${slug}</loc>\n`;
        xml += `    <changefreq>monthly</changefreq>\n`;
        xml += `    <priority>0.7</priority>\n`;
        xml += `  </url>\n`;
      });
    }
    
    xml += `</urlset>`;
    res.header('Content-Type', 'application/xml');
    res.send(xml);
  } catch (err) {
    console.error('Failed to generate sitemap.xml:', err);
    res.status(500).send('Error generating sitemap');
  }
});

// Standard Robots.txt Endpoint
app.get('/robots.txt', (req, res) => {
  res.type('text/plain');
  res.send(`User-agent: *
Allow: /
Disallow: /admin/
Disallow: /api/

Sitemap: https://exploreethiopiatourandtravel.com.et/sitemap.xml`);
});

// Serve uploaded media files
app.use('/uploads', express.static(UPLOADS_DIR, { maxAge: '30d', immutable: true }));

// Server Startup
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running at http://0.0.0.0:${PORT}`);
  });
}

startServer();
