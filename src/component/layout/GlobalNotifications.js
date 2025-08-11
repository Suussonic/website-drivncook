import React from 'react';

const GlobalNotifications = ({ notifications, onClose }) => (
  <div className="notifications-container" style={{ position: 'fixed', top: 70, right: 20, zIndex: 100 }}>
    {notifications.map((notif, idx) => (
      <div key={idx} className={`notification ${notif.type} mb-2`}>
        <button className="delete" onClick={() => onClose(idx)}></button>
        {notif.message}
      </div>
    ))}
  </div>
);

export default GlobalNotifications;
