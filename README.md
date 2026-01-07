
A full-stack web application for managing patient-doctor consultations.

## 🌐 Live Demo

**Frontend:** https://ideamagixtest.netlify.app/

**Backend API:** https://github.com/ValayaDase/Ideamagix_test

## 🌟 Features

### For Patients
- 👤 Patient registration and authentication
- 📋 View available doctors and their specialties
- 📝 Book consultations with detailed medical history
- 💊 Access prescriptions
- 🖼️ Profile photo

### For Doctors
- 👨‍⚕️ Doctor registration with specialization details
- 📊 View patient consultations
- 💉 provide prescriptions
- 📱 Dashboard for patient management

## 🛠️ Tech Stack

### Frontend
- **React** 19.2.0 - UI library
- **Vite** - Fast build tool and dev server
- **React Router DOM** - Client-side routing
- **Axios** - HTTP client for API calls
- **CSS3** - Custom styling

### Backend
- **Node.js** with **Express. js** 5.2.1
- **MongoDB** with **Mongoose** - Database
- **JWT** (jsonwebtoken) - Authentication
- **Bcrypt.js** - Password hashing
- **Multer** - File upload handling
- **CORS** - Cross-origin resource sharing

## 📁 Project Structure

```
Ideamagix_test/
├── frontend/
│   └── my-app/
│       ├── src/
│       │   ├── pages/
│       │   │   ├── PatientLogin.jsx
│       │   │   ├── PatientSignup.jsx
│       │   │   ├── PatientDashboard.jsx
│       │   │   ├── DoctorLogin.jsx
│       │   │   ├── DoctorSignup.jsx
│       │   │   ├── DoctorDashboard.jsx
│       │   │   └── Consultation.jsx
│       │   ├── styles/
│       │   └── config/
│       │       └── api.js
│       ├── package.json
│       └── vite.config.js
│
└── backend/
    ├── controllers/
    │   ├── patientController.js
    │   ├── doctorController.js
    │   └── consultationController.js
    ├── models/
    │   ├── patient.js
    │   ├── doctor.js
    │   └── consultation.js
    ├── routes/
    │   ├── patientRoutes.js
    │   ├── doctorRoutes.js
    │   └── consultationRoutes.js
    ├── config/
    │   └── db.js
    ├── uploads/
    ├── server.js
    |__ .env
    └── package. json
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- MongoDB Atlas account or local MongoDB installation
- Git

### Backend Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/ValayaDase/Ideamagix_test.git
   cd Ideamagix_test/backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create `.env` file**
   ```env
   MONGO_URI=your_mongodb_connection_string
   PORT=5000
   ```

4. **Start the server**
   ```bash
   # Development mode
   npm run dev
   
   # Production mode
   npm start
   ```

   Server will run on `http://localhost:5000`

### Frontend Setup

1. **Navigate to frontend directory**
   ```bash
   cd frontend/my-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure API URL**
   
   Edit `src/config/api.js`:
   ```javascript
   const API_URL = 'http://localhost:5000';  // For local development
   export default API_URL;
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

   Frontend will run on `http://localhost:5173`

## 🌐 Deployment

### Backend (Render)
1. Push code to GitHub
2. Create new Web Service on Render
3. Configure: 
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Environment Variables:** Add `MONGO_URI`, `PORT`, `JWT_SECRET`

### Frontend (Netlify)
1. Create `netlify.toml` in repository root: 
   ```toml
   [build]
     base = "frontend/my-app"
     command = "npm run build"
     publish = "frontend/my-app/dist"

   [[redirects]]
     from = "/*"
     to = "/index.html"
     status = 200
   ```

2. Deploy via Netlify Dashboard: 
   - **Base directory:** `frontend/my-app`
   - **Build command:** `npm run build`
   - **Publish directory:** `frontend/my-app/dist`

3. Update `src/config/api.js` with deployed backend URL

## 📡 API Endpoints

### Patient Routes
- `POST /patient/register` - Register new patient
- `POST /patient/login` - Patient login
- `GET /patient/details/:patientId` - Get patient details
- `GET /patient/all` - Get all patients

### Doctor Routes
- `POST /doctor/register` - Register new doctor
- `POST /doctor/login` - Doctor login
- `GET /doctor/details/:doctorId` - Get doctor details
- `GET /doctor/all` - Get all doctors

### Consultation Routes
- `POST /consultation/add` - Create new consultation
- `GET /consultation/all/: doctorId` - Get doctor's consultations
- `GET /consultation/patient/:patientId` - Get patient's consultations
- `PUT /consultation/prescription/:consultationId` - Add prescription

## 🔐 Security Features

- Password hashing with bcrypt
- CORS protection
- Secure file upload handling

## 📸 Features

- Profile photo upload for patients and doctors
- Prescription management
- Consultation history

