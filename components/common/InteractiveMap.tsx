import React, { useState, useEffect, useMemo } from 'react';
import { Event } from '../../types';
import { useLanguage } from '../../contexts/LanguageContext';

interface InteractiveMapProps {
  events: Event[];
  selectedEventId: number | null;
}

const InteractiveMap: React.FC<InteractiveMapProps> = ({ events, selectedEventId }) => {
    const { t } = useLanguage();
    const [mapUrl, setMapUrl] = useState<string>('');
    
    const selectedEvent = useMemo(() => {
        return events.find(e => e.id === selectedEventId);
    }, [selectedEventId, events]);

    useEffect(() => {
        if (selectedEvent) {
            const { lat, lon } = selectedEvent.coordinates;
            // Create a small bounding box for a nice zoom level on the selected marker
            const bbox = `${lon - 0.02},${lat - 0.02},${lon + 0.02},${lat + 0.02}`;
            const url = `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${lat},${lon}`;
            setMapUrl(url);
        } else if (events.length > 0) {
             // If nothing is selected, create a bounding box that contains all filtered events
             const lons = events.map(e => e.coordinates.lon);
             const lats = events.map(e => e.coordinates.lat);
             const minLon = Math.min(...lons);
             const maxLon = Math.max(...lons);
             const minLat = Math.min(...lats);
             const maxLat = Math.max(...lats);
             const bbox = `${minLon - 0.05},${minLat - 0.05},${maxLon + 0.05},${maxLat + 0.05}`; // Add padding
             const url = `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik`;
             setMapUrl(url);
        }
        else {
            // Default view of the Netherlands if no events are available
            const url = `https://www.openstreetmap.org/export/embed.html?bbox=3.31,50.8,7.22,53.55&layer=mapnik`;
            setMapUrl(url);
        }
    }, [selectedEvent, events]);

    return (
        <div className="relative w-full h-full bg-slate-200 dark:bg-slate-800 rounded-lg overflow-hidden border-2 border-primary/20">
            {mapUrl ? (
                <iframe
                    key={mapUrl} // Re-mounts the iframe when URL changes, ensuring it updates
                    title="Event Map"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    src={mapUrl}
                ></iframe>
            ) : (
                <div className="flex items-center justify-center h-full">
                    <p className="text-gray-500 dark:text-gray-400">{t('eventMapPrompt')}</p>
                </div>
            )}
        </div>
    );
};

export default InteractiveMap;
