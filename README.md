## Database Setup (MySQL)

Create database manually in MySQL:

```sql
CREATE DATABASE auth_project;
USE auth_project;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(100) UNIQUE,
  password VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);




## Backend Setup

```Terminal
cd backend
npm install
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=auth_project

## frontend Setup
cd frontend
npm install
npm run dev



JWT_SECRET=super_secret_key




  NEXT_PUBLIC_API_BASE_URL= "http://localhost:5000/api"

