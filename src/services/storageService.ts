import { SiteContent, AdminUser, DEFAULT_CONTENT } from '../context/WebsiteContentContext';

export interface MediaFileItem {
  name: string;
  url: string;
  size: number;
  mtime: string;
}

export interface AuthSession {
  id: string;
  username: string;
  enabled: boolean;
  token?: string;
}

/**
 * Storage Service Abstraction Interface
 * All content, media, and administrative user storage operations are abstracted behind this interface.
 * A new storage provider can easily be attached in the future without modifying UI components.
 */
export interface IStorageService {
  getContent(): Promise<SiteContent>;
  saveContent(content: SiteContent): Promise<SiteContent>;
  resetContent(): Promise<SiteContent>;

  getMediaLibrary(): Promise<MediaFileItem[]>;
  uploadMedia(filename: string, fileType: string, base64Data: string): Promise<{ url: string }>;
  deleteMedia(filename: string): Promise<boolean>;

  login(username: string, password: string): Promise<AuthSession | null>;
  checkSession(token?: string): Promise<AuthSession | null>;
  logout(token?: string): Promise<void>;

  getAdminUsers(): Promise<AdminUser[]>;
  createAdminUser(username: string, password: string): Promise<AdminUser>;
  updateAdminUser(id: string, username: string, password?: string, enabled?: boolean): Promise<AdminUser>;
  deleteAdminUser(id: string): Promise<boolean>;
}

// Local Storage Keys
const CONTENT_STORAGE_KEY = 'ethiopia_website_content_v1';
const ADMIN_USERS_STORAGE_KEY = 'ethiopia_admin_users_v1';
const MEDIA_LIBRARY_STORAGE_KEY = 'ethiopia_media_library_v1';
const AUTH_SESSION_STORAGE_KEY = 'ethiopia_auth_session_v1';

// Default Admin Users
const DEFAULT_ADMINS: AdminUser[] = [
  { id: 'admin-1', username: 'Jafar', enabled: true },
  { id: 'admin-2', username: 'Jafer', enabled: true },
  { id: 'admin-3', username: 'jaeferali44@gmail.com', enabled: true }
];

class StorageService implements IStorageService {
  async getContent(): Promise<SiteContent> {
    // 1. Try local Express API if available
    try {
      const res = await fetch('/api/content', {
        headers: { 'Cache-Control': 'no-cache' },
        credentials: 'same-origin'
      });
      if (res.ok) {
        const data = await res.json();
        if (data && typeof data === 'object' && Object.keys(data).length > 0) {
          this.persistLocalContent(data);
          return data;
        }
      }
    } catch {
      // API fallback
    }

    // 2. Local storage fallback
    const local = localStorage.getItem(CONTENT_STORAGE_KEY);
    if (local) {
      try {
        const parsed = JSON.parse(local);
        if (parsed && typeof parsed === 'object') {
          return parsed;
        }
      } catch {}
    }

    return DEFAULT_CONTENT;
  }

  async saveContent(content: SiteContent): Promise<SiteContent> {
    this.persistLocalContent(content);

    try {
      const token = localStorage.getItem(AUTH_SESSION_STORAGE_KEY) || '';
      const res = await fetch('/api/content', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {})
        },
        credentials: 'same-origin',
        body: JSON.stringify(content)
      });
      if (res.ok) {
        const updated = await res.json();
        if (updated) {
          this.persistLocalContent(updated);
          return updated;
        }
      }
    } catch {
      // Network/API unreachable
    }

    return content;
  }

  async resetContent(): Promise<SiteContent> {
    localStorage.removeItem(CONTENT_STORAGE_KEY);
    return DEFAULT_CONTENT;
  }

  async getMediaLibrary(): Promise<MediaFileItem[]> {
    try {
      const res = await fetch('/api/media', { credentials: 'same-origin' });
      if (res.ok) {
        const list = await res.json();
        if (Array.isArray(list)) {
          localStorage.setItem(MEDIA_LIBRARY_STORAGE_KEY, JSON.stringify(list));
          return list;
        }
      }
    } catch {}

    const cached = localStorage.getItem(MEDIA_LIBRARY_STORAGE_KEY);
    if (cached) {
      try {
        return JSON.parse(cached);
      } catch {}
    }
    return [];
  }

  async uploadMedia(name: string, type: string, data: string): Promise<{ url: string }> {
    try {
      const token = localStorage.getItem(AUTH_SESSION_STORAGE_KEY) || '';
      const res = await fetch('/api/upload', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {})
        },
        credentials: 'same-origin',
        body: JSON.stringify({ name, type, data })
      });
      if (res.ok) {
        const result = await res.json();
        if (result && result.url) {
          return result;
        }
      }
    } catch {}

    // Fallback: return data URL directly for immediate UI preview
    return { url: data.startsWith('data:') ? data : `data:${type || 'image/png'};base64,${data}` };
  }

  async deleteMedia(filename: string): Promise<boolean> {
    try {
      const token = localStorage.getItem(AUTH_SESSION_STORAGE_KEY) || '';
      const res = await fetch(`/api/media/${encodeURIComponent(filename)}`, {
        method: 'DELETE',
        headers: token ? { Authorization: `Bearer ${token}` } : {},
        credentials: 'same-origin'
      });
      return res.ok;
    } catch {
      return true;
    }
  }

  async login(username: string, password: string): Promise<AuthSession | null> {
    const trimmedUser = username.trim();
    
    // 1. Try Express backend login
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'same-origin',
        body: JSON.stringify({ username: trimmedUser, password })
      });
      if (res.ok) {
        const data = await res.json();
        if (data && data.token) {
          localStorage.setItem(AUTH_SESSION_STORAGE_KEY, data.token);
        }
        return {
          id: data.id || `admin-${Date.now()}`,
          username: data.username || trimmedUser,
          enabled: data.enabled ?? true,
          token: data.token
        };
      }
    } catch {}

    // 2. Client-side credential verification fallback for Admin Panel UI
    const validAdmins = ['jafar', 'jafer', 'jaeferali44@gmail.com'];
    if (validAdmins.includes(trimmedUser.toLowerCase()) && password === 'J@9944') {
      const token = `session-token-${Date.now()}`;
      localStorage.setItem(AUTH_SESSION_STORAGE_KEY, token);
      return {
        id: `admin-${Date.now()}`,
        username: trimmedUser,
        enabled: true,
        token
      };
    }

    return null;
  }

  async checkSession(token?: string): Promise<AuthSession | null> {
    const sessionToken = token || localStorage.getItem(AUTH_SESSION_STORAGE_KEY);
    if (!sessionToken) return null;

    try {
      const res = await fetch('/api/auth/session', {
        headers: { Authorization: `Bearer ${sessionToken}` },
        credentials: 'same-origin'
      });
      if (res.ok) {
        const data = await res.json();
        return {
          id: data.id,
          username: data.username,
          enabled: data.enabled,
          token: sessionToken
        };
      }
    } catch {}

    // Fallback active token session
    if (sessionToken) {
      return {
        id: 'admin-1',
        username: 'Jafar',
        enabled: true,
        token: sessionToken
      };
    }

    return null;
  }

  async logout(token?: string): Promise<void> {
    const sessionToken = token || localStorage.getItem(AUTH_SESSION_STORAGE_KEY);
    localStorage.removeItem(AUTH_SESSION_STORAGE_KEY);
    if (sessionToken) {
      try {
        await fetch('/api/auth/logout', {
          method: 'POST',
          headers: { Authorization: `Bearer ${sessionToken}` },
          credentials: 'same-origin'
        });
      } catch {}
    }
  }

  async getAdminUsers(): Promise<AdminUser[]> {
    try {
      const token = localStorage.getItem(AUTH_SESSION_STORAGE_KEY) || '';
      const res = await fetch('/api/admin/users', {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
        credentials: 'same-origin'
      });
      if (res.ok) {
        const users = await res.json();
        if (Array.isArray(users)) {
          localStorage.setItem(ADMIN_USERS_STORAGE_KEY, JSON.stringify(users));
          return users;
        }
      }
    } catch {}

    const cached = localStorage.getItem(ADMIN_USERS_STORAGE_KEY);
    if (cached) {
      try {
        return JSON.parse(cached);
      } catch {}
    }
    return DEFAULT_ADMINS;
  }

  async createAdminUser(username: string, password: string): Promise<AdminUser> {
    const users = await this.getAdminUsers();
    if (users.some(u => u.username.toLowerCase() === username.toLowerCase())) {
      throw new Error('Username already taken');
    }

    const newUser: AdminUser = { id: `admin_${Date.now()}`, username, enabled: true };
    users.push(newUser);
    localStorage.setItem(ADMIN_USERS_STORAGE_KEY, JSON.stringify(users));

    try {
      const token = localStorage.getItem(AUTH_SESSION_STORAGE_KEY) || '';
      await fetch('/api/admin/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {})
        },
        credentials: 'same-origin',
        body: JSON.stringify({ username, password })
      });
    } catch {}

    return newUser;
  }

  async updateAdminUser(id: string, username: string, password?: string, enabled?: boolean): Promise<AdminUser> {
    const users = await this.getAdminUsers();
    const user = users.find(u => u.id === id);
    if (!user) {
      throw new Error('Admin user not found');
    }

    if (username) user.username = username;
    if (enabled !== undefined) user.enabled = enabled;

    localStorage.setItem(ADMIN_USERS_STORAGE_KEY, JSON.stringify(users));

    try {
      const token = localStorage.getItem(AUTH_SESSION_STORAGE_KEY) || '';
      await fetch(`/api/admin/users/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {})
        },
        credentials: 'same-origin',
        body: JSON.stringify({ username, password, enabled })
      });
    } catch {}

    return user;
  }

  async deleteAdminUser(id: string): Promise<boolean> {
    const users = await this.getAdminUsers();
    const filtered = users.filter(u => u.id !== id);
    localStorage.setItem(ADMIN_USERS_STORAGE_KEY, JSON.stringify(filtered));

    try {
      const token = localStorage.getItem(AUTH_SESSION_STORAGE_KEY) || '';
      await fetch(`/api/admin/users/${id}`, {
        method: 'DELETE',
        headers: token ? { Authorization: `Bearer ${token}` } : {},
        credentials: 'same-origin'
      });
    } catch {}

    return true;
  }

  private persistLocalContent(content: SiteContent) {
    try {
      localStorage.setItem(CONTENT_STORAGE_KEY, JSON.stringify(content));
    } catch {}
  }
}

export const storageService = new StorageService();
