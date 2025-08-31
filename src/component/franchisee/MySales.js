import React, { useEffect, useState } from 'react';

const MySales = ({ user }) => {
  const [sales, setSales] = useState([]);
  const [trucks, setTrucks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const [franchiseId, setFranchiseId] = useState(user?.franchiseId);

  // Récupère le franchiseId du user connecté si absent
  useEffect(() => {
    if (!user) return;
    if (!user.franchiseId && user._id) {
      fetch('/api/franchises')
        .then(res => res.json())
        .then(data => {
          const myFranchise = data.find(f => String(f.userId?._id || f.userId) === String(user._id));
          if (myFranchise) {
            setFranchiseId(myFranchise._id);
          }
        });
    } else if (user.franchiseId) {
      setFranchiseId(user.franchiseId);
    }
  }, [user]);

  // Récupère tous les camions pour pouvoir filtrer par franchiseId
  useEffect(() => {
    if (!franchiseId) return;
    fetch('/api/trucks')
      .then(res => res.json())
      .then(data => {
        setTrucks(Array.isArray(data) ? data : []);
      })
      .catch(() => setTrucks([]));
  }, [franchiseId]);

  // Récupère toutes les ventes (sales ou orders selon ton backend)
  useEffect(() => {
    fetch('/api/sales')
      .then(res => res.json())
      .then(data => {
        setSales(Array.isArray(data) ? data : []);
      })
      .catch(() => setError('Erreur lors du chargement des ventes'))
      .finally(() => setLoading(false));
  }, [user]);

  // On filtre d'abord les trucks pour ne garder que ceux de la franchise du user connecté
  const trucksOfFranchise = trucks.filter(truck => String(truck.franchiseId) === String(franchiseId));
  const truckIds = trucksOfFranchise.map(truck => String(truck._id));
  // On garde les ventes dont le truckId correspond à un truck de cette franchise
  const filteredSales = sales.filter(sale => {
    const saleTruckId = sale.truckId && (sale.truckId._id || sale.truckId);
    return saleTruckId && truckIds.includes(String(saleTruckId));
  });

  const filterSales = (salesList) => {
    if (!search.trim()) return salesList;
    const s = search.toLowerCase();
    return salesList.filter(sale => {
      const truck = sale.truckId || {};
      const menus = (sale.menus || []).map(m => m.name).join(' ');
      const client = sale.userId || {};
      return (
        (truck.plate && truck.plate.toLowerCase().includes(s)) ||
        (truck.city && truck.city.toLowerCase().includes(s)) ||
        (truck.address && truck.address.toLowerCase().includes(s)) ||
        (menus && menus.toLowerCase().includes(s)) ||
        (sale.status && sale.status.toLowerCase().includes(s)) ||
        (client.nom && client.nom.toLowerCase().includes(s)) ||
        (client.prenom && client.prenom.toLowerCase().includes(s))
      );
    });
  };

  if (loading) return <div>Chargement des ventes...</div>;
  if (error) return <div className="has-text-danger">{error}</div>;

  return (
    <section className="section">
      <div className="box" style={{ maxWidth: 1200, margin: '2rem auto', background: '#23272f', borderRadius: 18 }}>
        <h2 className="title has-text-white">Mes ventes</h2>
        <div style={{ marginBottom: 20, display: 'flex', justifyContent: 'flex-end' }}>
          <input
            className="input"
            style={{ maxWidth: 300 }}
            type="text"
            placeholder="Rechercher (food truck, menu, ville, client...)"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <table className="table is-fullwidth is-hoverable" style={{ background: '#23272f', color: '#fff', borderRadius: 12 }}>
          <thead>
            <tr>
              <th>Food Truck</th>
              <th>Adresse</th>
              <th>Menu & Quantité</th>
              <th>Prix total</th>
              <th>Date</th>
              <th>Statut</th>
              <th>Client</th>
            </tr>
          </thead>
          <tbody>
            {filterSales(filteredSales).map(sale => {
              const truck = sale.truckId || {};
              const client = sale.userId || {};
              const total = (sale.menus || []).reduce((sum, m) => sum + ((m.priceReduit !== undefined ? m.priceReduit : m.price) * m.quantity), 0);
              return (
                <tr key={sale._id}>
                  <td>{truck.plate} {truck.city ? `(${truck.city})` : ''}</td>
                  <td>{truck.address}</td>
                  <td>
                    <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
                      {(sale.menus || []).map((m, i) => (
                        <li key={m.menuId || i}>
                          <b>{m.name}</b> <span className="tag is-info is-light ml-2">x{m.quantity}</span> <span className="has-text-grey-light">({(m.priceReduit !== undefined ? m.priceReduit : m.price)?.toFixed(2)} €)</span>
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td><b>{total.toFixed(2)} €</b></td>
                  <td>{sale.date ? new Date(sale.date).toLocaleString() : ''}</td>
                  <td>{sale.status}</td>
                  <td>{client.prenom || ''} {client.nom || ''}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {filterSales(filteredSales).length === 0 && (
          <div className="has-text-grey-light" style={{ textAlign: 'center', marginTop: 30 }}>Aucune vente trouvée.</div>
        )}
      </div>
    </section>
  );
};

export default MySales;
