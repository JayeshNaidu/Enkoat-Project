 
# EnKoat Quote Portal & Performance Dashboard

This is a full-stack contractor-facing web application built for EnKoat as part of a technical challenge. It allows contractors to submit roofing quotes and enables internal stakeholders to visualize quote and performance data.

---

## 📋 Features

### Quote Submission
- Form to submit contractor details, roof specs, and location.
- Stores data securely in a backend SQLite database.

### Dashboard View
- Search/filter quotes by state and roof type.
- Export filtered data to CSV or PDF.
- Clean table layout using Bootstrap.

### Insights View
- Visual metrics using Chart.js (bar, pie, line).
- Summary stats: total projects, avg roof size, est. energy savings.
- Monthly trends of roofing activity.

---

## Tools & Technologies

- **Frontend**: React + Vite + Bootstrap 5 + Axios
- **Backend**: FastAPI + SQLite + Pydantic
- **Charts**: Chart.js via react-chartjs-2
- **Export**: jsPDF, html2canvas, PapaParse
- **Mock Data**: Faker (Python)
- **Deployment Ready**: Vercel (frontend) + Render/Railway (backend)

---

## How to Run Locally

### Prerequisites
- Python 3.9+
- Node.js 18+

---

###Backend Setup (FastAPI)

```bash
cd backend
python -m venv .venv
.venv\Scripts\activate    # Windows
pip install -r requirements.txt
uvicorn main:app --reload
