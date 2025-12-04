

# 🚀 Auth Project (React + Node)

A simple authentication project built using **React (Vite)** for frontend and **Node.js + Express** for backend.
Includes signup, login, validations, dashboard, and localStorage session.

---

## 📁 Tech Stack

* **Frontend:** React, Vite, Axios, Bootstrap, React Toastify
* **Backend:** Node.js, Express, CORS, fs-extra (JSON storage)

---

## ⚙️ Features

* Signup with validation
* Login (email + password + terms)
* Strong password rules
* LocalStorage session
* Dashboard with user info
* JSON file storage (users.json)

---

## ▶️ Run Project

### **Backend**

```
cd backend
npm install
node index.js
```

### **Frontend**

```
cd frontend
npm install
npm run dev
```

---

## 🧪 API Endpoints

POST /api/signup  <br>
POST /api/login

---

## 📌 Validations

* Name: letters only, min 3
* Email: valid email format
* Password: 8+ chars, uppercase, number, special char
* Phone: 7–15 digits

---

## 📜 Folder Structure

```
auth-project/
  frontend/
  backend/
  Output images/
```

