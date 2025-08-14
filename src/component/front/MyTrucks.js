import React from 'react';
import Table from '../common/Table';
import { trucks } from '../../data/mockTrucks';

const columns = ['id', 'plate', 'status'];

const MyTrucks = ({ user }) => (
  <section className="section">
    <h2 className="title">Mes camions</h2>
    <Table columns={columns} data={trucks.filter(t => t.franchisee === user?.name)} />
  </section>
);

export default MyTrucks;
