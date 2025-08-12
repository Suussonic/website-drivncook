import React, { useState } from 'react';
import DataList from '../common/DataList';
import { franchises as franchisesData } from '../../data/mockFranchises';

const EditFranchiseForm = ({ item, onClose, onSave }) => {
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
        <label className="label has-text-white">Nom</label>
        <div className="control">
          <input className="input" name="name" value={form.name} onChange={handleChange} style={{ background: '#181a20', color: '#fff', border: 'none' }} />
        </div>
      </div>
      <div className="field">
        <label className="label has-text-white">Email</label>
        <div className="control">
          <input className="input" name="email" type="email" value={form.email} onChange={handleChange} style={{ background: '#181a20', color: '#fff', border: 'none' }} />
        </div>
      </div>
      <button className="button is-success" type="submit">Enregistrer</button>
    </form>
  );
};

const AddFranchiseForm = ({ onAdd }) => {
  const [form, setForm] = useState({ name: '', email: '' });

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (form.name && form.email) {
      onAdd({ id: Date.now(), ...form });
      setForm({ name: '', email: '' });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-5">
      <div className="field is-grouped">
        <div className="control">
          <input className="input" name="name" placeholder="Nom" value={form.name} onChange={handleChange} style={{ background: '#181a20', color: '#fff', border: 'none', borderRadius: 8 }} />
        </div>
        <div className="control">
          <input className="input" name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} style={{ background: '#181a20', color: '#fff', border: 'none', borderRadius: 8 }} />
        </div>
        <div className="control">
          <button className="button is-primary" type="submit">Ajouter</button>
        </div>
      </div>
    </form>
  );
};

const columns = ['id', 'name', 'email'];

const Franchises = () => {
  const [franchises, setFranchises] = useState(franchisesData);

  const handleDelete = (franchise) => {
    setFranchises(franchises.filter(f => f.id !== franchise.id));
  };

  const handleSave = (updatedFranchise) => {
    setFranchises(franchises.map(f => f.id === updatedFranchise.id ? updatedFranchise : f));
  };

  const handleAdd = (newFranchise) => {
    setFranchises([...franchises, newFranchise]);
  };

  return (
    <>
      <h2 className="title has-text-white">Gestion des franchisés</h2>
      <AddFranchiseForm onAdd={handleAdd} />
      <DataList
        columns={columns}
        data={franchises}
        EditForm={props => <EditFranchiseForm {...props} onSave={handleSave} />}
        onDelete={handleDelete}
      />
    </>
  );
};

export default Franchises;
