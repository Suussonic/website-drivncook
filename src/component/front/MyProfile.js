import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

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

  const { t } = useTranslation();
  return (
    <section className="section">
      <h2 className="title">{t('Mon profil')}</h2>
      <form onSubmit={handleSubmit} style={{ maxWidth: 400 }}>
        <div className="field">
          <label className="label">{t('Nom')}</label>
          <div className="control">
            <input className="input" name="name" value={form.name} onChange={handleChange} />
          </div>
        </div>
        <div className="field">
          <label className="label">{t('Email')}</label>
          <div className="control">
            <input className="input" name="email" value={form.email} onChange={handleChange} />
          </div>
        </div>
        <button className="button is-primary" type="submit">{t('Enregistrer')}</button>
        {success && <div className="notification is-success mt-2">{t('Profil mis à jour !')}</div>}
      </form>
    </section>
  );
};

export default MyProfile;
