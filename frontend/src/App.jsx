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
import ResourceDetailPage from './components/ResourceDetailPage';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { QrCode } from 'lucide-react';
import { ReactQueryDevtools, ReactQueryDevtoolsPanel } from '@tanstack/react-query-devtools';
import TableUI from './components/SentRequest';
import SentRequest from './components/SentRequest';
import RequestHave from './components/RequestHave';



function App() {
  const queryClient = new QueryClient()
  const { isAuthenticated, isVerified, user } = useAuthStore();
  const navigate = useNavigate();


  useEffect(() => {
    console.log(user?.id);
  }, [user])
  return (
    <>
      <QueryClientProvider client={queryClient}>

        <ToastContainer />
        <NavBar />
        <Routes>
          <Route path="/sent-request" element={<SentRequest />} />
          <Route path="/requests" element={<RequestHave />} />
          <Route path="/resource/:id" element={<ResourceDetailPage />} />
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
        {/* dev tool in reactqurey add that  */}
        <ReactQueryDevtools initialIsOpen={true} />

      </QueryClientProvider>
    </>
  );
}

export default App;
