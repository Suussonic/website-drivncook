import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const emptyUser = { email: '', motDePasse: '', nom: '', prenom: '', adresseLivraison: '', dateNaissance: '', role: 'client' };

const Register = () => {
  const [form, setForm] = useState(emptyUser);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      if (!res.ok) throw new Error('Erreur lors de la création du compte');
      setSuccess(true);
      setTimeout(() => navigate('/login'), 1500);
    } catch (err) {
      setError(err.message);
    }
  };

  const { t } = useTranslation();
  return (
    <section className="section">
      <div className="box" style={{ maxWidth: 400, margin: '2rem auto', background: '#23272f', borderRadius: 12 }}>
        <h2 className="title has-text-white">{t('Créer un compte')}</h2>
        <form onSubmit={handleSubmit}>
          <div className="field">
            <label className="label has-text-white">{t('Email')}</label>
            <div className="control">
              <input className="input" name="email" type="email" value={form.email} onChange={handleChange} required style={{ background: '#181a20', color: '#fff', border: 'none' }} />
            </div>
          </div>
          <div className="field">
            <label className="label has-text-white">{t('Mot de passe')}</label>
            <div className="control">
              <input className="input" name="motDePasse" type="password" value={form.motDePasse} onChange={handleChange} required style={{ background: '#181a20', color: '#fff', border: 'none' }} />
            </div>
          </div>
          <div className="field">
            <label className="label has-text-white">{t('Nom')}</label>
            <div className="control">
              <input className="input" name="nom" value={form.nom} onChange={handleChange} style={{ background: '#181a20', color: '#fff', border: 'none' }} />
            </div>
          </div>
          <div className="field">
            <label className="label has-text-white">{t('Prénom')}</label>
            <div className="control">
              <input className="input" name="prenom" value={form.prenom} onChange={handleChange} style={{ background: '#181a20', color: '#fff', border: 'none' }} />
            </div>
          </div>
          <div className="field">
            <label className="label has-text-white">{t('Adresse de livraison')}</label>
            <div className="control">
              <input className="input" name="adresseLivraison" value={form.adresseLivraison} onChange={handleChange} style={{ background: '#181a20', color: '#fff', border: 'none' }} />
            </div>
          </div>
          <div className="field">
            <label className="label has-text-white">{t('Date de naissance')}</label>
            <div className="control">
              <input className="input" name="dateNaissance" type="date" value={form.dateNaissance} onChange={handleChange} style={{ background: '#181a20', color: '#fff', border: 'none' }} />
            </div>
          </div>
          <button className="button is-primary" type="submit">{t('Créer le compte')}</button>
        </form>
        {error && <div className="notification is-danger mt-3">{t(error)}</div>}
        {success && <div className="notification is-success mt-3">{t('Compte créé ! Redirection...')}</div>}
      </div>
    </section>
  );
};

export default Register;
