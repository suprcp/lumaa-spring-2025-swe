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
   psql -U postgres template1;
   CREATE DATABASE task_management_db;
   ```

### Backend Setup

1. Clone the repository:
   ```
   git clone https://github.com/suprcp/TaskManagement.git
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
   DATABASE_HOST=localhost
   DATABASE_PORT=5432
   DATABASE_USERNAME=postgres
   DATABASE_PASSWORD=postgres
   DATABASE_NAME=task_management_db
   DATABASE_URL=postgresql://$DATABASE_USERNAME:$DATABASE_PASSWORD@localhost:$DATABASE_PORT/$DATABASE_NAME
   JWT_SECRET=task_management
   PORT=3002
   ```
   Replace `username` and `password` with your PostgreSQL credentials.

5. Start the backend server:
   ```
   npm run start:dev
   ```
   The backend will run on http://localhost:3002 (or your configured port).

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
   REACT_APP_API_URL=http://localhost:3002
   PORT=3001
   ```

4. Start the frontend application:
   ```
   npm start
   ```
   The frontend will run on http://localhost:3001

5. Salary Expections:
   $1,000/month

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

- The project currently relies on manual testing by using Postman for backend endpoints and through the UI in the browser for the frontend.
- The tests focused on verifying core functionalities: user registration, login, and task CRUD operations, as well as ensuring route protection.
- Future development plans include adding unit tests and integration tests.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.
