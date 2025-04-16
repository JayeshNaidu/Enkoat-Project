import React, { useEffect, useState } from 'react';
import api from '../api';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import Papa from 'papaparse';

const Dashboard = () => {
  const [quotes, setQuotes] = useState([]);
  const [stateFilter, setStateFilter] = useState('');
  const [roofTypeFilter, setRoofTypeFilter] = useState('');

  const fetchQuotes = async () => {
    try {
      const params = {};
      if (stateFilter) params.state = stateFilter;
      if (roofTypeFilter) params.roof_type = roofTypeFilter;

      const res = await api.get('/quotes', { params });
      setQuotes(res.data);
    } catch (error) {
      console.error("Failed to fetch quotes:", error);
    }
  };

  useEffect(() => {
    fetchQuotes();
  }, [stateFilter, roofTypeFilter]);

  const exportCSV = () => {
    const csv = Papa.unparse(quotes);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.setAttribute("download", "quotes_export.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const exportPDF = () => {
    const input = document.getElementById("dashboard-content");
    html2canvas(input, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = pdfWidth;
      const imgHeight = (canvas.height * pdfWidth) / canvas.width;

      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pdfHeight;

      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pdfHeight;
      }

      pdf.save("quotes_dashboard.pdf");
    });
  };

  return (
    <div className="container-fluid px-4 mt-4">
      <h2 className="mb-4">Project Quotes Dashboard</h2>

      {/* Filters */}
      <div className="row mb-4">
        <div className="col-md-4">
          <label>Search by State</label>
          <input
            type="text"
            className="form-control"
            placeholder="e.g. AZ"
            value={stateFilter}
            onChange={(e) => setStateFilter(e.target.value)}
          />
        </div>

        <div className="col-md-4">
          <label>Search by Roof Type</label>
          <input
            type="text"
            className="form-control"
            placeholder="e.g. Foam"
            value={roofTypeFilter}
            onChange={(e) => setRoofTypeFilter(e.target.value)}
          />
        </div>

        <div className="col-md-4 d-flex align-items-end">
          <button
            className="btn btn-secondary w-100"
            onClick={() => {
              setStateFilter('');
              setRoofTypeFilter('');
            }}
          >
            Clear Filters
          </button>
        </div>
      </div>

      {/* Export Buttons */}
      <div className="d-flex justify-content-end gap-2 mb-3">
        <button className="btn btn-outline-success" onClick={exportCSV}>
          Export CSV
        </button>
        <button className="btn btn-outline-danger" onClick={exportPDF}>
          Export PDF
        </button>
      </div>

      {/* Table Only */}
      <div id="dashboard-content">
        <table className="table table-bordered table-striped">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Contractor</th>
              <th>Company</th>
              <th>Roof Size</th>
              <th>Roof Type</th>
              <th>City</th>
              <th>State</th>
              <th>Project Date</th>
            </tr>
          </thead>
          <tbody>
            {quotes.map((q) => (
              <tr key={q.id}>
                <td>{q.id}</td>
                <td>{q.contractor_name}</td>
                <td>{q.company}</td>
                <td>{q.roof_size}</td>
                <td>{q.roof_type}</td>
                <td>{q.city}</td>
                <td>{q.state}</td>
                <td>{q.project_date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
