
import React, { useEffect, useState } from 'react';

const getMenus = () => {
  // Simule un fetch localStorage ou API
  const local = localStorage.getItem('menus');
  if (local) return JSON.parse(local);
  return [
    { id: 1, name: 'Burger du Chef', price: 12, desc: 'Pain artisanal, steak frais, cheddar affiné, sauce maison.' },
    { id: 2, name: 'Wrap Poulet Fermier', price: 10, desc: 'Poulet fermier, crudités, sauce yaourt, galette moelleuse.' },
    { id: 3, name: 'Salade Fraîcheur', price: 9, desc: 'Mélange de jeunes pousses, légumes croquants, vinaigrette maison.' },
    { id: 4, name: 'Frites maison', price: 4, desc: 'Pommes de terre françaises, double cuisson, sel de Guérande.' },
    { id: 5, name: 'Boissons locales', price: 3, desc: 'Sodas et jus artisanaux d’Île-de-France.' },
  ];
};

const Menus = () => {
  const [menus, setMenus] = useState([]);

  useEffect(() => {
    setMenus(getMenus());
  }, []);

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
