import React, { useState, useEffect, useCallback } from 'react';

interface CarouselItem {
  image: string;
  name: string;
  href?: string;
}

interface ThreeDCarouselProps {
  items: CarouselItem[];
  autoPlay?: boolean;
  interval?: number;
}

const ThreeDCarousel: React.FC<ThreeDCarouselProps> = ({
  items,
  autoPlay = true,
  interval = 4000,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToNext = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex === items.length - 1 ? 0 : prevIndex + 1));
  }, [items.length]);

  const goToPrev = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? items.length - 1 : prevIndex - 1));
  }, [items.length]);

  useEffect(() => {
    if (autoPlay) {
      const slideInterval = setInterval(goToNext, interval);
      return () => clearInterval(slideInterval);
    }
  }, [autoPlay, interval, goToNext]);

  if (!items || items.length === 0) {
    return null;
  }

  const panelCount = items.length;
  const theta = 360 / panelCount;
  const radius = panelCount > 6 ? 280 : 240; // Adjust radius for fewer items

  const handlePanelClick = (item: CarouselItem) => {
    if (item.href) {
      window.open(item.href, '_blank', 'noopener,noreferrer');
    }
  }

  return (
    <div className="relative w-full h-[450px] flex items-center justify-center overflow-hidden rounded-2xl">
        {/* Dynamic Background */}
        <div className="absolute inset-0 w-full h-full">
            {items.map((item, index) => (
                <div
                    key={`bg-${index}`}
                    className={`absolute inset-0 w-full h-full bg-cover bg-center transition-opacity duration-1000 ease-in-out ${index === currentIndex ? 'opacity-100' : 'opacity-0'}`}
                    style={{ 
                        backgroundImage: `url(${item.image})`,
                    }}
                />
            ))}
            {/* Darkening overlay for contrast */}
            <div className="absolute inset-0 bg-black/60"></div>
        </div>

        {/* Carousel Content (needs to be on top) */}
        <div className="relative z-10 w-full h-full flex items-center justify-center">
            {/* Scene and Carousel */}
            <div className="w-[200px] h-[300px]" style={{ perspective: '1200px' }}>
                <div
                    className="w-full h-full relative transition-transform duration-700 ease-in-out"
                    style={{ transformStyle: 'preserve-3d', transform: `rotateY(${-currentIndex * theta}deg)` }}
                >
                    {items.map((item, i) => {
                        const transform = `rotateY(${i * theta}deg) translateZ(${radius}px)`;
                        const isClickable = !!item.href;
                        return (
                            <div
                                key={`panel-${i}`}
                                onClick={() => isClickable && handlePanelClick(item)}
                                role={isClickable ? 'button' : 'figure'}
                                tabIndex={isClickable ? 0 : -1}
                                aria-label={item.name}
                                onKeyPress={(e) => isClickable && e.key === 'Enter' && handlePanelClick(item)}
                                className={`absolute w-[180px] h-[270px] left-[10px] top-[15px] rounded-2xl overflow-hidden border-2 border-white/20 bg-dark/50 shadow-lg group transition-all duration-300 ${isClickable ? 'cursor-pointer hover:border-primary focus-ring' : 'cursor-default'}`}
                                style={{ transform }}
                            >
                                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-4">
                                    <h3 className="text-white font-bold text-lg">{item.name}</h3>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
            
            {/* Controls */}
            <button
                onClick={goToPrev}
                className="absolute left-0 sm:left-10 md:left-20 z-20 bg-white/10 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/20 transition-colors focus-ring"
                aria-label="Previous partner"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
            </button>
            <button
                onClick={goToNext}
                className="absolute right-0 sm:right-10 md:right-20 z-20 bg-white/10 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/20 transition-colors focus-ring"
                aria-label="Next partner"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
            </button>
        </div>
    </div>
  );
};

export default ThreeDCarousel;