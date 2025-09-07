import React, { useState, useMemo } from 'react';
import { Event } from '../../types';
import { useLanguage } from '../../contexts/LanguageContext';

interface EventCalendarProps {
  events: Event[];
  onEventSelect: (event: Event) => void;
}

const EventCalendar: React.FC<EventCalendarProps> = ({ events, onEventSelect }) => {
  const { t } = useLanguage();
  const [currentDate, setCurrentDate] = useState(new Date());
  const monthNames = useMemo(() => t('monthNames').split(','), [t]);
  const dayNames = useMemo(() => t('dayNames').split(','), [t]);
  
  const eventsByDate = useMemo(() => {
    const map = new Map<string, Event[]>();
    events.forEach(event => {
      const date = event.date;
      if (!map.has(date)) {
        map.set(date, []);
      }
      map.get(date)!.push(event);
    });
    return map;
  }, [events]);

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };
  
  const renderCalendarGrid = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1).getDay(); // 0=Sun, 1=Mon
    const startDay = firstDay === 0 ? 6 : firstDay - 1; // Adjust for Monday start
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const grid = [];
    // empty cells before month starts
    for (let i = 0; i < startDay; i++) {
      grid.push(<div key={`empty-${i}`} className="border-r border-b border-gray-200 dark:border-zinc-700"></div>);
    }

    const today = new Date();
    // month days
    for (let day = 1; day <= daysInMonth; day++) {
        const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        const dayEvents = eventsByDate.get(dateStr) || [];
        const isToday = today.getFullYear() === year && today.getMonth() === month && today.getDate() === day;

        grid.push(
            <div key={day} className={`p-2 border-r border-b border-zinc-700 min-h-[120px] flex flex-col ${isToday ? 'bg-primary/10' : ''}`}>
                <div className={`font-semibold ${isToday ? 'text-primary' : 'text-light'}`}>{day}</div>
                <div className="mt-1 space-y-1 flex-grow overflow-hidden">
                    {dayEvents.slice(0, 2).map(event => (
                        <button key={event.id} onClick={() => onEventSelect(event)} className="w-full text-left text-xs p-1 rounded-md bg-secondary/80 text-white hover:bg-secondary focus-ring transition-colors truncate">
                           {t(event.cityKey as any)}
                        </button>
                    ))}
                    {dayEvents.length > 2 && <div className="text-xs text-gray-400 mt-1">+{dayEvents.length - 2} więcej</div>}
                </div>
            </div>
        );
    }
    return grid;
  };

  return (
    <div className="bg-white/10 dark:bg-black/30 backdrop-blur-lg rounded-lg shadow-lg p-4 border border-white/20">
      <div className="flex justify-between items-center mb-4">
        <button onClick={handlePrevMonth} className="p-2 rounded-full hover:bg-zinc-800 focus-ring" aria-label="Previous Month">
            <svg className="w-6 h-6 text-light" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"/></svg>
        </button>
        <h2 className="text-xl font-bold text-light">{monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}</h2>
        <button onClick={handleNextMonth} className="p-2 rounded-full hover:bg-zinc-800 focus-ring" aria-label="Next Month">
            <svg className="w-6 h-6 text-light" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/></svg>
        </button>
      </div>
      <div className="grid grid-cols-7 text-center font-semibold text-gray-400">
        {dayNames.map(day => <div key={day} className="py-2 border-b-2 border-zinc-700">{day}</div>)}
      </div>
      <div className="grid grid-cols-7 border-l border-t border-zinc-700">
        {renderCalendarGrid()}
      </div>
    </div>
  );
};

export default EventCalendar;