# 🎓 College ERP Management System

A modern full-stack College ERP platform built to simulate real-world enterprise deployment architecture with cloud infrastructure, CI/CD automation, role-based access control, and scalable backend services.

This project is currently under active development, with core infrastructure, deployment pipelines, authentication services, and multi-role dashboards already implemented.

---

# 🚀 Project Overview

The College ERP Management System is designed to centralize academic, administrative, and operational workflows within a single platform.

The system provides dedicated portals for:

* Student
* Faculty
* Administrator
* Super Admin
* Accountant

This project focuses heavily on:

* Full-Stack Development
* Cloud Infrastructure
* DevOps Workflows
* CI/CD Automation
* Containerization
* Enterprise Application Architecture
* Role-Based Access Control (RBAC)

---

# 🛠 Tech Stack

## Frontend

* React.js
* Vite
* React Router
* CSS
* Firebase Authentication
* Vercel

## Backend

* Spring Boot
* Java
* REST APIs
* JWT Authentication
* Role-Based Authorization

## Database

* PostgreSQL
* AWS RDS

## Cloud & DevOps

* AWS EC2
* AWS RDS
* Docker
* Docker Compose
* GitHub Actions
* Vercel
* Firebase

---

# ⚙️ Current Features

## Authentication

* Firebase Email/Password Authentication
* Multi-role login system
* Demo role access
* Protected routes
* JWT validation architecture

## Student Portal

* Academic dashboard
* Attendance overview
* Results dashboard
* Fee tracking
* Notifications

## Faculty Portal

* Student management
* Attendance dashboard
* Results management
* Subject overview

## Administrator Portal

* Student administration
* Employee management
* Course administration
* Institutional reports

## Super Admin Portal

* User management
* Department monitoring
* System overview dashboard
* Platform administration

## Cloud Infrastructure

* Frontend deployed on Vercel
* Backend deployed on AWS EC2
* PostgreSQL hosted on AWS RDS
* Firebase Authentication configured
* CI/CD deployment pipeline operational

---

# 🧱 System Architecture

```text
React Frontend (Vercel)
          │
          ▼
Spring Boot REST APIs (AWS EC2)
          │
          ▼
PostgreSQL Database (AWS RDS)

Firebase Authentication
          │
          ▼
Role-Based Authorization
```

---

# 📦 CI/CD Pipeline

Automated deployment workflow using GitHub Actions.

```text
Git Push
   ↓
GitHub Actions
   ↓
Frontend Build Validation
   ↓
Backend Build & Test
   ↓
Docker Build
   ↓
Deployment Pipeline
   ↓
AWS EC2 Backend Deployment
   ↓
Vercel Frontend Deployment
```

### Pipeline Features

* Automated build validation
* Environment secret management
* Continuous deployment workflow
* Dockerized backend services
* Cloud deployment automation

---

# ☁️ Deployment Status

| Service                            | Status         |
| ---------------------------------- | -------------- |
| Frontend Deployment                | ✅ Active       |
| Vercel Production Environment      | ✅ Active       |
| Spring Boot Backend Deployment     | ✅ Active       |
| CI/CD Pipeline                     | ✅ Working      |
| Docker Configuration               | ✅ Active       |
| AWS RDS PostgreSQL                 | ✅ Provisioned  |
| Firebase Authentication            | ✅ Configured   |
| Frontend ↔ Backend API Integration | 🚧 In Progress |
| Production Security Hardening      | 🚧 In Progress |

---

# 📂 Project Structure

```text
college-erp/
│
├── frontend/
│   ├── src/
│   ├── components/
│   ├── pages/
│   ├── routes/
│   ├── services/
│   └── firebase/
│
├── backend/
│
├── .github/
│   └── workflows/
│
├── docker-compose.yml
├── vercel.json
└── README.md
```

---

# 📌 Planned Features

* Complete API integration
* Dynamic database persistence
* Attendance management
* Fee management
* Report generation
* Student analytics
* File uploads
* Real-time notifications
* Advanced administration controls
* Mobile responsiveness improvements
* Monitoring & observability
* Production-grade security hardening

---

# 🎯 Learning Outcomes

This project demonstrates practical experience with:

* Full-Stack Application Development
* AWS Cloud Infrastructure
* AWS RDS PostgreSQL Configuration
* AWS EC2 Deployment
* Docker Containerization
* Firebase Authentication
* CI/CD Pipeline Design
* GitHub Actions Automation
* Role-Based Access Control
* Enterprise System Architecture
* Frontend Deployment using Vercel

---

# 📷 Screenshots

### Login Portal

* Firebase Authentication
* Multi-role access

### Student Dashboard

* Academic performance
* Attendance tracking
* Fee overview

### Faculty Dashboard

* Student monitoring
* Attendance management

### Administrator Dashboard

* Course and student administration

### Super Admin Dashboard

* Institution-wide monitoring

---

This project is developed for educational, learning, and portfolio purposes.
