# AI Study Assistant

AI Study Assistant is a full-stack MERN application designed to help students manage their studies efficiently. The application provides features such as note management, flashcards, quizzes, study planning, and AI-powered assistance.

## Features

### Authentication

* User Registration
* User Login
* JWT Authentication
* Protected Routes
* Logout Functionality

### Notes Management

* Create Notes
* Edit Notes
* Delete Notes
* Search Notes

### Flashcards

* Create Flashcards
* Edit Flashcards
* Delete Flashcards
* Search Flashcards

### Quiz Management

* Create Quizzes
* Attempt Quizzes
* Delete Quizzes

### Study Planner

* Create Tasks
* Mark Tasks as Completed
* Delete Tasks
* Track Progress

### Dashboard

* Total Notes Count
* Total Flashcards Count
* Total Quizzes Count
* Completed Tasks Count
* Pending Tasks Count

### AI Assistant

* Ask Study-Related Questions
* Receive AI-Powered Responses
* Chat History Support

---

## Tech Stack

### Frontend

* React.js
* Vite
* Tailwind CSS
* Axios
* React Router DOM
* Framer Motion

### Backend

* Node.js
* Express.js
* MongoDB Atlas
* Mongoose
* JWT
* bcryptjs

### AI Integration

* OpenAI API

---

## Project Structure

AI Study Assistant/

├── client/

│ ├── src/

│ ├── components/

│ ├── pages/

│ ├── services/

│ └── App.jsx

│

├── server/

│ ├── controllers/

│ ├── middleware/

│ ├── models/

│ ├── routes/

│ └── index.js

│

├── README.md

└── .gitignore

---

## Installation

### Clone Repository

git clone https://github.com/Sanju1203/AI-Study-Assistant.git

### Frontend Setup

cd client

npm install

npm run dev

### Backend Setup

cd server

npm install

npm run dev

---

## Environment Variables

Create a file named:

server/.env

Add the following:

PORT=5001

MONGO_URI=YOUR_MONGODB_CONNECTION_STRING

JWT_SECRET=YOUR_SECRET_KEY

OPENAI_API_KEY=YOUR_OPENAI_API_KEY

---

## Screenshots

Add screenshots here after project completion:

* Login Page
* Dashboard
* Notes Page
* Flashcards Page
* Quiz Page
* Planner Page
* AI Chat Page

---

## Future Improvements

* Dark Mode
* AI Quiz Generator
* AI Flashcard Generator
* Profile Management
* File Upload Support
* Study Analytics Dashboard

---

## Author

Sanjith

GitHub:
https://github.com/Sanju1203

---

## License

This project is created for educational and portfolio purposes.
