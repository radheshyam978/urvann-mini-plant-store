🌱 Urvann Mini Plant Store

A full-stack web application for browsing, searching, filtering, and managing plants online. Built as part of the Urvann Software Development Intern Assignment.

🚀 Features
🛒 Plant Catalog

Display plants in a responsive grid/list view.

Show details: Name, Price, Categories, Stock Availability.

🔍 Search & Filter

Search plants by name (case-insensitive).

Search by category keyword (e.g., searching home decor shows Money Plant).

Filter by category (Indoor, Outdoor, Succulent, Air Purifying, Home Decor, etc.).

🌿 Admin Feature – Add Plant

Add new plants using a form with:

Name, Price, Multiple Categories, Availability.

Input validation before submission.

📱 Responsive Frontend

Works on desktop & mobile.

Built with React functional components & hooks.

Loading + Error states while fetching backend data.

🗄️ Database

Preloaded with 50 plants (realistic names, prices, categories).

MongoDB used for storing and managing data.

🛠️ Tech Stack
Frontend

ReactJS

TailwindCSS (for clean, responsive UI)

Axios (API calls)

Backend

Node.js

Express.js

MongoDB (via Mongoose)

Deployment

Frontend: Vercel / Netlify

Backend: Render / Railway / Heroku

Database: MongoDB Atlas

📂 Project Structure
urvann-mini-plant-store/
│── client/          # React frontend
│   ├── src/         
│   │   ├── components/  # Reusable UI components
│   │   ├── pages/       # Page components (Catalog, Admin, etc.)
│   │   ├── api.jsx      # Axios API calls
│── server/          # Node.js backend
│   ├── models/      # Mongoose schemas
│   ├── routes/      # Express routes
│   ├── server.js    # App entry point
│── README.md        # Project documentation

⚡ Getting Started
1️⃣ Clone Repo
git clone https://github.com/your-username/urvann-mini-plant-store.git
cd urvann-mini-plant-store

2️⃣ Setup Backend
cd server
npm install


Create a .env file and add:

MONGO_URI=your_mongodb_atlas_url
PORT=5000


Run server:

npm start

3️⃣ Setup Frontend
cd ../client
npm install
npm run dev

📊 Sample Plant Data

Money Plant – ₹199 – Categories: [Indoor, Home Decor] – In Stock

Snake Plant – ₹299 – Categories: [Indoor, Air Purifying] – In Stock

Aloe Vera – ₹149 – Categories: [Outdoor, Succulent] – In Stock

(50+ entries preloaded in MongoDB)

🎯 Extra Features (Optional Enhancements)

✔️ Add Plant Images
✔️ Authentication for Admin (Login required to add plants)
✔️ Cart + Checkout system

👨‍💻 Author

Radhe Shyam
📧 Email: [vaishnavradhey978@gmail.com
]
🔗 GitHub: https://github.com/your-radheshyam978

⚡ Built with ❤️ for Urvann Internship Assignment
