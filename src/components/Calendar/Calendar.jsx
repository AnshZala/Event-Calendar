import React, { useState } from 'react';
import CalendarHeader from './CalendarHeader';
import CalendarGrid from './CalendarGrid';
import EventModal from '../Modal/Modal';
import { useEvents } from '../../context/EventContext';
import { exportToJSON, exportToCSV } from '../../utils/exportUtils';
import '../../styles/Calendar.css';

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { events, updateEvent } = useEvents();

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const handleDateClick = (date) => {
    setSelectedDate(date);
    setIsModalOpen(true);
  };

  const handleEventDrop = (eventId, newDate) => {
    const event = events.find(e => e.id.toString() === eventId);
    if (event) {
      const eventDate = new Date(event.date);
      const targetDate = new Date(newDate);
      
      if (eventDate.getMonth() === targetDate.getMonth() && 
          eventDate.getFullYear() === targetDate.getFullYear()) {
        updateEvent(parseInt(eventId), {
          ...event,
          date: newDate.toISOString().split('T')[0]
        });
      } else {
        alert('Events can only be dragged within the same month');
      }
    }
  };

  const handleExport = (format) => {
    const currentMonthEvents = events.filter(event => {
      const eventDate = new Date(event.date);
      return eventDate.getMonth() === currentDate.getMonth() &&
             eventDate.getFullYear() === currentDate.getFullYear();
    });

    if (format === 'json') {
      exportToJSON(currentMonthEvents, `events_${currentDate.getMonth() + 1}_${currentDate.getFullYear()}`);
    } else if (format === 'csv') {
      exportToCSV(currentMonthEvents, `events_${currentDate.getMonth() + 1}_${currentDate.getFullYear()}`);
    }
  };

  return (
    <div className="calendar">
      <div className="calendar-actions">
        <CalendarHeader 
          currentDate={currentDate}
          onPrevMonth={handlePrevMonth}
          onNextMonth={handleNextMonth}
        />
        <div className="export-buttons">
          <button onClick={() => handleExport('json')}>Export JSON</button>
          <button onClick={() => handleExport('csv')}>Export CSV</button>
        </div>
      </div>
      <CalendarGrid 
        currentDate={currentDate}
        onDateClick={handleDateClick}
        onEventDrop={handleEventDrop}
      />
      {isModalOpen && (
        <EventModal
          date={selectedDate}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};

export default Calendar;