# 🚀 ResumeFlow AI
ResumeFlow AI v1.0
> AI-powered Resume Builder with Professional Resume Generation, PDF Export, Secure Authentication, Dockerized Deployment, and Automated CI/CD Pipeline.

![License](https://img.shields.io/badge/License-MIT-blue.svg)
![React](https://img.shields.io/badge/React-19-blue)
![Node.js](https://img.shields.io/badge/Node.js-Express-green)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-success)
![Docker](https://img.shields.io/badge/Docker-Containerized-2496ED)
![AWS](https://img.shields.io/badge/AWS-EC2-orange)
![GitHub Actions](https://img.shields.io/badge/CI/CD-GitHub%20Actions-blue)

---

## 🌐 Live Demo

🔗 https://resumeflow-ai.duckdns.org
🟢https://resume-flow-ai-psi.vercel.app/app

---

## 📂 GitHub Repository

https://github.com/shreyiii/ResumeFlow.AI

---

# 📖 Overview

ResumeFlow AI is a modern AI-powered resume builder that enables users to create, edit, manage, and export professional resumes with ease.

The platform leverages AI to generate professional summaries and improve resume content while providing secure authentication, responsive design, and production-ready cloud deployment.

---

# ✨ Features

### 👤 Authentication

- Secure JWT Authentication
- Login & Registration
- Protected Routes

### 📄 Resume Builder

- Create Multiple Resumes
- Edit Resume Sections
- Professional Summary
- Education
- Experience
- Skills
- Projects
- Personal Information

### 🤖 AI Features

- AI Professional Summary
- AI Resume Enhancement
- AI Content Generation

### 📑 Export

- High Quality PDF Download
- Printable Resume

### 🎨 UI

- Responsive Design
- Modern Interface
- Multiple Resume Sections

---

# 🛠 Tech Stack

## Frontend

- React.js
- Vite
- Tailwind CSS
- Axios

## Backend

- Node.js
- Express.js
- JWT Authentication

## Database

- MongoDB Atlas
- Mongoose

## AI

- Gemini API

## DevOps

- Docker
- Docker Compose
- Nginx
- AWS EC2
- GitHub Actions
- Let's Encrypt SSL

---

# 🏗 Architecture

```
                GitHub
                   │
                   ▼
          GitHub Actions (CI/CD)
                   │
                   ▼
              Docker Hub
                   │
                   ▼
               AWS EC2
                   │
        ┌──────────┴──────────┐
        │                     │
   Nginx Reverse Proxy     Docker
        │                     │
        ▼                     ▼
   React Frontend      Node.js Backend
                              │
                              ▼
                       MongoDB Atlas
```

---

# 📁 Project Structure

```
ResumeFlow.AI
│
├── client
│   ├── src
│   ├── public
│   └── Dockerfile
│
├── server
│   ├── controllers
│   ├── models
│   ├── routes
│   ├── middleware
│   └── Dockerfile
│
├── .github
│   └── workflows
│
├── docker-compose.yml
├── docker-compose.prod.yml
└── README.md
```

---

# 🚀 Installation

## Clone Repository

```bash
git clone https://github.com/shreyiii/ResumeFlow.AI.git

cd ResumeFlow.AI
```

---

## Install Dependencies

### Client

```bash
cd client

npm install
```

### Server

```bash
cd ../server

npm install
```

---

## Environment Variables

### Server (.env)

```env
PORT=5000

MONGODB_URI=YOUR_MONGODB_URI

JWT_SECRET=YOUR_SECRET

GEMINI_API_KEY=YOUR_API_KEY
```

### Client (.env)

```env
VITE_BASE_URL=http://localhost:5000
```

---

# ▶ Run Locally

```bash
docker compose up --build
```

---

# 🐳 Docker

Build

```bash
docker compose build
```

Run

```bash
docker compose up -d
```

Stop

```bash
docker compose down
```

---

# ☁ Deployment

Application is deployed using

- Docker
- AWS EC2
- Nginx Reverse Proxy
- GitHub Actions CI/CD
- Let's Encrypt SSL
- DuckDNS

Deployment becomes automatic after every push to the **main** branch.

```
git push origin main
        │
        ▼
 GitHub Actions
        │
        ▼
 Docker Build
        │
        ▼
 Docker Hub
        │
        ▼
 AWS EC2 Auto Deploy
```

---

# 🔐 Security

- JWT Authentication
- Protected API Routes
- HTTPS using Let's Encrypt
- Nginx Reverse Proxy

---
# 📈 Future Improvements

- Google Authentication

- ATS Score Analysis

- Resume Templates

- Resume Sharing

- Portfolio Generator

- Resume Analytics

- Email Verification

- Password Reset

---

# 🤝 Contributing

Contributions are welcome.

Feel free to fork this repository and submit pull requests.

---

# 👨‍💻 Author

**Shrey Srivastava**

GitHub

https://github.com/shreyiii

LinkedIn

https://linkedin.com/in/shrey-srivastava27

Email

srivastavashrey56@gmail.com

---

# ⭐ Support

If you found this project useful,

please consider giving it a ⭐ on GitHub.

---

## 📜 License

This project is licensed under the MIT License.
