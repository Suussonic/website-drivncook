
import React, { useEffect, useState } from 'react';

const ApprovisionnementAdmin = () => {
  const [supplies, setSupplies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:3000';
    fetch(`${apiUrl}/api/supplies`)
      .then(res => {
        if (!res.ok) throw new Error('Erreur lors du chargement des approvisionnements');
        return res.json();
      })
      .then(data => {
        setSupplies(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const filterSupplies = (supplies) => {
    if (!search.trim()) return supplies;
    const s = search.toLowerCase();
    return supplies.filter(sup => {
      const produits = (sup.items || []).map(i => i.name).join(' ');
      return (
        (sup.warehouseId?.name && sup.warehouseId.name.toLowerCase().includes(s)) ||
        (produits && produits.toLowerCase().includes(s))
      );
    });
  };

  if (loading) return <div className="has-text-white">Chargement des approvisionnements...</div>;
  if (error) return <div className="has-text-danger">{error}</div>;

  return (
    <section className="section">
      <div className="box" style={{ maxWidth: 1200, margin: '2rem auto', background: '#23272f', borderRadius: 18 }}>
        <h2 className="title has-text-white">Approvisionnements d'entrepôt</h2>
        <div style={{ marginBottom: 20, display: 'flex', justifyContent: 'flex-end' }}>
          <input
            className="input"
            style={{ maxWidth: 300 }}
            type="text"
            placeholder="Rechercher (entrepôt, produit, fournisseur...)"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <table className="table is-fullwidth is-hoverable" style={{ background: '#23272f', color: '#fff', borderRadius: 12 }}>
          <thead>
            <tr>
              <th>Date</th>
              <th>Entrepôt</th>
              <th>Produits</th>
            </tr>
          </thead>
          <tbody>
            {filterSupplies(supplies).map(s => (
              <tr key={s._id}>
                <td>{s.createdAt ? new Date(s.createdAt).toLocaleString() : '-'}</td>
                <td>{s.warehouseId?.name || s.warehouseId || '-'}</td>
                <td>
                  <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
                    {Array.isArray(s.items) && s.items.length > 0 ? (
                      s.items.map((item, idx) => (
                        <li key={idx}>
                          <b>{item.name || item.productName || '-'}</b> <span className="tag is-info is-light ml-2">x{item.quantity}</span>
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
        {filterSupplies(supplies).length === 0 && (
          <div className="has-text-grey-light" style={{ textAlign: 'center', marginTop: 30 }}>Aucun approvisionnement trouvé.</div>
        )}
      </div>
    </section>
  );
};

export default ApprovisionnementAdmin;
