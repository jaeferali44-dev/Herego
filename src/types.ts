export interface Destination {
  id: string;
  name: string;
  vibeText: string;
  keyDetails: string;
  imageUrl: string;
  subtitle?: string;
  highlights?: string[];
  journeyHighlights?: string[];
  journeyDescription?: string;
  gallery?: string[];
}

export interface JourneyLocation {
  id?: string;
  title: string;
  description: string;
  images: string[];
}

export interface TourPackage {
  id: string;
  title: string;
  highlights: string;
  imageUrl: string;
  destinationValue: string; // To match the dropdown selection value
  priceTag?: string; // Optional price tag for that luxury touch
  description?: string; // Detailed package description
  journeyHighlights?: string[]; // Journey highlights list
  includedItems?: string[]; // Included services / amenities list
  gallery?: string[]; // Image gallery array
  exploreJourney?: JourneyLocation[]; // Progressive vertical visual storytelling locations
}

export interface OperationalPillar {
  title: string;
  text: string;
  imageUrl?: string;
}

export interface VideoPlaceholder {
  id: string;
  title: string;
  duration: string;
  creator: string;
  thumbnailUrl: string;
}

// Helper to format Google Drive links & third-party image URLs for direct rendering
export function formatImageUrl(url: string | undefined | null): string {
  if (!url) return '';
  let cleanUrl = url.trim();
  
  // Convert Google Drive view links
  const driveFileMatch = cleanUrl.match(/drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]+)/);
  if (driveFileMatch && driveFileMatch[1]) {
    return `https://lh3.googleusercontent.com/d/${driveFileMatch[1]}`;
  }
  
  // Convert Google Drive uc?id=
  const driveUcMatch = cleanUrl.match(/drive\.google\.com\/uc\?.*id=([a-zA-Z0-9_-]+)/);
  if (driveUcMatch && driveUcMatch[1]) {
    return `https://lh3.googleusercontent.com/d/${driveUcMatch[1]}`;
  }
  
  return cleanUrl;
}

