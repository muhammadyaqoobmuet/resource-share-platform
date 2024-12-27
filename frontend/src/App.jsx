

import './index.css'
import LandingPage from './components/LandingPage'
import { Route, Routes } from 'react-router-dom'
import Login from './components/Login'
import NavBar from './components/NavBar'
import Signup from './components/Signup'
import { ToastContainer } from "react-toastify"; // Import Toastify container
import "react-toastify/dist/ReactToastify.css"; // Import styles
import Footer from './components/Footer'

function App() {
  

  return (
    <>
      <ToastContainer/>

      <div className='wrapper max-w-[1350px] mx-auto px-4 py-8'>
        <NavBar />
      </div>
      <Routes>
        {/* Define the Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup/>} />
        
      </Routes>
     <Footer/>
    </>
  )
}

export default App
