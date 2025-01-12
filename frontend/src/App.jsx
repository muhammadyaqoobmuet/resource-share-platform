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
import UploadResource from './components/UploadResource';
import PrivateUpload from './routes/ProtectedUpload';
import MyPosts from './components/MyPosts';
import PrivatePosts from './routes/PrivatePosts';




function App() {
  const { isAuthenticated, isVerified, user } = useAuthStore();
  const navigate = useNavigate();


  useEffect(() => {
    console.log(user?.id);
  }, [user])
  return (
    <>
      <ToastContainer />
      <NavBar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Login />} />
        <Route path="/signup" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Signup />} />
        <Route path="/upload" element={
          <PrivateUpload>
            <UploadResource />
          </PrivateUpload>
        } />
        <Route path="/my-posts" element={
          <PrivatePosts>
            <MyPosts />
          </PrivatePosts>
        } />



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
