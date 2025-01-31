import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button"; // Make sure this is imported correctly
import useAuthStore from "@/store/authStore"; // Assuming you have a store to manage authentication
import { LogOutIcon, MailIcon, MenuIcon, Upload, PoundSterling, ChevronDown, BookOpen } from "lucide-react";
import ProfileCard from "./ProfileCard";


function NavBar({ properties }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State for toggling the sidebar
  const [showRequestsDropdown, setShowRequestsDropdown] = useState(false);
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
      <div className={`${properties ? `${properties}` : "bg-[#0A0A0A]"} w-full z-50 border-b border-gray-950 sticky top-0`}>


        <nav className="p-6 flex justify-between items-center max-w-[1350px] mx-auto">
          <div
            className="text-xl font-bold cursor-pointer text-white"
            onClick={() => navigate(isAuthenticated ? "/dashboard" : "/")}
          >
            <div className="flex items-center gap-2">
              <svg className="w-8 h-8 text-purple-500" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                CampusHub
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {!isAuthenticated ? (
              <>
                <Button
                  onClick={() => navigate("/login")}
                  className="text-white bg-transparent hover:bg-white/10 border border-white/20"
                >
                  Login
                </Button>
                <Button
                  onClick={() => navigate("/signup")}
                  className="bg-white text-black hover:bg-gray-200 hover:scale-105 transition-all"
                >
                  Signup
                </Button>
              </>
            ) : (
              <>
                <button
                  onClick={toggleSidebar}
                  className="lg:hidden text-white p-2 hover:bg-white/10 rounded"
                >
                  <MenuIcon />
                </button>

                <div className="hidden lg:flex space-x-4 lg:items-center">



                  <Button
                    onClick={() => navigate("/upload")}
                    className="text-white bg-transparent hover:bg-white/10 border border-white/20"
                  >
                    <Upload className="mr-2 h-4 w-4" />
                    Upload
                  </Button>

                  <Button
                    onClick={() => navigate("/my-posts")}
                    className="text-white bg-transparent hover:bg-white/10 border border-white/20"
                  >
                    <MailIcon className="mr-2 h-4 w-4" />
                    My Posts
                  </Button>

                  <Button
                    onClick={() => navigate("/transactions")}
                    className="text-white bg-transparent hover:bg-white/10 border border-white/20"
                  >
                    <PoundSterling className="mr-2 h-4 w-4" />
                    Transactions
                  </Button>

                  <div
                    className="relative"
                    onMouseEnter={() => setShowRequestsDropdown(true)}
                    onMouseLeave={() => setShowRequestsDropdown(false)}
                  >
                    <Button
                      className="text-white bg-transparent hover:bg-white/10 border border-white/20"
                    >
                      Requests
                      <ChevronDown className="ml-2 h-4 w-4" />
                    </Button>

                    {showRequestsDropdown && (
                      <div className="absolute top-full left-0 mt-1 w-48 bg-black rounded-md shadow-lg py-1 z-50 border border-gray-800">
                        <button
                          onClick={() => {
                            navigate("/requests");
                            setShowRequestsDropdown(false);
                          }}
                          className="block w-full text-left px-4 py-2 text-sm text-white hover:bg-white/10"
                        >
                          Received Requests
                        </button>
                        <button
                          onClick={() => {
                            navigate("/sent-request");
                            setShowRequestsDropdown(false);
                          }}
                          className="block w-full text-left px-4 py-2 text-sm text-white hover:bg-white/10"
                        >
                          Sent Requests
                        </button>
                      </div>
                    )}
                  </div>

                  <ProfileCard />
                </div>
              </>
            )}
          </div>
        </nav>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full bg-black text-white w-64 transform transition-all duration-300 ease-in-out z-50 ${isSidebarOpen ? "translate-x-0" : "translate-x-full"
          }`}
      >
        <div className="flex justify-self-end items-center p-6  ">

          <button
            onClick={toggleSidebar}
            className="text-white text-2xl p-2 rounded hover:bg-white/10 hover:rotate-180 transition-all"
          >
            <h1>X</h1>
          </button>
        </div>

        <div className="flex flex-col space-y-4 px-6 py-4">
          <Button
            onClick={() => navigate("/upload")}
            className="w-full flex items-center px-4 text-white bg-transparent hover:bg-white/10 border border-white/20"
          >
            <Upload className="mr-2 h-4 w-4" />
            Upload
          </Button>
          <Button
            onClick={() => navigate("/my-posts")}
            className="w-full flex items-center px-4 text-white bg-transparent hover:bg-white/10 border border-white/20"
          >
            <MailIcon className="mr-2 h-4 w-4" />
            My Posts
          </Button>
          <Button
            onClick={() => navigate("/transactions")}
            className="w-full flex items-center px-4 text-white bg-transparent hover:bg-white/10 border border-white/20"
          >
            <PoundSterling className="mr-2 h-4 w-4" />
            Transactions
          </Button>
          <Button
            onClick={() => navigate("/requests")}
            className="w-full flex items-center px-4 text-white bg-transparent hover:bg-white/10 border border-white/20"
          >
            Received Requests
          </Button>
          <Button
            onClick={() => navigate("/sent-request")}
            className="w-full flex items-center px-4 text-white bg-transparent hover:bg-white/10 border border-white/20"
          >
            Sent Requests
          </Button>
          <Button
            onClick={handleLogout}
            className="w-full flex items-center px-4 text-white bg-transparent hover:bg-white/10 border border-white/20"
          >
            <LogOutIcon className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
      </div>

      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/80 z-40 ${isSidebarOpen ? "block" : "hidden"}`}
        onClick={toggleSidebar}
      />
    </>
  );
}

export default NavBar;
