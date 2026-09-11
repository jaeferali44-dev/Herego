import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { formatImageUrl } from '../types';

interface AfarImageCarouselProps {
  images: string[];
  autoplayInterval?: number;
  className?: string;
  aspectRatioClass?: string;
  imgClassName?: string;
  showControls?: boolean;
  useDefaultStyles?: boolean;
  showVignette?: boolean;
}

export const AfarImageCarousel: React.FC<AfarImageCarouselProps> = ({
  images,
  autoplayInterval = 3200,
  className = "",
  aspectRatioClass = "aspect-[16/10]",
  imgClassName = "w-full h-full object-cover block",
  showControls = false,
  useDefaultStyles = true,
  showVignette = true,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Minimum swipe distance in pixels
  const minSwipeDistance = 40;

  useEffect(() => {
    if (!images || images.length === 0) return;
    // Programmatically preload all images in the background with no-referrer
    images.forEach((src) => {
      const img = new Image();
      img.referrerPolicy = "no-referrer";
      img.src = formatImageUrl(src);
    });
  }, [images]);

  const startTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (!images || images.length <= 1) return;

    timerRef.current = setInterval(() => {
      setCurrentIndex((prev) => {
        setPrevIndex(prev);
        return (prev + 1) % images.length;
      });
    }, autoplayInterval);
  };

  useEffect(() => {
    startTimer();
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [images?.length, autoplayInterval]);

  if (!images || images.length === 0) return null;

  const currentSrc = formatImageUrl(images[currentIndex]);
  const prevSrc = formatImageUrl(images[prevIndex]);

  const handleNext = () => {
    setPrevIndex(currentIndex);
    setCurrentIndex((prev) => (prev + 1) % images.length);
    startTimer(); // Reset auto-play timer on manual interaction
  };

  const handlePrev = () => {
    setPrevIndex(currentIndex);
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    startTimer(); // Reset auto-play timer on manual interaction
  };

  const handleDotClick = (index: number) => {
    if (index === currentIndex) return;
    setPrevIndex(currentIndex);
    setCurrentIndex(index);
    startTimer(); // Reset auto-play timer on manual interaction
  };

  // Swipe gesture handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    if (isLeftSwipe) {
      handleNext();
    } else if (isRightSwipe) {
      handlePrev();
    }
  };

  return (
    <div 
      className={`relative w-full overflow-hidden group/carousel ${aspectRatioClass} ${
        useDefaultStyles ? "rounded-[24px] border border-accent-border/40 shadow-2xl bg-zinc-900" : ""
      } ${className}`}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Hidden preloader elements to force eager background downloading of all upcoming images */}
      <div className="hidden" aria-hidden="true" style={{ display: 'none' }}>
        {images.map((src, index) => (
          <img
            key={`${src}-${index}`}
            src={formatImageUrl(src)}
            alt=""
            referrerPolicy="no-referrer"
            loading="eager"
          />
        ))}
      </div>

      {/* Main Image Container */}
      <div className="absolute inset-0 w-full h-full flex items-center justify-center overflow-hidden">
        {/* Previous Image as Base Layer to completely eliminate black flashes */}
        {images.length > 1 && prevSrc && (
          <img
            src={prevSrc}
            alt=""
            className={`absolute inset-0 z-0 ${imgClassName}`}
            referrerPolicy="no-referrer"
            loading="eager"
          />
        )}

        {/* Top Active Image crossfading smoothly */}
        <AnimatePresence mode="sync" initial={false}>
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 0.5,
              ease: "easeInOut"
            }}
            className="absolute inset-0 w-full h-full z-10"
          >
            <img
              src={currentSrc}
              alt={`Gallery Image ${currentIndex + 1}`}
              className={imgClassName}
              referrerPolicy="no-referrer"
              loading="eager"
              style={{ contentVisibility: "auto" }}
            />
          </motion.div>
        </AnimatePresence>

        {/* Smooth luxury cinematic vignette overlay (optional) */}
        {showVignette && (
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/25 pointer-events-none z-20" />
        )}
      </div>

      {/* Manual Navigation Controls (Arrows) */}
      {showControls && images.length > 1 && (
        <>
          {/* Left Arrow */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handlePrev();
            }}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-2.5 sm:p-3 rounded-full bg-black/40 hover:bg-black/75 text-white border border-white/10 hover:border-solar/40 transition-all duration-300 md:opacity-0 md:group-hover/carousel:opacity-100 backdrop-blur-sm shadow-md cursor-pointer hover:scale-105 active:scale-95"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Right Arrow */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleNext();
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-2.5 sm:p-3 rounded-full bg-black/40 hover:bg-black/75 text-white border border-white/10 hover:border-solar/40 transition-all duration-300 md:opacity-0 md:group-hover/carousel:opacity-100 backdrop-blur-sm shadow-md cursor-pointer hover:scale-105 active:scale-95"
            aria-label="Next image"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Dot Indicators */}
          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2 bg-black/30 backdrop-blur-sm py-1.5 px-3.5 rounded-full border border-white/5">
            {images.map((_, idx) => (
              <button
                key={idx}
                onClick={(e) => {
                  e.stopPropagation();
                  handleDotClick(idx);
                }}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  idx === currentIndex 
                    ? "w-5 bg-solar" 
                    : "w-2 bg-white/45 hover:bg-white/80"
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};
