import React, { useState, useMemo, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import Section from '../components/common/Section';
import PageTitle from '../components/common/PageTitle';
import { events } from '../constants';
import { Event } from '../types';
import InteractiveMap from '../components/common/InteractiveMap';
import EventCalendar from '../components/common/EventCalendar';
import EventTriplePanel from '../components/views/events/EventTriplePanel';

type EventView = 'list' | 'calendar';

const EventsPage: React.FC = () => {
    const { t } = useLanguage();

    const [cityFilter, setCityFilter] = useState<string>('all');
    const [typeFilter, setTypeFilter] = useState<'all' | 'indoor' | 'outdoor'>('all');
    const [currentView, setCurrentView] = useState<EventView>('list');
    const [selectedEventId, setSelectedEventId] = useState<number | null>(null);

    const initialBgUrl = events.length > 0 ? events[0].imageUrl : '';
    const [bg1, setBg1] = useState({ url: initialBgUrl, opacity: initialBgUrl ? 1 : 0 });
    const [bg2, setBg2] = useState({ url: '', opacity: 0 });
    const [isBg1Active, setIsBg1Active] = useState(true);
    
    const cities = useMemo(() => {
        const cityKeys = [...new Set(events.map(event => event.cityKey))];
        return cityKeys.map(key => ({ key, name: t(key as any) }));
    }, [t]);

    const filteredEvents = useMemo(() => {
        return events.filter(event => {
            const cityMatch = cityFilter === 'all' || event.cityKey === cityFilter;
            const typeMatch = typeFilter === 'all' || event.type === typeFilter;
            return cityMatch && typeMatch;
        });
    }, [cityFilter, typeFilter, t]);
    
    useEffect(() => {
        if (filteredEvents.length > 0 && !filteredEvents.some(e => e.id === selectedEventId)) {
            setSelectedEventId(filteredEvents[0].id);
        } else if (filteredEvents.length === 0) {
            setSelectedEventId(null);
        }
    }, [filteredEvents]);

    const selectedEvent = useMemo(() => {
        return events.find(event => event.id === selectedEventId);
    }, [selectedEventId]);

    useEffect(() => {
        const newImage = selectedEvent?.imageUrl || (filteredEvents.length > 0 ? filteredEvents[0].imageUrl : '');
        
        const currentActiveUrl = isBg1Active ? bg1.url : bg2.url;
        if (newImage === currentActiveUrl) return;

        if (isBg1Active) {
            setBg2({ url: newImage, opacity: 1 });
            setBg1(prev => ({ ...prev, opacity: 0 }));
        } else {
            setBg1({ url: newImage, opacity: 1 });
            setBg2(prev => ({ ...prev, opacity: 0 }));
        }
        setIsBg1Active(prev => !prev);
    }, [selectedEvent, filteredEvents]);


    const getFilterButtonClass = (isActive: boolean) => 
        `px-4 py-2 text-sm font-semibold rounded-full transition-colors duration-300 focus-ring shadow-sm ${
            isActive 
                ? 'bg-secondary text-white' 
                : 'bg-white text-dark hover:bg-gray-200 border border-gray-200 dark:bg-gray-800 dark:text-light dark:hover:bg-gray-700 dark:border-gray-700'
        }`;
        
    const getViewButtonClass = (isActive: boolean) =>
      `px-5 py-2.5 text-sm font-medium rounded-lg transition-colors duration-300 focus-ring ${
        isActive
          ? 'bg-primary text-white shadow-md'
          : 'text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-zinc-700'
      }`;

    const handleEventSelectFromCalendar = (event: Event) => {
        setCityFilter(event.cityKey);
        setTypeFilter(event.type);
        setSelectedEventId(event.id);
        setCurrentView('list');
    };

    const renderCurrentView = () => {
        if (currentView === 'calendar') {
             return <EventCalendar events={events} onEventSelect={handleEventSelectFromCalendar} />;
        }

        return (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                <div className="lg:col-span-7">
                    <EventTriplePanel
                        events={filteredEvents}
                        selectedEventId={selectedEventId}
                        onSelectEvent={setSelectedEventId}
                    />
                </div>
                <div className="lg:col-span-5 h-[70vh] lg:sticky top-32">
                    <InteractiveMap
                        events={filteredEvents}
                        selectedEventId={selectedEventId}
                    />
                </div>
            </div>
        )
    };

    return (
        <Section className="relative bg-dark transition-all duration-500 overflow-hidden">
             {/* Background Layers */}
            <div className="absolute inset-0 z-0">
                <div
                    className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000"
                    style={{
                        backgroundImage: `url(${bg1.url})`,
                        filter: 'blur(8px) brightness(0.6)',
                        opacity: bg1.opacity,
                    }}
                />
                <div
                    className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000"
                    style={{
                        backgroundImage: `url(${bg2.url})`,
                        filter: 'blur(8px) brightness(0.6)',
                        opacity: bg2.opacity,
                    }}
                />
            </div>

            <div className="relative z-10">
                <PageTitle title={t('eventsTitle')} subtitle={t('eventsSubtitle')} />

                {/* Filter controls */}
                <div className="max-w-4xl mx-auto mb-10 p-6 bg-white/20 dark:bg-dark/50 backdrop-blur-lg rounded-2xl space-y-6 shadow-lg border border-white/30">
                    <div>
                        <h3 className="text-lg font-semibold text-center text-light mb-3">{t('eventFilterCity')}</h3>
                        <div className="flex justify-center flex-wrap gap-3">
                            <button onClick={() => setCityFilter('all')} className={getFilterButtonClass(cityFilter === 'all')}>
                                {t('eventFilterAll')}
                            </button>
                            {cities.map(city => (
                                <button key={city.key} onClick={() => setCityFilter(city.key)} className={getFilterButtonClass(cityFilter === city.key)}>
                                    {city.name}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-center text-light mb-3">{t('eventFilterType')}</h3>
                        <div className="flex justify-center flex-wrap gap-3">
                            <button onClick={() => setTypeFilter('all')} className={getFilterButtonClass(typeFilter === 'all')}>
                                {t('eventFilterAll')}
                            </button>
                            <button onClick={() => setTypeFilter('indoor')} className={getFilterButtonClass(typeFilter === 'indoor')}>
                                {t('eventFilterIndoor')}
                            </button>
                            <button onClick={() => setTypeFilter('outdoor')} className={getFilterButtonClass(typeFilter === 'outdoor')}>
                                {t('eventFilterOutdoor')}
                            </button>
                        </div>
                    </div>
                </div>

                {/* View Switcher */}
                <div className="flex justify-center mb-8">
                    <div className="inline-flex rounded-lg shadow-sm bg-gray-100 dark:bg-zinc-800 p-1.5 space-x-1">
                        <button onClick={() => setCurrentView('list')} className={getViewButtonClass(currentView === 'list')}>{t('eventViewList')}</button>
                        <button onClick={() => setCurrentView('calendar')} className={getViewButtonClass(currentView === 'calendar')}>{t('eventViewCalendar')}</button>
                    </div>
                </div>

                <div className="rounded-2xl p-0 md:p-2">
                     {renderCurrentView()}
                </div>
            </div>
        </Section>
    );
};

export default EventsPage;