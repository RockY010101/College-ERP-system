# College ERP System — React Frontend

Welcome to the frontend codebase for the **Enterprise College ERP Management System**. This application is built as a single-page application (SPA) using React, Vite, and Material UI (MUI), designed to interface seamlessly with a Spring Boot backend.

---

## 🚀 Tech Stack

* **Build & Development Tooling:** [Vite](https://vitejs.dev/) (fast build, hot module replacement)
* **Core Library:** [React 18](https://react.dev/)
* **Routing:** [React Router DOM v6](https://reactrouter.com/) (declarative routing with nested routes)
* **Component Library:** [Material UI (MUI) v5](https://mui.com/) & Emotion (styled-components)
* **State Management:** React Context API (custom providers for Auth and Roles)
* **API Client:** [Axios](https://axios-http.com/) (HTTP request interceptors for token propagation)
* **Authentication Platform:** [Firebase Auth SDK](https://firebase.google.com/docs/auth) (with offline fallback dev-mode)
* **Data Visualization:** [Recharts](https://recharts.org/) (interactive analytics widgets)
* **Forms & Validation:** [React Hook Form](https://react-hook-form.com/)

---

## 📁 Directory Structure

```text
frontend/
├── dist/                  # Compiled production assets
├── src/
│   ├── components/        # Layout and reusable UI components
│   │   ├── DashboardLayout.jsx
│   │   ├── Sidebar.jsx
│   │   └── TopBar.jsx
│   ├── context/           # Global React Context providers
│   │   ├── AuthContext.jsx
│   │   └── RoleContext.jsx
│   ├── firebase/          # Firebase SDK client initialization
│   │   └── firebaseConfig.js
│   ├── pages/             # Page views grouped logically by user role
│   │   ├── accountant/    # Fees, salary, accounting boards
│   │   ├── admin/         # Student/faculty registration, course management
│   │   ├── auth/          # Login, forgot password
│   │   ├── faculty/       # Attendance, grading logs
│   │   └── student/       # Timetable, attendance records, profile dashboard
│   ├── routes/            # Route declarations and guards
│   │   ├── AppRoutes.jsx
│   │   └── ProtectedRoutes.jsx
│   ├── services/          # REST API network interfaces
│   │   ├── apiClient.js   # Shared Axios client configuration
│   │   ├── authService.js
│   │   ├── studentService.js
│   │   └── ...
│   ├── utils/             # Constants, schemas, and helper functions
│   ├── App.css            # Styles specific to root app
│   ├── App.jsx            # Main app file bootstrapping contexts and routes
│   ├── index.css          # Main stylesheet (global styling overrides and CSS vars)
│   └── main.jsx           # Mounts the DOM React root
├── package.json           # Declared dependencies and NPM scripts
├── vercel.json            # Vercel-specific routing rewrites / proxy config
└── vite.config.js         # Configuration details for Vite bundler
```

---

## 🏛️ Architectural Design & Core Decisions

### 1. Dual-Engine Authentication Context (`AuthContext.jsx`)
The application features a hybrid authentication context that behaves dynamically based on your deployment environment:
* **Firebase Mode (Production):** If Firebase credentials are provided in `.env`, the app dynamically imports the Firebase Auth modules, listening to auth states via `onAuthStateChanged` and obtaining a secure JWT bearer token.
* **Demo Mode (Development Fallback):** If no Firebase config is present, the app automatically switches to **Demo Mode**. It reads and writes a simulated user to `sessionStorage`. On the login page, you can bypass input fields by pressing one of the role shortcuts (Super Admin, Admin, Faculty, Accountant, Student) to immediately enter the dashboard.

### 2. Role-Based Access Control (RBAC) & Router Guards
The client-side authorization layer is configured inside [AppRoutes.jsx](src/routes/AppRoutes.jsx) and [ProtectedRoutes.jsx](src/routes/ProtectedRoutes.jsx):
* User accounts are associated with one of five distinct roles:
  `SUPER_ADMIN` | `ADMIN` | `FACULTY` | `ACCOUNTANT` | `STUDENT`
* Access is managed by wrapping the respective routes in a `<ProtectedRoute allowedRoles={[...]}>` component.
* If an unauthorized user attempts to enter a route, they are automatically redirected back to the `/login` view.

### 3. API Service Client (`apiClient.js`)
Axios is configured as a centralized HTTP client. 
* **Authorization Interceptor:** A request interceptor automatically injects the Firebase JWT token or the Demo session ID into the `Authorization: Bearer <token>` header of every outgoing HTTP call.
* **API Routing & Proxy (`vercel.json`):** The client makes relative requests to `/api/*`. On Vercel, serverless rewrites are specified in `vercel.json` to proxy `/api/*` requests directly to the Spring Boot REST API hosting endpoint (`http://13.205.135.96:8080/api/*`).

---

## ⚙️ Environment Configuration

To configure the frontend client, create a `.env` file in the root of the `frontend/` directory:

```env
# ─── API Target ──────────────────────────────────────────────────────────
# Leave blank on Vercel deployment (uses vercel.json rewrites)
# Set to 'http://localhost:8080' for local backend testing
VITE_API_BASE_URL=

# ─── Firebase Configurations ──────────────────────────────────────────────
# (Required for standard/production user logins; skip/remove to use Demo Mode)
VITE_FIREBASE_API_KEY=your-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
VITE_FIREBASE_APP_ID=your-app-id
```

---

## 💻 Developer Scripts

Run the following commands inside the `frontend/` directory:

* **Start local development server:**
  ```bash
  npm run dev
  ```
  *(Opens the client locally at `http://localhost:5173`)*

* **Run ESLint check:**
  ```bash
  npm run lint
  ```

* **Compile the application for production:**
  ```bash
  npm run build
  ```
  *(Builds highly optimized static assets into the `dist/` directory)*

* **Preview the production build locally:**
  ```bash
  npm run preview
  ```
