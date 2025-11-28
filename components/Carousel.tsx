'use client';

import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CarouselSlide {
  videoUrl: string;
  title?: string;
}

const slides: CarouselSlide[] = [
  { videoUrl: '/assets/videos/main_footage.mp4' },
  { videoUrl: '/assets/videos/outsource_model.mp4' },
  { videoUrl: '/assets/videos/saas.mp4' }
];

export default function Carousel() {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  useEffect(() => {
    // Control video playback - only play the current video
    videoRefs.current.forEach((video, index) => {
      if (video) {
        if (index === currentIndex) {
          video.play().catch(() => {});
        } else {
          video.pause();
          video.currentTime = 0;
        }
      }
    });
  }, [currentIndex]);

  const goToPrevious = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
    setTimeout(() => setIsTransitioning(false), 1000);
  };

  const goToNext = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev + 1) % slides.length);
    setTimeout(() => setIsTransitioning(false), 1000);
  };

  const goToSlide = (index: number) => {
    if (isTransitioning || index === currentIndex) return;
    setIsTransitioning(true);
    setCurrentIndex(index);
    setTimeout(() => setIsTransitioning(false), 1000);
  };

  const getSlideStyles = (index: number) => {
    const position = index - currentIndex;
    const adjustedPosition = position < -1 ? slides.length + position : position > 1 ? position - slides.length : position;

    if (adjustedPosition === 0) {
      // Center slide - active
      return {
        zIndex: 30,
        opacity: 1,
        transform: 'translateX(0) translateY(0) translateZ(0) scale(1) rotateY(0deg)',
        filter: 'brightness(1) blur(0px)',
        pointerEvents: 'auto' as const,
      };
    } else if (adjustedPosition === -1 || adjustedPosition === slides.length - 1) {
      // Left slide
      return {
        zIndex: 20,
        opacity: 0.7,
        transform: 'translateX(-90%) translateY(5%) translateZ(-200px) scale(0.85) rotateY(25deg)',
        filter: 'brightness(0.8) blur(0.5px)',
        pointerEvents: 'auto' as const,
      };
    } else {
      // Right slide
      return {
        zIndex: 20,
        opacity: 0.7,
        transform: 'translateX(90%) translateY(5%) translateZ(-200px) scale(0.85) rotateY(-25deg)',
        filter: 'brightness(0.8) blur(0.5px)',
        pointerEvents: 'auto' as const,
      };
    }
  };

  return (
    <div className="w-full flex flex-col items-center gap-6 md:gap-8 lg:gap-10 px-4 py-6 md:py-8">
      {/* Carousel Container */}
      <div className="relative w-full max-w-[95vw] lg:max-w-[1520px] xl:max-w-[1760px] h-[280px] sm:h-[350px] md:h-[450px] lg:h-[600px] xl:h-[660px] overflow-visible">
        <div 
          className="relative w-full h-full flex items-center justify-center"
          style={{ 
            perspective: '2500px',
            perspectiveOrigin: 'center center'
          }}
        >
          {slides.map((slide, index) => {
            const slideStyles = getSlideStyles(index);
            const isActive = index === currentIndex;
            
            return (
              <div
                key={index}
                className="absolute rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl cursor-pointer"
                style={{
                  width: 'min(85vw, 780px)',
                  maxWidth: '780px',
                  height: 'clamp(240px, 60vw, 600px)',
                  zIndex: slideStyles.zIndex,
                  opacity: slideStyles.opacity,
                  transform: slideStyles.transform,
                  filter: slideStyles.filter,
                  pointerEvents: slideStyles.pointerEvents,
                  transformStyle: 'preserve-3d',
                  transition: `
                    transform 0.95s cubic-bezier(0.34, 1.25, 0.64, 1),
                    opacity 0.85s cubic-bezier(0.4, 0, 0.2, 1),
                    filter 0.85s cubic-bezier(0.4, 0, 0.2, 1),
                    z-index 0s linear ${isActive ? '0s' : '0.4s'}
                  `,
                  willChange: 'transform, opacity, filter',
                  backfaceVisibility: 'hidden',
                  WebkitBackfaceVisibility: 'hidden',
                }}
                onClick={() => {
                  if (index !== currentIndex) {
                    goToSlide(index);
                  }
                }}
              >
                <video
                  ref={(el) => { videoRefs.current[index] = el; }}
                  className="w-full h-full object-cover select-none"
                  src={slide.videoUrl}
                  loop
                  muted
                  playsInline
                  preload="metadata"
                  style={{
                    pointerEvents: 'none'
                  }}
                />
                
                {/* Gradient overlay for non-active slides */}
                {!isActive && (
                  <div 
                    className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/20 pointer-events-none"
                    style={{
                      transition: 'opacity 0.6s ease-out'
                    }}
                  />
                )}

                {/* Subtle border for depth */}
                <div 
                  className="absolute inset-0 border-2 border-white/10 rounded-2xl md:rounded-3xl pointer-events-none"
                  style={{
                    transition: 'border-color 0.6s ease-out',
                    borderColor: isActive ? 'rgba(255, 255, 255, 0.2)' : 'rgba(255, 255, 255, 0.05)'
                  }}
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="flex items-center justify-center gap-4 md:gap-6 lg:gap-8">
        <button
          onClick={goToPrevious}
          disabled={isTransitioning}
          className="group relative w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full bg-white/95 backdrop-blur-sm border-2 border-gray-200/50 flex items-center justify-center transition-all duration-300 ease-out hover:border-[#fe7d1a] disabled:opacity-40 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
          style={{
            transform: isTransitioning ? 'scale(0.95)' : 'scale(1)',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
          }}
          onMouseEnter={(e) => {
            if (!isTransitioning) {
              e.currentTarget.style.transform = 'scale(1.1) translateY(-2px)';
            }
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1) translateY(0)';
          }}
          aria-label="Previous slide"
        >
          <div className="absolute inset-0 rounded-full bg-[#fe7d1a] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <ChevronLeft className="relative z-10 w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 text-gray-700 group-hover:text-white transition-colors duration-300" />
        </button>

        {/* Slide Indicators */}
        <div className="flex gap-2 md:gap-2.5 px-4">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              disabled={isTransitioning}
              className="relative transition-all duration-500 ease-out disabled:cursor-not-allowed"
              style={{
                width: index === currentIndex ? '2rem' : '0.5rem',
                height: '0.5rem',
                borderRadius: '0.25rem',
                backgroundColor: index === currentIndex ? '#fe7d1a' : '#d1d5db',
                transform: index === currentIndex ? 'scale(1)' : 'scale(1)',
                opacity: isTransitioning && index !== currentIndex ? 0.5 : 1,
              }}
              aria-label={`Go to slide ${index + 1}`}
              aria-current={index === currentIndex ? 'true' : 'false'}
            >
              {/* Active indicator glow */}
              {index === currentIndex && (
                <div 
                  className="absolute inset-0 rounded-full bg-[#fe7d1a]"
                  style={{
                    filter: 'blur(4px)',
                    opacity: 0.4,
                    animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
                  }}
                />
              )}
            </button>
          ))}
        </div>

        <button
          onClick={goToNext}
          disabled={isTransitioning}
          className="group relative w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full bg-white/95 backdrop-blur-sm border-2 border-gray-200/50 flex items-center justify-center transition-all duration-300 ease-out hover:border-[#fe7d1a] disabled:opacity-40 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
          style={{
            transform: isTransitioning ? 'scale(0.95)' : 'scale(1)',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
          }}
          onMouseEnter={(e) => {
            if (!isTransitioning) {
              e.currentTarget.style.transform = 'scale(1.1) translateY(-2px)';
            }
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1) translateY(0)';
          }}
          aria-label="Next slide"
        >
          <div className="absolute inset-0 rounded-full bg-[#fe7d1a] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <ChevronRight className="relative z-10 w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 text-gray-700 group-hover:text-white transition-colors duration-300" />
        </button>
      </div>

      <style jsx>{`
        @keyframes pulse {
          0%, 100% {
            opacity: 0.4;
          }
          50% {
            opacity: 0.2;
          }
        }
      `}</style>
    </div>
  );
}