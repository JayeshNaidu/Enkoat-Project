// src/App.jsx

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import QuoteForm from './components/QuoteForm';
import Dashboard from './components/Dashboard';
import Insights from './components/Insights';

function App() {
  return (
    <Router>
      <div className="bg-light min-vw-100 min-vh-100 d-flex flex-column">
        {/* Navigation */}
        <nav className="container py-4 d-flex justify-content-center gap-3">
          <Link to="/" className="btn btn-outline-primary">Submit Quote</Link>
          <Link to="/dashboard" className="btn btn-outline-secondary">Dashboard</Link>
          <Link className="btn btn-outline-dark" to="/insights">Insights</Link>
        </nav>

        {/* Centered Page Content */}
        <div className="flex-grow-1 d-flex justify-content-center align-items-start px-3">
          <div className="w-100" style={{ maxWidth: "1200px" }}>
            <Routes>
              <Route path="/" element={<QuoteForm />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/insights" element={<Insights />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
