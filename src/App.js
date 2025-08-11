import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './component/layout/MainLayout';
import Dashboard from './component/admin/Dashboard';
import Franchises from './component/admin/Franchises';
import Trucks from './component/admin/Trucks';
import Warehouses from './component/admin/Warehouses';
import Orders from './component/admin/Orders';
import Sales from './component/admin/Sales';
import Reports from './component/admin/Reports';
import Alerts from './component/admin/Alerts';
import UserProfile from './component/admin/UserProfile';
import FranchiseeDashboard from './component/franchisee/FranchiseeDashboard';
import MyTrucks from './component/franchisee/MyTrucks';
import MyOrders from './component/franchisee/MyOrders';
import MySales from './component/franchisee/MySales';
import MyProfile from './component/franchisee/MyProfile';
import GlobalNotifications from './component/layout/GlobalNotifications';
import './App.css';

function App() {
  const [notifications, setNotifications] = useState([
    { type: 'is-info', message: 'Bienvenue sur la plateforme Driv\'n Cook !' }
  ]);
  const isAdmin = true; // à remplacer par une vraie gestion d’authentification

  const handleCloseNotif = idx => {
    setNotifications(notifications.filter((_, i) => i !== idx));
  };

  return (
    <Router>
      <MainLayout isAdmin={isAdmin}>
        <GlobalNotifications notifications={notifications} onClose={handleCloseNotif} />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/franchises" element={<Franchises />} />
          <Route path="/trucks" element={<Trucks />} />
          <Route path="/warehouses" element={<Warehouses />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/sales" element={<Sales />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/alerts" element={<Alerts />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/franchisee" element={<FranchiseeDashboard />} />
          <Route path="/my-trucks" element={<MyTrucks />} />
          <Route path="/my-orders" element={<MyOrders />} />
          <Route path="/my-sales" element={<MySales />} />
          <Route path="/my-profile" element={<MyProfile />} />
        </Routes>
      </MainLayout>
    </Router>
  );
}

export default App;
