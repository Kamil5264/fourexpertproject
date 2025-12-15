


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

Originally, the authentication flow was partially inconsistent between frontend and backend, and error handling was minimal,  Beacuse i was not sending  the token in response after succesfull login .
I standardized the auth flow using JWT Bearer tokens end-to-end, ensuring the backend always returns a token on login and validates it for protected routes. 
I added backend-side validation for registration, including required fields, email format validation, password length checks, and proper conflict handling for duplicate emails. 
I implemented consistent API error responses with correct HTTP status codes (400, 401, 409). 
On the frontend, I added global 401 handling to clear the token and redirect the user to the login page with a session expired message. 
I also removed hardcoded values and aligned environment variables and database configuration between the codebase and README for clarity and correctness.

