import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Enregistrement des éléments nécessaires pour Chart.js v3+
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const data = {
  labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin'],
  datasets: [
    {
      label: 'Ventes (€)',
      data: [3000, 4000, 3500, 5000, 7000, 8000],
      fill: false,
      backgroundColor: '#3273dc',
      borderColor: '#3273dc',
      tension: 0.3,
    },
  ],
};

const options = {
  responsive: true,
  plugins: {
    legend: { display: false },
  },
};

const SalesStats = () => (
  <div>
    <h2 className="subtitle mb-4">Statistiques des ventes</h2>
    <Line data={data} options={options} />
  </div>
);

export default SalesStats;
