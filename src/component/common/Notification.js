import React from 'react';

const Notification = ({ type = 'is-info', message, onClose }) => (
  <div className={`notification ${type}`}>
    <button className="delete" onClick={onClose}></button>
    {message}
  </div>
);

export default Notification;
