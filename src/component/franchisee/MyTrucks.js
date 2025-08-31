

import React, { useEffect, useState } from 'react';

const MyTrucks = ({ user }) => {
  const [trucks, setTrucks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const [showAdd, setShowAdd] = useState(false);
  const [newTruck, setNewTruck] = useState({ plate: '', address: '', city: '', startTime: '', endTime: '', status: 'Actif' });

  useEffect(() => {
    fetch(`/api/trucks`)
      .then(res => res.json())
      .then(data => setTrucks(Array.isArray(data) ? data : []))
      .catch(e => setError('Erreur lors du chargement des camions'))
      .finally(() => setLoading(false));
  }, [user]);

  const filterTrucks = (trucks) => {
    // Filtrer uniquement les camions de la franchise connectée
    const filtered = user?.franchiseId ? trucks.filter(truck => String(truck.franchiseId) === String(user.franchiseId)) : trucks;
    if (!search.trim()) return filtered;
    const s = search.toLowerCase();
    return filtered.filter(truck => (
      (truck.plate && truck.plate.toLowerCase().includes(s)) ||
      (truck.city && truck.city.toLowerCase().includes(s)) ||
      (truck.address && truck.address.toLowerCase().includes(s)) ||
      (truck.status && truck.status.toLowerCase().includes(s)) ||
      (truck.startTime && truck.startTime.toLowerCase().includes(s)) ||
      (truck.endTime && truck.endTime.toLowerCase().includes(s))
    ));
  };

  const handleAddTruck = e => {
    e.preventDefault();
    fetch('/api/trucks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...newTruck, franchiseId: user?.franchiseId })
    })
      .then(res => res.json())
      .then(data => {
        if (data._id) {
          setTrucks(trucks => [...trucks, data]);
          setShowAdd(false);
          setNewTruck({ plate: '', address: '', city: '', status: 'Actif' });
        }
      });
  };

  return (
    <section className="section">
      <div className="box" style={{ maxWidth: 1200, margin: '2rem auto', background: '#23272f', borderRadius: 18 }}>
        <h2 className="title has-text-white">Mes camions</h2>
        <div style={{ marginBottom: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <button className="button is-success" onClick={() => setShowAdd(s => !s)}>
            {showAdd ? 'Annuler' : 'Ajouter un camion'}
          </button>
          <input
            className="input"
            style={{ maxWidth: 300 }}
            type="text"
            placeholder="Rechercher (plaque, ville, adresse...)"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        {showAdd && (
          <form onSubmit={handleAddTruck} style={{ marginBottom: 20, background: '#23272f', padding: 20, borderRadius: 12 }}>
            <div className="field is-grouped">
              <input className="input mr-2" style={{ maxWidth: 150 }} placeholder="Plaque" value={newTruck.plate} onChange={e => setNewTruck(t => ({ ...t, plate: e.target.value }))} required />
              <input className="input mr-2" style={{ maxWidth: 200 }} placeholder="Adresse" value={newTruck.address} onChange={e => setNewTruck(t => ({ ...t, address: e.target.value }))} required />
              <input className="input mr-2" style={{ maxWidth: 120 }} placeholder="Ville" value={newTruck.city} onChange={e => setNewTruck(t => ({ ...t, city: e.target.value }))} required />
                <input className="input mr-2" style={{ maxWidth: 120 }} placeholder="Heure début" type="time" value={newTruck.startTime} onChange={e => setNewTruck(t => ({ ...t, startTime: e.target.value }))} required />
                <input className="input mr-2" style={{ maxWidth: 120 }} placeholder="Heure fin" type="time" value={newTruck.endTime} onChange={e => setNewTruck(t => ({ ...t, endTime: e.target.value }))} required />
              <select className="select mr-2" value={newTruck.status} onChange={e => setNewTruck(t => ({ ...t, status: e.target.value }))}>
                <option value="Actif">Actif</option>
                <option value="En panne">En panne</option>
                <option value="Maintenance">Maintenance</option>
              </select>
              <button type="submit" className="button is-primary">Ajouter</button>
            </div>
          </form>
        )}
        <table className="table is-fullwidth is-hoverable" style={{ background: '#23272f', color: '#fff', borderRadius: 12 }}>
          <thead>
            <tr>
              <th>Food Truck</th>
              <th>Adresse</th>
              <th>Ville</th>
              <th>Heure début</th>
              <th>Heure fin</th>
              <th>Statut</th>
              <th>franchiseId</th>
            </tr>
          </thead>
          <tbody>
            {filterTrucks(trucks).map(truck => (
              <tr key={truck._id}>
                <td>{truck.plate}</td>
                <td>{truck.address}</td>
                <td>{truck.city}</td>
                <td>{truck.startTime || '-'}</td>
                <td>{truck.endTime || '-'}</td>
                <td>{truck.status}</td>
                <td>{truck.franchiseId || '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {filterTrucks(trucks).length === 0 && (
          <div className="has-text-grey-light" style={{ textAlign: 'center', marginTop: 30 }}>Aucun camion trouvé.</div>
        )}
      </div>
    </section>
  );
};

export default MyTrucks;
