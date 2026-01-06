import './App.css'
import { BrowserRouter , Routes , Route } from 'react-router-dom'
import PatientLogin from './pages/PatientLogin'
import PatientSignup from './pages/PatientSignup'
import DoctorLogin from './pages/DoctorLogin'
import DoctorSignup from './pages/DoctorSignup'
import DoctorDashboard from './pages/DoctorDashboard'
import PatientDashboard from './pages/PatientDashboard'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PatientLogin/>}/>
          <Route path="/patient/signup" element={<PatientSignup/>}/>
          <Route path="/doctor/login" element={<DoctorLogin/>}/>
          <Route path="/doctor/signup" element={<DoctorSignup/>}/>
          <Route path="/doctor/dashboard" element={<DoctorDashboard/>}/>
          <Route path="/patient/dashboard" element={<PatientDashboard/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
