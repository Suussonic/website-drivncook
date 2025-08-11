import React from 'react';

const TruckDetails = ({ truck }) => (
  <section className="section">
    <h2 className="title">Détails du camion</h2>
    <p><strong>Immatriculation:</strong> {truck.plate}</p>
    <p><strong>Statut:</strong> {truck.status}</p>
    <p><strong>Franchisé:</strong> {truck.franchisee}</p>
    {/* Ajouter carnet d'entretien, historique, etc. */}
  </section>
);

export default TruckDetails;
