# Project Name

Full-stack application with NestJS backend and NextJS frontend.

### Images

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

2. env:

```bash
  DATABASE_URL="postgresql://act:act123@localhost:5432/nestjs_prisma?
  JWT_SECRET=12344
  JWT_EXPIRATION=1h
```

3. Run Docker Compose to start the database and init prisma:

```bash
 docker-compose up -d
```

4. Install the backend dependencies:
   ```bash
   pnpm install
   ```
5. Start the backend development server:
   ```bash
   pnpm run start:dev
   ```
6. Init prisma
   ````bash
   npx prisma migrate deploy
    ```
   The backend will be running on port 3001.
   ````

Frontend Setup

1. Navigate to the frontend folder and install:

   ```bash
    cd frontend
    pnpm install
   ```

2. Start the frontend development server:
   ```bash
    pnpm run dev
   ```

The frontend will be running on port 3000.

### Docker Configuration

1. The docker-compose.yml configuration for the PostgreSQL database is as follows:

   ```
   version: '3.8'

   services:
   db:
       image: postgres:13
       container_name: postgres_db
       environment:
       POSTGRES_USER: act
       POSTGRES_PASSWORD: act123
       POSTGRES_DB: nestjs_prisma
       ports:
       - '5432:5432'
       volumes:
       - postgres_data:/var/lib/postgresql/data
       networks:
       - backend

       volumes:
       postgres_data:

       networks:
       backend:
           driver: bridge
   ```

`version: '3.8'`

How to use this:
Copy ALL the text above (from # Project Name to the end).

Create a new file named README.md.

Paste all the copied content.

Save the file.
