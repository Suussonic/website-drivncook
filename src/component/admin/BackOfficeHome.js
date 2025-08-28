
import React from 'react';

const BackOfficeHome = ({ user }) => (
  <section className="section has-text-centered">
    <h1 className="title is-1" style={{ marginTop: '4rem' }}>
      Bienvenue dans le Back office {user?.nom || ''} {user?.prenom || ''}
    </h1>
  </section>
);

export default BackOfficeHome;
