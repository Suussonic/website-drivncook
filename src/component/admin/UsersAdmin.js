import React, { useEffect, useState } from 'react';

const emptyUser = { email: '', motDePasse: '', nom: '', prenom: '', role: 'client' };

const UsersAdmin = () => {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState(emptyUser);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/users`)
      .then(res => res.json())
      .then(data => { setUsers(data); setLoading(false); });
  }, []);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError(null);
    try {
      if (editingId) {
        // Ne pas envoyer motDePasse si vide (pour ne pas l'effacer)
        const formToSend = { ...form };
        if (!formToSend.motDePasse) delete formToSend.motDePasse;
        const res = await fetch(`${process.env.REACT_APP_API_URL}/users/${editingId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formToSend)
        });
        if (!res.ok) throw new Error('Erreur lors de la modification');
        const updated = await res.json();
        setUsers(users.map(u => u._id === editingId ? updated : u));
        setEditingId(null);
      } else {
        const res = await fetch(`${process.env.REACT_APP_API_URL}/users`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form)
        });
        if (!res.ok) throw new Error('Erreur lors de l\'ajout');
        const added = await res.json();
        setUsers([...users, added]);
      }
      setForm(emptyUser);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEdit = user => {
    setForm({ ...emptyUser, ...user, motDePasse: '' });
    setEditingId(user._id);
  };

  const handleDelete = async id => {
    setError(null);
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/users/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Erreur lors de la suppression');
      setUsers(users.filter(u => u._id !== id));
      if (editingId === id) {
        setEditingId(null);
        setForm(emptyUser);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <div className="has-text-white">Chargement des utilisateurs...</div>;

  return (
    <section className="section">
      <div className="box" style={{ maxWidth: 900, margin: '2rem auto', background: '#23272f', borderRadius: 18 }}>
        <h2 className="title has-text-white">Gestion des Utilisateurs</h2>
        <form onSubmit={handleSubmit} className="mb-4">
          <div className="field is-grouped is-flex-wrap-wrap">
            <div className="control"><input className="input" name="email" placeholder="Email" value={form.email} onChange={handleChange} required /></div>
            <div className="control"><input className="input" name="motDePasse" placeholder="Mot de passe" value={form.motDePasse} onChange={handleChange} type="password" required={!editingId} /></div>
            <div className="control"><input className="input" name="nom" placeholder="Nom" value={form.nom} onChange={handleChange} /></div>
            <div className="control"><input className="input" name="prenom" placeholder="Prénom" value={form.prenom} onChange={handleChange} /></div>
            <div className="control">
              <select className="input" name="role" value={form.role} onChange={handleChange}>
                <option value="client">Client</option>
                <option value="franchise">Franchisé</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <div className="control">
              <button className="button is-primary" type="submit">{editingId ? 'Modifier' : 'Ajouter'}</button>
            </div>
            {editingId && <div className="control"><button className="button" type="button" onClick={() => { setEditingId(null); setForm(emptyUser); }}>Annuler</button></div>}
          </div>
        </form>
        {error && <div className="has-text-danger mb-2">{error}</div>}
  <table className="table is-fullwidth" style={{ background: '#23272f', color: '#fff', borderRadius: 12 }}>
          <thead>
            <tr>
              <th>Email</th>
              <th>Nom</th>
              <th>Prénom</th>
              <th>Rôle</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user._id}>
                <td>{user.email}</td>
                <td>{user.nom}</td>
                <td>{user.prenom}</td>
                <td>{user.role}</td>
                <td>
                  <button className="button is-small is-info mr-2" onClick={() => handleEdit(user)}>Editer</button>
                  <button className="button is-small is-danger" onClick={() => handleDelete(user._id)}>Supprimer</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default UsersAdmin;
