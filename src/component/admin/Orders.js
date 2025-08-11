import React, { useState } from 'react';
import DataList from '../common/DataList';
import EditOrderForm from './EditOrderForm';
import { orders as ordersData } from '../../data/mockOrders';

const columns = ['id', 'franchisee', 'item', 'quantity'];

const Orders = () => {
  const [orders, setOrders] = useState(ordersData);

  const handleDelete = (order) => {
    setOrders(orders.filter(o => o.id !== order.id));
  };

  const handleSave = (updatedOrder) => {
    setOrders(orders.map(o => o.id === updatedOrder.id ? updatedOrder : o));
  };

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
