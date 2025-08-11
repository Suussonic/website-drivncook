import React from 'react';
import Notification from '../common/Notification';

const Alerts = () => {
  const lowStock = [
    { warehouse: 'Paris', item: 'Pain', quantity: 10 },
    { warehouse: 'Lyon', item: 'Viande', quantity: 5 },
  ];

  return (
    <section className="section">
      <h2 className="title">Alertes</h2>
      {lowStock.map((alert, idx) => (
        <Notification
          key={idx}
          type="is-danger"
          message={`Stock bas: ${alert.item} à ${alert.warehouse} (${alert.quantity})`}
          onClose={() => {}}
        />
      ))}
    </section>
  );
};

export default Alerts;