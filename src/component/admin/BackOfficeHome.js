import React from 'react';
import SalesStats from './SalesStats';

const BackOfficeHome = () => (
  <section className="section">
    <h1 className="title is-3 mb-5">Tableau de bord Back-Office</h1>
    <div className="columns is-multiline">
      <div className="column is-3">
        <div className="box has-background-primary has-text-white">
          <p className="title is-4">12</p>
          <p>Franchisés</p>
        </div>
      </div>
      <div className="column is-3">
        <div className="box has-background-link has-text-white">
          <p className="title is-4">8</p>
          <p>Camions</p>
        </div>
      </div>
      <div className="column is-3">
        <div className="box has-background-info has-text-white">
          <p className="title is-4">2</p>
          <p>Entrepôts</p>
        </div>
      </div>
      <div className="column is-3">
        <div className="box has-background-success has-text-white">
          <p className="title is-4">€ 15 000</p>
          <p>Ventes ce mois</p>
        </div>
      </div>
    </div>
    <div className="box mt-5">
      <SalesStats />
    </div>
  </section>
);

export default BackOfficeHome;
