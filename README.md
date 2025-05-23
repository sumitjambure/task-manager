# task-manager
vionsys test
Task Manager - MERN Stack

A simple Task Manager app built using MongoDB, Express.js, React.js, and Node.js.

Features -
- JWT Authentication (Register/Login)
- Create, Read, Update, Delete tasks
- Task filtering by status (Pending/Completed)
- Input validation using Joi
- Protected routes
- Pagination
- Toast-based error handling

Tech Stack -
- Frontend: React.js, Context API, Axios, Toastify, Bootstrap
- Backend: Node.js, Express.js, MongoDB, JWT, Bcrypt, Joi

API Endpoints -

 Auth
- `POST /api/auth/register`
- `POST /api/auth/login`

 Tasks (protected)
- `POST /api/tasks`
- `GET /api/tasks?page=1&limit=5`
- `PUT /api/tasks/:id`
- `DELETE /api/tasks/:id`

Setup Instructions :

git clone https://github.com/sumitjambure/task-manager.git
-cd task-manager


Back end start -
-cd task-manager-backend
-npm install
-npm start

front end start -
-cd task-manager-frontend
-npm install
-npm start

Create .env files in both frontend and backend

-Add MongoDB URI, JWT_SECRET.

Tested with following users -
-sumitjambure2000@gmail.com
-rohit@gmail.com
-omkar@gmail.com
-amit@gmail.com

Screenshots --

Login page -
 ![Screenshot 2025-05-23 112118](https://github.com/user-attachments/assets/22192ac3-a6e5-4482-9f46-43080a67413f)

Registration page – 
 
![Screenshot 2025-05-23 112412](https://github.com/user-attachments/assets/513667aa-8bc9-431c-8c5e-f379ea6775be)


Dashboard Page – 

 ![Screenshot 2025-05-23 112133](https://github.com/user-attachments/assets/c6302e56-0f6d-4830-8c50-2ec5c5006bee)

