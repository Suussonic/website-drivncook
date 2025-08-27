import React, { useEffect, useState } from 'react';

const Menus = () => {
  const [menus, setMenus] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMenus = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/menus`);
        if (!response.ok) throw new Error('Erreur lors du chargement des menus');
        const data = await response.json();
        setMenus(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchMenus();
  }, []);

  if (loading) return <div className="has-text-white">Chargement des menus...</div>;
  if (error) return <div className="has-text-danger">{error}</div>;

  return (
    <section className="section" style={{ background: '#181a20', minHeight: '100vh' }}>
      <div className="container" style={{ maxWidth: 900, margin: '2rem auto' }}>
        <h2 className="title has-text-white">Nos Menus</h2>
        <div className="columns is-multiline">
          {menus.map(menu => (
            <div className="column is-half" key={menu.id}>
              <div className="box" style={{ background: '#23272f', borderRadius: 12, minHeight: 120 }}>
                <h3 className="subtitle has-text-white">{menu.name} <span className="tag is-info is-light ml-2">{menu.price.toFixed(2)} €</span></h3>
                <p className="has-text-white">{menu.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <p className="has-text-white mt-3">Tous nos plats sont préparés à partir de produits frais et locaux dans nos cuisines d'entrepôt.</p>
      </div>
    </section>
  );


};

export default Menus;
