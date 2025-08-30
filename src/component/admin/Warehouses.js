import React, { useEffect, useState } from 'react';
import DataList from '../common/DataList';

const EditWarehouseForm = ({ item, onClose, onSave }) => {
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
        <label className="label has-text-white">Stock (%)</label>
        <div className="control">
          <input className="input" name="stock" type="number" value={form.stock} onChange={handleChange} style={{ background: '#181a20', color: '#fff', border: 'none' }} />
        </div>
      </div>
      <button className="button is-success" type="submit">Enregistrer</button>
    </form>
  );
};

const columns = ['_id', 'name', 'stock'];

const Warehouses = () => {
  const [warehouses, setWarehouses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWarehouses = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/warehouses`);
        if (!response.ok) throw new Error('Erreur lors du chargement des entrepôts');
        const data = await response.json();
        setWarehouses(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchWarehouses();
  }, []);

  const handleDelete = async (warehouse) => {
    try {
      await fetch(`${process.env.REACT_APP_API_URL}/warehouses/${warehouse._id}`, { method: 'DELETE' });
      setWarehouses(warehouses.filter(w => w._id !== warehouse._id));
    } catch (err) {
      setError('Erreur lors de la suppression');
    }
  };

  const handleSave = async (updatedWarehouse) => {
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/warehouses/${updatedWarehouse._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedWarehouse)
      });
      if (!res.ok) throw new Error();
      setWarehouses(warehouses.map(w => w._id === updatedWarehouse._id ? updatedWarehouse : w));
    } catch (err) {
      setError('Erreur lors de la modification');
    }
  };

  if (loading) return <div className="has-text-white">Chargement des entrepôts...</div>;
  if (error) return <div className="has-text-danger">{error}</div>;

  // Alerte 80/20
  const alerts = warehouses.map(w => {
    // Stock peut être un nombre ou un objet, on gère les deux cas
    const stockValue = typeof w.stock === 'number' ? w.stock : (w.stock && w.stock.percent ? w.stock.percent : null);
    if (stockValue !== null && stockValue !== undefined) {
      if (stockValue < 80) {
        return <div key={w._id} className="has-text-danger">Alerte: Le stock de l'entrepôt "{w.name}" est sous 80% ({stockValue}%)</div>;
      }
      if (stockValue > 20) {
        return <div key={w._id} className="has-text-warning">Alerte: Le stock de l'entrepôt "{w.name}" dépasse 20% hors entrepôt principal ({stockValue}%)</div>;
      }
    }
    return null;
  });

    return (
      <div style={{ maxWidth: 1100, margin: '32px auto', padding: '24px 24px 32px 24px', borderRadius: 18, background: 'rgba(0,0,0,0.01)' }}>
        <h2 className="title has-text-white">Gestion des entrepôts</h2>
        {alerts}
        <DataList
          columns={columns}
          data={warehouses}
          EditForm={props => <EditWarehouseForm {...props} onSave={handleSave} />}
          onDelete={handleDelete}
        />
      </div>
    );
};

export default Warehouses;
