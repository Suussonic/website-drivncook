import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const Newsletter = () => {
  const { t, i18n } = useTranslation();
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/newsletter/subscribe`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      if (res.status === 409) throw new Error(t('Cet email est déjà inscrit.'));
      if (!res.ok) throw new Error(t('Erreur lors de l’inscription.'));
      setMessage(t('Inscription réussie !'));
      setEmail('');
    } catch (err) {
      setMessage(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="section" style={{ background: '#181a20' }}>
      <div className="container" style={{ maxWidth: 500, margin: '2rem auto' }}>
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 8 }}>
          <select value={i18n.language} onChange={e => i18n.changeLanguage(e.target.value)}>
            <option value="fr">FR</option>
            <option value="en">EN</option>
          </select>
        </div>
  <h2 className="title has-text-white">{t('Newsletter')}</h2>
        <form onSubmit={handleSubmit} className="mb-4">
          <div className="field is-grouped">
            <div className="control is-expanded">
              <input className="input" type="email" placeholder={t('Votre email')} value={email} onChange={e => setEmail(e.target.value)} required />
            </div>
            <div className="control">
              <button className="button is-primary" type="submit" disabled={loading}>{t('S’inscrire')}</button>
            </div>
          </div>
        </form>
        {message && <div className={message.includes('réussie') || message.includes('success') ? 'has-text-success' : 'has-text-danger'}>{message}</div>}
      </div>
    </section>
  );
};

export default Newsletter;
