import React, { useState } from 'react';

const fakeUsers = [
  { id: 1, email: 'client@drivncook.com', password: 'test', name: 'Client Demo' }
];

const Home = () => {
  const [user, setUser] = useState(null);
  const [form, setForm] = useState({ email: '', password: '', name: '' });
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState('');

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleLogin = e => {
    e.preventDefault();
    const found = fakeUsers.find(u => u.email === form.email && u.password === form.password);
    if (found) {
      setUser(found);
      setError('');
    } else {
      setError('Identifiants invalides');
    }
  };

  const handleRegister = e => {
    e.preventDefault();
    if (form.email && form.password && form.name) {
      setUser({ ...form, id: Date.now() });
      setError('');
    } else {
      setError('Tous les champs sont obligatoires');
    }
  };

  if (!user) {
    return (
      <section className="section">
        <div className="box" style={{ maxWidth: 400, margin: '2rem auto', background: '#23272f', borderRadius: 12 }}>
          <h2 className="title has-text-white">{isLogin ? 'Connexion' : 'Créer un compte'}</h2>
          <form onSubmit={isLogin ? handleLogin : handleRegister}>
            {!isLogin && (
              <div className="field">
                <label className="label has-text-white">Nom</label>
                <div className="control">
                  <input className="input" name="name" value={form.name} onChange={handleChange} style={{ background: '#181a20', color: '#fff', border: 'none' }} />
                </div>
              </div>
            )}
            <div className="field">
              <label className="label has-text-white">Email</label>
              <div className="control">
                <input className="input" name="email" type="email" value={form.email} onChange={handleChange} style={{ background: '#181a20', color: '#fff', border: 'none' }} />
              </div>
            </div>
            <div className="field">
              <label className="label has-text-white">Mot de passe</label>
              <div className="control">
                <input className="input" name="password" type="password" value={form.password} onChange={handleChange} style={{ background: '#181a20', color: '#fff', border: 'none' }} />
              </div>
            </div>
            {error && <div className="notification is-danger">{error}</div>}
            <button className="button is-primary" type="submit">{isLogin ? 'Se connecter' : 'Créer un compte'}</button>
          </form>
          <button className="button is-text mt-3" onClick={() => setIsLogin(!isLogin)} style={{ color: '#fff' }}>
            {isLogin ? 'Créer un compte' : 'Déjà inscrit ? Se connecter'}
          </button>
        </div>
      </section>
    );
  }

  // Présentation de Driv'n Cook
  return (
    <section className="section">
      <h1 className="title has-text-white">Bienvenue, {user.name} !</h1>
      <div className="box mb-5" style={{ background: '#23272f', borderRadius: 12 }}>
        <h2 className="subtitle has-text-white">Présentation</h2>
        <p className="has-text-white">
          C'est à Paris, dans le 12ème arrondissement, que s'est créée Driv'n Cook, basée sur un concept de food trucks proposant des plats de qualité, à base de produits frais, bruts et majoritairement locaux. Après un lancement réussi en 2013, Driv'n Cook a décidé de s'orienter vers un système de franchise, et a déjà convaincu une trentaine de licenciés. Actuellement, d'autres signatures sont en cours. Son ambition est de se déployer dans toute l'Ile de France, avant d'envisager un développement sur d'autres régions françaises.
        </p>
        <p className="has-text-white mt-2">
          Les clients peuvent acheter sur place, réserver à l'avance, et leur fidélité, gérée par carte numérique imprimable, est récompensée par de multiples avantages (réductions, invitations à des dégustations, prix réduits à l'achat de produits diffusés dans les camions, etc.).
        </p>
      </div>

      {/* Carte de fidélité (factice) */}
      <div className="box mb-5" style={{ background: '#23272f', borderRadius: 12 }}>
        <h2 className="subtitle has-text-white">Ma carte de fidélité</h2>
        <div style={{ background: '#181a20', borderRadius: 8, padding: 16, color: '#fff', maxWidth: 350 }}>
          <p><strong>Nom :</strong> {user.name}</p>
          <p><strong>Points fidélité :</strong> 42</p>
          <p><strong>Avantages :</strong> 10% de réduction sur la prochaine commande</p>
          <button className="button is-info mt-2">Imprimer ma carte</button>
        </div>
      </div>

      {/* Mes commandes */}
      <div className="box mb-5" style={{ background: '#23272f', borderRadius: 12 }}>
        <h2 className="subtitle has-text-white">Mes commandes</h2>
        {/* Table des commandes */}
        <table className="table is-striped is-fullwidth has-background-dark has-text-white">
          <thead>
            <tr>
              <th>ID</th>
              <th>Produit</th>
              <th>Quantité</th>
            </tr>
          </thead>
          <tbody>
            {[{ id: 1, item: 'Pain', quantity: 100 }, { id: 2, item: 'Viande', quantity: 50 }].map(order => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.item}</td>
                <td>{order.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mes ventes */}
      <div className="box mb-5" style={{ background: '#23272f', borderRadius: 12 }}>
        <h2 className="subtitle has-text-white">Mes ventes</h2>
        <table className="table is-striped is-fullwidth has-background-dark has-text-white">
          <thead>
            <tr>
              <th>ID</th>
              <th>Montant (€)</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {[{ id: 1, amount: 1200, date: '2024-06-01' }, { id: 2, amount: 900, date: '2024-06-02' }].map(sale => (
              <tr key={sale.id}>
                <td>{sale.id}</td>
                <td>{sale.amount}</td>
                <td>{sale.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mes camions */}
      <div className="box mb-5" style={{ background: '#23272f', borderRadius: 12 }}>
        <h2 className="subtitle has-text-white">Mes camions</h2>
        <table className="table is-striped is-fullwidth has-background-dark has-text-white">
          <thead>
            <tr>
              <th>ID</th>
              <th>Immatriculation</th>
              <th>Statut</th>
            </tr>
          </thead>
          <tbody>
            {[{ id: 1, plate: 'AB-123-CD', status: 'Disponible' }].map(truck => (
              <tr key={truck.id}>
                <td>{truck.id}</td>
                <td>{truck.plate}</td>
                <td>{truck.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mon profil */}
      <div className="box mb-5" style={{ background: '#23272f', borderRadius: 12 }}>
        <h2 className="subtitle has-text-white">Mon profil</h2>
        <p className="has-text-white"><strong>Nom :</strong> {user.name}</p>
        <p className="has-text-white"><strong>Email :</strong> client@drivncook.com</p>
      </div>

      {/* Infos supplémentaires */}
      <div className="box" style={{ background: '#23272f', borderRadius: 12 }}>
        <h2 className="subtitle has-text-white">Contact & Infos</h2>
        <p className="has-text-white">Pour toute question, contactez-nous à <a href="mailto:contact@drivncook.com" style={{ color: '#3ec1ef' }}>contact@drivncook.com</a></p>
      </div>
    </section>
  );
};

export default Home;
