import React, { useState } from 'react';
import FranchiseForm from '../franchisee/FranchiseForm';

const mockFranchises = [
  { id: 1, name: 'Franchisé A', email: 'a@drivncook.com' },
  { id: 2, name: 'Franchisé B', email: 'b@drivncook.com' },
];

const Franchises = () => {
  const [franchises, setFranchises] = useState(mockFranchises);

  return (
    <>
      <section className="section">
        <h2 className="title">Gestion des franchisés</h2>
        <FranchiseForm onAdd={f => setFranchises([...franchises, f])} />
        <table className="table is-striped is-fullwidth">
          <thead>
            <tr>
              <th>Nom</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {franchises.map(f => (
              <tr key={f.id}>
                <td>{f.name}</td>
                <td>{f.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </>
  );
};

export default Franchises;
