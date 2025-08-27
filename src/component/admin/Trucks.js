import React, { useEffect, useState } from 'react';
import DataList from '../common/DataList';
import TruckMaintenance from './TruckMaintenance';
import TruckBreakdowns from './TruckBreakdowns';

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
  const [trucks, setTrucks] = useState([]);
  const [maintenances, setMaintenances] = useState([]);
  const [breakdowns, setBreakdowns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [trucksRes, maintRes, breakRes] = await Promise.all([
          fetch(`${process.env.REACT_APP_API_URL}/trucks`),
          fetch(`${process.env.REACT_APP_API_URL}/maintenances`),
          fetch(`${process.env.REACT_APP_API_URL}/breakdowns`)
        ]);
        if (!trucksRes.ok || !maintRes.ok || !breakRes.ok) throw new Error('Erreur lors du chargement des données');
        setTrucks(await trucksRes.json());
        setMaintenances(await maintRes.json());
        setBreakdowns(await breakRes.json());
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, []);

  const handleDelete = async (truck) => {
    try {
      await fetch(`${process.env.REACT_APP_API_URL}/trucks/${truck._id || truck.id}`, { method: 'DELETE' });
      setTrucks(trucks.filter(t => (t._id || t.id) !== (truck._id || truck.id)));
    } catch (err) {
      setError('Erreur lors de la suppression');
    }
  };

  const handleSave = async (updatedTruck) => {
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/trucks/${updatedTruck._id || updatedTruck.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedTruck)
      });
      if (!res.ok) throw new Error();
      setTrucks(trucks.map(t => (t._id || t.id) === (updatedTruck._id || updatedTruck.id) ? updatedTruck : t));
    } catch (err) {
      setError('Erreur lors de la modification');
    }
  };

  const handleAddMaintenance = async (maintenance) => {
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/maintenances`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(maintenance)
      });
      if (!res.ok) throw new Error();
      const newMaint = await res.json();
      setMaintenances([...maintenances, newMaint]);
    } catch (err) {
      setError('Erreur lors de l\'ajout de maintenance');
    }
  };

  const handleAddBreakdown = async (breakdown) => {
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/breakdowns`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(breakdown)
      });
      if (!res.ok) throw new Error();
      const newBreak = await res.json();
      setBreakdowns([...breakdowns, newBreak]);
    } catch (err) {
      setError('Erreur lors de l\'ajout de panne');
    }
  };

  if (loading) return <div className="has-text-white">Chargement...</div>;
  if (error) return <div className="has-text-danger">{error}</div>;

  return (
    <>
      <h2 className="title has-text-white">Gestion du parc de camions</h2>
      <DataList
        columns={columns}
        data={trucks}
        EditForm={props => <EditTruckForm {...props} onSave={handleSave} />}
        onDelete={handleDelete}
      />
      <div className="mt-5">
        {trucks.map(truck => (
          <div key={truck._id || truck.id} style={{ marginBottom: 32 }}>
            <h3 className="subtitle has-text-info">Camion {truck.plate}</h3>
            <TruckMaintenance
              truck={truck}
              maintenances={maintenances}
              onAdd={handleAddMaintenance}
            />
            <TruckBreakdowns
              truck={truck}
              breakdowns={breakdowns}
              onAdd={handleAddBreakdown}
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default Trucks;
