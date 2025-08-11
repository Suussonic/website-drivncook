import React from 'react';
import Table from '../common/Table';
import { sales } from '../../data/mockSales';

const columns = ['id', 'amount', 'date'];

const MySales = () => (
  <section className="section">
    <h2 className="title">Mes ventes</h2>
    <Table columns={columns} data={sales.filter(s => s.franchisee === 'Franchisé A')} />
  </section>
);

export default MySales;
