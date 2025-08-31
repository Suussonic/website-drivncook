import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';


const MyOrders = ({ user }) => {
  const { t } = useTranslation();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/orders`);
        if (!response.ok) throw new Error('Erreur lors du chargement des commandes');
        const data = await response.json();
        // Filtrer par email de l'utilisateur connecté
        const filtered = data.filter(order => {
          const userObj = order.userId;
          if (!userObj || !userObj.email || !user?.email) return false;
          return userObj.email === user.email;
        });
        setOrders(filtered);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [user]);

  const filterOrders = (orders) => {
    if (!search.trim()) return orders;
    const s = search.toLowerCase();
    return orders.filter(order => {
      const truck = order.truckId || {};
      const menus = (order.menus || []).map(m => m.name).join(' ');
      return (
        (truck.plate && truck.plate.toLowerCase().includes(s)) ||
        (truck.city && truck.city.toLowerCase().includes(s)) ||
        (truck.address && truck.address.toLowerCase().includes(s)) ||
        (menus && menus.toLowerCase().includes(s)) ||
        (order.status && order.status.toLowerCase().includes(s))
      );
    });
  };

  return (
    <section className="section">
      <div className="box" style={{ maxWidth: 1200, margin: '2rem auto', background: '#23272f', borderRadius: 18 }}>
  <h2 className="title has-text-white">{t('Mes achats')}</h2>
        <div style={{ marginBottom: 20, display: 'flex', justifyContent: 'flex-end' }}>
          <input
            className="input"
            style={{ maxWidth: 300 }}
            type="text"
            placeholder={t('Rechercher (food truck, menu, ville...)')}
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <table className="table is-fullwidth is-hoverable" style={{ background: '#23272f', color: '#fff', borderRadius: 12 }}>
          <thead>
            <tr>
              <th>{t('Food Truck')}</th>
              <th>{t('Adresse food truck')}</th>
              <th>{t('Menus & Quantités')}</th>
              <th>{t('Prix total')}</th>
              <th>{t('Date')}</th>
              <th>{t('Statut')}</th>
            </tr>
          </thead>
          <tbody>
            {filterOrders(orders).map(order => {
              const truck = order.truckId || {};
              const total = (order.menus || []).reduce((sum, m) => sum + (m.price * m.quantity), 0);
              return (
                <tr key={order._id}>
                  <td>{truck.plate} {truck.city ? `(${truck.city})` : ''}</td>
                  <td>{truck.address}</td>
                  <td>
                    <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
                      {(order.menus || []).map((m, i) => (
                        <li key={m.menuId || i}>
                          <b>{t(m.name)}</b> <span className="tag is-info is-light ml-2">x{m.quantity}</span> <span className="has-text-grey-light">({m.price.toFixed(2)} €)</span>
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td><b>{total.toFixed(2)} €</b></td>
                  <td>{order.date ? new Date(order.date).toLocaleString() : ''}</td>
                  <td>{t(order.status)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {filterOrders(orders).length === 0 && (
          <div className="has-text-grey-light" style={{ textAlign: 'center', marginTop: 30 }}>{t('Aucun achat trouvé.')}</div>
        )}
      </div>
    </section>
  );
};

export default MyOrders;
// Fichier supprimé
