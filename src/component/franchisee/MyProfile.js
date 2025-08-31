
import React, { useState, useEffect } from 'react';

const MyProfile = ({ user, onUpdate }) => {
  const [profile, setProfile] = useState(user || {});
  const [edit, setEdit] = useState(false);
  const [form, setForm] = useState({ nom: '', prenom: '', email: '' });

  useEffect(() => {
    if (!user) return;
    fetch(`/api/users/${user._id}`)
      .then(res => res.json())
      .then(data => setProfile(data));
  }, [user]);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });
  const handleEdit = () => {
    setForm({ nom: profile.nom || '', prenom: profile.prenom || '', email: profile.email || '' });
    setEdit(true);
  };
  const handleSave = () => {
    fetch(`/api/users/${user._id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    })
      .then(res => res.json())
      .then(data => {
        setProfile(data);
        setEdit(false);
        if (onUpdate) onUpdate(data);
      });
  };

  return (
    <section className="section">
      <h2 className="title">Mon profil</h2>
      {edit ? (
        <>
          <input name="nom" value={form.nom} onChange={handleChange} placeholder="Nom" />
          <input name="prenom" value={form.prenom} onChange={handleChange} placeholder="Prénom" />
          <input name="email" value={form.email} onChange={handleChange} placeholder="Email" />
          <button className="button is-success" onClick={handleSave}>Enregistrer</button>
        </>
      ) : (
        <>
          <p>Nom : {profile.nom}</p>
          <p>Prénom : {profile.prenom}</p>
          <p>Email : {profile.email}</p>
          <button className="button is-info" onClick={handleEdit}>Modifier</button>
        </>
      )}
    </section>
  );
};

export default MyProfile;
