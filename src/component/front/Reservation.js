import React from 'react';

const Reservation = () => (
  <section className="section">
    <div className="box" style={{ maxWidth: 600, margin: '2rem auto', background: '#23272f', borderRadius: 12 }}>
      <h2 className="title has-text-white">Réserver un plat ou un food truck</h2>
      <p className="has-text-white">Réservez à l'avance votre plat préféré ou privatisez un food truck pour vos événements !</p>
      <form className="mt-4">
        <div className="field">
          <label className="label has-text-white">Nom</label>
          <div className="control">
            <input className="input" type="text" placeholder="Votre nom" style={{ background: '#181a20', color: '#fff', border: 'none' }} />
          </div>
        </div>
        <div className="field">
          <label className="label has-text-white">Email</label>
          <div className="control">
            <input className="input" type="email" placeholder="Votre email" style={{ background: '#181a20', color: '#fff', border: 'none' }} />
          </div>
        </div>
        <div className="field">
          <label className="label has-text-white">Message</label>
          <div className="control">
            <textarea className="textarea" placeholder="Votre demande" style={{ background: '#181a20', color: '#fff', border: 'none' }} />
          </div>
        </div>
        <button className="button is-primary" type="submit">Envoyer la demande</button>
      </form>
    </div>
  </section>
);

export default Reservation;
