# DroneTV AI Support & Lead Assistant — Web Application

A full-stack web application designed for **DroneTV** to handle customer support inquiries and capture leads via a rule-based AI chatbot assistant, an interactive enquiry form, and an administrative dashboard for managing leads with **MongoDB**.

---

## 📌 Features

1. **Landing / Home Page**
   - Modern, responsive aerial-tech aesthetic.
   - Clean navigation to all sections and quick stats showcase.

2. **Rule-Based AI Support Chatbot**
   - Predefined questions with automated responses.
   - Fallback response for unhandled user queries.
   - Quick suggestion chips and session conversation history.
   - Clear/Reset chat functionality.

3. **Services & Courses Sections**
   - Displays DroneTV's core offerings (Aerial Surveying, Industrial Inspection, Agriculture Drones, Cinematography).
   - Showcases DGCA Certified Remote Pilot Training & GIS Data Processing courses.
   - Direct enquiry button populates the Enquiry Form automatically.

4. **Contact & Enquiry Form**
   - Full user lead form capturing Name, Email, Phone, User Type (*Student / Customer / Other*), Service or Course of Interest, and Message.
   - Comprehensive frontend & backend validation (required fields, email format, phone format).
   - Clean success and error notifications.

5. **Simple Admin / Enquiry Dashboard**
   - Table view of all stored enquiries fetched from MongoDB `enquiries` collection.
   - Search enquiries by keyword across name, email, course, or message.
   - Filter enquiries by **User Type** (*Student*, *Customer*, *Other*) and **Status** (*New*, *Contacted*, *In Progress*, *Closed*).
   - View complete details in a dedicated detail modal.
   - Update enquiry status in real time.
   - Delete enquiries safely.
   - Full support for Loading, Empty, and Error states.

---

## 🛠️ Technologies Used

- **Frontend**: React.js (v19), TypeScript, HTML5, Vanilla CSS3 (Custom Responsive Design System), Vite.
- **Backend**: Node.js, Express.js, TypeScript, CORS, Dotenv, Mongoose.
- **Database**: MongoDB (Collection: `enquiries`).

---

## 📁 Project Structure

```
project-root/
│
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   │   └── enquiryController.ts  # CRUD logic & backend validation (MongoDB)
│   │   ├── middleware/
│   │   │   └── errorHandler.ts       # Global error handler (no exposed stack traces)
│   │   ├── models/
│   │   │   └── Enquiry.ts            # Mongoose Schema & Model for enquiries
│   │   ├── routes/
│   │   │   └── enquiryRoutes.ts      # REST API routes
│   │   ├── types/
│   │   │   └── enquiry.ts            # Backend TypeScript types
│   │   ├── db.ts                     # Mongoose MongoDB connection setup
│   │   └── index.ts                  # Express server entry point
│   ├── .env.example                  # Environment template
│   ├── package.json
│   └── tsconfig.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── AdminDashboard.tsx    # Admin dashboard component
│   │   │   ├── ChatbotWidget.tsx     # Rule-based chatbot component
│   │   │   ├── CoursesSection.tsx    # Courses section
│   │   │   ├── EnquiryForm.tsx       # Lead enquiry form
│   │   │   ├── Footer.tsx            # Footer component
│   │   │   ├── HeroSection.tsx       # Landing hero banner
│   │   │   ├── Navbar.tsx            # Responsive navigation header
│   │   │   └── ServicesSection.tsx   # Services section
│   │   ├── services/
│   │   │   └── api.ts                # REST API client
│   │   ├── types/
│   │   │   └── index.ts              # Frontend TypeScript definitions
│   │   ├── utils/
│   │   │   └── chatbotLogic.ts       # Isolated rule-based bot logic
│   │   ├── App.tsx                   # Main React root application
│   │   ├── index.css                 # Custom CSS design system
│   │   └── main.tsx
│   ├── package.json
│   └── tsconfig.json
│
└── README.md
```

---

## 🚀 Prerequisites

Before running the project, ensure you have installed:
- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher
- **MongoDB**: Local MongoDB instance (or MongoDB Compass / service running on `mongodb://localhost:27017`)

---

## 🍃 MongoDB Database Setup

1. Start your local MongoDB server (e.g. `mongod` or MongoDB service on port `27017`).
2. The application will automatically create the `dronetv_db` database and `enquiries` collection upon saving the first enquiry record.

---

## ⚙️ Environment Setup

1. In the `backend/` directory, copy `.env.example` to `.env`:
   ```bash
   cd backend
   cp .env.example .env
   ```
2. Update `.env` with your MongoDB connection string:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/dronetv_db
   CLIENT_URL=http://localhost:5173
   ```

---

## 🏃 Run Instructions

### 1. Start the Backend Server

```bash
cd backend
npm install
npm run dev
```
The server will run on **http://localhost:5000**.

### 2. Start the Frontend App

Open a new terminal window:
```bash
cd frontend
npm install
npm run dev
```
The application will run on **http://localhost:5173**.

---

## 📖 REST API Documentation

### Base URL: `http://localhost:5000/api/enquiries`

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| **GET** | `/api/enquiries` | Retrieve all enquiries from MongoDB (supports `search`, `user_type`, and `status` query filters) |
| **GET** | `/api/enquiries/:id` | Retrieve single enquiry details by ID |
| **POST** | `/api/enquiries` | Create a new lead enquiry in MongoDB |
| **PUT** | `/api/enquiries/:id` | Update an existing enquiry (status, details) in MongoDB |
| **DELETE** | `/api/enquiries/:id` | Delete an enquiry from MongoDB |

---

### Request & Response Examples

#### 1. POST `/api/enquiries` (Create Enquiry)
**Request Body**:
```json
{
  "name": "Rahul Sharma",
  "email": "rahul@example.com",
  "phone": "+91 9876543210",
  "user_type": "Student",
  "service_or_course": "DGCA Certified Small Rotorcraft Pilot",
  "message": "I want to join the upcoming weekend batch."
}
```
**Response (201 Created)**:
```json
{
  "success": true,
  "message": "Enquiry submitted successfully.",
  "data": {
    "id": "67035b8e9f1a2b3c4d5e6f7a",
    "name": "Rahul Sharma",
    "email": "rahul@example.com",
    "phone": "+91 9876543210",
    "user_type": "Student",
    "service_or_course": "DGCA Certified Small Rotorcraft Pilot",
    "message": "I want to join the upcoming weekend batch.",
    "status": "New",
    "created_at": "2026-10-06T18:30:00.000Z",
    "updated_at": "2026-10-06T18:30:00.000Z"
  }
}
```

#### 2. GET `/api/enquiries` (Fetch Enquiries with Search/Filter)
**Query Parameters**: `?search=rahul&user_type=Student&status=New`  
**Response (200 OK)**:
```json
{
  "success": true,
  "count": 1,
  "data": [
    {
      "id": "67035b8e9f1a2b3c4d5e6f7a",
      "name": "Rahul Sharma",
      "email": "rahul@example.com",
      "phone": "+91 9876543210",
      "user_type": "Student",
      "service_or_course": "DGCA Certified Small Rotorcraft Pilot",
      "message": "I want to join the upcoming weekend batch.",
      "status": "New",
      "created_at": "2026-10-06T18:30:00.000Z",
      "updated_at": "2026-10-06T18:30:00.000Z"
    }
  ]
}
```

#### 3. PUT `/api/enquiries/:id` (Update Status)
**Request Body**:
```json
{
  "status": "Contacted"
}
```
**Response (200 OK)**:
```json
{
  "success": true,
  "message": "Enquiry updated successfully.",
  "data": {
    "id": "67035b8e9f1a2b3c4d5e6f7a",
    "status": "Contacted"
  }
}
```

#### 4. DELETE `/api/enquiries/:id` (Delete Enquiry)
**Response (200 OK)**:
```json
{
  "success": true,
  "message": "Enquiry #67035b8e9f1a2b3c4d5e6f7a deleted successfully."
}
```

---

## 🔒 Security & Quality Measures

- **MongoDB Mongoose Models**: Document validation and schema constraints enforced at database layer.
- **Strict Input Validation**: Email & phone numbers validated on both frontend and backend.
- **Error Shielding**: Internal database stack traces or credentials are never exposed to clients.
- **Zero Real AI/LLM API Dependency**: Chatbot operates deterministically via rule-matching logic.
- **Clean Architecture**: Decoupled frontend components, Express controllers, and Mongoose database handlers.

---

## 📋 Work Completed & Audit Summary

This project has been thoroughly audited, verified, and prepared for final submission:

### 1. Database & Backend Integration
- **MongoDB & Mongoose Setup**: Fully integrated native MongoDB persistence via Mongoose schemas with strict field definitions (`name`, `email`, `phone`, `user_type`, `service_or_course`, `message`, `status`, `created_at`, `updated_at`).
- **RESTful CRUD Endpoints**: Implemented complete REST API (`POST`, `GET`, `GET :id`, `PUT :id`, `DELETE :id`).
- **Input Validation**: Backend validation checks all required fields, valid email format regex, and valid phone format regex before database operations.
- **Error Shielding**: Handled malformed ObjectIDs, database failures, and connection drops gracefully without leaking server stack traces to clients.

### 2. Rule-Based AI Support Chatbot
- **Deterministic Response Logic**: Fully implemented keyword and intent-based matching engine without requiring any external/paid AI API keys.
- **Predefined Queries Handled**:
  - Services overview (Drone Surveying, Inspection, Agriculture, Cinematography)
  - DGCA Certified Training & GIS Courses
  - Contact & Support channels
  - Course Registration procedure
  - Specific service inquiry guidance
  - Student inquiry assistance
  - Live representative / human handoff contact info
- **Fallback & Reset**: Built-in fallback response for unhandled inputs and a one-click "Clear/Reset Chat" option.

### 3. Contact & Enquiry Lead Form
- **Form Fields**: Captures Name, Email, Phone, User Type (*Student*, *Customer*, *Other*), Service/Course selection, and Message.
- **Live Client Validation**: Immediate error warnings for invalid email formats, short phone numbers, or missing required fields.
- **Real-Time Submission**: Direct integration with `POST /api/enquiries` with responsive loading and success/error feedback.

### 4. Admin Enquiry Dashboard
- **Live Data**: Directly loads all stored leads from the real MongoDB database.
- **Instant Search**: Search leads across applicant name, email, chosen service/course, or inquiry text.
- **Multi-Filter Support**: Filter leads dynamically by **User Type** and **Status** (*New*, *Contacted*, *In Progress*, *Closed*).
- **Interactive Actions**: View full lead details in an inspect modal, update lead status directly, and delete records with immediate UI sync.
- **State Handling**: Comprehensive states for Loading (spinner), Empty (friendly zero-state display), and Error handling (with retry capability).

### 5. Repository Cleanup & Build Verification
- **Removed Boilerplate Files**: Cleaned unused Vite demo files (`App.css`, `react.svg`, `vite.svg`, `.oxlintrc.json`).
- **Clean Configuration**: Configured `.gitignore` to prevent leaking `.env` or build folders, while retaining `.env.example`.
- **Zero Build & Lint Errors**:
  - Frontend (`tsc -b && vite build`): **0 errors** (Production bundle successfully generated).
  - Backend (`tsc`): **0 errors** (Type-check and compilation passed).

