import React, { useState, useEffect } from 'react';
import EventForm from '../Events/EventForm';
import EventList from '../Events/EventList';
import { useEvents } from '../../context/EventContext';
import '../../styles/Modal.css';

const Modal = ({ date, isOpen, onClose }) => {
  const { addEvent, deleteEvent, updateEvent, getEventsByDate } = useEvents();
  const [editingEvent, setEditingEvent] = useState(null);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    if (date) {
      const dateEvents = getEventsByDate(date.toISOString().split('T')[0]);
      setEvents(dateEvents);
    }
  }, [date, getEventsByDate]);

  const handleAddEvent = (eventData) => {
    addEvent(eventData);
    setEvents(getEventsByDate(date.toISOString().split('T')[0]));
  };

  const handleDeleteEvent = (eventId) => {
    deleteEvent(eventId);
    setEvents(getEventsByDate(date.toISOString().split('T')[0]));
  };

  const handleEditEvent = (event) => {
    setEditingEvent(event);
  };

  const handleUpdateEvent = (updatedEventData) => {
    updateEvent(editingEvent.id, updatedEventData);
    setEditingEvent(null);
    setEvents(getEventsByDate(date.toISOString().split('T')[0]));
  };

  const handleClose = (e) => {
    if (e.target.classList.contains('modal-overlay')) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{date.toLocaleDateString(undefined, { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}</h2>
          <button className="close-button" onClick={onClose}>&times;</button>
        </div>
        
        <div className="modal-body">
          {editingEvent ? (
            <>
              <h3>Edit Event</h3>
              <EventForm 
                date={date}
                initialData={editingEvent}
                onSubmit={handleUpdateEvent}
              />
              <button 
                className="cancel-edit-button"
                onClick={() => setEditingEvent(null)}
              >
                Cancel Edit
              </button>
            </>
          ) : (
            <>
              <h3>Add New Event</h3>
              <EventForm date={date} onSubmit={handleAddEvent} />
            </>
          )}

          <div className="events-section">
            <h3>Events for this day</h3>
            <EventList
              events={events}
              onDelete={handleDeleteEvent}
              onEdit={handleEditEvent}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;