import React from 'react';

const Versements = ({ user, sales }) => {
  // Simule le calcul du CA et du reversement
  const chiffreAffaires = sales?.reduce((acc, s) => acc + (s.franchisee === user?.name ? s.amount : 0), 0) || 0;
  const droitEntree = 50000;
  const pourcentage = 0.04;
  const reversement = chiffreAffaires * pourcentage;

  return (
    <section className="section">
      <div className="box" style={{ maxWidth: 600, margin: '2rem auto', background: '#23272f', borderRadius: 12 }}>
        <h2 className="title has-text-white">Mes versements</h2>
        <ul className="has-text-white">
          <li>Droit d'entrée : 50 000,00 €</li>
          <li>Reversement à la société mère : 4% du chiffre d'affaires</li>
          <li>Chiffre d'affaires total : {chiffreAffaires.toLocaleString()} €</li>
          <li>Reversement dû : {reversement.toLocaleString()} €</li>
        </ul>
      </div>
    </section>
  );
};

export default Versements;
