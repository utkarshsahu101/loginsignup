// Toast.js
import React, { useState, useEffect } from 'react';
import './Toast.css'; // Import CSS for styling

const Toast = ({ message, showToast, setShowToast, type }) => {
  const [toastClass, setToastClass] = useState('');

  useEffect(() => {
    // Determine the class for styling based on the type of toast message
    switch (type) {
      case 'success':
        setToastClass('success');
        break;
      case 'warning':
        setToastClass('warning');
        break;
      case 'error':
        setToastClass('error');
        break;
      default:
        setToastClass('');
    }
  }, [type]);

  return (
    <div className={`toast ${showToast ? 'show' : ''} ${toastClass}`}>
      <div className="toast-message">{message}</div>

      <button className="close-btn" onClick={() => setShowToast(false)}>X</button>
    </div>
  );
};

export default Toast;
