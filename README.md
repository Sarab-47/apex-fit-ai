# Apex Fit AI

Apex Fit AI is an AI-powered fitness coaching web application designed to help users reach their fitness goals efficiently. It offers personalized workout split recommendations (such as Full Body, PPL, and Arnold Split) tailored to the user's experience level. The application tracks calories and macros aligned with individual goals and features an adaptive progressive-overload algorithm that automatically adjusts weight recommendations based on logged performance. Additionally, the platform includes an intelligent AI chat coach, powered by a locally-run LLM (Ollama), which provides guidance with full context of the user's specific fitness plan and historical data.

## Key Features

- **Personalized Workouts:** Workout split recommendations across 4 experience tiers.
- **Exercise Library:** Comprehensive library featuring mannequin pose illustrations.
- **Nutrition Tracking:** TDEE and macro calculation based on personal fitness goals.
- **Meal Logging:** Daily calorie and macro tracking capabilities.
- **Adaptive Progression:** Intelligent weight recommendation adjustments based on user performance.
- **Progress Tracking:** Interactive charts to visualize progress for every exercise.
- **AI Chat Coach:** Integrated chat coach with full context of your plan and data (powered by local Ollama LLM).

## Tech Stack

- **Frontend:** Next.js, TypeScript, Tailwind CSS
- **Backend:** FastAPI, SQLAlchemy, PostgreSQL
- **AI:** Ollama (local LLM, llama3)
- **Infrastructure:** Docker (for PostgreSQL)

## Setup & Installation

### Prerequisites

Ensure you have the following installed on your machine:
- [Python 3.10+](https://www.python.org/)
- [Node.js 18+](https://nodejs.org/)
- [Docker Desktop](https://www.docker.com/)
- [Ollama](https://ollama.com/)

### Clone and Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/apex-fit-ai.git
   cd "Apex Fit Ai"
   ```

### Backend Setup

1. Start the database (from the project root):
   ```bash
   docker compose up -d
   ```
2. Navigate to the backend directory:
   ```bash
   cd backend
   ```
3. Create a virtual environment and install dependencies:
   ```bash
   python -m venv venv
   # On Windows:
   .\venv\Scripts\activate
   # On macOS/Linux:
   source venv/bin/activate
   pip install -r requirements.txt
   ```
4. Configure environment variables:
   Copy `.env.example` to `.env` and fill in the required fields.
5. Run the backend server:
   ```bash
   uvicorn app.main:app --reload
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd ../frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure environment variables:
   Copy `.env.local.example` to `.env.local` and configure as needed.
4. Start the development server:
   ```bash
   npm run dev
   ```

### AI Model Setup

Ensure Ollama is running and pull the `llama3` model:
```bash
ollama pull llama3
```

## Project Status

This application is an MVP developed as a learning/portfolio project. It is **not** production-hardened.
- **Limited Scope:** Designed for single-user testing only.
- **Security:** No rate limiting or authentication hardening on the AI chat functionality.
- **Performance:** Relies on local resources for the LLM; performance will vary based on user hardware.
