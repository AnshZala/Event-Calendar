import React from 'react';
import { getMonthName } from '../../utils/dateUtils';

const CalendarHeader = ({ currentDate, onPrevMonth, onNextMonth }) => {
  return (
    <div className="calendar-header">
      <button 
        className="month-nav-btn" 
        onClick={onPrevMonth}
        aria-label="Previous month"
      >
        &lt;
      </button>
      <h2>{`${getMonthName(currentDate.getMonth())} ${currentDate.getFullYear()}`}</h2>
      <button 
        className="month-nav-btn" 
        onClick={onNextMonth}
        aria-label="Next month"
      >
        &gt;
      </button>
    </div>
  );
};

export default CalendarHeader;