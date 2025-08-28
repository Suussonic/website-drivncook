import React from 'react';
import { Link, useLocation } from 'react-router-dom';



const Navbar = ({ isLogged, user, onLogout, forceBackOffice }) => {
  const location = useLocation();



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
          <Link className="navbar-item" to="/">Accueil</Link>
          <Link className="navbar-item" to="/emplacements">Emplacements</Link>
          <Link className="navbar-item" to="/menus">Menus</Link>
          {/* <Link className="navbar-item" to="/reservation">Réserver</Link> */}
          <Link className="navbar-item" to="/fidelite">Fidélité</Link>
          <Link className="navbar-item" to="/contact">Contact</Link>
          {user && (
            <Link className="navbar-item" to="/my-orders">Mes achats</Link>
          )}
        </div>
        <div className="navbar-end">
          <div className="navbar-item is-flex is-align-items-center">
            {isLogged ? (
              <>
                <button className="button is-danger mr-2" onClick={onLogout}>Déconnexion</button>
                <Link className="button is-info mr-2" to="/profile">Profil</Link>
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
