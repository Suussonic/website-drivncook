import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => (
  <nav className="navbar is-primary" role="navigation" aria-label="main navigation">
    <div className="navbar-brand">
      <Link className="navbar-item" to="/">
        Driv'n Cook
      </Link>
    </div>
    <div className="navbar-menu">
      <div className="navbar-start">
        <Link className="navbar-item" to="/franchises">Franchisés</Link>
        <Link className="navbar-item" to="/trucks">Camions</Link>
        <Link className="navbar-item" to="/warehouses">Entrepôts</Link>
        <Link className="navbar-item" to="/orders">Achats</Link>
        <Link className="navbar-item" to="/sales">Ventes</Link>
        <Link className="navbar-item" to="/reports">Rapports</Link>
        <Link className="navbar-item" to="/alerts">Alertes</Link>
        <Link className="navbar-item" to="/franchisee">Espace Franchisé</Link>
      </div>
    </div>
  </nav>
);

export default Navbar;
