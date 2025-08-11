import React from 'react';
import Table from '../common/Table';
import { trucks } from '../../data/mockTrucks';

const columns = ['id', 'plate', 'status', 'franchisee'];

const Trucks = () => (
  <div>
    <h2 className="title">Gestion du parc de camions</h2>
    <Table columns={columns} data={trucks} />
  </div>
);

export default Trucks;
