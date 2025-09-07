import React, { useRef, useEffect } from 'react';

interface ImageTrackItem {
  src: string;
  alt: string;
  href?: string;
}

interface ImageTrackProps {
  items: ImageTrackItem[];
}

const ImageTrack: React.FC<ImageTrackProps> = ({ items }) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const dragHappened = useRef(false);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    
    track.dataset.percentage = "0";
    track.dataset.prevPercentage = "0";
    track.dataset.mouseDownAt = "0";

    const handleOnDown = (e: MouseEvent | TouchEvent) => {
      const clientX = e instanceof MouseEvent ? e.clientX : e.touches[0].clientX;
      track.dataset.mouseDownAt = clientX.toString();
      dragHappened.current = false;
    };

    const handleOnUp = () => {
      if (!track.dataset.mouseDownAt || track.dataset.mouseDownAt === '0') return;
      track.dataset.mouseDownAt = '0';
      if (track.dataset.percentage) {
          track.dataset.prevPercentage = track.dataset.percentage;
      }
    };

    const handleOnMove = (e: MouseEvent | TouchEvent) => {
      if (!track.dataset.mouseDownAt || track.dataset.mouseDownAt === '0') return;

      dragHappened.current = true;

      const clientX = e instanceof MouseEvent ? e.clientX : e.touches[0].clientX;
      const mouseDownAt = parseFloat(track.dataset.mouseDownAt);
      const delta = mouseDownAt - clientX;
      const maxDelta = window.innerWidth;

      const percentage = (delta / maxDelta) * -100;
      const prevPercentage = parseFloat(track.dataset.prevPercentage || '0');
      
      let nextPercentage = prevPercentage + percentage;
      nextPercentage = Math.max(Math.min(nextPercentage, 0), -100);

      track.dataset.percentage = nextPercentage.toString();
      
      track.animate({
        transform: `translate(${nextPercentage}%, -50%)`
      }, { duration: 1200, fill: 'forwards', easing: 'ease-out' });
      
      const images = Array.from(track.querySelectorAll<HTMLImageElement>(".track-image"));
      for (const image of images) {
        image.animate({
          objectPosition: `${100 + nextPercentage}% center`
        }, { duration: 1200, fill: "forwards", easing: 'ease-out' });
      }
    };
    
    track.addEventListener('mousedown', handleOnDown);
    track.addEventListener('touchstart', handleOnDown, { passive: true });
    
    window.addEventListener('mouseup', handleOnUp);
    window.addEventListener('touchend', handleOnUp, { passive: true });
    window.addEventListener('mousemove', handleOnMove);
    window.addEventListener('touchmove', handleOnMove, { passive: true });
    
    return () => {
        track.removeEventListener('mousedown', handleOnDown);
        track.removeEventListener('touchstart', handleOnDown);
        window.removeEventListener('mouseup', handleOnUp);
        window.removeEventListener('touchend', handleOnUp);
        window.removeEventListener('mousemove', handleOnMove);
        window.removeEventListener('touchmove', handleOnMove);
    };
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
      if (dragHappened.current) {
          e.preventDefault();
      }
  };

  return (
    <div 
        ref={trackRef} 
        className="flex gap-4 absolute top-1/2 left-[50%] will-change-transform select-none cursor-grab active:cursor-grabbing"
    >
      {items.map((item, index) => (
         <a 
            key={index} 
            href={item.href || '#'} 
            target="_blank" 
            rel="noopener noreferrer" 
            className={`block relative focus-ring rounded-lg overflow-hidden group transition-transform duration-300 hover:scale-[1.02] ${!item.href ? 'pointer-events-none' : ''}`}
            draggable="false"
            onClick={item.href ? handleClick : (e) => e.preventDefault()}
            aria-label={item.alt}
         >
            <img
                src={item.src}
                alt={item.alt}
                className="track-image w-[40vmin] h-[56vmin] object-cover object-center pointer-events-none"
                draggable="false"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20"></div>
            <div className="absolute bottom-0 left-0 right-0 p-4">
                <h3 className="text-white text-xl font-bold" style={{ textShadow: '0 1px 4px rgba(0,0,0,0.8)' }}>
                    {item.alt}
                </h3>
            </div>
         </a>
      ))}
    </div>
  );
};

export default ImageTrack;
