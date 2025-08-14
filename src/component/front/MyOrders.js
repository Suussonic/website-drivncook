import React from 'react';
import Table from '../common/Table';
import { orders } from '../../data/mockOrders';

const columns = ['id', 'item', 'quantity'];

const MyOrders = ({ user }) => (
  <section className="section">
    <h2 className="title">Mes commandes</h2>
    <Table columns={columns} data={orders.filter(o => o.franchisee === user?.name)} />
  </section>
);

export default MyOrders;
