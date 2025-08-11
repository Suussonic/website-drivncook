import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = ({ isAdmin }) => (
  <aside className="menu">
    <p className="menu-label">Général</p>
    <ul className="menu-list">
      <li><Link to="/">Dashboard</Link></li>
      {isAdmin ? (
        <>
          <li><Link to="/franchises">Franchisés</Link></li>
          <li><Link to="/trucks">Camions</Link></li>
          <li><Link to="/warehouses">Entrepôts</Link></li>
          <li><Link to="/orders">Achats</Link></li>
          <li><Link to="/sales">Ventes</Link></li>
          <li><Link to="/reports">Rapports</Link></li>
          <li><Link to="/alerts">Alertes</Link></li>
        </>
      ) : (
        <>
          <li><Link to="/my-trucks">Mes camions</Link></li>
          <li><Link to="/my-orders">Mes commandes</Link></li>
          <li><Link to="/my-sales">Mes ventes</Link></li>
          <li><Link to="/my-profile">Mon profil</Link></li>
        </>
      )}
    </ul>
  </aside>
);

export default Sidebar;