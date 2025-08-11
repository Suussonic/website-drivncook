import React from 'react';

const FranchiseDetails = ({ franchise }) => (
  <section className="section">
    <h2 className="title">Détails du franchisé</h2>
    <p><strong>Nom:</strong> {franchise.name}</p>
    <p><strong>Email:</strong> {franchise.email}</p>
    {/* Ajouter plus d'infos ici */}
  </section>
);

export default FranchiseDetails;
