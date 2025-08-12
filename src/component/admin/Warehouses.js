import React, { useState } from 'react';
import DataList from '../common/DataList';
import { warehouses as warehousesData } from '../../data/mockWarehouses';

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

const columns = ['id', 'name', 'stock'];

const Warehouses = () => {
  const [warehouses, setWarehouses] = useState(warehousesData);

  const handleDelete = (warehouse) => {
    setWarehouses(warehouses.filter(w => w.id !== warehouse.id));
  };

  const handleSave = (updatedWarehouse) => {
    setWarehouses(warehouses.map(w => w.id === updatedWarehouse.id ? updatedWarehouse : w));
  };

  return (
    <>
      <h2 className="title has-text-white">Gestion des entrepôts</h2>
      <DataList
        columns={columns}
        data={warehouses}
        EditForm={props => <EditWarehouseForm {...props} onSave={handleSave} />}
        onDelete={handleDelete}
      />
    </>
  );
};

export default Warehouses;
