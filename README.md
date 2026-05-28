# College ERP Management System

A modern full-stack College ERP platform built to simulate real-world enterprise deployment architecture with cloud infrastructure, CI/CD automation, role-based access control, and scalable backend services.

> This project is currently under active development. Features, UI, authentication flows, and infrastructure are being continuously improved.

---

## 🚀 Project Overview

The College ERP Management System is designed to centralize academic, administrative, and operational workflows inside a single platform.

The system includes dedicated portals for:

* Students
* Faculty
* Administrators
* Super Admins
* Accountants

This project focuses heavily on:

* Full-stack architecture
* DevOps workflows
* CI/CD automation
* Cloud deployment
* Containerization
* Enterprise-style infrastructure

Because apparently building only CRUD apps wasn't painful enough.

---

# 🛠 Tech Stack

## Frontend

* React.js
* Vite
* Tailwind CSS
* Firebase Authentication
* Vercel Deployment

## Backend

* Spring Boot
* Java
* REST APIs
* JWT Authentication
* Role-Based Access Control (RBAC)

## Database

* PostgreSQL
* AWS RDS

## DevOps & Cloud

* Docker
* AWS EC2
* GitHub Actions CI/CD
* Vercel
* Nginx (planned)

---

# ⚙️ Current Features

## Authentication

* Firebase Email/Password Authentication
* Role-based login system
* Demo login access
* JWT validation flow

## Dashboards

* Student dashboard
* Faculty dashboard
* Admin dashboard
* Super Admin dashboard

## Cloud Infrastructure

* Frontend deployed on Vercel
* Backend containerized using Docker
* Backend deployed on AWS EC2
* PostgreSQL hosted on AWS RDS

## CI/CD Pipeline

Automated deployment pipeline using GitHub Actions:

1. Backend Build & Test
2. Frontend Build Validation
3. Docker Image Build & Push
4. AWS EC2 Auto Deployment
5. Vercel Frontend Deployment

---

# 🧱 System Architecture

```text
Frontend (React + Vercel)
        ↓
REST API Calls
        ↓
Backend (Spring Boot + Docker on EC2)
        ↓
PostgreSQL Database (AWS RDS)
        ↓
Firebase Authentication + JWT Validation
```

---

# 📦 DevOps Workflow

```text
Git Push
   ↓
GitHub Actions
   ↓
Build & Test
   ↓
Dockerize Backend
   ↓
Push Deployment
   ↓
AWS EC2 Auto Deploy
   ↓
Frontend Auto Deploy on Vercel
```

---

# 📌 Planned Features

* Complete Firebase role mapping
* Attendance management
* Fee management
* Report generation
* Student analytics
* File uploads
* Real-time notifications
* Admin controls
* Mobile responsiveness improvements
* Production-grade security hardening

---

# ☁️ Deployment Status

| Service                       | Status         |
| ----------------------------- | -------------- |
| Frontend Deployment           | ✅ Active       |
| Backend Deployment            | ✅ Active       |
| Dockerized Backend            | ✅ Active       |
| CI/CD Pipeline                | ✅ Working      |
| AWS RDS                       | ✅ Connected    |
| Firebase Auth                 | 🚧 In Progress |
| Production Security Hardening | 🚧 In Progress |

---

# 📷 Screenshots

> Screenshots and architecture diagrams will be added in future updates.

---

# 🎯 Project Goal

This project was built to explore:

* Enterprise deployment workflows
* Full-stack system architecture
* Cloud-native deployment
* CI/CD automation
* DevOps practices
* Scalable application infrastructure

And also to willingly enter the psychological warfare arena known as AWS networking.

--

This project is currently for educational and portfolio purposes.
