import React, { useEffect, useState } from 'react';
import DataList from '../common/DataList';
import EditOrderForm from './EditOrderForm';

const columns = ['_id', 'franchisee', 'item', 'quantity'];

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/orders`);
        if (!response.ok) throw new Error('Erreur lors du chargement des commandes');
        const data = await response.json();
        setOrders(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const handleDelete = async (order) => {
    try {
      await fetch(`${process.env.REACT_APP_API_URL}/orders/${order._id}`, { method: 'DELETE' });
      setOrders(orders.filter(o => o._id !== order._id));
    } catch (err) {
      setError('Erreur lors de la suppression');
    }
  };

  const handleSave = async (updatedOrder) => {
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/orders/${updatedOrder._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedOrder)
      });
      if (!res.ok) throw new Error();
      setOrders(orders.map(o => o._id === updatedOrder._id ? updatedOrder : o));
    } catch (err) {
      setError('Erreur lors de la modification');
    }
  };

  if (loading) return <div className="has-text-white">Chargement des commandes...</div>;
  if (error) return <div className="has-text-danger">{error}</div>;

  return (
    <>
      <h2 className="title has-text-white">Gestion des achats</h2>
      <DataList
        columns={columns}
        data={orders}
        EditForm={props => <EditOrderForm {...props} onSave={handleSave} />}
        onDelete={handleDelete}
      />
    </>
  );
};

export default Orders;
