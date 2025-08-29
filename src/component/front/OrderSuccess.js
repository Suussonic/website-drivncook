import React from 'react';

const OrderSuccess = () => (
  <section className="section" style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    <div className="box" style={{ background: '#23272f', borderRadius: 12, maxWidth: 500, margin: 'auto', textAlign: 'center' }}>
      <h2 className="title has-text-success">Merci pour votre achat !</h2>
      <p className="has-text-white">Votre commande a bien été enregistrée.<br/>Vous recevrez un email de confirmation sous peu.</p>
      <a href="/" className="button is-info mt-4">Retour à l'accueil</a>
    </div>
  </section>
);

export default OrderSuccess;
