import React from 'react';

const Footer = () => (
  <footer className="footer has-background-primary has-text-white-ter">
    <div className="content has-text-centered">
      <p>
        <strong>Driv'n Cook</strong> - Gestion de franchises &copy; {new Date().getFullYear()}
      </p>
    </div>
  </footer>
);

export default Footer;
