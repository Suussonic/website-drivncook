import React from 'react';
import { warehouses } from '../../data/mockWarehouses';

const Interconnexion = () => (
  <section className="section">
    <div className="box" style={{ maxWidth: 900, margin: '2rem auto', background: '#23272f', borderRadius: 12 }}>
      <h2 className="title has-text-white">Interconnexion des entrepôts</h2>
      <table className="table is-striped is-fullwidth has-background-dark has-text-white">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nom</th>
            <th>Stock (%)</th>
            <th>Alertes</th>
          </tr>
        </thead>
        <tbody>
          {warehouses.map(w => (
            <tr key={w.id}>
              <td>{w.id}</td>
              <td>{w.name}</td>
              <td>{w.stock}</td>
              <td>{w.stock < 30 ? <span className="tag is-danger">Stock bas</span> : <span className="tag is-success">OK</span>}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="has-text-white mt-3">Visualisez l'état des stocks et les alertes de chaque entrepôt en temps réel.</p>
    </div>
  </section>
);

export default Interconnexion;
