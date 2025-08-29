


import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams, useNavigate } from 'react-router-dom';

const TruckDetails = () => {
  const { t } = useTranslation();
  // Récupère l'utilisateur connecté (null si non connecté)
  const user = React.useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem('user'));
    } catch {
      return null;
    }
  }, []);
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


  // Calcul du total et réduction (affichage uniquement)
  const total = Object.entries(quantities).reduce((sum, [menuId, qty]) => {
    const menu = menus.find(m => m.id === menuId || m._id === menuId);
    return sum + (menu ? menu.price * (parseInt(qty) || 0) : 0);
  }, 0);
  // Remise dynamique selon fidélité : 1% par achat, max 30%
  const [orderCount, setOrderCount] = useState(0);
  const [remise, setRemise] = useState(0);
  useEffect(() => {
    if (!user || !user.email) return;
    fetch(`${process.env.REACT_APP_API_URL}/orders`)
      .then(res => {
        if (!res.ok) throw new Error('Erreur lors du chargement des achats');
        return res.json();
      })
      .then(data => {
        const filtered = data.filter(order => {
          const userObj = order.userId;
          if (!userObj || !userObj.email || !user.email) return false;
          return userObj.email === user.email;
        });
        setOrderCount(filtered.length);
        setRemise(Math.min(filtered.length, 30));
      })
      .catch(() => {
        setOrderCount(0);
        setRemise(0);
      });
  }, [user]);
  const totalReduit = total * (1 - remise / 100);



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
      status: 'en attente',
      total,
      remise,
      totalReduit
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

  if (loading) return <div className="has-text-white">{t('Chargement...')}</div>;
  if (error) return <div className="has-text-danger">{error}</div>;
  if (!truck) return <div className="has-text-danger">{t('Food truck introuvable.')}</div>;

  return (
    <>

      <section className="section" style={{ background: '#181a20', minHeight: '100vh' }}>
        <div className="container" style={{ maxWidth: 900, margin: '2rem auto' }}>
          <button className="button is-light mb-4" onClick={() => navigate(-1)}>&larr; {t('Retour')}</button>
          <div className="columns">
            <div className="column is-5">
              <div className="box" style={{ background: '#23272f', borderRadius: 12 }}>
                <h2 className="title has-text-white">{truck.plate} <span className="tag is-info is-light ml-2">{truck.city || '-'}</span></h2>
                <p className="has-text-white"><b>{t('Address')} :</b> {truck.address || '-'}</p>
                <p className="has-text-white"><b>{t('Hours')} :</b> {truck.schedule || '-'}</p>
                <p className="has-text-white"><b>{t('Status')} :</b> {t(truck.status) || '-'}</p>
                <p className="has-text-white"><b>{t('Description')} :</b> {truck.desc || '-'}</p>
              </div>
            </div>
            <div className="column is-7">
              <div className="box" style={{ background: '#23272f', borderRadius: 12 }}>
                <h3 className="subtitle has-text-white">{t('Available menus')}</h3>
                <div style={{ marginBottom: 18, display: 'flex', justifyContent: 'flex-end' }}>
                  <input
                    className="input"
                    style={{ maxWidth: 300 }}
                    type="text"
                    placeholder={t('Search a menu...')}
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                  />
                </div>
                <form onSubmit={handleOrder}>
                  {menus.length === 0 && <div className="has-text-white">{t('No menu found.')}</div>}
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
                            placeholder={t('Qty')}
                            disabled={!user}
                          />
                        </div>
                      </div>
                    ))}
                  {orderError && <div className="notification is-danger mt-3">{orderError}</div>}
                  {orderSuccess && <div className="notification is-success mt-3">{t('Réservation enregistrée !')}</div>}
                  <button className="button is-success mt-4" type="submit" disabled={!user}>{t('Book')}</button>
                  <div style={{ color: '#fff', fontWeight: 600, marginTop: 12 }}>
                    {t('Total')} : {total.toFixed(2)} €
                    <span style={{ color: '#3ec1ef', marginLeft: 8 }}>
                      ({t('With a discount of')} {remise}% : {totalReduit.toFixed(2)} €)
                    </span>
                  </div>
                  {!user && <div className="has-text-warning mt-2">{t('Connectez-vous pour réserver des menus.')}</div>}
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
