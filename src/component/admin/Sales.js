import React, { useEffect, useState } from 'react';
import DataList from '../common/DataList';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
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

const columns = ['_id', 'franchisee', 'amount', 'date'];

const Sales = () => {
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSales = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/sales`);
        if (!response.ok) throw new Error('Erreur lors du chargement des ventes');
        const data = await response.json();
        setSales(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchSales();
  }, []);

  const handleDelete = async (sale) => {
    try {
      await fetch(`${process.env.REACT_APP_API_URL}/sales/${sale._id}`, { method: 'DELETE' });
      setSales(sales.filter(s => s._id !== sale._id));
    } catch (err) {
      setError('Erreur lors de la suppression');
    }
  };

  const handleSave = async (updatedSale) => {
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/sales/${updatedSale._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedSale)
      });
      if (!res.ok) throw new Error();
      setSales(sales.map(s => s._id === updatedSale._id ? updatedSale : s));
    } catch (err) {
      setError('Erreur lors de la modification');
    }
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

  if (loading) return <div className="has-text-white">Chargement des ventes...</div>;
  if (error) return <div className="has-text-danger">{error}</div>;

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
