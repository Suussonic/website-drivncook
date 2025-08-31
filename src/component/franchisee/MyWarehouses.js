
import React, { useEffect, useState } from 'react';

const API_URL = process.env.REACT_APP_API_URL || '';


const MyWarehouses = ({ user }) => {
  const [warehouses, setWarehouses] = useState([]);
  const [menus, setMenus] = useState([]);
  const [reservation, setReservation] = useState({});
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');

  useEffect(() => {
    setLoading(true);
    setError(null);
    Promise.all([
      fetch(`${API_URL}/warehouses`).then(res => res.json()),
      fetch(`${API_URL}/menus`).then(res => res.json()),
      user?.id
        ? fetch(`${API_URL}/reservations?userId=${user.id}`).then(res => res.json())
        : Promise.resolve([])
    ])
      .then(([warehousesData, menusData, historyData]) => {
        setWarehouses(Array.isArray(warehousesData) ? warehousesData : []);
        setMenus(Array.isArray(menusData) ? menusData : []);
        setHistory(Array.isArray(historyData) ? historyData : []);
      })
      .catch(err => {
        setError('Erreur lors du chargement des entrepôts ou menus');
      })
      .finally(() => setLoading(false));
  }, [user]);

  const handleSlider = (warehouseId, menuId, max, value) => {
    setReservation(r => ({ ...r, [`${warehouseId}_${menuId}`]: Math.min(Number(value), max) }));
  };

  const handleReserve = async (warehouse) => {
    const items = warehouse.stock.map(s => ({
      name: menus.find(m => m._id === s.menuId)?.name || s.menuId,
      menuId: s.menuId,
      quantity: reservation[`${warehouse._id}_${s.menuId}`] || 0
    })).filter(i => i.quantity > 0);
    if (!items.length) {
      alert('Sélectionnez au moins un menu à réserver.');
      return;
    }
    const body = {
      userId: user.id || user._id,
      warehouseId: warehouse._id,
      items
    };
    console.log('Reservation POST body:', body);
    try {
      const res = await fetch(`${API_URL}/reservations`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        alert('Erreur lors de la réservation : ' + (err.error || res.statusText));
        return;
      }
      const data = await res.json();
      setHistory(h => [data, ...h]);
      setWarehouses(ws => ws.map(w => w._id === warehouse._id ? {
        ...w,
        stock: w.stock.map(s => ({
          ...s,
          quantity: Math.max(0, s.quantity - (reservation[`${w._id}_${s.menuId}`] || 0))
        }))
      } : w));
      warehouse.stock.forEach(s => setReservation(r => ({ ...r, [`${warehouse._id}_${s.menuId}`]: 0 })));
    } catch (e) {
      alert('Erreur lors de la réservation.');
      console.error(e);
    }
  };

  const menuMap = Object.fromEntries(menus.map(m => [m._id, m.name]));

  if (loading) return <div className="has-text-white">Chargement des entrepôts...</div>;
  if (error) return <div className="has-text-danger">{error}</div>;

  // Filtrage des entrepôts selon la recherche
  const filteredWarehouses = warehouses.filter(w =>
    (!search ||
      (w.name && w.name.toLowerCase().includes(search.toLowerCase())) ||
      (w.location && w.location.toLowerCase().includes(search.toLowerCase()))
    )
  );

  return (
    <section className="section">
      <div className="box" style={{ maxWidth: 1200, margin: '2rem auto', background: '#23272f', borderRadius: 18 }}>
        <h2 className="title has-text-white">Entrepôts disponibles</h2>
        <div className="field mb-4" style={{ maxWidth: 350 }}>
          <div className="control has-icons-left">
            <input
              className="input"
              type="text"
              placeholder="Rechercher un entrepôt par nom ou localisation..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{ background: '#181a20', color: '#fff', border: 'none' }}
            />
            <span className="icon is-left">
              <i className="fas fa-search" />
            </span>
          </div>
        </div>
        <table className="table is-fullwidth is-hoverable" style={{ background: '#23272f', color: '#fff', borderRadius: 12 }}>
          <thead>
            <tr>
              <th>Nom</th>
              <th>Localisation</th>
              <th>Stock</th>
              <th>Commander</th>
            </tr>
          </thead>
          <tbody>
            {filteredWarehouses.map(w => (
              <tr key={w._id}>
                <td>{w.name}</td>
                <td>{w.location}</td>
                <td>
                  {Array.isArray(w.stock) && w.stock.length > 0
                    ? w.stock.map(s => (
                        <div key={s.menuId} style={{ marginBottom: 8 }}>
                          {menuMap[s.menuId] || s.menuId} : {s.quantity}
                          <input
                            type="range"
                            min={0}
                            max={s.quantity}
                            value={reservation[`${w._id}_${s.menuId}`] || 0}
                            onChange={e => handleSlider(w._id, s.menuId, s.quantity, e.target.value)}
                            style={{ width: 120, marginLeft: 8, marginRight: 8 }}
                          />
                          <span>{reservation[`${w._id}_${s.menuId}`] || 0}</span>
                        </div>
                      ))
                    : '—'}
                </td>
                <td>
                  <button className="button is-primary" onClick={() => handleReserve(w)}>Réserver</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <h3 className="title is-5 has-text-white mt-5">Historique des réservations</h3>
        <table className="table is-fullwidth is-hoverable" style={{ background: '#23272f', color: '#fff', borderRadius: 12 }}>
          <thead>
            <tr>
              <th>Date</th>
              <th>Entrepôt</th>
              <th>Menus réservés</th>
            </tr>
          </thead>
          <tbody>
            {history.map(h => (
              <tr key={h._id || `${h.date}_${h.warehouseId?._id || h.warehouseId}`}>
                <td>{h.date ? new Date(h.date).toLocaleString() : '-'}</td>
                <td>{h.warehouseId?.name || h.warehouseId || '-'}</td>
                <td>
                  <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
                    {Array.isArray(h.items) && h.items.length > 0 ? (
                      h.items.map((item) => (
                        <li key={item.menuId || item.name}>
                          <b>{item.name}</b> <span className="tag is-info is-light ml-2">x{item.quantity}</span>
                        </li>
                      ))
                    ) : (
                      <li>-</li>
                    )}
                  </ul>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default MyWarehouses;
