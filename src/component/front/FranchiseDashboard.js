import React from 'react';

const FranchiseDashboard = ({ user, sales, trucks, orders }) => {
  const chiffreAffaires = sales?.reduce((acc, s) => acc + (s.franchisee === user?.name ? s.amount : 0), 0) || 0;
  const nbTrucks = trucks?.filter(t => t.franchisee === user?.name).length || 0;
  const nbOrders = orders?.filter(o => o.franchisee === user?.name).length || 0;

  return (
    <section className="section">
      <div className="box" style={{ maxWidth: 900, margin: '2rem auto', background: '#23272f', borderRadius: 12 }}>
        <h2 className="title has-text-white">Tableau de bord Franchisé</h2>
        <div className="columns is-multiline">
          <div className="column is-4">
            <div className="box has-background-primary has-text-white">
              <p className="title is-4">{nbTrucks}</p>
              <p>Camions attribués</p>
            </div>
          </div>
          <div className="column is-4">
            <div className="box has-background-link has-text-white">
              <p className="title is-4">{nbOrders}</p>
              <p>Commandes</p>
            </div>
          </div>
          <div className="column is-4">
            <div className="box has-background-success has-text-white">
              <p className="title is-4">{chiffreAffaires.toLocaleString()} €</p>
              <p>Chiffre d'affaires</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FranchiseDashboard;
