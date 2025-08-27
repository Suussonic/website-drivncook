



import React, { useEffect, useState } from 'react';
import Table from '../common/Table';

const columns = ['id', 'plate', 'status'];

const MyTrucks = ({ user }) => {
  const [trucks, setTrucks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTrucks = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/trucks`);
        if (!response.ok) throw new Error('Erreur lors du chargement des camions');
        const data = await response.json();
        setTrucks(data.filter(t => t.franchisee === user?.name));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchTrucks();
  }, [user]);

  if (loading) return <div>Chargement des camions...</div>;
  if (error) return <div className="has-text-danger">{error}</div>;

  return (
    <section className="section">
      <h2 className="title">Mes camions</h2>
      <Table columns={columns} data={trucks} />
    </section>
  );
};

export default MyTrucks;
