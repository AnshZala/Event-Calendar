const EVENTS_STORAGE_KEY = 'calendarEvents';

export const loadEventsFromStorage = () => {
  try {
    const storedEvents = localStorage.getItem(EVENTS_STORAGE_KEY);
    return storedEvents ? JSON.parse(storedEvents) : [];
  } catch (error) {
    console.error('Error loading events from localStorage:', error);
    return [];
  }
};

export const saveEventsToStorage = (events) => {
  try {
    localStorage.setItem(EVENTS_STORAGE_KEY, JSON.stringify(events));
    return true;
  } catch (error) {
    console.error('Error saving events to localStorage:', error);
    return false;
  }
};

export const clearEventsFromStorage = () => {
  try {
    localStorage.removeItem(EVENTS_STORAGE_KEY);
    return true;
  } catch (error) {
    console.error('Error clearing events from localStorage:', error);
    return false;
  }
};

export const addEventToStorage = (event) => {
  try {
    const events = loadEventsFromStorage();
    events.push({ ...event, id: Date.now() });
    saveEventsToStorage(events);
    return true;
  } catch (error) {
    console.error('Error adding event to localStorage:', error);
    return false;
  }
};

export const removeEventFromStorage = (eventId) => {
  try {
    const events = loadEventsFromStorage();
    const filteredEvents = events.filter(event => event.id !== eventId);
    saveEventsToStorage(filteredEvents);
    return true;
  } catch (error) {
    console.error('Error removing event from localStorage:', error);
    return false;
  }
};

export const updateEventInStorage = (eventId, updatedEvent) => {
  try {
    const events = loadEventsFromStorage();
    const updatedEvents = events.map(event => 
      event.id === eventId ? { ...event, ...updatedEvent } : event
    );
    saveEventsToStorage(updatedEvents);
    return true;
  } catch (error) {
    console.error('Error updating event in localStorage:', error);
    return false;
  }
};

// Helper function to check if localStorage is available
export const isStorageAvailable = () => {
  try {
    const test = '__storage_test__';
    localStorage.setItem(test, test);
    localStorage.removeItem(test);
    return true;
  } catch (e) {
    return false;
  }
};