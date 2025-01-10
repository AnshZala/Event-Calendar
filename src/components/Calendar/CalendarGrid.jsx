import React from 'react';
import CalendarDay from './CalendarDay';
import { generateCalendarDays } from '../../utils/dateUtils';
import { useEvents } from '../../context/EventContext';

const CalendarGrid = ({ currentDate, onDateClick, onEventDrop }) => {
  const { getEventsByDate } = useEvents();
  const days = generateCalendarDays(
    currentDate.getFullYear(),
    currentDate.getMonth()
  );

  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="calendar-grid">
      <div className="weekdays-header">
        {weekDays.map(day => (
          <div key={day} className="weekday">{day}</div>
        ))}
      </div>
      <div className="days-grid">
        {days.map((date, index) => (
          <CalendarDay
            key={index}
            date={date}
            events={date ? getEventsByDate(date.toISOString().split('T')[0]) : []}
            onClick={() => date && onDateClick(date)}
            onDrop={onEventDrop}
          />
        ))}
      </div>
    </div>
  );
};

export default CalendarGrid;