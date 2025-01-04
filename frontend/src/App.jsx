import React, { useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import useAuthStore from "./store/authStore";
import NavBar from "@/components/NavBar";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Dashboard from "./components/Dashboard";
import LandingPage from "./components/LandingPage";
import PrivateRoute from "./routes/PrivateRoute";
import VerifyOTP from "./components/VerifyOTP";
import Footer from "./components/Footer";

function App() {
  const { isAuthenticated, isVerified } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    // If already authenticated, redirect to Dashboard or Verify
    if (isAuthenticated) {
      if (isVerified) {
        navigate('/dashboard');
      } else {
        navigate('/verify');
      }
    }
  }, [isAuthenticated, isVerified, navigate]);

  return (
    <>
      <ToastContainer />
      <NavBar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Login />} />
        <Route path="/signup" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Signup />} />
        <Route path="/verify" element={<VerifyOTP />} />
        <Route path="/dashboard" element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        } />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
