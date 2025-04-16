import React from 'react';

const DashboardSummary = ({ quotes }) => {
  const totalProjects = quotes.length;
  const totalRoofSize = quotes.reduce((sum, q) => sum + parseFloat(q.roof_size || 0), 0);
  const averageRoofSize = totalProjects ? totalRoofSize / totalProjects : 0;
  const estimatedEnergySavings = totalRoofSize * 0.2; // Mock calculation

  return (
    <div className="row mb-4">
      <div className="col-md-4">
        <div className="bg-primary text-white rounded p-3 text-center">
          <h5>Total Projects</h5>
          <h3>{totalProjects}</h3>
        </div>
      </div>
      <div className="col-md-4">
        <div className="bg-success text-white rounded p-3 text-center">
          <h5>Average Roof Size</h5>
          <h3>{averageRoofSize.toFixed(2)} sq ft</h3>
        </div>
      </div>
      <div className="col-md-4">
        <div className="bg-warning text-dark rounded p-3 text-center">
          <h5>Est. Energy Savings</h5>
          <h3>{estimatedEnergySavings.toFixed(2)} kWh</h3>
        </div>
      </div>
    </div>
  );
};

export default DashboardSummary;
