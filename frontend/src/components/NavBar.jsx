import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button"; // Make sure this is imported correctly
import useAuthStore from "@/store/authStore"; // Assuming you have a store to manage authentication
import { Cross, EyeClosed, HammerIcon, LogOutIcon, MailIcon, MenuIcon, Plus, PoundSterling, Upload } from "lucide-react";

function NavBar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State for toggling the sidebar
  const { isAuthenticated, logout } = useAuthStore();
  const navigate = useNavigate();

  // Toggle the sidebar
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  // Handle logout
  const handleLogout = () => {
    logout(); // Perform the logout action
    navigate("/"); // Redirect to the homepage
  };

  return (
    <>
      {/* Main NavBar */}
      <div className="w-full bg-white/90 border-b-2 sticky top-0">
        <nav className="p-6 flex justify-between items-center max-w-[1350px] mx-auto">
          <div
            className="text-xl font-bold cursor-pointer"
            onClick={() => navigate(isAuthenticated ? "/dashboard" : "/")}
          >
            <img
              src="/public/images/Logo.png"
              className="w-[150px] object-cover"
              alt="Logo"
            />
          </div>

          <div className="flex items-center space-x-4">
            {!isAuthenticated ? (
              <>
                {/* Show Login and Signup buttons if not authenticated */}
                <Button
                  onClick={() => navigate("/login")}
                  className="text-black bg-transparent hover:bg-black hover:text-white"
                >
                  Login
                </Button>
                <Button onClick={() => navigate("/signup")}>Signup</Button>
              </>
            ) : (
              <>
                {/* Show Hamburger icon on small screens */}
                <button
                  onClick={toggleSidebar}
                  className="lg:hidden text-xl p-2 hover:bg-gray-300 rounded"
                >
                  <MenuIcon /> {/* Add Font Awesome icon for hamburger */}
                </button>

                {/* Show buttons on large screens */}
                <div className="hidden lg:flex space-x-4">
                  <Button
                    onClick={() => navigate("/upload")}
                    className="text-black bg-transparent hover:bg-black hover:text-white"
                  >
                    Upload
                  </Button>
                  <Button
                    onClick={() => navigate("/myposts")}
                    className="text-black bg-transparent hover:bg-black hover:text-white"
                  >
                    My Posts
                  </Button>
                  <Button
                    onClick={handleLogout}
                    className="text-black bg-transparent hover:bg-red-900 hover:text-white"
                  >
                    Logout
                  </Button>
                </div>
              </>
            )}
          </div>
        </nav>
      </div>

      {/* Sidebar (Right-side, Hidden by default) */}
      <div
        className={`fixed top-0 right-0 h-full text-[#171717] bg-white w-64 transform transition-all duration-300 ease-in-out z-50 ${isSidebarOpen ? "translate-x-0" : "translate-x-full"
          }`}
      >
        <div className="flex justify-between items-center p-6">
          <img
            src="/public/images/Logo.png"
            className="w-[150px] object-cover"
            alt="Logo"
          />
          <button
            onClick={toggleSidebar}
            className="text-black text-2xl p-2 rounded hover:bg-gray-100 hover:rotate-180"
          >
            <h1>X</h1> {/* Close button */}
          </button>
        </div>

        <div className="flex flex-col space-y-4 px-6">
          <Button
            onClick={() => navigate("/upload")}
            className=" w-full flex items-center px-4 bg-white text-[#171717] shadow-md border hover:bg-slate-100 hover:scale-105 ease-in   py-3 rounded-md"
          >
            <Upload className="left-10 absolute" />
            Upload
          </Button>
          <Button
            onClick={() => navigate("/upload")}
            className=" w-full flex items-center px-4 bg-white text-[#171717] shadow-md border hover:bg-slate-100 hover:scale-105 ease-in   py-3 rounded-md"
          >
            <MailIcon className="left-10 absolute"  />
            My Posts
          </Button>
          <Button
            onClick={() => navigate("/upload")}
            className=" w-full flex items-center px-4 bg-white text-[#171717] shadow-md border hover:bg-slate-100 hover:scale-105 ease-in   py-3 rounded-md"
          >
            <LogOutIcon className="left-10 absolute" />
            Logout
          </Button>
        </div>
      </div>

      {/* Main Content Overlay (Click outside of the sidebar to close it) */}
      <div
        className={`fixed inset-0 bg-black opacity-50 z-40 ${isSidebarOpen ? "block" : "hidden"
          }`}
        onClick={toggleSidebar}
      />
    </>
  );
}

export default NavBar;
