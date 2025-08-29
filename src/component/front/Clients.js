import React from 'react';
import { useTranslation } from 'react-i18next';

const Clients = () => {
  const { t } = useTranslation();
  return (
    <section className="section">
      <div className="box" style={{ maxWidth: 600, margin: '2rem auto', background: '#23272f', borderRadius: 12 }}>
        <h2 className="title has-text-white">{t('Espace Clients')}</h2>
        <p className="has-text-white">{t("Commandez sur place, réservez à l'avance, profitez de la carte fidélité et découvrez nos food trucks partout en Ile de France !")}</p>
        <ul className="has-text-white mt-4">
          <li>{t('Commander sur place')}</li>
          <li>{t("Réserver à l'avance")}</li>
          <li>{t('Carte fidélité numérique')}</li>
          <li>{t('Avantages exclusifs')}</li>
        </ul>
      </div>
    </section>
  );
};

export default Clients;
