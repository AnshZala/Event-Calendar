import React, { useState } from 'react';
import '../../styles/EventForm.css';

const EventForm = ({ date, onSubmit, initialData = null }) => {
  const [eventData, setEventData] = useState(initialData || {
    title: '',
    description: '',
    startTime: '',
    endTime: '',
    category: 'work'
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!eventData.title.trim()) newErrors.title = 'Title is required';
    if (!eventData.startTime) newErrors.startTime = 'Start time is required';
    if (!eventData.endTime) newErrors.endTime = 'End time is required';
    if (eventData.startTime && eventData.endTime && eventData.startTime >= eventData.endTime) {
      newErrors.endTime = 'End time must be after start time';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit({
        ...eventData,
        date: date.toISOString().split('T')[0]
      });
      if (!initialData) {
        setEventData({
          title: '',
          description: '',
          startTime: '',
          endTime: '',
          category: 'work'
        });
      }
    }
  };

  return (
    <form className="event-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <input
          type="text"
          placeholder="Event Title"
          value={eventData.title}
          onChange={(e) => setEventData({...eventData, title: e.target.value})}
          className={errors.title ? 'error' : ''}
        />
        {errors.title && <span className="error-message">{errors.title}</span>}
      </div>

      <div className="form-group">
        <textarea
          placeholder="Description"
          value={eventData.description}
          onChange={(e) => setEventData({...eventData, description: e.target.value})}
        />
      </div>

      <div className="time-inputs">
        <div className="form-group">
          <input
            type="time"
            value={eventData.startTime}
            onChange={(e) => setEventData({...eventData, startTime: e.target.value})}
            className={errors.startTime ? 'error' : ''}
          />
          {errors.startTime && <span className="error-message">{errors.startTime}</span>}
        </div>

        <div className="form-group">
          <input
            type="time"
            value={eventData.endTime}
            onChange={(e) => setEventData({...eventData, endTime: e.target.value})}
            className={errors.endTime ? 'error' : ''}
          />
          {errors.endTime && <span className="error-message">{errors.endTime}</span>}
        </div>
      </div>

      <div className="category-select">
        <select
          value={eventData.category}
          onChange={(e) => setEventData({...eventData, category: e.target.value})}
          style={{
            borderLeft: `4px solid var(--${eventData.category}-color)`
          }}
        >
          <option value="work">Work</option>
          <option value="personal">Personal</option>
          <option value="other">Other</option>
        </select>
      </div>

      <button type="submit" className="submit-btn">
        {initialData ? 'Update Event' : 'Add Event'}
      </button>
    </form>
  );
};

export default EventForm;