import React from 'react';
import EventItem from './EventItem';
import '../../styles/EventList.css';

const EventList = ({ events, onDelete, onEdit }) => {
  const sortedEvents = [...events].sort((a, b) => {
    return a.startTime.localeCompare(b.startTime);
  });

  return (
    <div className="event-list">
      {sortedEvents.length === 0 ? (
        <div className="no-events">
          <p>No events scheduled for this day</p>
        </div>
      ) : (
        sortedEvents.map(event => (
          <EventItem
            key={event.id}
            event={event}
            onDelete={onDelete}
            onEdit={onEdit}
          />
        ))
      )}
    </div>
  );
};

export default EventList;