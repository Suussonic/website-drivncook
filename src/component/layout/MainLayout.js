import React from 'react';

import Footer from './Footer';

const MainLayout = ({ children }) => (
  <div
    className="has-background-dark"
    style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}
  >
    <div style={{ flex: 1 }}>{children}</div>
    <Footer />
  </div>
);

export default MainLayout;
