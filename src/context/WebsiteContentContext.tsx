import React, { createContext, useContext, useState, useEffect } from 'react';
import { DESTINATIONS, TOUR_PACKAGES, OPERATIONAL_PILLARS, CONTACT_INFO, VIDEO_COLLABORATIONS } from '../data';
import { Destination, TourPackage, OperationalPillar, VideoPlaceholder } from '../types';
import { storageService } from '../services/storageService';

export interface FeaturedStory {
  id: string;
  personality: string;
  role: string;
  destination: string;
  moment: string;
  quote: string;
  description: string;
  imageUrl: string;
  destinationName: string;
  layoutType: string;
}

// Full Site Content Schema
export interface SiteContent {
  mediaGallery?: string[];
  hero: {
    title: string;
    subtitle: string;
    bgImage: string;
    buttonText: string;
  };
  about: {
    title: string;
    subtitle: string;
    description: string;
    pillars: OperationalPillar[];
  };
  destinations: Destination[];
  tourPackages: TourPackage[];
  videoCollaborations: VideoPlaceholder[];
  featuredStories: FeaturedStory[];
  contactInfo: typeof CONTACT_INFO;
  footer: {
    copyrightText: string;
    tagline: string;
  };
  seo: {
    pageTitle: string;
    metaDescription: string;
    keywords: string;
    ogTitle: string;
    ogDescription: string;
  };
  design: {
    primaryColor: string;
    backgroundColor: string;
    cardColor: string;
    fontFamily: string;
    sectionSpacing: 'compact' | 'comfortable' | 'spacious';
    buttonStyle: 'rounded' | 'semi-rounded' | 'sharp';
    favicon?: string;
  };
}

export interface AdminUser {
  id: string;
  username: string;
  enabled: boolean;
}

// Initial/Fallback Featured Stories
const DEFAULT_FEATURED_STORIES: FeaturedStory[] = [
  {
    id: "story-1",
    personality: "Abraham Kibrab",
    role: "Respected Presenter & Explorer",
    destination: "Kenya & Mombasa Beach Escape",
    moment: "Exploring the beautiful coast of Mombasa and its rich coastal culture.",
    quote: "“Exploring the beautiful coast of Mombasa was an unforgettable experience. From the stunning beaches to the rich coastal culture, every moment was carefully planned and beautifully delivered. This journey reminded me that travel is not only about places, but the memories we create along the way.”",
    description: "Abraham's tropical coastal escape to Mombasa perfectly combined leisure and cultural discovery. His journey highlighted the breathtaking beauty of the East African coast, curated beachfront experiences, and the meticulous personal touch that defines all our signature retreats.",
    imageUrl: "https://lh3.googleusercontent.com/d/1GudVIwjUPYoASqQI9j9sFr29fsmdoWzj",
    destinationName: "Kenya Mombasa Expedition",
    layoutType: "wide-left"
  },
  {
    id: "story-2",
    personality: "Yuti Nass",
    role: "Digital Creator & Cultural Advocate",
    destination: "Historic Harar Discovery",
    moment: "Walking through ancient labyrinthine streets and experiencing Harari traditions.",
    quote: "“Harar is a destination full of history, culture, and human connection. Walking through its ancient streets and experiencing its traditions was a journey beyond sightseeing — it was a true connection with Ethiopia’s heritage and the people who make it special.”",
    description: "Yuti Nass's exploration of Harar Jugol immersed them deep into the living heritage of this UNESCO-listed 16th-century walled city. From smelling fresh local spices to connecting with master artisans, their story captures the absolute magic of human connection and historical preservation.",
    imageUrl: "https://lh3.googleusercontent.com/d/1LB99SET0Z-YWtGUp8LBALcOXRzFw5z0f",
    destinationName: "Harar Tour",
    layoutType: "portrait-right"
  },
  {
    id: "story-3",
    personality: "Love & Shared Moments",
    role: "Shared Experiences",
    destination: "The Joy of Shared Discovery",
    moment: "Sharing beautiful landscapes and quiet moments together with the people we love.",
    quote: "“The most meaningful journeys are the ones we share with the people we love. Every destination becomes more special when experienced together, creating memories that remain long after the journey ends.”",
    description: "Whether standing on the edge of a volcanic caldera, strolling along copper lakeside sands, or walking ancient stone alleys, sharing the world with someone close elevates every horizon. We design every collaborative travel package with seamless details to make your shared connections completely unforgettable.",
    imageUrl: "https://lh3.googleusercontent.com/d/1_OLjbPw2-2lY8uGXILt4eNF0_hmj8BfB",
    destinationName: "Lake Langano",
    layoutType: "wide-right"
  },
  {
    id: "story-4",
    personality: "Memories Beyond the Journey",
    role: "Lifelong Memories",
    destination: "The Spirit of True Adventure",
    moment: "Sharing stories, laughter, and unforgettable moments together under starry skies.",
    quote: "“Travel is more than reaching a destination. It is about the laughter, the stories, and the unforgettable moments shared with the people beside us. These are the memories that make every adventure truly meaningful.”",
    description: "The core of every true expedition isn't merely the places we see, but the lasting footprints left in our hearts. By eliminating all the stress of travel logistics, park entries, and cross-border transport, we free your mind to focus entirely on what truly matters: living in the moment and gathering stories to tell for a lifetime.",
    imageUrl: "https://lh3.googleusercontent.com/d/1qRKF1rdTlLcKfmgL1ZMHf5GRCdwWqdt_",
    destinationName: "Afar Expedition",
    layoutType: "portrait-left"
  }
];

// Initial default site content
export const DEFAULT_CONTENT: SiteContent = {
  mediaGallery: [],
  hero: {
    title: "Explore Ethiopia and Beyond",
    subtitle: "Every Journey Tells a Story.",
    bgImage: "https://lh3.googleusercontent.com/d/1Z95HuwiHjhHTv5VuYaxxg19RRqtRIH82",
    buttonText: "Explore Trips"
  },
  about: {
    title: "Bridging Frontiers Together",
    subtitle: "Our Story & Synergy",
    description: "Born in Addis Ababa, Explore Ethiopia Tour and Travel was founded on a simple belief: travel should be profound, safe, and deeply personal. We bring decades of regional expertise, a robust fleet of operational transport options, and strong connections with local communities to create travel experiences that respect regional heritage and delight curious minds.",
    pillars: OPERATIONAL_PILLARS
  },
  destinations: DESTINATIONS,
  tourPackages: TOUR_PACKAGES,
  videoCollaborations: VIDEO_COLLABORATIONS,
  featuredStories: DEFAULT_FEATURED_STORIES,
  contactInfo: CONTACT_INFO,
  footer: {
    copyrightText: "Explore Ethiopia Tour and Travel. All rights reserved.",
    tagline: "Your premier gateway to the raw, ancient, and breathtaking landscapes of East Africa."
  },
  seo: {
    pageTitle: "Explore Ethiopia Tour and Travel - Premium Tour and Travel Expedition Desk",
    metaDescription: "Discover Ethiopia's raw landscapes, active volcanic sites, historic walled cities, Rift Valley lakes, and rich heritage with safe, hand-curated tour packages.",
    keywords: "Ethiopia travel, Dallol volcano, Erta Ale tour, Harar tour, Lake Langano, Wenchi crater lake, Bale mountains expedition, Explore Ethiopia Tour and Travel",
    ogTitle: "Explore Ethiopia Tour and Travel - Premium Expeditions",
    ogDescription: "Discover active volcano loops, historic walled cities, Rift Valley lakes, and more. Hand-curated itineraries for deep cultural and natural immersion."
  },
  design: {
    primaryColor: "#EAB308",
    backgroundColor: "#FFFFFF",
    cardColor: "#F3F4F6",
    fontFamily: "Plus Jakarta Sans",
    sectionSpacing: "comfortable",
    buttonStyle: "rounded",
    favicon: "/favicon.ico?v=2"
  }
};

interface WebsiteContentContextType {
  content: SiteContent;
  loading: boolean;
  isAdminAuthenticated: boolean;
  adminUser: AdminUser | null;
  adminUsersList: AdminUser[];
  error: string | null;
  
  // Content operations
  updateContent: (newContent: SiteContent) => Promise<boolean>;
  resetToDefault: () => Promise<boolean>;
  uploadImage: (file: File) => Promise<string>;
  deleteMediaFile: (filename: string) => Promise<boolean>;
  
  // Auth operations
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  checkSession: () => Promise<boolean>;
  
  // Admin user operations
  createAdminUser: (username: string, password: string) => Promise<boolean>;
  updateAdminUser: (id: string, username: string, password?: string, enabled?: boolean) => Promise<boolean>;
  deleteAdminUser: (id: string) => Promise<boolean>;
  fetchAdminUsers: () => Promise<void>;
}

const WebsiteContentContext = createContext<WebsiteContentContextType | undefined>(undefined);

export function WebsiteContentProvider({ children }: { children: React.ReactNode }) {
  const [content, setContent] = useState<SiteContent>(DEFAULT_CONTENT);
  const [loading, setLoading] = useState(true);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null);
  const [adminUsersList, setAdminUsersList] = useState<AdminUser[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Load content on mount via storage service abstraction
  useEffect(() => {
    async function loadInitialData() {
      try {
        setLoading(true);
        const fetchedContent = await storageService.getContent();
        const mergedHero = { ...DEFAULT_CONTENT.hero, ...(fetchedContent.hero || {}) };
        if (!mergedHero.bgImage) {
          mergedHero.bgImage = DEFAULT_CONTENT.hero.bgImage;
        }

        const mergedContent: SiteContent = {
          ...DEFAULT_CONTENT,
          ...fetchedContent,
          hero: mergedHero,
          about: { ...DEFAULT_CONTENT.about, ...(fetchedContent.about || {}) },
          contactInfo: { ...DEFAULT_CONTENT.contactInfo, ...(fetchedContent.contactInfo || {}) },
          footer: { ...DEFAULT_CONTENT.footer, ...(fetchedContent.footer || {}) },
          seo: { ...DEFAULT_CONTENT.seo, ...(fetchedContent.seo || {}) },
          design: { ...DEFAULT_CONTENT.design, ...(fetchedContent.design || {}) },
          destinations: Array.isArray(fetchedContent.destinations) ? fetchedContent.destinations : DEFAULT_CONTENT.destinations,
          tourPackages: Array.isArray(fetchedContent.tourPackages)
            ? fetchedContent.tourPackages.map(pkg => {
                const defaultPkg = DEFAULT_CONTENT.tourPackages.find(p => p.id === pkg.id);
                let mergedExplore = defaultPkg?.exploreJourney || [];
                if (pkg.exploreJourney && pkg.exploreJourney.length > 0) {
                  let storedLocs = pkg.exploreJourney;
                  if (pkg.id === 'pkg-1') {
                    // Prevent any misplaced cross-destination locations from leaking into pkg-1
                    storedLocs = storedLocs.filter((l: any) => 
                      !l.id?.startsWith('loc-awash') &&
                      !l.id?.startsWith('loc-doho') &&
                      !l.id?.startsWith('loc-chebera') &&
                      !l.id?.startsWith('loc-african') &&
                      !l.id?.startsWith('loc-sanetti') &&
                      !l.id?.startsWith('loc-ethiopian') &&
                      !l.id?.startsWith('loc-bale')
                    );
                  }
                  const defaultLocMap = new Map((defaultPkg?.exploreJourney || []).map(l => [l.id, l]));
                  const updatedStored = storedLocs.map((loc: any) => {
                    const def = defaultLocMap.get(loc.id);
                    if (def && (pkg.id === 'pkg-5' || pkg.id === 'pkg-8')) {
                      return {
                        ...loc,
                        images: def.images
                      };
                    }
                    return loc;
                  });
                  const storedIds = new Set(updatedStored.map((loc: any) => loc.id));
                  const newDefaults = (defaultPkg?.exploreJourney || []).filter(loc => !storedIds.has(loc.id));
                  mergedExplore = [...updatedStored, ...newDefaults];
                }
                return {
                  ...defaultPkg,
                  ...pkg,
                  exploreJourney: mergedExplore
                };
              })
            : DEFAULT_CONTENT.tourPackages,
          videoCollaborations: Array.isArray(fetchedContent.videoCollaborations) ? fetchedContent.videoCollaborations : DEFAULT_CONTENT.videoCollaborations,
          featuredStories: Array.isArray(fetchedContent.featuredStories) ? fetchedContent.featuredStories : DEFAULT_CONTENT.featuredStories
        };
        setContent(mergedContent);
        if (mergedContent.design) {
          applyDesignSettings(mergedContent.design);
        }
      } catch (err) {
        console.warn('Failed to load storage content:', err);
      } finally {
        setLoading(false);
      }

      await checkSession();
    }

    loadInitialData();
  }, []);

  const applyDesignSettings = (design: SiteContent['design']) => {
    try {
      const root = document.documentElement;
      
      const isDarkBg = !design.backgroundColor || ['#0a0a0a', '#000000', '#18181b', '#09090b', '#121212'].includes(design.backgroundColor.toLowerCase());
      const cleanBgColor = isDarkBg ? '#FFFFFF' : design.backgroundColor;
      const isDarkCard = !design.cardColor || ['#141414', '#000000', '#18181b', '#27272a'].includes(design.cardColor.toLowerCase());
      const cleanCardColor = isDarkCard ? '#F3F4F6' : design.cardColor;
      const cleanPrimaryColor = design.primaryColor || '#EAB308';

      root.style.setProperty('--color-solar', cleanPrimaryColor);
      root.style.setProperty('--color-obsidian', cleanBgColor);
      root.style.setProperty('--color-slate-card', cleanCardColor);
      
      let styleTag = document.getElementById('custom-dynamic-theme-style');
      if (!styleTag) {
        styleTag = document.createElement('style');
        styleTag.id = 'custom-dynamic-theme-style';
        document.head.appendChild(styleTag);
      }
      
      styleTag.innerHTML = `
        :root {
          --font-sans: "${design.fontFamily || 'Plus Jakarta Sans'}", ui-sans-serif, system-ui;
        }
        .text-solar { color: ${cleanPrimaryColor} !important; }
        .bg-solar { background-color: ${cleanPrimaryColor} !important; }
        .border-solar { border-color: ${cleanPrimaryColor} !important; }
        .hover\\:text-solar:hover { color: ${cleanPrimaryColor} !important; }
        .hover\\:bg-solar:hover { background-color: ${cleanPrimaryColor} !important; }
        .focus\\:border-solar:focus { border-color: ${cleanPrimaryColor} !important; }
        .bg-obsidian { background-color: ${cleanBgColor} !important; }
        .bg-slate-card { background-color: ${cleanCardColor} !important; }
      `;

      if (content.seo?.pageTitle) {
        document.title = content.seo.pageTitle;
      }
    } catch (e) {
      console.error('Error applying theme styles:', e);
    }
  };

  // Sync title whenever seo pageTitle changes
  useEffect(() => {
    if (content.seo?.pageTitle) {
      document.title = content.seo.pageTitle;
    }
  }, [content.seo?.pageTitle]);

  const checkSession = async (): Promise<boolean> => {
    try {
      const session = await storageService.checkSession();
      if (session) {
        setIsAdminAuthenticated(true);
        setAdminUser({ id: session.id, username: session.username, enabled: session.enabled });
        await fetchAdminUsers();
        return true;
      }
    } catch (err) {
      console.error('Error checking admin session:', err);
    }
    setIsAdminAuthenticated(false);
    setAdminUser(null);
    return false;
  };

  const login = async (username: string, password: string): Promise<boolean> => {
    try {
      setError(null);
      const session = await storageService.login(username, password);
      if (session) {
        setIsAdminAuthenticated(true);
        setAdminUser({ id: session.id, username: session.username, enabled: session.enabled });
        await fetchAdminUsers();
        return true;
      } else {
        setError('Invalid username or password');
        return false;
      }
    } catch (err) {
      setError('Connection failure during login');
      return false;
    }
  };

  const logout = async () => {
    try {
      await storageService.logout();
    } catch (err) {
      console.error('Logout failed:', err);
    } finally {
      setIsAdminAuthenticated(false);
      setAdminUser(null);
      setAdminUsersList([]);
    }
  };

  const updateContent = async (newContent: SiteContent): Promise<boolean> => {
    try {
      setError(null);
      const saved = await storageService.saveContent(newContent);
      setContent(saved);
      if (saved.design) {
        applyDesignSettings(saved.design);
      }
      return true;
    } catch (err) {
      setError('Failed to save content configuration.');
      return false;
    }
  };

  const resetToDefault = async () => {
    try {
      setError(null);
      const reset = await storageService.resetContent();
      setContent(reset);
      if (reset.design) {
        applyDesignSettings(reset.design);
      }
      return true;
    } catch {
      setError('Failed to reset content.');
      return false;
    }
  };

  const uploadImage = async (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = async () => {
        try {
          const base64Data = reader.result as string;
          const result = await storageService.uploadMedia(file.name, file.type, base64Data);
          resolve(result.url);
        } catch (err) {
          reject(err);
        }
      };
      reader.onerror = () => reject(new Error('Failed to read file'));
      reader.readAsDataURL(file);
    });
  };

  const deleteMediaFile = async (filename: string): Promise<boolean> => {
    try {
      return await storageService.deleteMedia(filename);
    } catch {
      return false;
    }
  };

  const fetchAdminUsers = async () => {
    try {
      const users = await storageService.getAdminUsers();
      setAdminUsersList(users);
    } catch (err) {
      console.error('Failed to fetch admin users:', err);
    }
  };

  const createAdminUser = async (username: string, password: string) => {
    try {
      setError(null);
      await storageService.createAdminUser(username, password);
      await fetchAdminUsers();
      return true;
    } catch (err: any) {
      setError(err.message || 'Failed to create admin user');
      return false;
    }
  };

  const updateAdminUser = async (id: string, username: string, password?: string, enabled?: boolean) => {
    try {
      setError(null);
      await storageService.updateAdminUser(id, username, password, enabled);
      await fetchAdminUsers();
      if (id === adminUser?.id) {
        await checkSession();
      }
      return true;
    } catch (err: any) {
      setError(err.message || 'Failed to update admin user');
      return false;
    }
  };

  const deleteAdminUser = async (id: string) => {
    try {
      setError(null);
      await storageService.deleteAdminUser(id);
      await fetchAdminUsers();
      return true;
    } catch (err: any) {
      setError(err.message || 'Failed to delete admin user');
      return false;
    }
  };

  return (
    <WebsiteContentContext.Provider value={{
      content,
      loading,
      isAdminAuthenticated,
      adminUser,
      adminUsersList,
      error,
      updateContent,
      resetToDefault,
      uploadImage,
      deleteMediaFile,
      login,
      logout,
      checkSession,
      createAdminUser,
      updateAdminUser,
      deleteAdminUser,
      fetchAdminUsers
    }}>
      {children}
    </WebsiteContentContext.Provider>
  );
}

export function useWebsiteContent() {
  const context = useContext(WebsiteContentContext);
  if (context === undefined) {
    throw new Error('useWebsiteContent must be used within a WebsiteContentProvider');
  }
  return context;
}
