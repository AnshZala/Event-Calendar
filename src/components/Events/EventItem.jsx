import React, { useState } from 'react';

const EventItem = ({ event, onDelete, onEdit }) => {
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = () => {
    setIsDeleting(true);
    // Add confirmation dialog
    if (window.confirm('Are you sure you want to delete this event?')) {
      onDelete(event.id);
    }
    setIsDeleting(false);
  };

  const formatTime = (time) => {
    return new Date(`2000-01-01T${time}`).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className={`event-item ${event.category}`}>
      <div className="event-header">
        <h3>{event.title}</h3>
        <div className="event-actions">
          <button 
            className="edit-btn"
            onClick={() => onEdit(event)}
            aria-label="Edit event"
          >
            <i className="edit-icon">✎</i>
          </button>
          <button 
            className={`delete-btn ${isDeleting ? 'deleting' : ''}`}
            onClick={handleDelete}
            disabled={isDeleting}
            aria-label="Delete event"
          >
            <i className="delete-icon">×</i>
          </button>
        </div>
      </div>

      <div className="event-time">
        {formatTime(event.startTime)} - {formatTime(event.endTime)}
      </div>

      {event.description && (
        <div className="event-description">
          {showFullDescription ? (
            <>
              <p>{event.description}</p>
              <button 
                className="toggle-description"
                onClick={() => setShowFullDescription(false)}
              >
                Show Less
              </button>
            </>
          ) : (
            <>
              <p>
                {event.description.length > 100
                  ? `${event.description.substring(0, 100)}...`
                  : event.description}
              </p>
              {event.description.length > 100 && (
                <button 
                  className="toggle-description"
                  onClick={() => setShowFullDescription(true)}
                >
                  Show More
                </button>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default EventItem;