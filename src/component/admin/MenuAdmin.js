import React, { useState } from 'react';

const initialMenus = [
  { id: 1, name: 'Burger du Chef', price: 12 },
  { id: 2, name: 'Wrap Poulet Fermier', price: 10 },
  { id: 3, name: 'Salade Fraîcheur', price: 9 },
  { id: 4, name: 'Frites maison', price: 4 },
  { id: 5, name: 'Boissons locales', price: 3 },
];

function MenuAdmin() {
  const [menus, setMenus] = useState(initialMenus);
  const [newMenu, setNewMenu] = useState({ name: '', price: '' });

  const handleChange = e => {
    setNewMenu({ ...newMenu, [e.target.name]: e.target.value });
  };

  const handleAdd = e => {
    e.preventDefault();
    if (!newMenu.name || !newMenu.price) return;
    setMenus([...menus, { ...newMenu, id: Date.now(), price: parseFloat(newMenu.price) }]);
    setNewMenu({ name: '', price: '' });
  };

  const handleDelete = id => {
    setMenus(menus.filter(m => m.id !== id));
  };

  return (
    <section className="section">
      <div className="box" style={{ maxWidth: 600, margin: '2rem auto' }}>
        <h2 className="title">Gestion des Menus</h2>
        <form onSubmit={handleAdd} className="mb-4">
          <div className="field is-grouped">
            <div className="control is-expanded">
              <input className="input" name="name" placeholder="Nom du menu" value={newMenu.name} onChange={handleChange} />
            </div>
            <div className="control">
              <input className="input" name="price" type="number" min="0" step="0.01" placeholder="Prix (€)" value={newMenu.price} onChange={handleChange} />
            </div>
            <div className="control">
              <button className="button is-primary" type="submit">Ajouter</button>
            </div>
          </div>
        </form>
        <table className="table is-fullwidth">
          <thead>
            <tr>
              <th>Nom</th>
              <th>Prix (€)</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {menus.map(menu => (
              <tr key={menu.id}>
                <td>{menu.name}</td>
                <td>{menu.price.toFixed(2)}</td>
                <td><button className="button is-danger is-small" onClick={() => handleDelete(menu.id)}>Supprimer</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default MenuAdmin;
