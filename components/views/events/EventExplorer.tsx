import React, { useState, useMemo, useEffect } from 'react';
import { Event, Page } from '../../../types';
import { useLanguage } from '../../../contexts/LanguageContext';
import Button from '../../common/Button';
import MiniCalendar from '../../common/MiniCalendar';

interface EventExplorerProps {
  filteredEvents: Event[];
  allEventsForCalendar: Event[];
  selectedDate: Date | null;
  onDateSelect: (date: Date | null) => void;
  navigate: (page: Page) => void;
}

const EventExplorer: React.FC<EventExplorerProps> = ({ filteredEvents, allEventsForCalendar, selectedDate, onDateSelect, navigate }) => {
  const { t } = useLanguage();
  const [selectedEventId, setSelectedEventId] = useState<number | null>(null);
  const [rsvpedEventIds, setRsvpedEventIds] = useState<Set<number>>(new Set());

  useEffect(() => {
    const isSelectedEventVisible = filteredEvents.some(e => e.id === selectedEventId);
    if (!isSelectedEventVisible && filteredEvents.length > 0) {
      setSelectedEventId(filteredEvents[0].id);
    } else if (selectedEventId === null && filteredEvents.length > 0) {
      setSelectedEventId(filteredEvents[0].id);
    } else if (filteredEvents.length === 0) {
        setSelectedEventId(null);
    }
  }, [filteredEvents, selectedEventId]);

  const selectedEvent = useMemo(() => {
    if (selectedEventId === null) return null;
    // Important: find in allEvents to show details even if filtered out by date
    return allEventsForCalendar.find(event => event.id === selectedEventId);
  }, [selectedEventId, allEventsForCalendar]);
  
  const handleEventSelect = (event: Event) => {
    setSelectedEventId(event.id);
  };
  
  const handleRsvp = (eventId: number) => {
    setRsvpedEventIds(prev => new Set(prev).add(eventId));
  };

  const isRsvped = selectedEvent ? rsvpedEventIds.has(selectedEvent.id) : false;

  // Helper to parse date string without timezone issues
  const parseDate = (dateString: string): Date | null => {
    const parts = dateString.split('-').map(p => parseInt(p, 10));
    if (parts.length === 3) {
      return new Date(parts[0], parts[1] - 1, parts[2]);
    }
    return null;
  }

  const activeDateForView = selectedEvent ? parseDate(selectedEvent.date) : null;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-[70vh]">
      {/* Left Panel: Calendar & Event List */}
      <div className="lg:col-span-4 xl:col-span-3 flex flex-col">
        <MiniCalendar 
            events={allEventsForCalendar}
            selectedDate={selectedDate}
            onDateSelect={onDateSelect}
            activeDateForView={activeDateForView}
        />
        {selectedDate && (
             <button 
                onClick={() => onDateSelect(null)}
                className="w-full text-center text-sm py-2 px-3 mb-4 rounded-lg bg-primary/80 hover:bg-primary text-white font-semibold transition-colors focus-ring"
            >
                Pokaż wszystkie terminy
            </button>
        )}
        <div className="space-y-2 flex-grow overflow-y-auto pr-2 min-h-[200px]">
          {filteredEvents.length > 0 ? filteredEvents.map(event => (
            <button
              key={event.id}
              onClick={() => handleEventSelect(event)}
              aria-current={event.id === selectedEventId}
              className={`w-full text-left p-3 rounded-lg border-2 transition-all duration-300 focus-ring ${
                event.id === selectedEventId
                  ? 'bg-secondary/20 border-secondary shadow-lg'
                  : 'bg-white/5 border-transparent hover:bg-white/10'
              }`}
            >
              <p className="font-bold text-light">{t(event.cityKey as any)}</p>
              <p className="text-sm text-gray-400">{t(event.dateKey as any)}</p>
            </button>
          )) : (
             <div className="text-center text-gray-400 p-4">
                <p className="font-semibold">Brak wydarzeń.</p>
                <p className="text-sm mt-1">Zmień filtry lub wyczyść datę.</p>
            </div>
          )}
        </div>
      </div>

      {/* Right Panel: Event Details */}
      <div className="lg:col-span-8 xl:col-span-9 flex items-center justify-center">
        {selectedEvent ? (
          <div key={selectedEvent.id} className="fade-in-content w-full flex flex-col lg:flex-row items-center gap-8 text-light">
             {/* Image with Glow */}
            <div className="w-full lg:w-2/5 flex-shrink-0">
                <img
                    src={selectedEvent.imageUrl}
                    alt={`${t(selectedEvent.cityKey as any)} – ${t(selectedEvent.venueKey as any)}`}
                    className="w-full aspect-square object-cover rounded-2xl event-image-glow"
                />
            </div>
             {/* Details */}
            <div className="w-full lg:w-3/5">
                <span className={`self-start text-xs font-bold px-2 py-1 mb-2 rounded-full text-white ${selectedEvent.type === 'indoor' ? 'bg-blue-500' : 'bg-green-500'}`}>
                    {selectedEvent.type === 'indoor' ? t('eventFilterIndoor') : t('eventFilterOutdoor')}
                </span>
                <h2 className="text-4xl font-extrabold text-primary my-2">{t(selectedEvent.cityKey as any)}</h2>
                <p className="text-lg text-gray-300 font-semibold">{t(selectedEvent.venueKey as any)}</p>
                <p className="mt-4 text-gray-400 max-w-lg">{t(selectedEvent.descriptionKey as any)}</p>
                 <div className="flex items-center justify-between text-sm text-gray-500 my-4">
                    <span>♿️ 🧩 🚻</span>
                    <span>
                        {selectedEvent.spots ? `${t('eventSpotsAvailable')}: ${selectedEvent.spots}` : t('eventUnlimitedSpots')}
                    </span>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 mt-6">
                    <Button 
                        variant="secondary" 
                        onClick={() => handleRsvp(selectedEvent.id)}
                        disabled={isRsvped}
                        className={isRsvped ? 'cursor-not-allowed !bg-green-600' : ''}
                    >
                        {isRsvped ? 'Zapisano!' : t('eventRegisterChild')}
                    </Button>
                    <Button variant="primary" onClick={() => navigate('book-event')}>{t('eventProposeCity')}</Button>
                </div>
            </div>
          </div>
        ) : (
             <div className="text-center text-gray-200 p-8 rounded-lg min-h-[400px] flex flex-col justify-center items-center">
                <p className="font-semibold text-2xl text-primary">Brak wydarzeń spełniających kryteria.</p>
                <p className="mt-2 text-gray-300">Spróbuj zmienić filtry, aby znaleźć inne wydarzenia.</p>
            </div>
        )}
      </div>
    </div>
  );
};

export default EventExplorer;