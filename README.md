# Skill Assessment Portal

A full-stack web application for assessing skills through quizzes, tracking performance, and managing skills/questions.  
Supports **role-based access** (`user`, `admin`) with secure JWT-based authentication.

---

##  Live Demo

- **Frontend:** https://your-frontend.vercel.app  
- **Backend:** https://your-backend.up.railway.app  

---

##  Frontend Routes

| Route                | Description                     |
|----------------------|---------------------------------|
| `/`                  | Login Page                      |
| `/register`          | User Registration Page          |
| `/dashboard`         | User/Admin Dashboard            |
| `/quiz/:skillId`     | Quiz Page (start quiz)          |
| `/quiz-result`       | Quiz Result Summary             |
| `/admin`             | Admin Panel (manage data)       |

---

##  How to Use

1. Open the app in browser (e.g. `http://localhost:3000`)
2. Click **"Register"** to create an account (defaults to `user` role)
3. After registration, **login** using your email/password
4. Based on your role:
   - **User**: Start skill-based quizzes, view performance
   - **Admin**: Add/manage skills, add questions, delete data

---

##  Setup Instructions

###  Prerequisites

- Node.js ≥ 18
- MySQL ≥ 8
- npm or yarn

---

###  Backend Setup

```bash
cd skill-backend
npm install
cp .env.example .env   # configure DB + JWT_SECRET
npm start
```

Runs at: `http://localhost:5000`

---

###  Frontend Setup

```bash
cd skill-frontend
npm install
npm start
```

Runs at: `http://localhost:3000`

---

##  API Documentation

###  Auth

- `POST /api/auth/register`  
  Register new user  
  Body: `{ name, email, password, role? }`  
  → `role` is optional, defaults to `"user"`

- `POST /api/auth/login`  
  Login user/admin  
  Body: `{ email, password }`

---

###  Skills

- `GET /api/skills`  
  List all available skills

- `POST /api/skills`  
  Add a new skill (admin only)  
  Body: `{ name, description }`

- `DELETE /api/skills/:id`  
  Delete a skill by ID

---

###  Questions

- `GET /api/skills/:skillId/questions`  
  Get questions under a skill

- `POST /api/skills/:skillId/questions`  
  Add question  
  Body:  
  ```json
  {
    "question_text": "2 + 2 = ?",
    "options": ["2", "3", "4", "5"],
    "correct_answer": "4"
  }
  ```

- `DELETE /api/questions/:id`  
  Delete question

---

###  Quiz

- `GET /api/quiz/start/:skillId`  
  Start quiz for a skill (fetch questions)

- `POST /api/quiz/submit`  
  Submit quiz  
  Body:
  ```json
  {
    "skillId": 2,
    "answers": [
      { "questionId": 1, "selectedOption": "is" },
      { "questionId": 2, "selectedOption": "am" }
    ]
  }
  ```

- `GET /api/quiz/history`  
  Get logged-in user's quiz history

- `GET /api/quiz/:attempt_id`  
  View detailed result of a quiz attempt

---

##  Database Schema

### users

| Field       | Type             |
|-------------|------------------|
| id          | INT (PK)         |
| name        | VARCHAR          |
| email       | VARCHAR (unique) |
| password    | VARCHAR (hashed) |
| role        | ENUM('user','admin') |
| created_at  | DATETIME         |

### skills

| Field        | Type     |
|--------------|----------|
| id           | INT (PK) |
| name         | VARCHAR  |
| description  | TEXT     |
| created_at   | DATETIME |

### questions

| Field          | Type     |
|----------------|----------|
| id             | INT (PK) |
| skill_id       | INT (FK) |
| question_text  | TEXT     |
| options        | JSON     |
| correct_answer | VARCHAR  |
| created_at     | DATETIME |

### quiz_attempts

| Field           | Type     |
|------------------|----------|
| id              | INT (PK) |
| user_id         | INT (FK) |
| skill_id        | INT (FK) |
| score           | INT      |
| total_questions | INT      |
| attempted_at    | DATETIME |

### quiz_answers

| Field          | Type     |
|----------------|----------|
| id             | INT (PK) |
| attempt_id     | INT (FK) |
| question_id    | INT (FK) |
| selected_answer| VARCHAR  |
| is_correct     | BOOLEAN  |

---

##  Deployment Notes

- **Frontend:** Vercel / Netlify
- **Backend:** Railway / Render
- **Database:** Railway (MySQL)

###  Set Environment Variables:

- `MYSQLHOST`
- `MYSQLUSER`
- `MYSQLPASSWORD`
- `MYSQLDATABASE`
- `JWT_SECRET`

---

##  Features

-  User & Admin login/register
-  Skill-based quiz system
-  Performance tracking
-  JWT-based authentication
-  MySQL relational DB
-  Modern Material UI design

---

##  Developer

Built by [Tanishk Singh](mailto:tanishk.singh_bca20@gla.ac.in)  
© 2025 Voyants Solutions Pvt. Ltd.
