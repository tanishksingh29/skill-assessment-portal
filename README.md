Skill Assessment Portal
======================

A full-stack web application for skill assessment, quizzes, and performance tracking. Supports role-based access (admin / user) with JWT authentication.

---

Setup Instructions
------------------

Prerequisites:
- Node.js >= 18
- MySQL >= 8
- npm 

Backend Setup:
1. cd skill-backend
2. npm install
3. cp .env.example .env    # configure database, JWT_SECRET, etc.
4. npm start

Backend runs on http://localhost:5000

Frontend Setup:
1. cd skill-frontend
2. npm install
3. npm start

Frontend runs on http://localhost:3000

---

API Documentation
-----------------

Auth
- POST /api/auth/login  
  Body: { email, password }  
  Description: Login user/admin

- POST /api/auth/register  
  Body: { name, email, password, role }  
  Description: Register new user (optional)

Skills
- GET /api/skills  
  Description: Get all skills

- POST /api/skills  
  Body: { name, description }  
  Description: Add a new skill

- DELETE /api/skills/:id  
  Description: Delete a skill

Questions
- GET /api/skills/:skillId/questions  
  Description: Get all questions for a skill

- POST /api/skills/:skillId/questions  
  Body: { question_text, options[], correct_answer }  
  Description: Add a question

- DELETE /api/questions/:id  
  Description: Delete a question

Quiz
- GET /api/quiz/start/:skillId  
  Description: Fetch questions for a quiz

- POST /api/quiz/submit  
  Body: { skill_id, answers[] }  
  Description: Submit quiz attempt

- GET /api/quiz/history  
  Description: Get past quiz attempts

> answers[] format:  
[
  { "question_id": 1, "selected_answer": "A" },
  { "question_id": 2, "selected_answer": "B" }
]

---

Database Schema
---------------

Users
- id (INT PK, Auto-increment)
- name (VARCHAR)
- email (VARCHAR, Unique)
- password (VARCHAR, Hashed)
- role (ENUM: admin/user)
- created_at (DATETIME, default current timestamp)

Skills
- id (INT PK, Auto-increment)
- name (VARCHAR)
- description (TEXT)
- created_at (DATETIME, default current timestamp)

Questions
- id (INT PK, Auto-increment)
- skill_id (INT FK, references skills(id))
- question_text (TEXT)
- options (JSON, array of options)
- correct_answer (VARCHAR)
- created_at (DATETIME, default current timestamp)

Quiz Attempts
- id (INT PK, Auto-increment)
- user_id (INT FK, references users(id))
- skill_id (INT FK, references skills(id))
- score (INT)
- total_questions (INT)
- attempted_at (DATETIME, default current timestamp)

Quiz Answers
- id (INT PK, Auto-increment)
- attempt_id (INT FK, references quiz_attempts(id))
- question_id (INT FK, references questions(id))
- selected_answer (VARCHAR)

---

Deployment
----------

- Frontend: Vercel 
- Backend: Railway
- Make sure to configure environment variables for DB and JWT secrets
