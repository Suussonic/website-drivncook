import React from 'react';
import { Link } from 'react-router-dom';

const NavbarBack = ({ user, onLogout }) => (
  <nav className="navbar is-primary" role="navigation" aria-label="main navigation">
    <div className="navbar-brand">
      <Link className="navbar-item" to="/backoffice">
        Driv'n Cook
      </Link>
    </div>
    <div className="navbar-menu">
      <div className="navbar-start">
        <Link className="navbar-item" to="/franchises">Franchisés</Link>
        <Link className="navbar-item" to="/trucks-admin">Camions / Emplacements</Link>
        <Link className="navbar-item" to="/warehouses-admin">Entrepôts</Link>
        <Link className="navbar-item" to="/orders">Achats</Link>
  <Link className="navbar-item" to="/menu-admin">Menus</Link>
  <Link className="navbar-item" to="/reviews-admin">Avis</Link>
        <Link className="navbar-item" to="/franchisee">Espace Franchisé</Link>
      </div>
      <div className="navbar-end">
        <div className="navbar-item is-flex is-align-items-center">
          <button className="button is-danger mr-2" onClick={onLogout}>Déconnexion</button>
          <Link className="button is-info mr-2" to="/profile">Profil</Link>
        </div>
      </div>
    </div>
  </nav>
);

export default NavbarBack;
