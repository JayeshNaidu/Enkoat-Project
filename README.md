# EnKoat Quote Portal & Performance Dashboard

This full-stack web application is designed for contractors to submit roofing quotes and for internal stakeholders to visualize quote and performance data.

## Features

### Quote Submission
- Form to submit contractor details, roof specifications, and location.
- Data is stored securely in a backend SQLite database (`quotes.db`).

### Dashboard View
- Search and filter quotes by state and roof type.
- Export filtered data to CSV or PDF.
- Clean table layout using Bootstrap.

### Insights View
- Visual metrics using Chart.js (bar, pie, line).
- Summary statistics: total projects, average roof size, estimated energy savings.
- Monthly trends of roofing activity.

## Tools & Technologies

- **Frontend**: React, Vite, Bootstrap 5, Axios  
- **Backend**: FastAPI, SQLite (`quotes.db`), Pydantic  
- **Charts**: Chart.js via react-chartjs-2  
- **Export**: jsPDF, html2canvas, PapaParse  
- **Mock Data**: Faker (Python)  
- **Containerization**: Docker (backend)

## Running the Project Locally

### Prerequisites

- Node.js and npm  
- Python 3.8+  
- Docker (optional, for backend containerization)

### Backend Setup (Manual)

1. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```

2. Create and activate a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Run the FastAPI server:
   ```bash
   uvicorn main:app --reload --port 3000
   ```

> Note: Data is stored in a local SQLite file named `quotes.db`.

### Backend Setup (Docker)

A `Dockerfile` is provided for containerizing the backend:

1. From the project root, build and run the container:
   ```bash
   docker build -t enkoat-backend ./backend
   docker run -p 3000:3000 enkoat-backend
   ```

### Frontend Setup

1. Navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Access the application at `http://localhost:5173`.

## Mock Data

The backend uses the `Faker` library to generate mock quote data, simulating real-world contractor submissions for testing and demonstration purposes.

## Future Improvements

- Implement user authentication and role-based access control  
- Dockerize both frontend and backend for streamlined deployment  
- Integrate a persistent database like PostgreSQL for production  
- Enhance dashboard filters and add more interactive charts  
- Add automated testing for API and UI reliability