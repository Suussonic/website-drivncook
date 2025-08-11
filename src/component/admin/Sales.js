import React from 'react';
import Table from '../common/Table';
import { sales } from '../../data/mockSales';

const columns = ['id', 'franchisee', 'amount', 'date'];

const Sales = () => (
  <div>
    <h2 className="title">Historique des ventes</h2>
    <Table columns={columns} data={sales} />
  </div>
);

export default Sales;
