import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';


// On suppose que l'utilisateur est stocké dans le localStorage (comme après login)
import Navbar from '../layout/Navbar';

const TruckDetails = () => {
  const { id } = useParams();
  const [truck, setTruck] = useState(null);
  const [menus, setMenus] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantities, setQuantities] = useState({});
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [orderError, setOrderError] = useState(null);
  const navigate = useNavigate();

  // Récupère l'utilisateur connecté (null si non connecté)
  let user = null;
  try {
    user = JSON.parse(localStorage.getItem('user'));
  } catch {}

  useEffect(() => {
    setLoading(true);
    Promise.all([
      fetch(`${process.env.REACT_APP_API_URL}/trucks/${id}`).then(res => {
        if (!res.ok) throw new Error('Erreur lors du chargement du food truck');
        return res.json();
      }),
      fetch(`${process.env.REACT_APP_API_URL}/menus`).then(res => {
        if (!res.ok) throw new Error('Erreur lors du chargement des menus');
        return res.json();
      })
    ])
      .then(([truckData, menusData]) => {
        setTruck(truckData);
        setMenus(menusData);
        setLoading(false);
      })
      .catch(err => { setError(err.message); setLoading(false); });
  }, [id]);

  const handleQtyChange = (menuId, value) => {
    setQuantities(q => ({ ...q, [menuId]: Math.max(0, parseInt(value) || 0) }));
  };

  const handleOrder = async e => {
    e.preventDefault();
    setOrderSuccess(false);
    setOrderError(null);
    if (!user) {
      setOrderError('Vous devez être connecté pour réserver.');
      return;
    }
    const items = Object.entries(quantities)
      .filter(([_, qty]) => qty > 0)
      .map(([menuId, qty]) => {
        const menu = menus.find(m => m.id === menuId || m._id === menuId);
        return menu ? { menuId: menu.id || menu._id, name: menu.name, price: menu.price, quantity: qty } : null;
      })
      .filter(Boolean);
    if (items.length === 0) {
      setOrderError('Sélectionnez au moins un menu.');
      return;
    }
    const order = {
      userId: user.id || user._id,
      truckId: truck._id,
      truckPlate: truck.plate,
      truckCity: truck.city,
      menus: items,
      date: new Date().toISOString(),
      status: 'en attente'
    };
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(order)
      });
      if (!res.ok) throw new Error('Erreur lors de la réservation');
      setOrderSuccess(true);
      setQuantities({});
      setTimeout(() => {
        navigate('/my-orders');
      }, 800);
    } catch (err) {
      setOrderError(err.message);
    }
  };

  if (loading) return <div className="has-text-white">Chargement...</div>;
  if (error) return <div className="has-text-danger">{error}</div>;
  if (!truck) return <div className="has-text-danger">Food truck introuvable.</div>;

  return (
    <>
      <Navbar
        isLogged={!!user}
        user={user}
        forceBackOffice={false}
        onLogout={() => { localStorage.removeItem('user'); window.location.reload(); }}
      />
      <section className="section" style={{ background: '#181a20', minHeight: '100vh' }}>
        <div className="container" style={{ maxWidth: 900, margin: '2rem auto' }}>
          <button className="button is-light mb-4" onClick={() => navigate(-1)}>&larr; Retour</button>
          <div className="columns">
            <div className="column is-5">
              <div className="box" style={{ background: '#23272f', borderRadius: 12 }}>
                <h2 className="title has-text-white">{truck.plate} <span className="tag is-info is-light ml-2">{truck.city || '-'}</span></h2>
                <p className="has-text-white"><b>Adresse :</b> {truck.address || '-'}</p>
                <p className="has-text-white"><b>Horaires :</b> {truck.schedule || '-'}</p>
                <p className="has-text-white"><b>Status :</b> {truck.status || '-'}</p>
                <p className="has-text-white"><b>Description :</b> {truck.desc || '-'}</p>
              </div>
            </div>
            <div className="column is-7">
              <div className="box" style={{ background: '#23272f', borderRadius: 12 }}>
                <h3 className="subtitle has-text-white">Menus disponibles</h3>
                <div style={{ marginBottom: 18, display: 'flex', justifyContent: 'flex-end' }}>
                  <input
                    className="input"
                    style={{ maxWidth: 300 }}
                    type="text"
                    placeholder="Rechercher un menu..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                  />
                </div>
                <form onSubmit={handleOrder}>
                  {menus.length === 0 && <div className="has-text-white">Aucun menu disponible.</div>}
                  {menus
                    .filter(menu => {
                      const s = search.toLowerCase();
                      return menu.name.toLowerCase().includes(s) || menu.desc.toLowerCase().includes(s);
                    })
                    .map(menu => (
                      <div key={menu.id || menu._id} className="columns is-vcentered mb-2" style={{ borderBottom: '1px solid #333', paddingBottom: 8 }}>
                        <div className="column is-5">
                          <span className="has-text-white"><b>{menu.name}</b></span>
                          <span className="tag is-info is-light ml-2">{menu.price.toFixed(2)} €</span>
                          <p className="has-text-white is-size-7">{menu.desc}</p>
                        </div>
                        <div className="column is-4">
                          <input
                            type="number"
                            min="0"
                            className="input"
                            style={{ maxWidth: 80, background: '#181a20', color: '#fff', border: 'none' }}
                            value={quantities[menu.id || menu._id] || ''}
                            onChange={e => handleQtyChange(menu.id || menu._id, e.target.value)}
                            placeholder="Qté"
                            disabled={!user}
                          />
                        </div>
                      </div>
                    ))}
                  {orderError && <div className="notification is-danger mt-3">{orderError}</div>}
                  {orderSuccess && <div className="notification is-success mt-3">Réservation enregistrée !</div>}
                  <button className="button is-success mt-4" type="submit" disabled={!user}>Réserver</button>
                  {!user && <div className="has-text-warning mt-2">Connectez-vous pour réserver des menus.</div>}
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default TruckDetails;
