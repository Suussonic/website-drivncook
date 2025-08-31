import React, { useEffect, useState } from 'react';

function MenuAdmin() {
  const [menus, setMenus] = useState([]);
  const [newMenu, setNewMenu] = useState({ name: '', price: '', desc: '' });
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

  const handleChange = e => {
    setNewMenu({ ...newMenu, [e.target.name]: e.target.value });
  };

  const handleAdd = async e => {
    e.preventDefault();
    if (!newMenu.name || !newMenu.price || !newMenu.desc) return;
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/menus`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newMenu.name, price: parseFloat(newMenu.price), desc: newMenu.desc })
      });
      if (!response.ok) throw new Error('Erreur lors de l\'ajout du menu');
      const added = await response.json();
      setMenus([...menus, added]);
      setNewMenu({ name: '', price: '', desc: '' });
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async id => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/menus/${id}`, { method: 'DELETE' });
      if (!response.ok) throw new Error('Erreur lors de la suppression');
      setMenus(menus.filter(m => m._id !== id && m.id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <div className="has-text-white">Chargement des menus...</div>;
  if (error) return <div className="has-text-danger">{error}</div>;

  return (
    <section className="section">
      <div className="box" style={{ maxWidth: 600, margin: '2rem auto', background: '#23272f', borderRadius: 18 }}>
        <h2 className="title has-text-white">Gestion des Menus</h2>
        <form onSubmit={handleAdd} className="mb-4">
          <div className="field is-grouped">
            <div className="control is-expanded">
              <input className="input" name="name" placeholder="Nom du menu" value={newMenu.name} onChange={handleChange} />
            </div>
            <div className="control">
              <input className="input" name="price" type="number" min="0" step="0.01" placeholder="Prix (€)" value={newMenu.price} onChange={handleChange} />
            </div>
            <div className="control is-expanded">
              <input className="input" name="desc" placeholder="Description" value={newMenu.desc} onChange={handleChange} />
            </div>
            <div className="control">
              <button className="button is-primary" type="submit">Ajouter</button>
            </div>
          </div>
        </form>
  <table className="table is-fullwidth" style={{ background: '#23272f', color: '#fff', borderRadius: 12 }}>
          <thead>
            <tr>
              <th>Nom</th>
              <th>Prix (€)</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {menus.map(menu => (
              <tr key={menu._id || menu.id}>
                <td>{menu.name}</td>
                <td>{menu.price.toFixed(2)}</td>
                <td><button className="button is-danger is-small" onClick={() => handleDelete(menu._id || menu.id)}>Supprimer</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default MenuAdmin;
