import React, { useState } from 'react';
import DataList from '../common/DataList';
import { sales as salesData } from '../../data/mockSales';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

// Exemple de formulaire d'édition pour une vente (à adapter selon vos besoins)
const EditSaleForm = ({ item, onClose, onSave }) => {
  const [form, setForm] = useState({ ...item });

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSave && onSave(form);
    onClose();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="field">
        <label className="label has-text-white">Montant (€)</label>
        <div className="control">
          <input className="input" name="amount" type="number" value={form.amount} onChange={handleChange} style={{ background: '#181a20', color: '#fff', border: 'none' }} />
        </div>
      </div>
      <div className="field">
        <label className="label has-text-white">Date</label>
        <div className="control">
          <input className="input" name="date" type="date" value={form.date} onChange={handleChange} style={{ background: '#181a20', color: '#fff', border: 'none' }} />
        </div>
      </div>
      <button className="button is-success" type="submit">Enregistrer</button>
    </form>
  );
};

const columns = ['id', 'franchisee', 'amount', 'date'];

const Sales = () => {
  const [sales, setSales] = useState(salesData);

  const handleDelete = (sale) => {
    setSales(sales.filter(s => s.id !== sale.id));
  };

  const handleSave = (updatedSale) => {
    setSales(sales.map(s => s.id === updatedSale.id ? updatedSale : s));
  };

  const exportPDF = () => {
    const doc = new jsPDF();
    doc.text('Historique des ventes', 14, 16);
    doc.autoTable({
      head: [columns],
      body: sales.map(s => columns.map(col => s[col])),
      startY: 22,
      styles: { fontSize: 10 }
    });
    doc.save('ventes.pdf');
  };

  return (
    <>
      <div className="is-flex is-justify-content-space-between is-align-items-center mb-4">
        <h2 className="title has-text-white">Historique des ventes</h2>
        <button className="button is-info" onClick={exportPDF}>
          <span className="icon"><i className="fas fa-file-pdf"></i></span>
          <span>Exporter PDF</span>
        </button>
      </div>
      <DataList
        columns={columns}
        data={sales}
        EditForm={props => <EditSaleForm {...props} onSave={handleSave} />}
        onDelete={handleDelete}
      />
    </>
  );
};

export default Sales;
