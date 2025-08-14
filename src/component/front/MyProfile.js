import React, { useState } from 'react';

const MyProfile = ({ user, onUpdate }) => {
  const [form, setForm] = useState({ name: user?.name || '', email: user?.email || '' });
  const [success, setSuccess] = useState(false);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = e => {
    e.preventDefault();
    onUpdate(form);
    setSuccess(true);
    setTimeout(() => setSuccess(false), 2000);
  };

  return (
    <section className="section">
      <h2 className="title">Mon profil</h2>
      <form onSubmit={handleSubmit} style={{ maxWidth: 400 }}>
        <div className="field">
          <label className="label">Nom</label>
          <div className="control">
            <input className="input" name="name" value={form.name} onChange={handleChange} />
          </div>
        </div>
        <div className="field">
          <label className="label">Email</label>
          <div className="control">
            <input className="input" name="email" value={form.email} onChange={handleChange} />
          </div>
        </div>
        <button className="button is-primary" type="submit">Enregistrer</button>
        {success && <div className="notification is-success mt-2">Profil mis à jour !</div>}
      </form>
    </section>
  );
};

export default MyProfile;
