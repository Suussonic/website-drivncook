

import React, { useState, useEffect } from 'react';
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

const AddTruckForm = ({ onAdd }) => {
  const [form, setForm] = useState({ plate: '', city: '', address: '', schedule: '', status: 'active' });
  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSubmit = e => {
    e.preventDefault();
    if (form.plate && form.city && form.address && form.schedule) {
      onAdd({ id: Date.now(), ...form });
      setForm({ plate: '', city: '', address: '', schedule: '', status: 'active' });
    }
  };
  return (
    <form onSubmit={handleSubmit} className="mb-5">
      <div className="field is-grouped">
        <div className="control"><input className="input" name="plate" placeholder="Plaque" value={form.plate} onChange={handleChange} style={{ background: '#181a20', color: '#fff', border: 'none', borderRadius: 8 }} /></div>
        <div className="control"><input className="input" name="city" placeholder="Ville" value={form.city} onChange={handleChange} style={{ background: '#181a20', color: '#fff', border: 'none', borderRadius: 8 }} /></div>
        <div className="control"><input className="input" name="address" placeholder="Adresse" value={form.address} onChange={handleChange} style={{ background: '#181a20', color: '#fff', border: 'none', borderRadius: 8 }} /></div>
        <div className="control"><input className="input" name="schedule" placeholder="Horaires" value={form.schedule} onChange={handleChange} style={{ background: '#181a20', color: '#fff', border: 'none', borderRadius: 8 }} /></div>
        <div className="control">
          <select className="input" name="status" value={form.status} onChange={handleChange} style={{ background: '#181a20', color: '#fff', border: 'none', borderRadius: 8 }}>
            <option value="active">Actif</option>
            <option value="inactive">Inactif</option>
            <option value="maintenance">Maintenance</option>
            <option value="breakdown">En panne</option>
          </select>
        </div>
        <div className="control">
          <button className="button is-primary" type="submit">Ajouter</button>
        </div>
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
    try {
      await fetch(`${process.env.REACT_APP_API_URL}/trucks/${truck._id}`, { method: 'DELETE' });
      setTrucks(trucks.filter(t => t._id !== truck._id));
    } catch (err) {
      setError('Erreur lors de la suppression');
    }
  };

  const handleSave = async (updatedTruck) => {
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/trucks/${updatedTruck._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedTruck)
      });
      if (!res.ok) throw new Error();
      setTrucks(trucks.map(t => t._id === updatedTruck._id ? updatedTruck : t));
    } catch (err) {
      setError('Erreur lors de la modification');
    }
  };

  const handleAdd = async (newTruck) => {
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/trucks`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newTruck)
      });
      if (!res.ok) throw new Error();
      const added = await res.json();
      setTrucks([...trucks, added]);
    } catch (err) {
      setError('Erreur lors de l\'ajout');
    }
  };

  if (loading) return <div className="has-text-white">Chargement des camions...</div>;
  if (error) return <div className="has-text-danger">{error}</div>;

  return (
    <div style={{ maxWidth: 1100, margin: '32px auto', padding: '24px 24px 32px 24px', borderRadius: 18, background: 'rgba(0,0,0,0.01)' }}>
      <h2 className="title has-text-white">Gestion des camions / emplacements</h2>
      <AddTruckForm onAdd={handleAdd} />
      <DataList
        columns={columns}
        data={trucks}
        EditForm={props => <EditTruckForm {...props} onSave={handleSave} />}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default TrucksAdmin;
