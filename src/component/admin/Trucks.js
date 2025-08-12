import React, { useState } from 'react';
import DataList from '../common/DataList';
import { trucks as trucksData } from '../../data/mockTrucks';

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
      <div className="field">
        <label className="label has-text-white">Immatriculation</label>
        <div className="control">
          <input className="input" name="plate" value={form.plate} onChange={handleChange} style={{ background: '#181a20', color: '#fff', border: 'none' }} />
        </div>
      </div>
      <div className="field">
        <label className="label has-text-white">Statut</label>
        <div className="control">
          <input className="input" name="status" value={form.status} onChange={handleChange} style={{ background: '#181a20', color: '#fff', border: 'none' }} />
        </div>
      </div>
      <div className="field">
        <label className="label has-text-white">Franchisé</label>
        <div className="control">
          <input className="input" name="franchisee" value={form.franchisee} onChange={handleChange} style={{ background: '#181a20', color: '#fff', border: 'none' }} />
        </div>
      </div>
      <button className="button is-success" type="submit">Enregistrer</button>
    </form>
  );
};

const columns = ['id', 'plate', 'status', 'franchisee'];

const Trucks = () => {
  const [trucks, setTrucks] = useState(trucksData);

  const handleDelete = (truck) => {
    setTrucks(trucks.filter(t => t.id !== truck.id));
  };

  const handleSave = (updatedTruck) => {
    setTrucks(trucks.map(t => t.id === updatedTruck.id ? updatedTruck : t));
  };

  return (
    <>
      <h2 className="title has-text-white">Gestion du parc de camions</h2>
      <DataList
        columns={columns}
        data={trucks}
        EditForm={props => <EditTruckForm {...props} onSave={handleSave} />}
        onDelete={handleDelete}
      />
    </>
  );
};

export default Trucks;
