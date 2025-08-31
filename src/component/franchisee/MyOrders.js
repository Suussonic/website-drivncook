
import React, { useEffect, useState } from 'react';
import Table from '../common/Table';

const columns = ['_id', 'item', 'quantity', 'date', 'status'];

const MyOrders = ({ user }) => {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    if (!user) return;
    const token = localStorage.getItem('token');
    fetch(`/api/orders?franchiseId=${user.franchiseId || ''}`, {
      headers: token ? { 'Authorization': 'Bearer ' + token } : {}
    })
      .then(res => res.json())
      .then(data => setOrders(Array.isArray(data) ? data : []));
  }, [user]);

  return (
    <section className="section">
      <h2 className="title">Mes commandes</h2>
      <Table columns={columns} data={orders} />
    </section>
  );
};

export default MyOrders;
// Fichier supprimé
