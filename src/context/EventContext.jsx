import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import {
  loadEventsFromStorage,
  saveEventsToStorage,
  isStorageAvailable
} from '../utils/localStorage';

const EventContext = createContext();

export function EventProvider({ children }) {
  const [events, setEvents] = useState(() => {
    if (isStorageAvailable()) {
      return loadEventsFromStorage();
    }
    return [];
  });

  // Save to localStorage whenever events change
  useEffect(() => {
    if (isStorageAvailable()) {
      saveEventsToStorage(events);
    }
  }, [events]);

  const addEvent = useCallback((event) => {
    setEvents(prevEvents => [...prevEvents, { ...event, id: Date.now() }]);
  }, []);

  const deleteEvent = useCallback((eventId) => {
    setEvents(prevEvents => prevEvents.filter(event => event.id !== eventId));
  }, []);

  const updateEvent = useCallback((eventId, updatedEvent) => {
    setEvents(prevEvents => 
      prevEvents.map(event => 
        event.id === eventId ? { ...event, ...updatedEvent } : event
      )
    );
  }, []);

  const getEventsByDate = useCallback((date) => {
    return events.filter(event => event.date === date);
  }, [events]);

  const getEventById = useCallback((eventId) => {
    return events.find(event => event.id === eventId);
  }, [events]);

  return (
    <EventContext.Provider value={{
      events,
      addEvent,
      deleteEvent,
      updateEvent,
      getEventsByDate,
      getEventById
    }}>
      {children}
    </EventContext.Provider>
  );
}

export function useEvents() {
  const context = useContext(EventContext);
  if (!context) {
    throw new Error('useEvents must be used within an EventProvider');
  }
  return context;
}