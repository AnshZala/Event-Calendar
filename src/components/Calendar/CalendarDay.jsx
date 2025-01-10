import React, { useState } from 'react';

const CalendarDay = ({ date, events, onClick, onDrop }) => {
  const [isDragOver, setIsDragOver] = useState(false);

  if (!date) return <div className="calendar-day empty"></div>;

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    const eventId = e.dataTransfer.getData('eventId');
    onDrop(eventId, date);
  };

  const isToday = new Date().toDateString() === date.toDateString();

  return (
    <div 
      className={`calendar-day ${isDragOver ? 'drag-over' : ''} ${isToday ? 'today' : ''}`}
      onClick={onClick}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <span className="day-number">{date.getDate()}</span>
      <div className="event-indicators">
        {events.map(event => (
          <div 
            key={event.id} 
            className={`event-indicator ${event.category}`}
            draggable
            onDragStart={(e) => {
              e.dataTransfer.setData('eventId', event.id.toString());
            }}
          >
            <span className="event-title">{event.title}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CalendarDay;