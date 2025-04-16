import React, { useState } from 'react';
import api from '../api';

const QuoteForm = () => {
  const [formData, setFormData] = useState({
    contractor_name: '',
    company: '',
    roof_size: '',
    roof_type: '',
    city: '',
    state: '',
    project_date: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/quotes', formData);
      alert("Quote submitted!");
      setFormData({
        contractor_name: '',
        company: '',
        roof_size: '',
        roof_type: '',
        city: '',
        state: '',
        project_date: ''
      });
    } catch (err) {
      alert("Error submitting quote");
      console.error(err);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Submit a Roofing Quote</h2>
      <form onSubmit={handleSubmit}>
        {[
          { label: 'Contractor Name', name: 'contractor_name' },
          { label: 'Company', name: 'company' },
          { label: 'Roof Size (sq ft)', name: 'roof_size', type: 'number' },
          { label: 'Roof Type', name: 'roof_type' },
          { label: 'City', name: 'city' },
          { label: 'State', name: 'state' },
          { label: 'Project Date', name: 'project_date', type: 'date' }
        ].map(({ label, name, type = 'text' }) => (
          <div className="mb-3" key={name}>
            <label className="form-label">{label}</label>
            <input
              type={type}
              className="form-control"
              name={name}
              value={formData[name]}
              onChange={handleChange}
              required
            />
          </div>
        ))}

        <button type="submit" className="btn btn-primary w-100">Submit Quote</button>
      </form>
    </div>
  );
};

export default QuoteForm;
