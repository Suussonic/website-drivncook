

import React, { useEffect, useState } from 'react';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  // Les users et trucks sont déjà peuplés dans l'objet order

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/orders`);
        if (!response.ok) throw new Error('Erreur lors du chargement des commandes');
        const data = await response.json();
        setOrders(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const filterOrders = (orders) => {
    if (!search.trim()) return orders;
    const s = search.toLowerCase();
    return orders.filter(order => {
      const user = order.userId || {};
      const truck = order.truckId || {};
      const menus = (order.menus || []).map(m => m.name).join(' ');
      return (
        (user.nom && user.nom.toLowerCase().includes(s)) ||
        (user.prenom && user.prenom.toLowerCase().includes(s)) ||
        (user.email && user.email.toLowerCase().includes(s)) ||
        (user.adresseLivraison && user.adresseLivraison.toLowerCase().includes(s)) ||
        (truck.plate && truck.plate.toLowerCase().includes(s)) ||
        (truck.city && truck.city.toLowerCase().includes(s)) ||
        (truck.address && truck.address.toLowerCase().includes(s)) ||
        (menus && menus.toLowerCase().includes(s)) ||
        (order.status && order.status.toLowerCase().includes(s))
      );
    });
  };

  if (loading) return <div className="has-text-white">Chargement des commandes...</div>;
  if (error) return <div className="has-text-danger">{error}</div>;

  return (
    <section className="section">
      <div className="box" style={{ maxWidth: 1200, margin: '2rem auto', background: '#23272f', borderRadius: 18 }}>
        <h2 className="title has-text-white">Achats / Réservations</h2>
        <div style={{ marginBottom: 20, display: 'flex', justifyContent: 'flex-end' }}>
          <input
            className="input"
            style={{ maxWidth: 300 }}
            type="text"
            placeholder="Rechercher (client, email, food truck, menu...)"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <table className="table is-fullwidth is-hoverable" style={{ background: '#23272f', color: '#fff', borderRadius: 12 }}>
          <thead>
            <tr>
              <th>Client</th>
              <th>Email</th>
              <th>Adresse client</th>
              <th>Food Truck</th>
              <th>Adresse food truck</th>
              <th>Menus & Quantités</th>
              <th>Prix total</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filterOrders(orders).map(order => {
              const user = order.userId || {};
              const truck = order.truckId || {};
              const total = (order.menus || []).reduce((sum, m) => sum + (m.price * m.quantity), 0);
              return (
                <tr key={order._id}>
                  <td>{user.nom} {user.prenom}</td>
                  <td>{user.email}</td>
                  <td>{user.adresseLivraison}</td>
                  <td>{truck.plate} {truck.city ? `(${truck.city})` : ''}</td>
                  <td>{truck.address}</td>
                  <td>
                    <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
                      {(order.menus || []).map((m, i) => (
                        <li key={m.menuId || i}>
                          <b>{m.name}</b> <span className="tag is-info is-light ml-2">x{m.quantity}</span> <span className="has-text-grey-light">({m.price.toFixed(2)} €)</span>
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td><b>{total.toFixed(2)} €</b></td>
                  <td>{order.date ? new Date(order.date).toLocaleString() : ''}</td>
                  <td>{order.status}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {filterOrders(orders).length === 0 && (
          <div className="has-text-grey-light" style={{ textAlign: 'center', marginTop: 30 }}>Aucune commande trouvée.</div>
        )}
      </div>
    </section>
  );
};

export default Orders;
