
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';


const Menus = () => {
  const [menus, setMenus] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
    const { t } = useTranslation();

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

  const filteredMenus = menus.filter(menu => {
    const s = search.toLowerCase();
    return (
      menu.name.toLowerCase().includes(s) ||
      menu.desc.toLowerCase().includes(s)
    );
  });

    if (loading) return <div className="has-text-white">{t('Chargement des menus...')}</div>;
    if (error) return <div className="has-text-danger">{t(error)}</div>;

  return (
    <section className="section" style={{ background: '#181a20', minHeight: '100vh' }}>
      <div className="container" style={{ maxWidth: 900, margin: '2rem auto' }}>
        <h2 className="title has-text-white">Nos Menus</h2>
        <p className="has-text-white mt-3" style={{ fontSize: '1.15rem', marginBottom: 24 }}>
            {t("Tous nos plats sont préparés à partir de produits frais et locaux dans nos cuisines d'entrepôt.")}
        </p>
        <div style={{ marginBottom: 24, display: 'flex', justifyContent: 'center' }}>
          <input
            className="input"
            style={{ maxWidth: 350 }}
            type="text"
              placeholder={t('Rechercher un menu...')}
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <div className="columns is-multiline">
          {filteredMenus.length === 0 ? (
            <div className="has-text-grey-light" style={{ textAlign: 'center', width: '100%' }}>Aucun menu trouvé.</div>
          ) : (
            filteredMenus.map(menu => (
              <div className="column is-half" key={menu.id}>
                <div className="box" style={{ background: '#23272f', borderRadius: 12, minHeight: 120 }}>
                  <h3 className="subtitle has-text-white">{menu.name} <span className="tag is-info is-light ml-2">{menu.price.toFixed(2)} €</span></h3>
                  <p className="has-text-white">{menu.desc}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default Menus;
