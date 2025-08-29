import React from 'react';
import { warehouses } from '../../data/mockWarehouses';
import { useTranslation } from 'react-i18next';

const Warehouses = () => {
  const { t } = useTranslation();
  return (
    <section className="section">
      <div className="box" style={{ maxWidth: 700, margin: '2rem auto', background: '#23272f', borderRadius: 12 }}>
        <h2 className="title has-text-white">{t("Entrepôts d'Ile de France")}</h2>
        <table className="table is-striped is-fullwidth has-background-dark has-text-white">
          <thead>
            <tr>
              <th>{t('ID')}</th>
              <th>{t('Nom')}</th>
              <th>{t('Stock (%)')}</th>
            </tr>
          </thead>
          <tbody>
            {warehouses.map(w => (
              <tr key={w.id}>
                <td>{w.id}</td>
                <td>{w.name}</td>
                <td>{w.stock}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="has-text-white mt-3">{t("Chaque entrepôt dispose d'une cuisine centrale pour la préparation des plats.")}</p>
      </div>
    </section>
  );
};

export default Warehouses;
