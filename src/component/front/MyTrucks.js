
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

const MyTrucks = ({ user }) => {
  const { t } = useTranslation();
  const [trucks, setTrucks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const [showAdd, setShowAdd] = useState(false);
    const [newTruck, setNewTruck] = useState({ plate: '', address: '', city: '', codePostal: '', startTime: '08:00', endTime: '18:00', status: 'active' });
  const [addError, setAddError] = useState('');

  // Si le user est de type 'franchise', on considère que son id est le franchiseId
  const franchiseId = user?.franchiseId || (user?.role === 'franchise' ? user?.id || user?._id : undefined);

  useEffect(() => {
    const fetchTrucks = async () => {
      try {
        if (!franchiseId) {
          console.log('Pas de franchiseId utilisateur, pas de fetch');
          setTrucks([]);
          return;
        }
        const url = `${process.env.REACT_APP_API_URL}/trucks?franchiseId=${franchiseId}`;
        console.log('Appel API camions:', url);
        const response = await fetch(url);
        const data = await response.json();
        console.log('Réponse API camions:', data);
        if (!response.ok) throw new Error('Erreur lors du chargement des camions');
        setTrucks(Array.isArray(data) ? data : []);
      } catch (err) {
        setError(err.message);
        console.error('Erreur fetch camions:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchTrucks();
  }, [user]);

  const filterTrucks = (trucks) => {
    if (!search.trim()) return trucks;
    const s = search.toLowerCase();
    return trucks.filter(truck => {
      return (
        (truck.plate && truck.plate.toLowerCase().includes(s)) ||
        (truck.city && truck.city.toLowerCase().includes(s)) ||
        (truck.address && truck.address.toLowerCase().includes(s)) ||
        (truck.status && truck.status.toLowerCase().includes(s))
      );
    });
  };


  const handleAddTruck = async (e) => {
    e.preventDefault();
    setAddError('');
    try {
      console.log("franchiseId utilisé pour POST :", franchiseId);
      const response = await fetch(`${process.env.REACT_APP_API_URL}/trucks`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...newTruck, franchiseId })
      });
      const data = await response.json();
      if (!response.ok) {
        setAddError(data.error || 'Erreur lors de l\'ajout du camion');
        return;
      }
      if (data._id) {
        setTrucks(trucks => [...trucks, data]);
        setShowAdd(false);
        setNewTruck({ plate: '', address: '', city: '', codePostal: '', startTime: '08:00', endTime: '18:00', status: 'active' });
      }
    } catch (err) {
      setAddError('Erreur réseau ou serveur.');
    }
  };

  if (loading) return <div>{t('Chargement des camions...')}</div>;
  if (error) return <div className="has-text-danger">{error}</div>;

  return (
    <section className="section">
      <div className="box" style={{ maxWidth: 1200, margin: '2rem auto', background: '#23272f', borderRadius: 18 }}>
        <h2 className="title has-text-white">{t('Mes camions')}</h2>
  {/* Notification franchiseId supprimée */}
        <div style={{ marginBottom: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <button className="button is-success" onClick={() => setShowAdd(s => !s)}>
            {showAdd ? t('Annuler') : t('Ajouter un camion')}
          </button>
          <input
            className="input"
            style={{ maxWidth: 300 }}
            type="text"
            placeholder={t('Rechercher (plaque, ville, adresse...)')}
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        {showAdd && (
          <form onSubmit={handleAddTruck} style={{ marginBottom: 20, background: '#23272f', padding: 20, borderRadius: 12 }}>
            <div className="field is-grouped" style={{ flexWrap: 'wrap', gap: 12 }}>
              <input className="input mr-2" style={{ minWidth: 120, maxWidth: 200, flex: '1 1 140px' }} placeholder={t('Plaque')} value={newTruck.plate} onChange={e => setNewTruck(tk => ({ ...tk, plate: e.target.value }))} required />
              <input className="input mr-2" style={{ minWidth: 180, maxWidth: 300, flex: '2 1 220px' }} placeholder={t('Adresse')} value={newTruck.address} onChange={e => setNewTruck(tk => ({ ...tk, address: e.target.value }))} required />
              <input className="input mr-2" style={{ minWidth: 90, maxWidth: 120, flex: '1 1 100px' }} placeholder={t('Code postal')} value={newTruck.codePostal} onChange={e => setNewTruck(tk => ({ ...tk, codePostal: e.target.value }))} required />
              <input className="input mr-2" style={{ minWidth: 120, maxWidth: 180, flex: '1 1 140px' }} placeholder={t('Ville')} value={newTruck.city} onChange={e => setNewTruck(tk => ({ ...tk, city: e.target.value }))} required />
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, minWidth: 260 }}>
                <label style={{ color: '#fff', marginRight: 4 }}>{t('Heure début')}</label>
                <select className="input mr-2" style={{ minWidth: 90, maxWidth: 120 }} value={newTruck.startTime} onChange={e => setNewTruck(tk => ({ ...tk, startTime: e.target.value }))} required>
                  {Array.from({length: 48}, (_,i) => {
                    const h = String(Math.floor(i/2)).padStart(2,'0');
                    const m = i%2===0 ? '00' : '30';
                    const val = `${h}:${m}`;
                    return <option key={val} value={val}>{val}</option>;
                  })}
                </select>
                <label style={{ color: '#fff', marginRight: 4 }}>{t('Heure fin')}</label>
                <select className="input mr-2" style={{ minWidth: 90, maxWidth: 120 }} value={newTruck.endTime} onChange={e => setNewTruck(tk => ({ ...tk, endTime: e.target.value }))} required>
                  {Array.from({length: 48}, (_,i) => {
                    const h = String(Math.floor(i/2)).padStart(2,'0');
                    const m = i%2===0 ? '00' : '30';
                    const val = `${h}:${m}`;
                    return <option key={val} value={val}>{val}</option>;
                  })}
                </select>
              </div>
              <button type="submit" className="button is-primary" style={{ minWidth: 90 }}>{t('Ajouter')}</button>
            </div>
            {/* Ligne debug franchiseId supprimée */}
            {addError && <div className="has-text-danger" style={{ marginTop: 10 }}>{addError}</div>}
          </form>
        )}
        <table className="table is-fullwidth is-hoverable" style={{ background: '#23272f', color: '#fff', borderRadius: 12 }}>
          <thead>
            <tr>
              <th>{t('Food Truck')}</th>
              <th>{t('Adresse')}</th>
              <th>{t('Code postal')}</th>
              <th>{t('Ville')}</th>
              <th>{t('Heure début')}</th>
              <th>{t('Heure fin')}</th>
              <th>{t('Statut')}</th>
            </tr>
          </thead>
          <tbody>
            {filterTrucks(trucks).map(truck => (
              <tr key={truck._id}>
                <td>{truck.plate}</td>
                <td>{truck.address}</td>
                <td>{truck.codePostal}</td>
                <td>{truck.city}</td>
                <td>{truck.startTime}</td>
                <td>{truck.endTime}</td>
                <td>{truck.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {filterTrucks(trucks).length === 0 && (
          <div className="has-text-grey-light" style={{ textAlign: 'center', marginTop: 30 }}>{t('Aucun camion trouvé.')}</div>
        )}
      </div>
    </section>
  );
};

export default MyTrucks;
