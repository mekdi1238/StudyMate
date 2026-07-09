# StudyMate — AI-Powered Learning Management Platform

StudyMate is a full-stack web application that helps students study more efficiently. Users register, log in, and manage a personal library of study sets. Each study set is created by entering a topic and pasting in educational content; the application sends that content to Google's Gemini AI, which generates structured study notes automatically. Study sets can be viewed, edited, searched, and deleted at any time.

The application follows the MVC (Model-View-Controller) pattern on the backend and exposes a RESTful JSON API. The frontend is a separate, vanilla HTML/CSS/JavaScript client that consumes that API — it does not use server-side rendering.

## Tech Stack

- **Backend:** Node.js, Express.js
- **Database:** PostgreSQL
- **Frontend:** HTML, CSS, JavaScript (vanilla, no framework)
- **Authentication:** JWT (jsonwebtoken), bcrypt (bcryptjs) for password hashing
- **AI Integration:** Google Gemini API (gemini-2.5-flash)
- **Other:** express-rate-limit for request throttling, dotenv for environment configuration

## Features

- User registration and login with hashed passwords and JWT-based sessions
- Authorization checks so users can only view, edit, or delete their own study sets
- Full CRUD for study sets (create, read, update, delete)
- AI-generated study notes on creation, saved to the database
- Search/filter study sets by topic
- Input validation on registration and study set creation
- Rate limiting on login and study set creation
- Request logging middleware

## Project Structure

StudyMate/
├── config/          Database connection (db.js) and schema (schema.sql)
├── controllers/      Route handler logic
├── middleware/        Auth verification, input validation, rate limiting, logging
├── models/           Database query functions
├── routes/            API route definitions
├── services/           Gemini AI integration
├── public/            Frontend: HTML pages, CSS, client-side JS
└── server.js          Application entry point

## Database Schema

Full DDL is in `config/schema.sql`. Three tables:

- **users** — id, name, email (unique), password_hash, created_at
- **study_sets** — id, user_id (FK → users, cascade delete), topic, original_content, generated_notes, created_at, updated_at
- **quiz_questions** — id, study_set_id (FK → study_sets, cascade delete), question_text, four options, correct_option, created_at (schema in place; not yet populated by the application — deferred due to time constraints, see Known Limitations)

## Setup Instructions

**Requirements:** Node.js 18+ (built-in `fetch` is used; tested on Node 24), PostgreSQL, a Google Gemini API key ([aistudio.google.com/apikey](https://aistudio.google.com/apikey)).

1. Clone the repository and install dependencies:
- git clone https://github.com/mekdi1238/StudyMate.git
- cd StudyMate
- npm install

2. Create a PostgreSQL database:
- psql -U postgres -c "CREATE DATABASE studymate;"

3. Run the schema to create tables:
- psql -U postgres -d studymate -f config/schema.sql

4. Create a `.env` file in the project root with the following variables:
- DB_HOST=localhost
- DB_PORT=5432
- DB_USER=your_postgres_username
- DB_PASSWORD=your_postgres_password
- DB_NAME=studymate
- JWT_SECRET=a_long_random_string
- GEMINI_API_KEY=your_gemini_api_key

5. Start the server:
- npm run dev

6. Open `http://localhost:3000/login.html` in a browser.

## API Endpoints

| Method | Endpoint | Auth Required | Description |
|---|---|---|---|
| POST | /api/auth/register | No | Create a new account |
| POST | /api/auth/login | No | Log in, receive a JWT |
| GET | /api/studysets | Yes | List the logged-in user's study sets (supports `?search=`) |
| GET | /api/studysets/:id | Yes | Get one study set |
| POST | /api/studysets | Yes | Create a study set (triggers AI note generation) |
| PUT | /api/studysets/:id | Yes | Update a study set |
| DELETE | /api/studysets/:id | Yes | Delete a study set |

Protected routes require an `Authorization: Bearer <token>` header.

## Known Limitations / Not Yet Implemented

- Quiz generation: the `quiz_questions` table and schema are designed and in place, but AI-generated quizzes are not yet implemented. Prioritized the core application (auth, CRUD, AI notes, security) given project time constraints.
- No automated test suite; testing was done manually and iteratively throughout development, verifying each endpoint via Postman and each page via manual browser testing before moving to the next feature.

## Author

mekdi1238