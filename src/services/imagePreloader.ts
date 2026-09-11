import { TOUR_PACKAGES } from '../data';
import { formatImageUrl, TourPackage } from '../types';

// In-memory cache to retain Image references during and after in-flight network requests
const preloadedImagesMap = new Map<string, HTMLImageElement>();

/**
 * Collects all unique formatted Explore the Journey image URLs across all provided packages.
 */
export function getAllExploreJourneyImageUrls(packages: TourPackage[] = TOUR_PACKAGES): string[] {
  const urlSet = new Set<string>();

  if (!packages || !Array.isArray(packages)) return [];

  packages.forEach((pkg) => {
    if (pkg && pkg.exploreJourney && Array.isArray(pkg.exploreJourney)) {
      pkg.exploreJourney.forEach((entry) => {
        if (entry && entry.images && Array.isArray(entry.images)) {
          entry.images.forEach((imgUrl) => {
            if (imgUrl) {
              const formatted = formatImageUrl(imgUrl);
              if (formatted && formatted.startsWith('http')) {
                urlSet.add(formatted);
              }
            }
          });
        }
      });
    }
  });

  return Array.from(urlSet);
}

/**
 * Preloads all Explore the Journey images from all 11 packages immediately in the background
 * without blocking initial DOM rendering.
 */
export function preloadAllExploreJourneyImages(packages: TourPackage[] = TOUR_PACKAGES): void {
  if (typeof window === 'undefined') return;

  const urls = getAllExploreJourneyImageUrls(packages);

  const startPreloading = () => {
    urls.forEach((url) => {
      if (!preloadedImagesMap.has(url)) {
        const img = new Image();
        img.referrerPolicy = 'no-referrer';
        img.decoding = 'async';
        img.src = url;
        preloadedImagesMap.set(url, img);
      }
    });
  };

  // Run in background without blocking layout or first paint
  if ('requestIdleCallback' in window) {
    (window as any).requestIdleCallback(startPreloading, { timeout: 1500 });
  } else {
    setTimeout(startPreloading, 50);
  }
}

// Auto-trigger immediately on module load in client-side runtime
if (typeof window !== 'undefined') {
  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    preloadAllExploreJourneyImages();
  } else {
    window.addEventListener('DOMContentLoaded', () => preloadAllExploreJourneyImages(), { once: true });
  }
}
