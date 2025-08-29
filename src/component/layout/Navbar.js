import React, { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';



const Navbar = ({ isLogged, user, onLogout, forceBackOffice }) => {
  const location = useLocation();



  // Détection des routes franchisé strictes
  const franchiseeRoutes = [
    '/franchise-dashboard', '/my-orders', '/my-sales', '/my-trucks', '/warehouses', '/versements', '/my-profile'
  ];
  const isFranchisee = isLogged && franchiseeRoutes.some(route => location.pathname.startsWith(route));

  const { i18n } = useTranslation();
  const [showLangMenu, setShowLangMenu] = useState(false);
  const globeRef = useRef();
  const handleLangMenu = () => setShowLangMenu(v => !v);
  const handleLangSelect = (lang) => {
    i18n.changeLanguage(lang);
    setShowLangMenu(false);
  };
  const handleLangSwitch = () => {
    i18n.changeLanguage(i18n.language === 'fr' ? 'en' : 'fr');
  };

  return (
    <nav className="navbar is-primary" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <Link className="navbar-item" to="/">
          {i18n.t("Driv'n Cook")}
        </Link>
      </div>
      <div className="navbar-menu">
        <div className="navbar-start">
          <Link className="navbar-item" to="/">{i18n.t('Accueil')}</Link>
          <Link className="navbar-item" to="/emplacements">{i18n.t('Emplacements')}</Link>
          <Link className="navbar-item" to="/menus">{i18n.t('Menus')}</Link>
          {/* <Link className="navbar-item" to="/reservation">{i18n.t('Réserver')}</Link> */}
          <Link className="navbar-item" to="/fidelite">{i18n.t('Fidélité')}</Link>
          <Link className="navbar-item" to="/contact">{i18n.t('Contact')}</Link>
          {user && (
            <Link className="navbar-item" to="/my-orders">{i18n.t('Mes achats')}</Link>
          )}
        </div>
        <div className="navbar-end">
          <div className="navbar-item is-flex is-align-items-center">
            {isLogged ? (
              <>
                <button className="button is-danger mr-2" onClick={onLogout}>{i18n.t('Déconnexion')}</button>
                <Link className="button is-info mr-2" to="/profile">{i18n.t('Profil')}</Link>
                <span style={{ position: 'relative', marginLeft: 8 }}>
                  <span
                    ref={globeRef}
                    style={{ cursor: 'pointer', display: 'inline-block', background: 'none', border: 'none', padding: 0, fontSize: 32 }}
                    title={i18n.language === 'fr' ? 'Changer de langue' : 'Change language'}
                    onClick={handleLangMenu}
                  >
                    🌐
                  </span>
                  {showLangMenu && (
                    <div style={{
                      position: 'absolute',
                      top: '110%',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      background: '#23272f',
                      color: '#fff',
                      borderRadius: 8,
                      boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                      zIndex: 100,
                      minWidth: 120,
                      padding: '8px 0',
                      textAlign: 'center',
                    }}>
                      <div
                        style={{ padding: '10px 0', cursor: 'pointer', fontWeight: i18n.language === 'fr' ? 700 : 400, fontSize: 18 }}
                        onClick={() => handleLangSelect('fr')}
                      >
                        Français
                      </div>
                      <div
                        style={{ padding: '10px 0', cursor: 'pointer', fontWeight: i18n.language === 'en' ? 700 : 400, fontSize: 18 }}
                        onClick={() => handleLangSelect('en')}
                      >
                        English
                      </div>
                    </div>
                  )}
                </span>
              </>
            ) : (
              <Link className="button is-info" to="/login">Connexion</Link>
            )}
            {user?.role === 'admin' && (
              <Link className="button is-light ml-2" to="/backoffice">
                <span className="icon"><i className="fas fa-tools"></i></span>
                <span>Back-Office</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
