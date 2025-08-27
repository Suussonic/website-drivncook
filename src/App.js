
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import MainLayout from './component/layout/MainLayout';
import Navbar from './component/layout/Navbar';
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
import GlobalNotifications from './component/layout/GlobalNotifications';
import BackOfficeHome from './component/admin/BackOfficeHome';
import PublicHome from './component/front/PublicHome';
import Menus from './component/front/Menus';
import Reservation from './component/front/Reservation';
import Fidelite from './component/front/Fidelite';
import MenuAdmin from './component/admin/MenuAdmin';
import Contact from './component/front/Contact';
import Login from './component/front/Login';
import MyOrders from './component/front/MyOrders';
import MySales from './component/front/MySales';
import MyTrucks from './component/front/MyTrucks';
import MyProfile from './component/front/MyProfile';
import WarehousesFront from './component/front/Warehouses';
import Versements from './component/front/Versements';
import Clients from './component/front/Clients';
import FranchiseDashboard from './component/front/FranchiseDashboard';
import Interconnexion from './component/front/Interconnexion';
import './App.css';

function App() {
  const [notifications, setNotifications] = useState([
    { type: 'is-info', message: "Bienvenue sur la plateforme Driv'n Cook !" }
  ]);
  const [user, setUser] = useState(null);
  const isAdmin = false;

  const handleCloseNotif = idx => {
    setNotifications(notifications.filter((_, i) => i !== idx));
  };
  const handleLogin = (userData) => setUser(userData);
  const handleLogout = () => setUser(null);
  const handleUpdateProfile = (form) => setUser({ ...user, ...form });

  return (
    <Router>
      <>
        <Navbar isLogged={!!user} user={user} onLogout={handleLogout} />
        <MainLayout isAdmin={isAdmin}>
          <GlobalNotifications notifications={notifications} onClose={handleCloseNotif} />
          <Routes>
            
            <Route path="/" element={<PublicHome />} />
            <Route path="/home" element={<PublicHome />} />
            <Route path="/menus" element={<Menus />} />
            <Route path="/reservation" element={<Reservation />} />
            <Route path="/fidelite" element={<Fidelite user={user} />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/clients" element={<Clients />} />
            <Route path="/interconnexion" element={<Interconnexion />} />
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            
            <Route path="/my-orders" element={user ? <MyOrders user={user} /> : <Login onLogin={handleLogin} />} />
            <Route path="/my-sales" element={user ? <MySales user={user} /> : <Login onLogin={handleLogin} />} />
            <Route path="/my-trucks" element={user ? <MyTrucks user={user} /> : <Login onLogin={handleLogin} />} />
            <Route path="/my-profile" element={user ? <MyProfile user={user} onUpdate={handleUpdateProfile} /> : <Login onLogin={handleLogin} />} />
            <Route path="/versements" element={user ? <Versements user={user} sales={[]} /> : <Login onLogin={handleLogin} />} />
            <Route path="/franchise-dashboard" element={user ? <FranchiseDashboard user={user} sales={[]} trucks={[]} orders={[]} /> : <Login onLogin={handleLogin} />} />
            <Route path="/warehouses" element={user ? <WarehousesFront /> : <Login onLogin={handleLogin} />} />
            
            <Route path="/menu-admin" element={<MenuAdmin />} />
            <Route path="/backoffice" element={<BackOfficeHome />} />
            <Route path="/franchises" element={<Franchises />} />
            <Route path="/trucks" element={<Trucks />} />
            <Route path="/warehouses-admin" element={<Warehouses />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/sales" element={<Sales />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/alerts" element={<Alerts />} />
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/franchisee" element={<FranchiseeDashboard />} />
          </Routes>
        </MainLayout>
      </>
    </Router>
  );
}

export default App;
