
import React from 'react';
import { useTranslation } from 'react-i18next';

const Versements = ({ user, sales }) => {
  const { t } = useTranslation();
  // Simule le calcul du CA et du reversement
  const chiffreAffaires = sales?.reduce((acc, s) => acc + (s.franchisee === user?.name ? s.amount : 0), 0) || 0;
  const droitEntree = 50000;
  const pourcentage = 0.04;
  const reversement = chiffreAffaires * pourcentage;

  return (
    <section className="section">
      <div className="box" style={{ maxWidth: 600, margin: '2rem auto', background: '#23272f', borderRadius: 12 }}>
        <h2 className="title has-text-white">{t('Mes versements')}</h2>
        <ul className="has-text-white">
          <li>{t("Droit d'entrée : 50 000,00 €")}</li>
          <li>{t("Reversement à la société mère : 4% du chiffre d'affaires")}</li>
          <li>{t("Chiffre d'affaires total : {{ca}} €", { ca: chiffreAffaires.toLocaleString() })}</li>
          <li>{t("Reversement dû : {{rev}} €", { rev: reversement.toLocaleString() })}</li>
        </ul>
      </div>
    </section>
  );
};

export default Versements;
