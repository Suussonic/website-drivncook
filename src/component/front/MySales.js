import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

const MySales = ({ user }) => {
  const { t } = useTranslation();
  const [sales, setSales] = useState([]);
  const [trucks, setTrucks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');

  // Récupère tous les camions (pour pouvoir vérifier le franchiseId de chaque truck)
  useEffect(() => {
    const fetchTrucks = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/trucks`);
        if (!response.ok) throw new Error('Erreur lors du chargement des camions');
        const data = await response.json();
        console.log('Trucks API data:', data);
        setTrucks(Array.isArray(data) ? data : []);
      } catch (err) {
        setTrucks([]);
      }
    };
    fetchTrucks();
  }, []);

  // Récupère toutes les commandes
  useEffect(() => {
    const fetchSales = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/orders`);
        if (!response.ok) throw new Error('Erreur lors du chargement des ventes');
        const data = await response.json();
        console.log('Orders API data:', data);
        setSales(Array.isArray(data) ? data : []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchSales();
  }, [user]);


  // Affiche l'id du user connecté
  console.log('User connecté:', user);
  // Affiche tous les trucks récupérés
  console.log('Trucks récupérés:', trucks);
  // Filtrer les ventes pour n'afficher que celles dont le truck appartient à la franchise du user connecté
  const salesOfFranchise = sales.filter(sale => {
    if (!sale.truckId) return false;
    const truckId = sale.truckId._id || sale.truckId;
    const truck = trucks.find(t => String(t._id) === String(truckId));
    if (truck) {
      console.log('Vente:', sale._id, 'Truck:', truck._id, 'franchiseId truck:', truck.franchiseId, 'franchiseId user:', user?.franchiseId);
    }
  return truck && String(truck.franchiseId) === String(user?.franchiseId);
  });
  console.log('Ventes filtrées pour la franchise:', salesOfFranchise);

  const filterSales = (salesList) => {
    if (!search.trim()) {
      return salesList;
    }
    const s = search.toLowerCase();
    return salesList.filter(sale => {
      const truck = sale.truckId || {};
      const menus = (sale.menus || []).map(m => m.name).join(' ');
      return (
        (truck.plate && truck.plate.toLowerCase().includes(s)) ||
        (truck.city && truck.city.toLowerCase().includes(s)) ||
        (truck.address && truck.address.toLowerCase().includes(s)) ||
        (menus && menus.toLowerCase().includes(s)) ||
        (sale.status && sale.status.toLowerCase().includes(s))
      );
    });
  };

  if (loading) return <div>{t('Chargement des ventes...')}</div>;
  if (error) return <div className="has-text-danger">{error}</div>;

  return (
    <section className="section">
      <div className="box" style={{ maxWidth: 1200, margin: '2rem auto', background: '#23272f', borderRadius: 18 }}>
        <h2 className="title has-text-white">{t('Mes ventes')}</h2>
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
            {filterSales(salesOfFranchise).map(sale => {
              const truck = sale.truckId || {};
              const total = (sale.menus || []).reduce((sum, m) => sum + (m.price * m.quantity), 0);
              return (
                <tr key={sale._id}>
                  <td>{truck.plate} {truck.city ? `(${truck.city})` : ''}</td>
                  <td>{truck.address}</td>
                  <td>
                    <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
                      {(sale.menus || []).map((m, i) => (
                        <li key={m.menuId || i}>
                          <b>{m.name}</b> <span className="tag is-info is-light ml-2">x{m.quantity}</span> <span className="has-text-grey-light">({m.price ? m.price.toFixed(2) : ''} €)</span>
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td><b>{total.toFixed(2)} €</b></td>
                  <td>{sale.date ? new Date(sale.date).toLocaleString() : ''}</td>
                  <td>{sale.status}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {filterSales(sales).length === 0 && (
          <div className="has-text-grey-light" style={{ textAlign: 'center', marginTop: 30 }}>{t('Aucune vente trouvée.')}</div>
        )}
      </div>
    </section>
  );
};

export default MySales;
