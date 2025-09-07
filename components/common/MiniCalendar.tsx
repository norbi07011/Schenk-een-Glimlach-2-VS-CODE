import React, { useMemo, useState, useEffect } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { Event } from '../../types';

interface MiniCalendarProps {
  events: Event[];
  onDateSelect: (date: Date | null) => void;
  selectedDate: Date | null;
  activeDateForView?: Date | null;
}

const MiniCalendar: React.FC<MiniCalendarProps> = ({ events, onDateSelect, selectedDate, activeDateForView }) => {
  const { t } = useLanguage();
  const [displayDate, setDisplayDate] = useState(selectedDate || activeDateForView || new Date());

  const monthNames = useMemo(() => t('monthNames').split(','), [t]);
  const dayNames = useMemo(() => t('dayNames').split(',').map(d => d.substring(0, 2)), [t]);

  const eventDates = useMemo(() => new Set(events.map(e => e.date)), [events]);

  useEffect(() => {
    // When the viewed event changes, navigate the calendar to its month
    if (activeDateForView) {
        setDisplayDate(new Date(activeDateForView.getFullYear(), activeDateForView.getMonth(), 1));
    }
  }, [activeDateForView]);
  
  // Also navigate when a date filter is applied
  useEffect(() => {
     if (selectedDate) {
        setDisplayDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1));
     }
  }, [selectedDate]);


  const handlePrevMonth = () => {
    setDisplayDate(new Date(displayDate.getFullYear(), displayDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setDisplayDate(new Date(displayDate.getFullYear(), displayDate.getMonth() + 1, 1));
  };

  const year = displayDate.getFullYear();
  const month = displayDate.getMonth();
  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const startDay = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1; // Monday start
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const calendarDays = [];
  for (let i = 0; i < startDay; i++) {
    calendarDays.push(<div key={`empty-${i}`} className="p-1"></div>);
  }

  const today = new Date();
  for (let day = 1; day <= daysInMonth; day++) {
    const currentDate = new Date(year, month, day);
    const dateString = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    const isToday = today.toDateString() === currentDate.toDateString();
    const isSelected = selectedDate?.toDateString() === currentDate.toDateString();
    const isActiveForView = activeDateForView?.toDateString() === currentDate.toDateString();
    const hasEvent = eventDates.has(dateString);

    let buttonClasses = `w-8 h-8 rounded-full flex items-center justify-center text-sm transition-all duration-200 relative focus-ring `;
    
    if (isSelected) {
        buttonClasses += 'bg-primary text-white font-bold ';
    } else if (isActiveForView) {
        buttonClasses += 'ring-2 ring-offset-2 ring-primary ring-offset-slate-800 ';
    }
    
    if (!isSelected && isToday) {
        buttonClasses += 'text-primary ';
    } else if (!isSelected) {
        buttonClasses += 'text-gray-300 ';
    }

    if (!isSelected && hasEvent) {
         buttonClasses += 'bg-secondary/40 hover:bg-secondary/60 ';
    }
    
    if (!hasEvent) {
        buttonClasses += 'text-gray-600 cursor-not-allowed';
    } else {
        buttonClasses += 'cursor-pointer';
    }


    calendarDays.push(
      <div key={day} className="text-center text-light flex items-center justify-center">
        <button
            onClick={() => onDateSelect(currentDate)}
            disabled={!hasEvent}
            className={buttonClasses}
        >
            {day}
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white/5 p-4 rounded-lg mb-4">
      <div className="flex justify-between items-center mb-3">
        <button onClick={handlePrevMonth} className="p-1.5 rounded-full hover:bg-white/10 focus-ring" aria-label="Previous month">
            <svg className="w-4 h-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
        </button>
        <h3 className="text-base font-bold text-light">
            {monthNames[month]} {year}
        </h3>
        <button onClick={handleNextMonth} className="p-1.5 rounded-full hover:bg-white/10 focus-ring" aria-label="Next month">
            <svg className="w-4 h-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 text-center font-semibold text-gray-400 text-xs mb-2">
        {dayNames.map(d => <div key={d}>{d}</div>)}
      </div>

      <div className="grid grid-cols-7 gap-y-1">
        {calendarDays}
      </div>
    </div>
  );
};

export default MiniCalendar;