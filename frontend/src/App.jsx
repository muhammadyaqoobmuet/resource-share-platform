import { useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
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
import { ReactQueryDevtools, } from '@tanstack/react-query-devtools';
import SentRequest from './components/SentRequest';
import RequestHave from './components/RequestHave';
import Transactions from './components/Transactions';
import UserProfile from './components/UserProfile';
import UserPublicProfile from './components/UserPublicProfile';

function App() {
  const location = useLocation()
  const queryClient = new QueryClient()
  const { isAuthenticated, user, getUser } = useAuthStore();

  useEffect(() => {
    if (isAuthenticated) {
      getUser();
    }
  }, [isAuthenticated, getUser]);

  return (
    <>
      <QueryClientProvider client={queryClient}>
        {location.pathname !== "/" && <NavBar />}
        <ToastContainer />
        <Routes>
          <Route path="/dashboard" element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          } />
          <Route path="/transactions" element={<Transactions />} />
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
          <Route path="/profile" element={
            <PrivateRoute>
              <UserProfile />
            </PrivateRoute>
          } />
          <Route path="/user/:userId" element={<UserPublicProfile />} />
        </Routes>
        <Footer />
        <ReactQueryDevtools initialIsOpen={true} />
      </QueryClientProvider>
    </>
  );
}

export default App;
