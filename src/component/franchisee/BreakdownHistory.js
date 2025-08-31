import React, { useEffect, useState } from 'react';

const BreakdownHistory = ({ user }) => {
  const [breakdowns, setBreakdowns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetch(`/api/breakdowns?franchiseId=${user.franchiseId}`)
      .then(res => res.json())
      .then(data => {
        setBreakdowns(Array.isArray(data) ? data : []);
        setLoading(false);
      });
  }, [user.franchiseId]);

  const filterBreakdowns = (breakdowns) => {
    if (!search.trim()) return breakdowns;
    const s = search.toLowerCase();
    return breakdowns.filter(b => {
      return (
        (b.truckId?.plate && b.truckId.plate.toLowerCase().includes(s)) ||
        (b.description && b.description.toLowerCase().includes(s)) ||
        (b.status && b.status.toLowerCase().includes(s))
      );
    });
  };

  return (
    <section className="section">
      <div className="box" style={{ maxWidth: 1200, margin: '2rem auto', background: '#23272f', borderRadius: 18 }}>
        <h2 className="title has-text-white">Historique des pannes/entretiens</h2>
        <div style={{ marginBottom: 20, display: 'flex', justifyContent: 'flex-end' }}>
          <input
            className="input"
            style={{ maxWidth: 300 }}
            type="text"
            placeholder="Rechercher (camion, description, statut...)"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <table className="table is-fullwidth is-hoverable" style={{ background: '#23272f', color: '#fff', borderRadius: 12 }}>
          <thead>
            <tr>
              <th>Date</th>
              <th>Camion</th>
              <th>Description</th>
              <th>Type</th>
              <th>Statut</th>
            </tr>
          </thead>
          <tbody>
            {filterBreakdowns(breakdowns).map(b => (
              <tr key={b._id}>
                <td>{new Date(b.reportedAt).toLocaleString()}</td>
                <td>{b.truckId?.plate || b.truckId}</td>
                <td>{b.description}</td>
                <td>{b.maintenance ? 'Entretien' : 'Panne'}</td>
                <td>{b.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default BreakdownHistory;
// Fichier supprimé
