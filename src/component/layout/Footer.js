import React from 'react';

const Footer = () => (
  <footer
    className="footer has-background-primary has-text-white-ter"
    style={{ marginTop: 0, padding: '1.2rem 0', boxShadow: '0 -2px 12px #0002', borderTop: '1px solid #00d1b2' }}
  >
    <div className="content has-text-centered">
      <p style={{ margin: 0 }}>
        <strong>Driv'n Cook</strong> - Gestion de franchises &copy; {new Date().getFullYear()}
      </p>
    </div>
  </footer>
);

export default Footer;
