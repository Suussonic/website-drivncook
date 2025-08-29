



import React, { useEffect, useState } from 'react';
import Table from '../common/Table';
import { useTranslation } from 'react-i18next';

const columns = ['id', 'amount', 'date'];

const MySales = ({ user }) => {
  const { t } = useTranslation();
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSales = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/sales`);
        if (!response.ok) throw new Error('Erreur lors du chargement des ventes');
        const data = await response.json();
        setSales(data.filter(s => s.franchisee === user?.name));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchSales();
  }, [user]);

  if (loading) return <div>{t('Chargement des ventes...')}</div>;
  if (error) return <div className="has-text-danger">{error}</div>;

  return (
    <section className="section">
      <h2 className="title">{t('Mes ventes')}</h2>
      <Table columns={columns} data={sales} />
    </section>
  );
};

export default MySales;
