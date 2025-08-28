import React, { useEffect, useState } from 'react';

const emptyTruck = { plate: '', city: '', address: '', schedule: '', status: 'active' };

const TrucksAdmin = () => {
  const [trucks, setTrucks] = useState([]);
  const [form, setForm] = useState(emptyTruck);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/trucks`)
      .then(res => res.json())
      .then(data => { setTrucks(data); setLoading(false); });
  }, []);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError(null);
    try {
      if (editingId) {
        const res = await fetch(`${process.env.REACT_APP_API_URL}/trucks/${editingId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form)
        });
        if (!res.ok) throw new Error('Erreur lors de la modification');
        const updated = await res.json();
        setTrucks(trucks.map(t => t._id === editingId ? updated : t));
        setEditingId(null);
      } else {
        const res = await fetch(`${process.env.REACT_APP_API_URL}/trucks`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form)
        });
        if (!res.ok) throw new Error('Erreur lors de l\'ajout');
        const added = await res.json();
        setTrucks([...trucks, added]);
      }
      setForm(emptyTruck);
    } catch (err) {
      setError(err.message);
    }
  };

  // Merge truck data with emptyTruck to avoid undefined values
  const mergeTruck = (truck) => ({
    ...emptyTruck,
    ...truck,
    plate: truck.plate || '',
    city: truck.city || '',
    address: truck.address || '',
    schedule: truck.schedule || '',
    status: truck.status || 'active',
  });

  const handleEdit = truck => {
    setForm(mergeTruck(truck));
    setEditingId(truck._id);
  };

  const handleDelete = async id => {
    setError(null);
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/trucks/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Erreur lors de la suppression');
      setTrucks(trucks.filter(t => t._id !== id));
      if (editingId === id) {
        setEditingId(null);
        setForm(emptyTruck);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <div className="has-text-white">Chargement des camions...</div>;

  return (
    <section className="section">
      <div className="box" style={{ maxWidth: 900, margin: '2rem auto' }}>
        <h2 className="title">Gestion des Camions / Emplacements</h2>
        <form onSubmit={handleSubmit} className="mb-4">
          <div className="field is-grouped is-flex-wrap-wrap">
            <div className="control"><input className="input" name="plate" placeholder="Plaque" value={form.plate} onChange={handleChange} required /></div>
            <div className="control"><input className="input" name="city" placeholder="Ville" value={form.city} onChange={handleChange} required /></div>
            <div className="control"><input className="input" name="address" placeholder="Adresse" value={form.address} onChange={handleChange} required /></div>
            <div className="control"><input className="input" name="schedule" placeholder="Horaires" value={form.schedule} onChange={handleChange} required /></div>
            <div className="control">
              <select className="input" name="status" value={form.status} onChange={handleChange}>
                <option value="active">Actif</option>
                <option value="inactive">Inactif</option>
                <option value="maintenance">Maintenance</option>
                <option value="breakdown">En panne</option>
              </select>
            </div>
            <div className="control">
              <button className="button is-primary" type="submit">{editingId ? 'Modifier' : 'Ajouter'}</button>
            </div>
            {editingId && <div className="control"><button className="button" type="button" onClick={() => { setEditingId(null); setForm(emptyTruck); }}>Annuler</button></div>}
          </div>
        </form>
        {error && <div className="has-text-danger mb-2">{error}</div>}
        <table className="table is-fullwidth">
          <thead>
            <tr>
              <th>Plaque</th>
              <th>Ville</th>
              <th>Adresse</th>
              <th>Horaires</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {trucks.map(truck => (
              <tr key={truck._id}>
                <td>{truck.plate}</td>
                <td>{truck.city}</td>
                <td>{truck.address}</td>
                <td>{truck.schedule}</td>
                <td>{truck.status}</td>
                <td>
                  <button className="button is-small is-info mr-2" onClick={() => handleEdit(truck)}>Editer</button>
                  <button className="button is-small is-danger" onClick={() => handleDelete(truck._id)}>Supprimer</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default TrucksAdmin;
