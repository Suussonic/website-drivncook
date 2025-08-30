import React, { useEffect, useState } from 'react';
import DataList from '../common/DataList';

const EditTruckForm = ({ item, onClose, onSave }) => {
  const [form, setForm] = useState({ ...item });
  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSubmit = e => {
    e.preventDefault();
    onSave && onSave(form);
    onClose();
  };
  return (
    <form onSubmit={handleSubmit}>
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
      </div>
      <div className="field mt-2">
        <button className="button is-success" type="submit">Enregistrer</button>
        <button className="button ml-2" type="button" onClick={onClose}>Annuler</button>
      </div>
    </form>
  );
};

const columns = ['plate', 'city', 'address', 'schedule', 'status'];

const TrucksAdmin = () => {
  const [trucks, setTrucks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/trucks`)
      .then(res => res.json())
      .then(data => { setTrucks(data); setLoading(false); });
  }, []);

  const handleDelete = async (truck) => {
    setError(null);
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/trucks/${truck._id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Erreur lors de la suppression');
      setTrucks(trucks.filter(t => t._id !== truck._id));
    } catch (err) {
      setError(err.message);
    }
  };

  const handleSave = async (updatedTruck) => {
    setError(null);
    try {
      if (updatedTruck._id) {
        const res = await fetch(`${process.env.REACT_APP_API_URL}/trucks/${updatedTruck._id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updatedTruck)
        });
        if (!res.ok) throw new Error('Erreur lors de la modification');
        const updated = await res.json();
        setTrucks(trucks.map(t => t._id === updated._id ? updated : t));
      } else {
        const res = await fetch(`${process.env.REACT_APP_API_URL}/trucks`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updatedTruck)
        });
        if (!res.ok) throw new Error('Erreur lors de l\'ajout');
        const added = await res.json();
        setTrucks([...trucks, added]);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <div className="has-text-white">Chargement des camions...</div>;
  if (error) return <div className="has-text-danger mb-2">{error}</div>;

  return (
    <div style={{ maxWidth: 1100, margin: '32px auto', padding: '24px 24px 32px 24px', borderRadius: 18, background: 'rgba(0,0,0,0.01)' }}>
      <h2 className="title">Gestion des Camions / Emplacements</h2>
      <DataList
        columns={columns}
        data={trucks}
        EditForm={props => <EditTruckForm {...props} onSave={handleSave} />}
        onDelete={handleDelete}
        title={"Liste des camions"}
      />
    </div>
  );
};

export default TrucksAdmin;
