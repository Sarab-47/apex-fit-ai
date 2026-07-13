# Apex Fit AI

## Getting Started

### Prerequisites
- Docker
- Python 3.10+
- Node.js

### Setup Database
To start the PostgreSQL database using Docker, run:
```bash
docker-compose up -d
```

To verify it's running:
```bash
docker-compose ps
```

### Setup Backend
1. Create a `.env` file in the `backend/` directory using `.env.example` as a template.
2. Install dependencies:
   ```bash
   cd backend
   pip install -r requirements.txt
   ```
3. Run the backend:
   ```bash
   uvicorn app.main:app --reload
   ```

### Setup Frontend
```bash
cd frontend
npm install
npm run dev
```
