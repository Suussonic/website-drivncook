import React from 'react';
import Table from '../common/Table';
import { warehouses } from '../../data/mockWarehouses';

const columns = ['id', 'name', 'stock'];

const Warehouses = () => (
  <section className="section">
    <h2 className="title">Gestion des entrepôts</h2>
    <Table columns={columns} data={warehouses} />
  </section>
);

export default Warehouses;
