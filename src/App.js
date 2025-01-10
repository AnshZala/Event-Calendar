import React from 'react';
import Calendar from './components/Calendar/Calendar.jsx';
import { EventProvider } from './context/EventContext.jsx';
import './styles/App.css';

function App() {
  return (
    <EventProvider>
      <div className="app-container">
        <h1>Event Calendar</h1>
        <Calendar />
      </div>
    </EventProvider>
  );
}

export default App;