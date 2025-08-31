import React from 'react';
import { Link } from 'react-router-dom';
import logoDrivncook from '../../assets/logo-drivncook.png';

const NavbarFranchisee = ({ user, onLogout }) => (
  <nav className="navbar is-primary" role="navigation" aria-label="main navigation">
    <div className="navbar-brand">
  <Link className="navbar-item" to="/">
        <img src={logoDrivncook} alt="Driv'n Cook Logo" style={{ height: '28px', marginRight: '8px' }} />
        <span style={{ fontWeight: 'bold', fontSize: '1.1em' }}>Driv'n Cook</span>
      </Link>
    </div>
    <div className="navbar-menu">
      <div className="navbar-start">
  {/* <Link className="navbar-item" to="/franchise-dashboard">Tableau de bord</Link> */}
  {/* <Link className="navbar-item" to="/my-orders">Mes commandes</Link> */}
        <Link className="navbar-item" to="/my-sales">Mes ventes</Link>
        <Link className="navbar-item" to="/my-trucks">Mes camions</Link>
        <Link className="navbar-item" to="/warehouses">Entrepôts</Link>
  {/* Approvisionnement supprimé */}
        <Link className="navbar-item" to="/breakdown">Déclarer une panne</Link>
  {/* <Link className="navbar-item" to="/breakdown-history">Historique pannes</Link> */}
  {/* <Link className="navbar-item" to="/supply-history">Historique approvisionnement</Link> */}
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

export default NavbarFranchisee;
