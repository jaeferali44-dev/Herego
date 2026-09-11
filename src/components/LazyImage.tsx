import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { formatImageUrl } from '../types';
import { ImageOff } from 'lucide-react';

// Global cache to track images that are already loaded in memory
const LOADED_IMAGE_CACHE = new Set<string>();

/**
 * Preloads an image URL into browser cache and marks it in the global cache map.
 */
export const preloadImage = (rawSrc: string) => {
  if (!rawSrc) return;
  const formattedSrc = formatImageUrl(rawSrc);
  if (!formattedSrc || LOADED_IMAGE_CACHE.has(formattedSrc)) return;

  const img = new Image();
  img.referrerPolicy = "no-referrer";
  img.onload = () => {
    LOADED_IMAGE_CACHE.add(formattedSrc);
  };
  img.src = formattedSrc;
};

interface LazyImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt?: string;
  fallbackAlt?: string;
  imgClassName?: string;
}

/**
 * Reusable SEO-optimized, highly performant Lazy Image component.
 * Uses Framer Motion for ultra-smooth luxury transitions.
 * Gracefully handles cached images, preloaded assets, and network delays.
 */
export const LazyImage: React.FC<LazyImageProps> = ({
  src,
  alt = "",
  fallbackAlt = "Scenic travel showcase of Ethiopia",
  className = "",
  imgClassName = "",
  loading = "lazy",
  referrerPolicy = "no-referrer",
  decoding = "async",
  ...props
}) => {
  const formattedSrc = formatImageUrl(src);

  // Initialize isLoaded directly to true if the image is already in memory cache or preloaded
  const [isLoaded, setIsLoaded] = useState<boolean>(() => {
    if (!formattedSrc) return false;
    return LOADED_IMAGE_CACHE.has(formattedSrc);
  });
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef<HTMLImageElement | null>(null);

  // Generate a descriptive, clean alt text if none is provided or if it's generic
  const generateAltText = (providedAlt: string, url: string): string => {
    if (providedAlt && providedAlt.trim().length > 0) {
      return providedAlt;
    }

    try {
      const decodedUrl = decodeURIComponent(url);
      const filename = decodedUrl.split('/').pop()?.split('?')[0] || '';
      
      if (filename) {
        // Strip file extensions
        const baseName = filename.replace(/\.[^/.]+$/, "");
        // Convert snake_case, camelCase, or hyphens into spaces
        const cleanName = baseName
          .replace(/[-_]+/g, ' ')
          .replace(/([a-z])([A-Z])/g, '$1 $2')
          .trim();
          
        if (cleanName && cleanName.length > 2) {
          // Capitalize each word
          return cleanName
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
            .join(' ');
        }
      }
    } catch (e) {
      // Fallback silently to fallbackAlt
    }

    return fallbackAlt;
  };

  const finalAlt = generateAltText(alt, src);

  // Effect to handle cached images and reset state on src change
  useEffect(() => {
    if (!formattedSrc) return;

    if (LOADED_IMAGE_CACHE.has(formattedSrc)) {
      setIsLoaded(true);
      return;
    }

    setHasError(false);

    // If the image is already cached/complete in DOM element
    if (imgRef.current && imgRef.current.complete && imgRef.current.naturalWidth > 0) {
      LOADED_IMAGE_CACHE.add(formattedSrc);
      setIsLoaded(true);
    }
  }, [formattedSrc]);

  const handleLoad = () => {
    if (formattedSrc) {
      LOADED_IMAGE_CACHE.add(formattedSrc);
    }
    setIsLoaded(true);
  };

  const handleError = () => {
    setHasError(true);
  };

  return (
    <div className={`relative overflow-hidden bg-slate-900/40 dark:bg-black/20 ${className}`}>
      {/* Soft Elegant Shimmer Skeleton - only shown if not loaded */}
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 w-full h-full bg-slate-800/40 dark:bg-zinc-900/60 animate-pulse flex items-center justify-center">
          <div className="w-6 h-6 border-2 border-solar/20 border-t-solar rounded-full animate-spin" />
        </div>
      )}

      {/* Error Fallback State */}
      {hasError ? (
        <div className="absolute inset-0 w-full h-full bg-slate-900/60 flex flex-col items-center justify-center gap-1.5 text-zinc-500 p-4 border border-dashed border-accent-border/30">
          <ImageOff className="w-5 h-5 text-solar/60 stroke-[1.5]" />
          <span className="text-[10px] tracking-widest font-bold font-sans uppercase text-zinc-400">Image Unavailable</span>
        </div>
      ) : (
        <motion.img
          ref={imgRef}
          src={formattedSrc}
          alt={finalAlt}
          loading={loading}
          decoding={decoding}
          referrerPolicy={referrerPolicy}
          onLoad={handleLoad}
          onError={handleError}
          initial={{ opacity: isLoaded ? 1 : 0 }}
          animate={{ opacity: isLoaded ? 1 : 0 }}
          transition={{ duration: isLoaded ? 0 : 0.4, ease: "easeOut" }}
          className={`w-full h-full ${imgClassName}`}
          {...props}
        />
      )}
    </div>
  );
};
