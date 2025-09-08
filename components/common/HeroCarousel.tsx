import React, { useState, useEffect, useCallback } from 'react';

interface HeroCarouselProps {
  images: string[];
  autoPlay?: boolean;
  interval?: number;
}

const HeroCarousel: React.FC<HeroCarouselProps> = ({
  images,
  autoPlay = true,
  interval = 6000,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  }, [images.length]);

  const goToNext = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  }, [images.length]);

  const goToSlide = (slideIndex: number) => {
    setCurrentIndex(slideIndex);
  };

  useEffect(() => {
    if (autoPlay) {
      const slideInterval = setInterval(goToNext, interval);
      return () => clearInterval(slideInterval);
    }
  }, [autoPlay, interval, goToNext]);

  if (!images || images.length === 0) {
    return null;
  }

  const panelCount = images.length;
  const theta = 360 / panelCount;
  const radius = 300; // Increased to accommodate 12 panels and prevent overlap

  return (
    <>
      {/* Part 1: Full-screen Background Carousel */}
  <div className="absolute inset-0 w-full h-full -z-10 pointer-events-none">
        {images.map((image, index) => (
          <div
            key={`bg-${index}`}
            className={`hero-bg-slide ${index === currentIndex ? 'active' : ''}`}
            aria-hidden={index !== currentIndex}
          >
            <img src={image} alt={`Background slide ${index + 1}`} />
          </div>
        ))}
        {/* Gradient overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-dark via-dark/60 to-transparent" />
      </div>
      
      {/* Part 2: 3D Panel Carousel (visible on lg screens and up) */}
      <div className="hero-3d-panel-container">
        <div className="hero-3d-scene">
          <div
            className="hero-3d-carousel"
            style={{ transform: `rotateY(${-currentIndex * theta}deg)` }}
          >
            {images.map((image, i) => {
                const transform = `rotateY(${i * theta}deg) translateZ(${radius}px)`;
                return (
                    <button
                        key={`panel-${i}`}
                        onClick={() => goToSlide(i)}
                        className="hero-3d-panel"
                        aria-label={`Go to slide ${i + 1}`}
                        style={{ '--transform-original': transform, transform } as React.CSSProperties}
                    >
                        <img src={image} alt={`Panel image ${i + 1}`} />
                    </button>
                );
            })}
          </div>
        </div>
      </div>

      {/* Part 3: Navigation Arrows */}
      <button
        onClick={goToPrevious}
        className="hero-carousel-nav prev-btn focus-ring"
        aria-label="Previous background"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        onClick={goToNext}
        className="hero-carousel-nav next-btn focus-ring"
        aria-label="Next background"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </>
  );
};

export default HeroCarousel;