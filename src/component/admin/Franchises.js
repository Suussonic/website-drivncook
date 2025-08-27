import React, { useEffect, useState } from 'react';
import DataList from '../common/DataList';

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


const columns = ['_id', 'name', 'email'];

const Franchises = () => {
  const [franchises, setFranchises] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFranchises = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/franchises`);
        if (!response.ok) throw new Error('Erreur lors du chargement des franchises');
        const data = await response.json();
        setFranchises(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchFranchises();
  }, []);

  const handleDelete = async (franchise) => {
    try {
      await fetch(`${process.env.REACT_APP_API_URL}/franchises/${franchise._id}`, { method: 'DELETE' });
      setFranchises(franchises.filter(f => f._id !== franchise._id));
    } catch (err) {
      setError('Erreur lors de la suppression');
    }
  };

  const handleSave = async (updatedFranchise) => {
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/franchises/${updatedFranchise._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedFranchise)
      });
      if (!res.ok) throw new Error();
      setFranchises(franchises.map(f => f._id === updatedFranchise._id ? updatedFranchise : f));
    } catch (err) {
      setError('Erreur lors de la modification');
    }
  };

  const handleAdd = async (newFranchise) => {
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/franchises`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newFranchise)
      });
      if (!res.ok) throw new Error();
      const added = await res.json();
      setFranchises([...franchises, added]);
    } catch (err) {
      setError('Erreur lors de l\'ajout');
    }
  };

  if (loading) return <div className="has-text-white">Chargement des franchises...</div>;
  if (error) return <div className="has-text-danger">{error}</div>;

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
