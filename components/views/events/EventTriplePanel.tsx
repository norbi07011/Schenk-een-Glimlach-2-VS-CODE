import React, { useState, useMemo } from 'react';
import { Event } from '../../../types';
import { useLanguage } from '../../../contexts/LanguageContext';
import Button from '../../common/Button';
import RSVPForm from './RSVPForm';

interface EventTriplePanelProps {
  events: Event[];
  selectedEventId: number | null;
  onSelectEvent: (id: number | null) => void;
}

const EventTriplePanel: React.FC<EventTriplePanelProps> = ({ events, selectedEventId, onSelectEvent }) => {
    const { t } = useLanguage();
    const [isRsvpModalOpen, setIsRsvpModalOpen] = useState(false);

    const selectedEvent = useMemo(() => {
        return events.find(event => event.id === selectedEventId);
    }, [selectedEventId, events]);

    const handleAddToCalendar = (event: Event | undefined) => {
        if (!event) return;

        const formatICSTime = (dateStr: string, time: 'start' | 'end'): string => {
            // Assuming event duration is 4 hours, e.g., 12:00-16:00
            const hour = time === 'start' ? '12' : '16';
            const date = new Date(`${dateStr}T${hour}:00:00`);
            return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
        };
        
        const startTime = formatICSTime(event.date, 'start');
        const endTime = formatICSTime(event.date, 'end');
        
        const icsContent = [
            'BEGIN:VCALENDAR',
            'VERSION:2.0',
            'BEGIN:VEVENT',
            `UID:${event.id}@fundacjago.nl`,
            `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z'}`,
            `DTSTART:${startTime}`,
            `DTEND:${endTime}`,
            `SUMMARY:${t(event.cityKey as any)} - FundacjaGO!`,
            `DESCRIPTION:${t(event.descriptionKey as any)}`,
            `LOCATION:${event.mapQuery}`,
            'END:VEVENT',
            'END:VCALENDAR'
        ].join('\n');

        const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `wydarzenie-${event.date}.ics`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    const handleSendEmail = (event: Event | undefined) => {
        if (!event) return;

        const subject = `Bilet na wydarzenie: ${t(event.cityKey as any)} (${t(event.dateKey as any)})`;
        const body = `
Cześć!

Oto Twój bilet na wydarzenie Fundacji GO!:

Wydarzenie: ${t(event.cityKey as any)}
Miejsce: ${t(event.venueKey as any)}
Data: ${t(event.dateKey as any)}
Opis: ${t(event.descriptionKey as any)}

Do zobaczenia!
Zespół Fundacji GO!
        `.trim();

        window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    };


    return (
        <>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-[70vh] bg-white/10 dark:bg-black/30 backdrop-blur-lg p-4 rounded-lg shadow-inner border border-white/20">
                {/* Left Panel: Event List */}
                <div className="lg:col-span-3 h-[70vh] overflow-y-auto pr-2 space-y-2">
                    {events.length > 0 ? events.map(event => (
                        <button
                            key={event.id}
                            onClick={() => onSelectEvent(event.id)}
                            className={`w-full text-left p-3 rounded-lg border-2 transition-all duration-200 focus-ring ${
                                event.id === selectedEventId
                                ? 'bg-primary/20 dark:bg-secondary/30 border-primary dark:border-secondary shadow-md'
                                : 'bg-gray-50/50 dark:bg-white/5 border-transparent hover:bg-gray-100/70 dark:hover:bg-white/10'
                            }`}
                        >
                            <p className="font-bold text-dark dark:text-light">{t(event.cityKey as any)}</p>
                            <p className="text-sm text-gray-600 dark:text-gray-300">{t(event.dateKey as any)}</p>
                        </button>
                    )) : (
                        <div className="text-center text-gray-200 p-4">
                            <p className="font-semibold">Brak wydarzeń.</p>
                            <p className="text-sm mt-1">Zmień filtry.</p>
                        </div>
                    )}
                </div>

                {/* Middle Panel: Event Details */}
                <div className="lg:col-span-6 flex items-center justify-center h-[70vh] overflow-y-auto">
                    {selectedEvent ? (
                        <div key={selectedEvent.id} className="fade-in-content w-full p-4">
                            <img
                                src={selectedEvent.imageUrl}
                                alt={`${t(selectedEvent.cityKey as any)} – ${t(selectedEvent.venueKey as any)}`}
                                className="w-full aspect-video object-cover rounded-2xl mb-4 shadow-lg"
                            />
                            <span className={`text-xs font-bold px-2 py-1 mb-2 rounded-full text-white ${selectedEvent.type === 'indoor' ? 'bg-blue-500' : 'bg-green-500'}`}>
                                {selectedEvent.type === 'indoor' ? t('eventFilterIndoor') : t('eventFilterOutdoor')}
                            </span>
                            <h2 className="text-4xl font-extrabold text-primary my-2" style={{ textShadow: '0 1px 5px rgba(0,0,0,0.5)' }}>{t(selectedEvent.cityKey as any)}</h2>
                            <p className="text-lg text-light font-semibold">{t(selectedEvent.venueKey as any)}</p>
                            <p className="mt-4 text-gray-300 max-w-lg">{t(selectedEvent.descriptionKey as any)}</p>
                        </div>
                    ) : (
                        <div className="text-center text-gray-200 p-8">
                            <p className="font-semibold text-2xl text-primary">Wybierz wydarzenie z listy</p>
                        </div>
                    )}
                </div>

                {/* Right Panel: Actions & Info */}
                <div className="lg:col-span-3 flex flex-col justify-center p-4 bg-gray-50/50 dark:bg-white/5 rounded-lg">
                    {selectedEvent && (
                        <div className="space-y-4 fade-in-content">
                            <h3 className="text-xl font-bold text-light">Szczegóły</h3>
                            <div>
                                <p className="text-sm font-semibold text-gray-400">Dostępność</p>
                                <p className="text-gray-200">♿️ 🧩 🚻</p>
                            </div>
                            <div>
                                <p className="text-sm font-semibold text-gray-400">Miejsca</p>
                                <p className="text-gray-200">
                                    {selectedEvent.spots ? `${t('eventSpotsAvailable')}: ${selectedEvent.spots}` : t('eventUnlimitedSpots')}
                                </p>
                            </div>
                            <div className="pt-4 border-t border-gray-600 space-y-3">
                                <Button 
                                    variant="secondary" 
                                    onClick={() => setIsRsvpModalOpen(true)}
                                    className="w-full"
                                >
                                    {t('eventRegisterChild')}
                                </Button>
                                <button onClick={() => handleAddToCalendar(selectedEvent)} className="w-full text-center text-sm py-2 px-3 rounded-lg bg-zinc-700 hover:bg-zinc-600 text-light font-semibold transition-colors focus-ring">
                                    {t('eventAddToCalendar')}
                                </button>
                                <button onClick={() => handleSendEmail(selectedEvent)} className="w-full text-center text-sm py-2 px-3 rounded-lg bg-zinc-700 hover:bg-zinc-600 text-light font-semibold transition-colors focus-ring">
                                    {t('eventSendTicket')}
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {isRsvpModalOpen && selectedEvent && (
                <RSVPForm event={selectedEvent} onClose={() => setIsRsvpModalOpen(false)} />
            )}
        </>
    );
};

export default EventTriplePanel;