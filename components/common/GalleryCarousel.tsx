import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';

interface CarouselItem {
  id: number;
  src: string;
  altKey: string;
}

interface GalleryCarouselProps {
  items: CarouselItem[];
  autoPlay?: boolean;
  interval?: number;
}

const PANEL_WIDTH = 220; // in pixels

const GalleryCarousel: React.FC<GalleryCarouselProps> = ({
  items,
  autoPlay = true,
  interval = 4000,
}) => {
  const { t } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [zoomedImage, setZoomedImage] = useState<string | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const intervalRef = useRef<number | null>(null);

  const goToNext = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex === items.length - 1 ? 0 : prevIndex + 1));
  }, [items.length]);

  const goToPrev = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? items.length - 1 : prevIndex - 1));
  }, [items.length]);

  const startAutoPlay = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = window.setInterval(goToNext, interval);
  }, [goToNext, interval]);

  const stopAutoPlay = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  useEffect(() => {
    if (autoPlay && !zoomedImage && !isHovered) {
      startAutoPlay();
    } else {
      stopAutoPlay();
    }
    return stopAutoPlay;
  }, [autoPlay, zoomedImage, isHovered, startAutoPlay]);
  
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
            setZoomedImage(null);
        }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);


  if (!items || items.length === 0) {
    return null;
  }

  const panelCount = items.length;
  // Dynamic radius calculation to prevent overlap
  const theta = (Math.PI * 2) / panelCount;
  const radius = (PANEL_WIDTH / 2) / Math.tan(theta / 2) * 1.2; // 1.2 adds a small gap

  return (
    <div className="w-full h-full"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
    >
        {/* Dynamic Background Image */}
        <div className="absolute inset-0 z-0">
            {items.map((item, index) => (
                <div key={`bg-${item.id}`} className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${index === currentIndex ? 'opacity-100' : 'opacity-0'}`}>
                    <img 
                        src={item.src} 
                        alt="" 
                        aria-hidden="true"
                        className="w-full h-full object-cover scale-110 blur-lg brightness-50" 
                    />
                </div>
            ))}
        </div>

        {/* Carousel Container */}
        <div 
            className={`relative w-full h-full flex items-center justify-center transition-all duration-500 ease-out ${zoomedImage ? 'transform scale-[0.8] blur-md brightness-75' : ''}`}
        >
            <div className="w-full h-full" style={{ perspective: '2000px' }}>
                <div
                    className="w-full h-full absolute transition-transform duration-700 ease-out"
                    style={{ transformStyle: 'preserve-3d', transform: `rotateY(${-currentIndex * (360 / panelCount)}deg)` }}
                >
                    {items.map((item, i) => {
                        const angle = i * (360 / panelCount);
                        const transform = `rotateY(${angle}deg) translateZ(${radius}px)`;
                        return (
                            <button
                                key={item.id}
                                onClick={() => setZoomedImage(item.src)}
                                tabIndex={zoomedImage ? -1 : 0}
                                aria-label={t(item.altKey as any, item.id)}
                                className="absolute w-[220px] h-[300px] left-1/2 top-1/2 -ml-[110px] -mt-[150px] rounded-2xl overflow-hidden border-2 border-white/20 bg-dark/50 shadow-lg group transition-all duration-300 cursor-pointer hover:border-primary focus-ring"
                                style={{ transform }}
                            >
                                <img src={item.src} alt={t(item.altKey as any, item.id)} className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                            </button>
                        );
                    })}
                </div>
            </div>
            
            {/* Controls */}
            <button
                onClick={goToPrev}
                className="absolute left-0 sm:left-4 md:left-8 z-20 bg-white/10 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/20 transition-colors focus-ring"
                aria-label="Previous photo"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
            </button>
            <button
                onClick={goToNext}
                className="absolute right-0 sm:right-4 md:right-8 z-20 bg-white/10 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/20 transition-colors focus-ring"
                aria-label="Next photo"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
            </button>
        </div>

        {/* Zoomed Image View (New Effect) */}
        <div 
            className={`gallery-zoom-container ${zoomedImage ? 'visible' : ''}`}
            onClick={() => setZoomedImage(null)}
            role="dialog"
            aria-modal="true"
            aria-hidden={!zoomedImage}
        >
            <div className="gallery-zoom-backdrop" />
            <div 
                className="gallery-zoom-content"
                onClick={(e) => e.stopPropagation()} // Prevent closing when clicking the image itself
            >
                <img 
                    src={zoomedImage || ''} 
                    alt="Powiększone zdjęcie z galerii" 
                />
                <button
                    onClick={() => setZoomedImage(null)}
                    className="absolute -top-4 -right-4 text-white bg-dark/70 backdrop-blur-sm rounded-full p-2 hover:bg-dark focus-ring transition-colors"
                    aria-label="Zamknij powiększenie"
                >
                     <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
        </div>
    </div>
  );
};

export default GalleryCarousel;