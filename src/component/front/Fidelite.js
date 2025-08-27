

import React, { useEffect, useState } from 'react';

const Fidelite = ({ user }) => {
  const [points, setPoints] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user) return;
    const fetchFidelity = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/fidelity/${user.id}`);
        if (!response.ok) throw new Error('Erreur lors du chargement de la fidélité');
        const data = await response.json();
        setPoints(data.points || 0);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchFidelity();
  }, [user]);

  if (!user) {
    return (
      <section className="section">
        <div className="box" style={{ maxWidth: 600, margin: '2rem auto', background: '#23272f', borderRadius: 12 }}>
          <h2 className="title has-text-white">Programme Fidélité</h2>
          <p className="has-text-white">Connectez-vous pour accéder à votre carte fidélité personnalisée et profiter de vos avantages !</p>
          <a href="/login" className="button is-info mt-3">Se connecter</a>
        </div>
      </section>
    );
  }

  if (loading) return <div className="has-text-white">Chargement de la fidélité...</div>;
  if (error) return <div className="has-text-danger">{error}</div>;

  const avantage = points >= 50 ? '15% de réduction sur la prochaine commande' : '10% de réduction sur la prochaine commande';

  return (
    <section className="section">
      <div className="box" style={{ maxWidth: 600, margin: '2rem auto', background: '#23272f', borderRadius: 12 }}>
        <h2 className="title has-text-white">Ma carte fidélité</h2>
        <p className="has-text-white">Cumulez des points à chaque achat et profitez de nombreux avantages : réductions, invitations à des dégustations, prix réduits sur certains produits, etc.</p>
        <div className="mt-4" style={{ background: '#181a20', borderRadius: 8, padding: 16, color: '#fff', maxWidth: 350 }}>
          <p><strong>Nom :</strong> {user.name || 'Client'}</p>
          <p><strong>Points fidélité :</strong> {points}</p>
          <p><strong>Avantage actuel :</strong> {avantage}</p>
          <button className="button is-info mt-2">Imprimer ma carte</button>
        </div>
      </div>
    </section>
  );
};

export default Fidelite;
