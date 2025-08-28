import React, { useState, useEffect } from 'react';

const Profile = ({ user, onUpdate }) => {
  const [form, setForm] = useState({ ...user });
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [showPwd, setShowPwd] = useState(false);
  const [pwdForm, setPwdForm] = useState({ current: '', new: '' });
  const [pwdSuccess, setPwdSuccess] = useState(false);
  const [pwdError, setPwdError] = useState(null);

  // Remplit le formulaire avec les vraies infos utilisateur
  useEffect(() => {
    if (user && user.id) {
      fetch(`${process.env.REACT_APP_API_URL}/users/${user.id}`)
        .then(res => res.json())
        .then(data => setForm(data));
    }
  }, [user]);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/users/${user.id || user._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      if (!res.ok) throw new Error('Erreur lors de la mise à jour');
      setSuccess(true);
      if (onUpdate) onUpdate(form);
    } catch (err) {
      setError(err.message);
    }
  };

  const handlePwdChange = e => setPwdForm({ ...pwdForm, [e.target.name]: e.target.value });
  const handlePwdSubmit = async e => {
    e.preventDefault();
    setPwdError(null);
    setPwdSuccess(false);
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/users/${user.id || user._id}/password`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ current: pwdForm.current, newPassword: pwdForm.new })
      });
      if (!res.ok) throw new Error('Mot de passe actuel incorrect ou erreur serveur');
      setPwdSuccess(true);
      setPwdForm({ current: '', new: '' });
    } catch (err) {
      setPwdError(err.message);
    }
  };

  return (
    <section className="section">
      <div className="box" style={{ maxWidth: 500, margin: '2rem auto', background: '#23272f', borderRadius: 12 }}>
        <h2 className="title has-text-white">Mon profil</h2>
        <form onSubmit={handleSubmit}>
          <div className="field">
            <label className="label has-text-white">Email</label>
            <div className="control">
              <input className="input" name="email" type="email" value={form.email || ''} onChange={handleChange} required style={{ background: '#181a20', color: '#fff', border: 'none' }} />
            </div>
          </div>
          <div className="field">
            <label className="label has-text-white">Nom</label>
            <div className="control">
              <input className="input" name="nom" value={form.nom || ''} onChange={handleChange} style={{ background: '#181a20', color: '#fff', border: 'none' }} />
            </div>
          </div>
          <div className="field">
            <label className="label has-text-white">Prénom</label>
            <div className="control">
              <input className="input" name="prenom" value={form.prenom || ''} onChange={handleChange} style={{ background: '#181a20', color: '#fff', border: 'none' }} />
            </div>
          </div>
          <div className="field">
            <label className="label has-text-white">Adresse de livraison</label>
            <div className="control">
              <input className="input" name="adresseLivraison" value={form.adresseLivraison || ''} onChange={handleChange} style={{ background: '#181a20', color: '#fff', border: 'none' }} />
            </div>
          </div>
          <div className="field">
            <label className="label has-text-white">Date de naissance</label>
            <div className="control">
              <input className="input" name="dateNaissance" type="date" value={form.dateNaissance ? form.dateNaissance.substring(0,10) : ''} onChange={handleChange} style={{ background: '#181a20', color: '#fff', border: 'none' }} />
            </div>
          </div>
          <button className="button is-primary" type="submit">Mettre à jour</button>
        </form>
        <button className="button is-link mt-4" onClick={() => setShowPwd(v => !v)}>
          {showPwd ? 'Annuler' : 'Changer le mot de passe'}
        </button>
        {showPwd && (
          <form onSubmit={handlePwdSubmit} className="mt-3">
            <div className="field">
              <label className="label has-text-white">Mot de passe actuel</label>
              <div className="control">
                <input className="input" name="current" type="password" value={pwdForm.current} onChange={handlePwdChange} required style={{ background: '#181a20', color: '#fff', border: 'none' }} />
              </div>
            </div>
            <div className="field">
              <label className="label has-text-white">Nouveau mot de passe</label>
              <div className="control">
                <input className="input" name="new" type="password" value={pwdForm.new} onChange={handlePwdChange} required style={{ background: '#181a20', color: '#fff', border: 'none' }} />
              </div>
            </div>
            <button className="button is-primary" type="submit">Valider</button>
            {pwdError && <div className="notification is-danger mt-3">{pwdError}</div>}
            {pwdSuccess && <div className="notification is-success mt-3">Mot de passe modifié !</div>}
          </form>
        )}
        {error && <div className="notification is-danger mt-3">{error}</div>}
        {success && <div className="notification is-success mt-3">Profil mis à jour !</div>}
      </div>
    </section>
  );
};

export default Profile;
