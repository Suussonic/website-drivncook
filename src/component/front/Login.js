import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const Login = ({ onLogin }) => {
  const [form, setForm] = useState({ email: '', motDePasse: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    // Test utilisateur démo
    if (form.email === 'client@drivncook.com' && form.motDePasse === 'test') {
      onLogin({ name: 'Client Demo', email: 'client@drivncook.com' });
      navigate('/');
      return;
    }
    // Authentification réelle via API
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      if (!res.ok) throw new Error('Identifiants invalides. Veuillez vérifier votre email et votre mot de passe.');
      const data = await res.json();
      onLogin(data.user);
      navigate('/');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <section className="section">
      <div className="box" style={{ maxWidth: 400, margin: '2rem auto', background: '#23272f', borderRadius: 12 }}>
        <h2 className="title has-text-white">Connexion</h2>
  <form onSubmit={handleSubmit}>
          <div className="field">
            <label className="label has-text-white">Email</label>
            <div className="control">
              <input className="input" name="email" type="email" value={form.email} onChange={handleChange} style={{ background: '#181a20', color: '#fff', border: 'none' }} />
            </div>
          </div>
          <div className="field">
            <label className="label has-text-white">Mot de passe</label>
            <div className="control">
              <input className="input" name="motDePasse" type="password" value={form.motDePasse} onChange={handleChange} style={{ background: '#181a20', color: '#fff', border: 'none' }} />
            </div>
          </div>
          {error && <div className="notification is-danger" style={{marginTop:8}}>{error}</div>}
          <button className="button is-primary" type="submit">Se connecter</button>
          <button className="button is-link ml-2" type="button" onClick={() => navigate('/register')}>Créer un compte</button>
        </form>
        <div className="has-text-white mt-4" style={{fontSize:'0.95em'}}>
          <strong>Utilisateur de test :</strong><br/>
          Email : <span style={{color:'#3ec1ef'}}>client@drivncook.com</span><br/>
          Mot de passe : <span style={{color:'#3ec1ef'}}>test</span>
        </div>
      </div>
    </section>
  );
};

export default Login;
