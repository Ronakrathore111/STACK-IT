# 📘 QueryHub

> **A central hub for asking, sharing, and solving questions.**

QueryHub is a simple, lightweight Question & Answer web application built using the MERN stack principles (Node.js, Express, MongoDB) and vanilla HTML/CSS/JS. It provides a platform where users can ask questions, share knowledge, and solve doubts within a community.

## 🌟 Meaning of the Name
**QueryHub** represents a central place where people can ask questions (“queries”) and receive answers.
* **Query** → Questions, doubts, and problems.
* **Hub** → A central place where knowledge is shared.
* ## 🌍 Live Deployment

QueryHub is deployed on Render. You can view the live demo here:

👉 **https://queryhub-ht9p.onrender.com**

## 🚀 Features
* **User Authentication:** Secure registration and login using JWT & bcryptjs.
* **Ask Questions:** Users can post their own questions to the community.
* **Share Knowledge:** Users can answer questions posted by others.
* **Browse Content:** View a list of all questions or dive into specific discussions.
* **Modern UI:** Simple, clean, and responsive user interface.

## 🛠 Tech Stack

| Component | Technology |
| :--- | :--- |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB (with Mongoose) |
| **Authentication** | JSON Web Tokens (JWT) + bcryptjs |
| **Frontend** | HTML5, CSS3, Vanilla JavaScript |

## 📁 Project Structure

```bash
QueryHub/
│
├── css/                # Stylesheets (Auth & Main styles)
├── js/                 # Client-side JavaScript logic
├── middleware/         # Authentication middleware
├── models/             # Mongoose Database schemas
├── routes/             # Express API route handlers
│
├── ask.html            # Page to post a new question
├── index.html          # Homepage (Feed of questions)
├── login.html          # User login page
├── register.html       # User registration page
├── question.html       # Single question view with answers
│
├── server.js           # Main server entry point
└── package.json        # Project dependencies & scripts
```
## ⚙️ Installation & Local Setup

Follow these steps to run the project locally on your machine.

### 1️⃣ Clone the repository

```bash
git clone https://github.com/Ronakrathore111/Queryhub.git
cd Queryhub
```

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Environment Setup

Create a `.env` file in the root directory and add the following:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_jwt_key
```

### 4️⃣ Start the server

```bash
npm start
```
The server will run at: `http://localhost:5000`

---
> ⚠️ If the app is sleeping, it may take 30–60 seconds to wake up on the first visit.
---
## 📌 How to Use

- **Register:** Create a new account  
- **Login:** Access your account securely  
- **Post:** Ask a question about any topic  
- **Answer:** Help others by answering their questions  
---
## 🔮 Future Improvements
- [ ] Rich text editor for questions/answers  
- [ ] User profiles & reputation points  
- [ ] “Best Answer” selection feature  
- [ ] Search functionality  
- [ ] Pagination for question feed  
- [ ] Mobile responsiveness enhancements  


