// Fichier supprimé
import React, { useEffect, useState } from 'react';

const SupplyForm = ({ user }) => {
  const [warehouses, setWarehouses] = useState([]);
  const [items, setItems] = useState([{ name: '', quantity: 0, fromWarehouse: true }]);
  const [warehouseId, setWarehouseId] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
  fetch('/api/warehouses')
      .then(res => res.json())
      .then(data => setWarehouses(Array.isArray(data) ? data : []));
  }, []);

  const handleItemChange = (idx, field, value) => {
    setItems(items => items.map((item, i) => i === idx ? { ...item, [field]: value } : item));
  };
  const addItem = () => setItems([...items, { name: '', quantity: 0, fromWarehouse: true }]);
  const removeItem = idx => setItems(items => items.filter((_, i) => i !== idx));

  const handleSubmit = e => {
    e.preventDefault();
    setError(''); setSuccess('');
    fetch('/api/supplies', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        franchiseId: user.franchiseId,
        warehouseId,
        items
      })
    })
      .then(res => res.json())
      .then(data => {
        if (data.error) setError(data.error);
        else setSuccess('Approvisionnement enregistré !');
      });
  };

  return (
    <section className="section">
      <div className="box mb-4" style={{ maxWidth: 1200, margin: '2rem auto', background: '#23272f', borderRadius: 18 }}>
        <h2 className="title has-text-white">Nouvel approvisionnement</h2>
        <form onSubmit={handleSubmit}>
          <div className="field">
            <label className="has-text-white">Entrepôt</label>
            <div className="select">
              <select value={warehouseId} onChange={e => setWarehouseId(e.target.value)} required>
                <option value="">Choisir un entrepôt</option>
                {warehouses.map(w => <option key={w._id} value={w._id}>{w.name}</option>)}
              </select>
            </div>
          </div>
          {items.map((item, idx) => (
            <div className="field is-grouped" key={idx}>
              <input className="input mr-2" style={{ maxWidth: 200 }} placeholder="Produit" value={item.name} onChange={e => handleItemChange(idx, 'name', e.target.value)} required />
              <input className="input mr-2" style={{ maxWidth: 120 }} type="number" min="1" placeholder="Quantité" value={item.quantity} onChange={e => handleItemChange(idx, 'quantity', Number(e.target.value))} required />
              <label className="checkbox mr-2 has-text-white">
                <input type="checkbox" checked={item.fromWarehouse} onChange={e => handleItemChange(idx, 'fromWarehouse', e.target.checked)} /> 80% entrepôt
              </label>
              <button type="button" className="button is-danger is-small" onClick={() => removeItem(idx)}>Supprimer</button>
            </div>
          ))}
          <button type="button" className="button is-info is-small mb-2" onClick={addItem}>Ajouter un produit</button>
          <br />
          <button type="submit" className="button is-primary">Valider l'approvisionnement</button>
          {error && <p className="has-text-danger mt-2">{error}</p>}
          {success && <p className="has-text-success mt-2">{success}</p>}
        </form>
      </div>
    </section>
  );
};

export default SupplyForm;
