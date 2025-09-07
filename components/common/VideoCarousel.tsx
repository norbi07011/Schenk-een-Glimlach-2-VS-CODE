import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { GalleryVideo } from '../../types';

interface VideoCarouselProps {
  items: GalleryVideo[];
  autoPlay?: boolean;
  interval?: number;
}

interface ZoomedVideo {
    src: string;
    posterSrc: string;
}

const PANEL_WIDTH = 220; // in pixels

const VideoCarousel: React.FC<VideoCarouselProps> = ({
  items,
  autoPlay = true,
  interval = 5000, // Longer interval for videos
}) => {
  const { t } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [zoomedVideo, setZoomedVideo] = useState<ZoomedVideo | null>(null);
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
    if (autoPlay && !zoomedVideo && !isHovered) {
      startAutoPlay();
    } else {
      stopAutoPlay();
    }
    return stopAutoPlay;
  }, [autoPlay, zoomedVideo, isHovered, startAutoPlay]);
  
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
            setZoomedVideo(null);
        }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);


  if (!items || items.length === 0) {
    return null;
  }

  const panelCount = items.length;
  const theta = (Math.PI * 2) / panelCount;
  // Dynamic radius calculation to prevent overlap
  const radius = (PANEL_WIDTH / 2) / Math.tan(theta / 2) * 1.3; // 1.3 adds a small gap

  return (
    <div className="w-full h-full"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
    >
        {/* Dynamic Background Video */}
        <div className="absolute inset-0 z-0">
             {items.map((item, index) => (
                <div key={`bg-vid-${item.id}`} className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${index === currentIndex ? 'opacity-100' : 'opacity-0'}`}>
                    <video 
                        key={item.src}
                        src={item.src} 
                        poster={item.posterSrc}
                        className="w-full h-full object-cover scale-110 blur-lg brightness-50" 
                        muted 
                        loop 
                        autoPlay 
                        playsInline
                        aria-hidden="true"
                    />
                </div>
            ))}
        </div>

        {/* Carousel Container */}
        <div 
            className={`relative w-full h-full flex items-center justify-center transition-all duration-500 ease-out ${zoomedVideo ? 'transform scale-[0.8] blur-md brightness-75' : ''}`}
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
                                onClick={() => setZoomedVideo({src: item.src, posterSrc: item.posterSrc})}
                                tabIndex={zoomedVideo ? -1 : 0}
                                aria-label={t(item.altKey as any, item.id)}
                                className="absolute w-[220px] h-[300px] left-1/2 top-1/2 -ml-[110px] -mt-[150px] rounded-2xl overflow-hidden border-2 border-white/20 bg-dark/50 shadow-lg group transition-all duration-300 cursor-pointer hover:border-primary focus-ring"
                                style={{ transform }}
                            >
                                <video 
                                    src={item.src} 
                                    poster={item.posterSrc}
                                    className="w-full h-full object-cover" 
                                    muted 
                                    loop 
                                    autoPlay 
                                    playsInline
                                />
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
                aria-label="Previous video"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
            </button>
            <button
                onClick={goToNext}
                className="absolute right-0 sm:right-4 md:right-8 z-20 bg-white/10 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/20 transition-colors focus-ring"
                aria-label="Next video"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
            </button>
        </div>

        {/* Zoomed Video View */}
        <div 
            className={`gallery-zoom-container ${zoomedVideo ? 'visible' : ''}`}
            onClick={() => setZoomedVideo(null)}
            role="dialog"
            aria-modal="true"
            aria-hidden={!zoomedVideo}
        >
            <div className="gallery-zoom-backdrop" />
            <div 
                className="gallery-zoom-content"
                onClick={(e) => e.stopPropagation()}
            >
                {zoomedVideo && (
                    <video 
                        src={zoomedVideo.src} 
                        poster={zoomedVideo.posterSrc}
                        className="max-w-[80vw] max-h-[85vh] object-contain rounded-lg shadow-2xl"
                        controls
                        autoPlay
                        loop
                    />
                )}
                <button
                    onClick={() => setZoomedVideo(null)}
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

export default VideoCarousel;