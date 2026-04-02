# 🎵 Choosin Country Backend

Backend API for the Choosin Country application.  
Built with Node.js, Express and MongoDB, it manages authentication, songs, comments, statistics and country music events.

---

## 🚀 Live API

[https://choosin-country-backend.onrender.com](https://choosin-country-backend.onrender.com)

---

## 🛠 Tech Stack

- Node.js
- Express
- MongoDB
- Mongoose
- JWT Authentication
- Ticketmaster API

---

## ⚙️ Installation

Clone the repository and navigate to the backend directory:

cd choosin-country-backend

## ⚙️ Install dependencies

npm install

## Create an env file

MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
TICKETMASTER_API_KEY=your_ticketmaster_api_key
PORT=4000

## Run the server

npm run dev

## The server will run at

<http://localhost:4000>

## The API uses JWT. Protected routes require the following header

Authorization: Bearer `<token>`

---

## API Endpoints

Auth

- POST /api/auth/register
- POST /api/auth/login

Songs

- GET /api/songs
- GET /api/songs/trending
- GET /api/songs/ranking
- GET /api/songs/my-songs (protected)
- POST /api/songs/save (protected)
- POST /api/songs/:trackId/play (protected)
- POST /api/songs/:songId/vote (protected)
- DELETE /api/songs/my-songs/:songId (protected)

Comments

- POST /api/comments (protected)
- GET /api/comments/:songId
- PATCH /api/comments/:commentId (protected)

Events

- GET /api/events/country

---

## Query params supported

- countryCode
- keyword
- city
- type

---

## 🧪 API Testing. A Postman collection is included in the project

- `/postman/choosin-country.postman_collection.json`

## 📦 Features

- User authentication
- Save songs
- Voting system (favorites)
- Comments with editing
- Trending and ranking
- Country events integration

---

## 📌 Notes

- MongoDB must be running or use MongoDB Atlas
- Do not commit your .env file

⸻

## 👩‍💻 Author

[Sandra Minguez Pazos](https://github.com/XandraPro)
