import React from 'react';
import Table from '../common/Table';
import { orders } from '../../data/mockOrders';

const columns = ['id', 'item', 'quantity'];

const MyOrders = () => (
  <section className="section">
    <h2 className="title">Mes commandes</h2>
    <Table columns={columns} data={orders.filter(o => o.franchisee === 'Franchisé A')} />
  </section>
);

export default MyOrders;
