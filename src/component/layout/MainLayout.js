import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

const MainLayout = ({ children }) => (
  <div className="has-background-dark" style={{ minHeight: '100vh' }}>
    <div
      className="is-flex is-justify-content-center"
      style={{ minHeight: 'calc(100vh - 52px)' }}
    >
      <div
        style={{
          background: '#23272f',
          borderRadius: '18px',
          margin: '2rem 0 1rem 0',
          boxShadow: '0 4px 24px rgba(0,0,0,0.25)',
          padding: '2.5rem 2rem',
          minHeight: 'calc(100vh - 52px - 3rem)',
          width: '100%',
          maxWidth: 1200,
        }}
      >
        {children}
      </div>
    </div>
    <Footer />
  </div>
);

export default MainLayout;
