# Project Name

Full-stack application with NestJS backend and [Frontend Framework] frontend.

## Quick Start

### Prerequisites

- Node.js (recommended LTS version)
- Docker and Docker Compose
- pnpm (recommended v9.0.6)

---

## Backend Setup

1. Navigate to the `backend` folder:

   ```bash
   cd backend
   Create a .env file with the following content:
   ```

env
Copiar
Editar
DATABASE_URL="postgresql://act:act123@localhost:5432/nestjs_prisma?schema=public"
Run Docker Compose to start the database:

bash
Copiar
Editar
docker-compose up -d
Install the backend dependencies:

bash
Copiar
Editar
pnpm install
Start the backend development server:

bash
Copiar
Editar
pnpm run start:dev
The backend will be running on port 3001.

Frontend Setup
Navigate to the frontend folder:

bash
Copiar
Editar
cd frontend
Install the frontend dependencies:

bash
Copiar
Editar
pnpm install
Start the frontend development server:

bash
Copiar
Editar
pnpm run dev
The frontend will be running on port 3000.

Docker Configuration
The docker-compose.yml configuration for the PostgreSQL database is as follows:

yaml
Copiar
Editar
version: '3.8'

services:
db:
image: postgres:13
container_name: postgres_db
environment:
POSTGRES_USER: act
POSTGRES_PASSWORD: act123
POSTGRES_DB: nestjs_prisma
ports: - '5432:5432'
volumes: - postgres_data:/var/lib/postgresql/data
networks: - backend

volumes:
postgres_data:

networks:
backend:
driver: bridge
Command Reference
Backend
Command Description
pnpm run start:dev Start dev server
pnpm run build Create production build
pnpm run start:prod Run production build
Frontend
Command Description
pnpm run dev Start dev server
pnpm run build Create production build
🔌 Ports
Service Port
Backend API 3001
Frontend App 3000
PostgreSQL 5432
💡 Tips
Use pnpm v9.0.6 for both frontend and backend.

The database persists data via Docker volume.

Ensure Docker is running before starting the backend.

📝 License
MIT or [Your License Here]

How to use this:
Copy ALL the text above (from # Project Name to the end).

Create a new file named README.md.

Paste all the copied content.

Save the file.
