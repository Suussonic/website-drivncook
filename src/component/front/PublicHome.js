import React from 'react';
import { useTranslation } from 'react-i18next';


const PublicHome = () => {
  const { t } = useTranslation();
  return (
    <section className="section" style={{ background: '#181a20', minHeight: '100vh' }}>
      <div className="container" style={{ maxWidth: 900, margin: '2rem auto' }}>
        <div className="box" style={{ background: '#23272f', borderRadius: 12, marginBottom: 32 }}>
          <h1 className="title has-text-white">{t("Bienvenue sur Driv'n Cook")}</h1>
          <p className="has-text-white mt-4">
            {t("Driv'n Cook, c'est le food truck nouvelle génération : des plats de qualité, préparés à partir de produits frais, bruts et locaux, servis partout en Ile-de-France !")}
            <br/>
            <span style={{ color: '#3ec1ef' }}>{t("Découvrez nos camions, réservez votre plat ou privatisez un food truck pour vos événements.")}</span>
          </p>
        </div>

        <div className="columns is-multiline">
          <div className="column is-half">
            <div className="box" style={{ background: '#23272f', borderRadius: 12, minHeight: 220 }}>
              <h2 className="subtitle has-text-white">{t("Notre Concept")}</h2>
              <p className="has-text-white">{t("Des food trucks partout en Ile-de-France, une cuisine maison, locale et responsable. Driv'n Cook, c'est aussi un réseau de franchisés passionnés !")}</p>
            </div>
          </div>
          <div className="column is-half">
            <div className="box" style={{ background: '#23272f', borderRadius: 12, minHeight: 220 }}>
              <h2 className="subtitle has-text-white">{t("Nos menus")}</h2>
              <p className="has-text-white">{t("Découvrez tous nos menus gourmands, faits maison et adaptés à tous les goûts.")}</p>
              <a href="/menus" className="button is-primary mt-3">{t("Voir les menus")}</a>
            </div>
          </div>
          <div className="column is-half">
            <div className="box" style={{ background: '#23272f', borderRadius: 12, minHeight: 220 }}>
              <h2 className="subtitle has-text-white">{t("Programme Fidélité")}</h2>
              <p className="has-text-white">{t("Cumulez des points à chaque achat et profitez de réductions, d'invitations à des dégustations et d'autres avantages exclusifs !")}</p>
              <a href="/fidelite" className="button is-warning mt-3">{t("Découvrir la fidélité")}</a>
            </div>
          </div>
          <div className="column is-half">
            <div className="box" style={{ background: '#23272f', borderRadius: 12, minHeight: 220 }}>
              <h2 className="subtitle has-text-white">{t("Nos Food Trucks")}</h2>
              <p className="has-text-white">{t("Retrouvez tous nos food trucks et franchisés partout en Ile-de-France. Consultez les emplacements et horaires pour nous retrouver près de chez vous.")}</p>
              <a href="/emplacements" className="button is-info mt-3">{t("Voir les emplacements")}</a>
            </div>
          </div>
        </div>

        <div className="box" style={{ background: '#23272f', borderRadius: 12, marginTop: 32 }}>
          <h2 className="subtitle has-text-white">{t("Contact & Infos")}</h2>
          <p className="has-text-white">{t("Une question ? Contactez-nous à")}
            <a href="mailto:contact@drivncook.com" style={{ color: '#3ec1ef' }}>contact@drivncook.com</a>
            {t(" ou rendez-vous sur la page ")}
            <a href="/contact" style={{ color: '#3ec1ef' }}>{t("Contact")}</a>.
          </p>
        </div>
      </div>
    </section>
  );
};

export default PublicHome;
