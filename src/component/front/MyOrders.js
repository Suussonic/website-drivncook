



import React, { useEffect, useState } from 'react';
import Table from '../common/Table';

const columns = ['id', 'item', 'quantity'];

const MyOrders = ({ user }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/orders`);
        if (!response.ok) throw new Error('Erreur lors du chargement des commandes');
        const data = await response.json();
        setOrders(data.filter(o => o.franchisee === user?.name));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [user]);

  if (loading) return <div>Chargement des commandes...</div>;
  if (error) return <div className="has-text-danger">{error}</div>;

  return (
    <section className="section">
      <h2 className="title">Mes commandes</h2>
      <Table columns={columns} data={orders} />
    </section>
  );
};

export default MyOrders;
