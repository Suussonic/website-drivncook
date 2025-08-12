import React, { useState } from 'react';

const TruckMaintenance = ({ truck, maintenances, onAdd }) => {
  const [desc, setDesc] = useState('');
  const [date, setDate] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    if (desc && date) {
      onAdd({ truckId: truck.id, desc, date });
      setDesc('');
      setDate('');
    }
  };

  return (
    <div className="box" style={{ background: '#23272f', borderRadius: 12 }}>
      <h3 className="subtitle has-text-white">Carnet d'entretien</h3>
      <ul>
        {maintenances.filter(m => m.truckId === truck.id).map((m, i) => (
          <li key={i} style={{ color: '#fff' }}>{m.date} : {m.desc}</li>
        ))}
      </ul>
      <form onSubmit={handleSubmit} className="mt-3">
        <div className="field is-grouped">
          <div className="control">
            <input className="input" type="date" value={date} onChange={e => setDate(e.target.value)} style={{ background: '#181a20', color: '#fff', border: 'none' }} />
          </div>
          <div className="control">
            <input className="input" type="text" placeholder="Description" value={desc} onChange={e => setDesc(e.target.value)} style={{ background: '#181a20', color: '#fff', border: 'none' }} />
          </div>
          <div className="control">
            <button className="button is-success" type="submit">Ajouter</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default TruckMaintenance;
