import React, { useState, useEffect } from 'react';
import { Navigate, BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import BreakdownForm from './component/franchisee/BreakdownForm';
import BreakdownHistory from './component/franchisee/BreakdownHistory';
import MainLayout from './component/layout/MainLayout';
import Navbar from './component/layout/Navbar';
import NavbarBack from './component/layout/NavbarBack';
import NavbarFranchise from './component/layout/NavbarFranchise';
import NavbarFranchisee from './component/layout/NavbarFranchisee';
import Dashboard from './component/admin/Dashboard';
import Franchises from './component/admin/Franchises';
import Trucks from './component/admin/Trucks';
import TrucksAdmin from './component/admin/TrucksAdmin';
import Warehouses from './component/admin/Warehouses';
import Orders from './component/admin/Orders';
import Sales from './component/admin/Sales';
import Reports from './component/admin/Reports';
import UsersAdmin from './component/admin/UsersAdmin';
import Alerts from './component/admin/Alerts';
import UserProfile from './component/admin/UserProfile';
import FranchiseeDashboard from './component/franchisee/FranchiseeDashboard';
import HomeFranchise from './component/franchisee/HomeFranchise';
// Suppression approvisionnement
import NotFound from './component/front/NotFound';
import BackOfficeHome from './component/admin/BackOfficeHome';
import PublicHome from './component/front/PublicHome';
import Menus from './component/front/Menus';
import Fidelite from './component/front/Fidelite';
import MenuAdmin from './component/admin/MenuAdmin';
import ReviewsAdmin from './component/admin/ReviewsAdmin';
import Contact from './component/front/Contact';
import Newsletter from './component/front/Newsletter';
import TrucksLocations from './component/front/TrucksLocations';
import TruckDetails from './component/front/TruckDetails';
import Reviews from './component/front/Reviews';
import Login from './component/front/Login';
import Register from './component/front/Register';
import MyOrders from './component/front/MyOrders';
import MySales from './component/front/MySales';
import MyTrucks from './component/front/MyTrucks';
import MyProfile from './component/front/MyProfile';
import Profile from './component/front/Profile';
import MyWarehouses from './component/franchisee/MyWarehouses';
import Versements from './component/front/Versements';
import Clients from './component/front/Clients';
import FranchiseDashboard from './component/front/FranchiseDashboard';
import Interconnexion from './component/front/Interconnexion';
import OrderSuccess from './component/front/OrderSuccess';
import './App.css';
import './i18n';


function BreakdownPage({ user }) {
  const [trucks, setTrucks] = useState([]);
  const [refreshKey, setRefreshKey] = useState(0);
  const refresh = () => setRefreshKey(k => k + 1);
  useEffect(() => {
    fetch(`/api/trucks?franchiseId=${user.franchiseId || ''}`)
      .then(res => res.json())
      .then(data => setTrucks(Array.isArray(data) ? data : []));
  }, [user]);
  return (
    <div className="section">
      <BreakdownForm user={user} trucks={trucks} onReport={refresh} />
      <BreakdownHistory key={refreshKey} user={user} />
    </div>
  );
}



function App() {
  const [notifications, setNotifications] = useState([
    { type: 'is-info', message: "Bienvenue sur la plateforme Driv'n Cook !" }
  ]);
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('user'));
    } catch (e) {
      return null;
    }
  });

  const isAdmin = false;
  const handleCloseNotif = idx => {
    setNotifications(notifications.filter((_, i) => i !== idx));
  };
  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };
  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };
  const handleUpdateProfile = (form) => {
    const updated = { ...user, ...form };
    setUser(updated);
  };


  return (
    <Router>
      <AppContent
        user={user}
        handleLogout={handleLogout}
        handleLogin={handleLogin}
        handleUpdateProfile={handleUpdateProfile}
      />
    </Router>
  );
}

function AppContent({ user, handleLogout, handleLogin, handleUpdateProfile }) {
  const location = useLocation();
  const path = location.pathname;
  const isBackOfficeRoute = path.startsWith('/backoffice') || path.startsWith('/franchises') || path.startsWith('/trucks-admin') || path.startsWith('/warehouses-admin') || (path.startsWith('/orders') && path !== '/my-orders') || path.startsWith('/menu-admin') || path.startsWith('/franchisee');
  const isAdminUser = user?.role === 'admin';
  const isFranchiseeUser = user && (user.role === 'franchisee' || user.role === 'franchise');

  // Définir les routes qui doivent afficher la navbar franchisé
  const franchiseeNavRoutes = [
    '/franchisee', '/franchise-dashboard', '/my-orders', '/my-sales', '/my-trucks', '/warehouses', '/supply', '/breakdown', '/breakdown-history', '/supply-history'
  ];
  const isFranchiseeRoute = franchiseeNavRoutes.some(route => path.startsWith(route));

  return (
    <Routes>
      <Route
        path="*"
        element={
          <>
            {isBackOfficeRoute && isAdminUser ? (
              <NavbarBack user={user} onLogout={handleLogout} />
            ) : isFranchiseeRoute ? (
              <NavbarFranchisee user={user} onLogout={handleLogout} />
            ) : (
              <Navbar isLogged={!!user} user={user} onLogout={handleLogout} />
            )}
            <MainLayout isAdmin={isBackOfficeRoute} user={user} onLogout={handleLogout}>
              <Routes>
                {/* ...existing code... */}
                <Route path="/" element={<PublicHome />} />
                <Route path="/home" element={<PublicHome />} />
                <Route path="/menus" element={<Menus />} />
                {/* <Route path="/reservation" element={<Reservation />} /> */}
                <Route path="/fidelite" element={<Fidelite user={user} />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/newsletter" element={<Newsletter />} />
                <Route path="/emplacements" element={<TrucksLocations />} />
                <Route path="/trucks/:id" element={<TruckDetails />} />
                {/* <Route path="/reservation/:truckId" element={<Reservation />} /> */}
                <Route path="/avis" element={<Reviews />} />
                <Route path="/clients" element={<Clients />} />
                <Route path="/interconnexion" element={<Interconnexion />} />
                <Route path="/login" element={<Login onLogin={handleLogin} />} />
                <Route path="/register" element={<Register />} />
                <Route path="/my-orders" element={user ? <MyOrders user={user} /> : <Login onLogin={handleLogin} />} />
                <Route path="/my-sales" element={user ? <MySales user={user} /> : <Login onLogin={handleLogin} />} />
                <Route path="/my-trucks" element={user ? <MyTrucks user={user} /> : <Login onLogin={handleLogin} />} />
                <Route path="/my-profile" element={user ? <MyProfile user={user} onUpdate={handleUpdateProfile} /> : <Login onLogin={handleLogin} />} />
                <Route path="/versements" element={user ? <Versements user={user} sales={[]} /> : <Login onLogin={handleLogin} />} />
                <Route path="/franchise-dashboard" element={user ? <FranchiseDashboard user={user} sales={[]} trucks={[]} orders={[]} /> : <Login onLogin={handleLogin} />} />
                <Route path="/warehouses" element={user ? <MyWarehouses user={user} /> : <Login onLogin={handleLogin} />} />
                <Route path="/menu-admin" element={user?.role === 'admin' ? <MenuAdmin /> : <Navigate to="/404" />} />
                <Route path="/reviews-admin" element={user?.role === 'admin' ? <ReviewsAdmin /> : <Navigate to="/404" />} />
                <Route path="/backoffice" element={user?.role === 'admin' ? <BackOfficeHome user={user} /> : <Navigate to="/404" />} />
                <Route path="/franchises" element={user?.role === 'admin' ? <Franchises /> : <Navigate to="/404" />} />
                <Route path="/trucks" element={user?.role === 'admin' ? <Trucks /> : <Navigate to="/404" />} />
                <Route path="/trucks-admin" element={user?.role === 'admin' ? <TrucksAdmin /> : <Navigate to="/404" />} />
                <Route path="/warehouses-admin" element={user?.role === 'admin' ? <Warehouses /> : <Navigate to="/404" />} />
                <Route path="/orders" element={user?.role === 'admin' ? <Orders /> : <Navigate to="/404" />} />
                <Route path="/sales" element={user?.role === 'admin' ? <Sales /> : <Navigate to="/404" />} />
                <Route path="/reports" element={user?.role === 'admin' ? <Reports /> : <Navigate to="/404" />} />
                <Route path="/alerts" element={user?.role === 'admin' ? <Alerts /> : <Navigate to="/404" />} />
                <Route path="/profile" element={user ? <Profile user={user} onUpdate={handleUpdateProfile} /> : <Login onLogin={handleLogin} />} />
                <Route path="/users-admin" element={user?.role === 'admin' ? <UsersAdmin /> : <Navigate to="/404" />} />
                <Route path="/franchisee" element={user && (user.role === 'franchisee' || user.role === 'franchise') ? <HomeFranchise /> : <Navigate to="/404" />} />
                {/* Approvisionnement supprimé */}
                <Route path="/breakdown" element={user ? <BreakdownForm user={user} /> : <Navigate to="/404" />} />
                <Route path="/breakdown-history" element={user ? <BreakdownHistory user={user} /> : <Navigate to="/404" />} />
                <Route path="/404" element={<NotFound />} />
                <Route path="*" element={<NotFound />} />
                <Route path="/order-success" element={<OrderSuccess />} />
              </Routes>
            </MainLayout>
          </>
        }
      />
    </Routes>
  );
}
export default App;
