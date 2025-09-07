import { useState, useEffect, useRef } from 'react';

export const useAnimateOnScroll = (options?: IntersectionObserverInit) => {
    const ref = useRef<HTMLElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            // We only want to set it to true, and never back to false
            if (entry.isIntersecting) {
                setIsVisible(true);
                // Stop observing once it's visible
                if (ref.current) {
                    observer.unobserve(ref.current);
                }
            }
        }, options);

        const currentRef = ref.current;
        if (currentRef) {
            observer.observe(currentRef);
        }

        return () => {
            if (currentRef) {
                observer.unobserve(currentRef);
            }
        };
    }, [options]);

    return { ref, isVisible };
};
