import React, { useEffect, useState } from 'react';
import api from '../api';
import DashboardSummary from './DashboardSummary';
import DashboardCharts from './DashboardCharts';
import MapView from './MapView';

const Insights = () => {
  const [quotes, setQuotes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get('/quotes');
        setQuotes(res.data);
      } catch (err) {
        console.error("Failed to load insights:", err);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container-fluid px-4 mt-4">
      <h2 className="mb-4">Dashboard Insights</h2>

      {quotes.length > 0 ? (
        <>
          {/* Summary Cards */}
          <DashboardSummary quotes={quotes} />

          {/* Charts */}
          <DashboardCharts quotes={quotes} />

          {/* Map Visualization */}
          <div className="mt-5">
            <h4 className="mb-3">Project Locations (Map View)</h4>
            <MapView quotes={quotes} />
          </div>
        </>
      ) : (
        <p>Loading insights...</p>
      )}
    </div>
  );
};

export default Insights;
