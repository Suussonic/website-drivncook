import React from 'react';
import { useTranslation } from 'react-i18next';

const FranchiseDashboard = ({ user, sales, trucks, orders }) => {
  const chiffreAffaires = sales?.reduce((acc, s) => acc + (s.franchisee === user?.name ? s.amount : 0), 0) || 0;
  const nbTrucks = trucks?.filter(t => t.franchisee === user?.name).length || 0;
  const nbOrders = orders?.filter(o => o.franchisee === user?.name).length || 0;

  const { t } = useTranslation();
  return (
    <section className="section">
      <div className="box" style={{ maxWidth: 900, margin: '2rem auto', background: '#23272f', borderRadius: 12 }}>
        <h2 className="title has-text-white">Bienvenue dans votre espace franchisé</h2>
        <p className="has-text-white">Vous êtes connecté à votre espace personnel. Utilisez le menu pour accéder aux différentes fonctionnalités.</p>
      </div>
    </section>
  );
};

export default FranchiseDashboard;
