import React from 'react';
import { Link, useLocation } from 'react-router-dom';


const Navbar = ({ isLogged, user, onLogout }) => {
  const location = useLocation();

  // Détection des routes admin strictes
  const adminRoutes = [
    '/backoffice', '/franchises', '/trucks', '/warehouses-admin', '/orders', '/sales', '/reports', '/alerts', '/profile', '/franchisee'
  ];
  const isBackOffice = adminRoutes.some(route => location.pathname.startsWith(route));

  // Détection des routes franchisé strictes
  const franchiseeRoutes = [
    '/franchise-dashboard', '/my-orders', '/my-sales', '/my-trucks', '/warehouses', '/versements', '/my-profile'
  ];
  const isFranchisee = isLogged && franchiseeRoutes.some(route => location.pathname.startsWith(route));

  return (
    <nav className="navbar is-primary" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <Link className="navbar-item" to="/">
          Driv'n Cook
        </Link>
      </div>
      <div className="navbar-menu">
        <div className="navbar-start">
          {/* Affichage navbar admin uniquement sur routes admin */}
          {isBackOffice ? (
            <>
              <Link className="navbar-item" to="/franchises">Franchisés</Link>
              <Link className="navbar-item" to="/trucks">Camions</Link>
              <Link className="navbar-item" to="/warehouses-admin">Entrepôts</Link>
              <Link className="navbar-item" to="/orders">Achats</Link>
              <Link className="navbar-item" to="/sales">Ventes</Link>
              <Link className="navbar-item" to="/menu-admin">Menus</Link>
              <Link className="navbar-item" to="/reports">Rapports</Link>
              <Link className="navbar-item" to="/alerts">Alertes</Link>
              <Link className="navbar-item" to="/franchisee">Espace Franchisé</Link>
            </>
          ) : isFranchisee ? (
            <>
              <Link className="navbar-item" to="/franchise-dashboard">Dashboard</Link>
              <Link className="navbar-item" to="/my-orders">Commandes</Link>
              <Link className="navbar-item" to="/my-sales">Ventes</Link>
              <Link className="navbar-item" to="/my-trucks">Camions</Link>
              <Link className="navbar-item" to="/warehouses">Entrepôts</Link>
              <Link className="navbar-item" to="/versements">Versements</Link>
              <Link className="navbar-item" to="/my-profile">Profil</Link>
            </>
          ) : (
            <>
              <Link className="navbar-item" to="/">Accueil</Link>
              <Link className="navbar-item" to="/menus">Menus</Link>
              <Link className="navbar-item" to="/reservation">Réserver</Link>
              <Link className="navbar-item" to="/fidelite">Fidélité</Link>
              <Link className="navbar-item" to="/contact">Contact</Link>
            </>
          )}
        </div>
        <div className="navbar-end">
          {/* Affichage des boutons à droite uniquement sur front ou franchisé */}
          {!isBackOffice && (
            <div className="navbar-item is-flex is-align-items-center">
              {isFranchisee ? (
                <>
                  <Link className="button is-info mr-2" to="/my-profile">
                    <span className="icon"><i className="fas fa-user"></i></span>
                    <span>{user?.name || 'Profil'}</span>
                  </Link>
                  <button className="button is-danger" onClick={onLogout}>Déconnexion</button>
                </>
              ) : isLogged ? (
                <button className="button is-danger" onClick={onLogout}>Déconnexion</button>
              ) : (
                <Link className="button is-info" to="/login">Connexion</Link>
              )}
              <Link className="button is-light ml-2" to="/backoffice">
                <span className="icon"><i className="fas fa-tools"></i></span>
                <span>Back-Office</span>
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
