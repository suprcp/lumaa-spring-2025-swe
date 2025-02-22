# Task Management System

## Project Overview

This is a Task Management application built with React + TypeScript (frontend), Node.js with NestJS (backend), and PostgreSQL (database). The application allows users to register, log in, and manage their tasks.

## Features

- User registration and authentication
- View a list of tasks
- Create new tasks
- Update existing tasks (mark as complete, edit)
- Delete tasks

## Tech Stack

- Frontend: React + TypeScript
- Backend: Node.js with NestJS
- Database: PostgreSQL
- ORM: TypeORM
- Authentication: JWT

## Prerequisites

- Node.js (v14 or later)
- PostgreSQL
- npm or yarn

## Installation and Setup

### Database Setup

1. Install PostgreSQL following the [official documentation](https://www.postgresql.org/download/).
2. Create a new database:
   ```
   psql
   CREATE DATABASE task_management_db;
   ```

### Backend Setup

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/task-management.git
   ```

2. Navigate to the backend directory:
   ```
   cd task-management/backend
   ```

3. Install dependencies:
   ```
   npm install
   ```

4. Set up environment variables:
   Create a `.env` file in the backend directory with the following content:
   ```
   DATABASE_URL=postgresql://username:password@localhost:5432/task_management_db
   JWT_SECRET=your_jwt_secret_key
   ```
   Replace `username` and `password` with your PostgreSQL credentials.

5. Run database migrations:
   ```
   npm run migration:run
   ```

6. Start the backend server:
   ```
   npm run start:dev
   ```
   The backend will run on http://localhost:3000 (or your configured port).

### Frontend Setup

1. Navigate to the frontend directory:
   ```
   cd ../frontend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the frontend directory with:
   ```
   REACT_APP_API_URL=http://localhost:3000
   ```

4. Start the frontend application:
   ```
   npm start
   ```
   The frontend will run on http://localhost:3000 (or another port if 3000 is occupied).

## API Endpoints

- `POST /auth/register` – Create a new user
- `POST /auth/login` – Login user, return a JWT token
- `GET /tasks` – Retrieve a list of tasks (requires authentication)
- `POST /tasks` – Create a new task (requires authentication)
- `PUT /tasks/:id` – Update a task (requires authentication)
- `DELETE /tasks/:id` – Delete a task (requires authentication)

## Database Structure

This project uses a PostgreSQL database with the following main tables:
- `users`: Stores user information
- `tasks`: Stores task information

## Testing Notes

- The project currently relies on manual testing.
- Future development plans include adding unit tests and integration tests.
- Suggested testing areas:
  - User authentication flow
  - CRUD operations for tasks
  - API endpoint responses
  - Frontend component rendering and state management

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.
