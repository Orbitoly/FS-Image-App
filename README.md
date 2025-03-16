# **Image Voting System**

This is a **full-stack web application** that allows users to view images, vote (like/dislike), and export vote data as a CSV file. The project is containerized using **Docker & Docker Compose**, making it easy to set up and run.

## **Features**

- View a grid of images
- Like / Dislike images with real-time updates
- Show the number of likes and dislikes for each image
- **Export votes** as a CSV file
- **Persistent database** using PostgreSQL
- **Fully Dockerized** (Runs with a single command)
- **Database migrations** with Alembic
- **E2E tests** with Cypress

## **Technology Stack**

### **Backend**

- **FastAPI** - Modern, high-performance web framework
- **SQLAlchemy** - SQL toolkit and ORM
- **PostgreSQL** - Relational database
- **Alembic** - Database migration tool
- **Pydantic** - Data validation and settings management
- **Pytest** - Testing framework

### **Frontend**

- **React 19** - UI library
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **Vite** - Next generation frontend tooling
- **Cypress** - End-to-end testing framework for web applications

## **Setup & Installation**

### **Prerequisites**

- Docker
- Docker Compose

### **Run the Application**

Clone the repository:

```sh
git clone https://github.com/Orbitoly/Image-Voting-System
cd Image-Voting-System
```

Create the environment file for the frontend:

```sh
cd frontend
cp .env.example .env
cd ..
```

Run the app using Docker Compose:

```sh
docker-compose up --build
```

The app will be available at:

- **Frontend**: `http://localhost:4173`
- **Backend API**: `http://localhost:8000/docs` (Interactive API Docs)

---

## **Project Structure**

```
/Image-Voting-System
 ├── backend/          # FastAPI Server
 │   ├── app/          # Application code
 │   │   ├── api/      # API endpoints
 │   │   ├── db/       # Database models
 │   │   └── services/ # Business logic
 │   ├── alembic/      # Database migrations
 │   └── tests/        # Backend tests
 ├── frontend/         # React Client
 │   ├── src/          # Source code
 │   └── public/       # Static assets
 ├── db/               # Database setup
 ├── docker-compose.yml
 ├── README.md
 └── .gitignore
```

---

## **API Endpoints**

| Method | Endpoint  | Description                     |
| ------ | --------- | ------------------------------- |
| `GET`  | `/images` | Fetch list of images            |
| `POST` | `/vote`   | Vote on an image (like/dislike) |
| `GET`  | `/votes`  | Get vote counts for all images  |
| `GET`  | `/export` | Download votes as CSV           |

---

## **Development**

### **Backend Development**

The backend uses Alembic for database migrations. To create a new migration:

```sh
cd backend
./create_migration.sh "migration message"
```

### **Frontend Development**

To run the frontend in development mode:

```sh
cd frontend
pnpm install
cp .env.example .env  # Create .env file from the example template
pnpm run dev
```

### **Running Tests**

#### **Unit Tests with Vitest**

To run unit tests using Vitest:

```sh
cd frontend
pnpm test           # Run tests once
pnpm test:watch     # Run tests in watch mode
```

#### **End-to-End Tests**

To run e2e tests:

```sh
pnpm test:e2e       # Run e2e tests in headless mode
pnpm test:e2e:open  # Open Cypress test runner
```

---

## **How to Stop the App**

Press **CTRL + C** or run:

```sh
docker-compose down
```

---
