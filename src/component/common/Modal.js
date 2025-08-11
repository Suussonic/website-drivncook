import React from 'react';

const Modal = ({ isActive, title, children, onClose }) => (
  <div className={`modal ${isActive ? 'is-active' : ''}`}>
    <div className="modal-background" onClick={onClose} style={{ background: 'rgba(24,26,32,0.95)' }}></div>
    <div className="modal-card" style={{ borderRadius: 16, background: '#23272f', color: '#fff' }}>
      <header className="modal-card-head" style={{ background: '#181a20', color: '#fff', borderTopLeftRadius: 16, borderTopRightRadius: 16 }}>
        <p className="modal-card-title">{title}</p>
        <button className="delete" aria-label="close" onClick={onClose}></button>
      </header>
      <section className="modal-card-body">
        {children}
      </section>
    </div>
  </div>
);

export default Modal;
