


import React, { useEffect, useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { QRCodeCanvas } from 'qrcode.react';

// Logo importé localement (à adapter si besoin)
import logo from '../../assets/logo-drivncook.png';


const Fidelite = ({ user }) => {
  const { t } = useTranslation();
  const cardRef = useRef();
  const [points, setPoints] = useState(0);
  const [orderCount, setOrderCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user || !user.email) return;
    setLoading(true);
    setError(null);
    fetch(`${process.env.REACT_APP_API_URL}/orders`)
      .then(res => {
        if (!res.ok) throw new Error('Erreur lors du chargement des achats');
        return res.json();
      })
      .then(data => {
        const filtered = data.filter(order => {
          const userObj = order.userId;
          if (!userObj || !userObj.email || !user.email) return false;
          return userObj.email === user.email;
        });
        setOrderCount(filtered.length);
        setPoints(filtered.length * 100);
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, [user]);


  if (!user) {
    return (
      <section className="section">
        <div className="box" style={{ maxWidth: 600, margin: '2rem auto', background: '#23272f', borderRadius: 12 }}>
          <h2 className="title has-text-white">{t('Programme Fidélité')}</h2>
          <p className="has-text-white">{t('Connectez-vous pour accéder à votre carte fidélité personnalisée et profiter de vos avantages !')}</p>
          <a href="/login" className="button is-info mt-3">{t('Se connecter')}</a>
        </div>
      </section>
    );
  }

  // Calcul de l'avantage : 1% par achat, max 30%
  const remise = Math.min(orderCount, 30);
  const avantage = t('{{remise}}% de réduction sur la prochaine commande', { remise });

  // cardRef déjà déclaré en haut, rien à déclarer ici



  return (
    <section className="section">
      <div className="box" style={{ maxWidth: 600, margin: '2rem auto', background: '#23272f', borderRadius: 12 }}>
        <h2 className="title has-text-white">{t('Ma carte fidélité')}</h2>
        <p className="has-text-white">
          {t('Cumulez des points à chaque achat et profitez de nombreux avantages : réductions, invitations à des dégustations, prix réduits sur certains produits, etc.')}<br/>
          <span style={{ color: '#3ec1ef', fontWeight: 600 }}>{t("Chaque achat donne 1% de remise supplémentaire sur votre prochaine commande, jusqu'à un maximum de 30%.")}</span>
        </p>
        <div id="fidelity-card" ref={cardRef} className="mt-4" style={{ background: '#fff', borderRadius: 8, padding: 24, color: '#23272f', maxWidth: 350, margin: '0 auto', textAlign: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
          <img src={logo} alt="Driv'n Cook" style={{ width: 120, marginBottom: 16 }} />
          <h3 style={{ fontWeight: 700, marginBottom: 12 }}>{t('Carte de fidélité Driv\'n Cook')}</h3>
          <p><strong>{t('Points fidélité')} :</strong> {points}</p>
          <p><strong>{t('Nombre d\'achats')} :</strong> {orderCount}</p>
          <p><strong>{t('Avantage actuel')} :</strong> {avantage}</p>
          <div style={{ margin: '16px 0' }}>
            <QRCodeCanvas value={t('Ce client a droit a une remise de {{remise}}%', { remise })} size={100} />
          </div>
          <p style={{ fontSize: 13, color: '#3ec1ef', marginTop: 12 }}>
            {t('Chaque achat = +1% de remise (max 30%)')}<br/>
            {t('Présentez cette carte lors de vos achats dans les food trucks Driv\'n Cook.')}
          </p>
        </div>

      </div>
    </section>
  );
};

export default Fidelite;
