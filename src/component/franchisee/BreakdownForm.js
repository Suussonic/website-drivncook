import React, { useEffect, useState } from 'react';

const BreakdownForm = ({ user, trucks: trucksProp, onReport }) => {
  const [form, setForm] = useState({ truckId: '', description: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [trucks, setTrucks] = useState(trucksProp || []);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    // Récupère la liste des camions et l'historique des pannes
    fetch('http://localhost:3000/api/trucks')
      .then(res => res.json())
      .then(data => setTrucks(Array.isArray(data) ? data : []))
      .catch(() => setTrucks([]));
    fetch('http://localhost:3000/api/breakdownHistory')
      .then(res => res.json())
      .then(data => setHistory(Array.isArray(data) ? data : []))
      .catch(() => setHistory([]));
  }, [user]);

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    setError(''); setSuccess('');
    fetch('http://localhost:3000/api/breakdownHistory', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId: user.id || user._id,
        truckId: form.truckId,
        description: form.description
      })
    })
      .then(res => res.json())
      .then(data => {
        if (data.error) setError(data.error);
        else {
          setSuccess('Panne signalée !');
          setForm({ truckId: '', description: '' });
          // Recharge l'historique après signalement
          fetch('http://localhost:3000/api/breakdownHistory')
            .then(res => res.json())
            .then(data => setHistory(Array.isArray(data) ? data : []))
            .catch(() => setHistory([]));
          if (onReport) onReport();
        }
      });
  };

  return (
    <section className="section">
      <div className="box mb-4" style={{ maxWidth: 1200, margin: '2rem auto', background: '#23272f', borderRadius: 18 }}>
        <h2 className="title has-text-white">Signaler une panne</h2>
        <form onSubmit={handleSubmit}>
          <div className="field">
            <div className="select">
              <select name="truckId" value={form.truckId} onChange={handleChange} required>
                <option value="">Choisir un camion</option>
                {trucks && trucks.map(t => <option key={t._id} value={t._id}>{t.plate}</option>)}
              </select>
            </div>
          </div>
          <div className="field">
            <label className="has-text-white">Description</label>
            <input className="input" name="description" value={form.description} onChange={handleChange} required />
          </div>
          <button type="submit" className="button is-primary">Signaler</button>
          {error && <p className="has-text-danger mt-2">{error}</p>}
          {success && <p className="has-text-success mt-2">{success}</p>}
        </form>
      </div>
      {/* Historique des pannes */}
      <div className="box" style={{ maxWidth: 1200, margin: '2rem auto', background: '#23272f', borderRadius: 18 }}>
        <h3 className="title is-5 has-text-white">Historique des pannes</h3>
        {history.length === 0 ? (
          <p className="has-text-grey-light">Aucune panne signalée.</p>
        ) : (
          <table className="table is-fullwidth is-striped" style={{ background: '#23272f', color: '#fff' }}>
            <thead>
              <tr>
                <th>Date</th>
                <th>Camion</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {history.map((item, idx) => (
                <tr key={item._id || idx}>
                  <td>{new Date(item.date).toLocaleString('fr-FR')}</td>
                  <td>{item.truckId && item.truckId.plate ? item.truckId.plate : 'N/A'}</td>
                  <td>{item.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </section>
  );
};

export default BreakdownForm;
