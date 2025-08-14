import React from 'react';

const Contact = () => (
  <section className="section">
    <div className="box" style={{ maxWidth: 600, margin: '2rem auto', background: '#23272f', borderRadius: 12 }}>
      <h2 className="title has-text-white">Contact</h2>
      <p className="has-text-white">Pour toute question, contactez-nous à <a href="mailto:contact@drivncook.com" style={{ color: '#3ec1ef' }}>contact@drivncook.com</a></p>
      <p className="has-text-white mt-2">Adresse : 12ème arrondissement, Paris, France</p>
      <p className="has-text-white mt-2">Téléphone : 01 23 45 67 89</p>
    </div>
  </section>
);

export default Contact;
