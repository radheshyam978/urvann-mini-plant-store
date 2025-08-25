---

# 🌱 Urvann Mini Plant Store

This project is a *full-stack mini e-commerce application* built as part of my internship assignment.
It demonstrates my skills in *frontend development, backend APIs, database integration, and containerized deployment*.

---

## 📖 Project Overview

The *Mini Plant Store* is a web application where users can:

* Browse plants with images, names, and categories
* Search and filter through available plants
* Interact with a backend API for plant and category data
* Run the entire project easily with *Docker Compose*

This project highlights my ability to build and integrate *frontend + backend + database* into a working solution.

---

## 🎯 Objectives of the Assignment

1. Design and implement a *React frontend* with modern tools (Vite).
2. Build a *Node.js + Express backend* for plant and category APIs.
3. Use *MongoDB* with seed data to populate sample plants.
4. Package both frontend and backend into *Docker containers*.
5. Write clean, well-documented code with proper project structure.

---

## 📂 Project Structure


urvann-mini-plant-store/
│── docker-compose.yml        # Runs frontend + backend with one command
│── .gitignore
│── README.md                 # Documentation (this file)
│
├── backend/                  # Express.js REST API
│   ├── Dockerfile
│   ├── package.json
│   ├── .env.example          # Environment variable template
│   └── src/
│       ├── server.js         # Backend entry point
│       ├── routes/           # API routes
│       ├── models/           # Database models
│       └── seed/             # Database seeding scripts
│
├── frontend/                 # React (Vite) frontend
│   ├── Dockerfile
│   ├── package.json
│   ├── vite.config.js
│   └── src/
│       ├── App.jsx           # Main UI
│       ├── PlantCard.jsx     # Plant component
│       ├── api.js            # API calls to backend
│       └── styles.css        # Styling


---

## ⚙ Installation & Running the Project

### 🔹 Clone the Repository

bash
git clone https://github.com/Yaminisah1/Mini-Plant-Store.git
cd urvann-mini-plant-store


### 🔹 Environment Setup

Copy .env.example inside backend/ as .env and configure:

* PORT=5000
* MONGO_URI=your_mongodb_connection_string

### 🔹 Run with Docker (Recommended)

bash
docker-compose up --build


* Backend → [http://localhost:5000](http://localhost:5000)
* Frontend → [http://localhost:5173](http://localhost:5173)

### 🔹 Run without Docker

#### Backend

bash
cd backend
npm install
npm run dev


#### Frontend

bash
cd frontend
npm install
npm run dev


---

## 🌱 Database Seeding

To insert sample plant data:

bash
cd backend
node src/seed/seed.js


---

## 📡 API Endpoints

* GET /plants → Fetch all plants
* GET /plants/:id → Fetch plant by ID
* GET /categories → Fetch all categories

---

## 🛠 Technologies Used

* *Frontend*: React (Vite), JavaScript, CSS
* *Backend*: Node.js, Express.js
* *Database*: MongoDB with Mongoose
* *Deployment*: Docker, Docker Compose

---

## 📑 Learnings from the Project

* How to integrate *frontend and backend* in a full-stack project.
* Writing and consuming *REST APIs*.
* Managing environment variables securely.
* Setting up *Docker* for smooth local deployment.
* Seeding and managing data in *MongoDB*.

---

## 🙋 Author

*Yamini Sah*

---
