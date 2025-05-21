# 🛒 E-Commerce Backend

A scalable and modular backend for an e-commerce application, built with Node.js and Express.js. This project serves as the foundation for handling core e-commerce functionalities including product management, user authentication, cart handling, and order processing.

---

## 📁 Project Structure

ecommerce/
├── backend/
│ ├── controllers/ # Business logic for routes
│ ├── models/ # right now mockedup data (Mongoose models will be added later on)
│ ├── routes/ # Express route definitions
│ ├── config/ # Environment variables
│ ├── middleware/ # Auth, error handling
│ ├── utils/ # Helper functions(mocked up data)
│ ├── server.js # Entry point
├── .env # Environment variables
├── package.json
└── README.md


---

## 🚀 Features

- 🔐 User Authentication (Register, Login, JWT)
- 📦 Product Management (CRUD)
- 🛒 Shopping Cart Functionality
- 📦 Order Creation & Tracking

---

## 🛠️ Tech Stack

| Category     | Tech                                     |
|--------------|------------------------------------------|
| Backend      | Node.js, Express.js                      |
| Database     |mocked up data (MongoDB, Mongoose)        |
| Auth         | JWT, bcrypt                              |
| Dev Tools    | Nodemon, dotenv, ESLint                  |

---

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/gagan-a4b/ecommerce.git

# Navigate to backend directory
cd ecommerce/backend

# Install dependencies
npm install


# Start development server
npm run dev

---
# 📬API Endpoints Overview
| Method | Endpoint              | Description        |
| ------ | --------------------- | ------------------ |
| POST   | `/api/users/register` | Register new user  |
| POST   | `/api/users/login`    | User login         |
| GET    | `/api/products`       | Fetch all products |
| POST   | `/api/products`       | Add a new product  |
| PUT    | `/api/products/:id`   | Update product     |
| DELETE | `/api/products/:id`   | Delete product     |
| POST   | `/api/orders`         | Place a new order  |

