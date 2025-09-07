
import React, { useState, useEffect, useCallback } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { TeamMember } from '../../types';

interface TeamCarouselProps {
  members: TeamMember[];
}

const TeamCarousel: React.FC<TeamCarouselProps> = ({ members }) => {
    const { t } = useLanguage();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);

    const panelCount = members.length;
    const theta = 360 / panelCount;
    const radius = 320; 
    
    const activeMember = members[currentIndex];
    const rotation = -currentIndex * theta;

    const rotateCarousel = useCallback((direction: 'next' | 'prev') => {
        setCurrentIndex(prevIndex => {
            if (direction === 'next') {
                return (prevIndex + 1) % panelCount;
            } else {
                return (prevIndex - 1 + panelCount) % panelCount;
            }
        });
    }, [panelCount]);
    
    useEffect(() => {
        let intervalId: ReturnType<typeof setInterval>;
        if (!isHovered) {
            intervalId = setInterval(() => rotateCarousel('next'), 4000);
        }
        return () => clearInterval(intervalId);
    }, [isHovered, rotateCarousel]);

    return (
        <div 
            className="relative w-full flex flex-col items-center justify-center text-white space-y-16"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Background */}
            <div className="absolute inset-0 z-0 overflow-hidden">
                 <div 
                    className="absolute -inset-1/2 bg-gradient-conic from-primary via-dark to-secondary opacity-20"
                    style={{ animation: 'aurora 20s linear infinite' }}
                 ></div>
            </div>

            {/* Carousel Section */}
            <div className="relative w-full h-[350px] md:h-[450px]">
                <div 
                    className="w-full h-full"
                    style={{ perspective: '1500px' }}
                >
                    <div
                        className="w-full h-full absolute transition-transform duration-700 ease-in-out"
                        style={{ transformStyle: 'preserve-3d', transform: `rotateY(${rotation}deg)` }}
                    >
                        {members.map((member, i) => {
                             const isCurrent = i === currentIndex;
                             return (
                                <div
                                    key={member.id}
                                    className="absolute w-60 h-80 left-1/2 top-1/2 -ml-32 -mt-40 group transition-all duration-300"
                                    style={{ transform: `rotateY(${i * theta}deg) translateZ(${radius}px)` }}
                                >
                                    <div className={`relative w-full h-full rounded-2xl overflow-hidden transition-all duration-500 ${isCurrent ? 'scale-110' : 'scale-90 opacity-60'}`}>
                                        <div className="absolute inset-0 bg-black/20 backdrop-blur-xl border border-white/10 rounded-2xl"></div>
                                        <img
                                            src={member.imageUrl}
                                            alt={member.name}
                                            className="w-full h-full object-cover"
                                        />
                                         <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                                    </div>
                                </div>
                             )
                        })}
                    </div>
                </div>

                {/* Controls */}
                <button
                    onClick={() => rotateCarousel('prev')}
                    className="absolute top-1/2 -translate-y-1/2 left-0 sm:left-10 z-10 bg-white/10 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/20 transition-all focus-ring"
                    aria-label="Previous member"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                </button>
                <button
                    onClick={() => rotateCarousel('next')}
                    className="absolute top-1/2 -translate-y-1/2 right-0 sm:right-10 z-10 bg-white/10 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/20 transition-all focus-ring"
                    aria-label="Next member"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </button>
            </div>

            {/* Information Panel */}
            <div className="relative z-10 text-center w-full max-w-lg min-h-[160px]">
                <div key={activeMember.id} className="fade-in-content">
                    <h2 className="text-3xl md:text-4xl font-extrabold text-white">{activeMember.name}</h2>
                    <h3 className="text-xl md:text-2xl font-semibold text-primary mt-1">{t(activeMember.roleKey as any)}</h3>
                    <div className="mt-4 flex justify-center items-center space-x-6 text-gray-300">
                         {activeMember.email && (
                            <a href={`mailto:${activeMember.email}`} className="flex items-center gap-2 hover:text-white transition-colors focus-ring rounded-md p-1">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" /><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" /></svg>
                                <span className="text-sm">{activeMember.email}</span>
                            </a>
                        )}
                         {activeMember.phone && (
                            <a href={`tel:${activeMember.phone}`} className="flex items-center gap-2 hover:text-white transition-colors focus-ring rounded-md p-1">
                               <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.518.759a11.03 11.03 0 004.991 4.991l.759-1.518a1 1 0 011.06-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" /></svg>
                                <span className="text-sm">{activeMember.phone}</span>
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TeamCarousel;
