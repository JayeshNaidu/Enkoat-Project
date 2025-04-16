import React from 'react';
import { Bar, Pie, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  BarElement,
  ArcElement,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  BarElement,
  ArcElement,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

const DashboardCharts = ({ quotes }) => {
  const projectsByState = {};
  const projectsByRoofType = {};
  const projectsByMonth = {};

  quotes.forEach(q => {
    projectsByState[q.state] = (projectsByState[q.state] || 0) + 1;
    projectsByRoofType[q.roof_type] = (projectsByRoofType[q.roof_type] || 0) + 1;

    const month = q.project_date?.slice(0, 7); // format: YYYY-MM
    if (month) {
      projectsByMonth[month] = (projectsByMonth[month] || 0) + 1;
    }
  });

  const barData = {
    labels: Object.keys(projectsByState),
    datasets: [{
      label: 'Projects by State',
      data: Object.values(projectsByState),
      backgroundColor: 'rgba(54, 162, 235, 0.6)',
    }],
  };

  const pieData = {
    labels: Object.keys(projectsByRoofType),
    datasets: [{
      label: 'Roof Type Distribution',
      data: Object.values(projectsByRoofType),
      backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#8BC34A', '#FF9F40'],
    }],
  };

  const lineData = {
    labels: Object.keys(projectsByMonth).sort(),
    datasets: [{
      label: 'Monthly Project Trends',
      data: Object.keys(projectsByMonth).sort().map(key => projectsByMonth[key]),
      fill: false,
      borderColor: '#007bff',
      backgroundColor: '#007bff',
      tension: 0.3,
    }],
  };

  return (
    <>
      <div className="row mt-4">
        <div className="col-md-6 mb-4">
          <h5 className="text-center">Projects by State</h5>
          <Bar data={barData} />
        </div>
        <div className="col-md-6 mb-4">
          <h5 className="text-center">Roof Type Distribution</h5>
          <Pie data={pieData} />
        </div>
      </div>
      <div className="row mb-5">
        <div className="col-md-12">
          <h5 className="text-center">Monthly Project Trends</h5>
          <Line data={lineData} />
        </div>
      </div>
    </>
  );
};

export default DashboardCharts;
