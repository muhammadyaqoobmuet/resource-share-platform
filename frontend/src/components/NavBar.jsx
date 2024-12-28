import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Button } from "./ui/button";

export const NavBar = () => {
  const { user, logout, name } = useAuth();
  const navigate = useNavigate();
  const [dropdown, setDropdown] = useState(false);

  function handleLogut() {
    logout(); // Perform logout
    navigate("/"); // Redirect to the landing page
  }

  useEffect(() => {
    console.log(user);
  }, [])

  return (
    <div className="w-full bg-white/90 border-b-2 sticky top-0">

    <nav className="  p-6 flex justify-between items-center max-w-[1350px] mx-auto">
      <div
        className="text-white text-xl font-bold cursor-pointer"
        onClick={() => navigate(user ? "/dashboard" : "/")}
      >
        <img src="./public/images/Logo.png" className="w-[150px]  object-cover"/>
      </div>
      {!user ? (
        <div className="space-x-4">
          <Button
            onClick={() => navigate("/login")}
            className=" text-black bg-transparent hover:bg-black hover:text-white"
          >
            Login
          </Button>
          <Button onClick={() => navigate("/signup")} >
            Signup
          </Button>

        </div>
      ) : (
        <div className="relative">
          <button
            onClick={() => setDropdown(!dropdown)}
            className="bg-white text-blue-600 px-4 py-2 rounded"
          >
            {name}
          </button>
          {dropdown && (
            <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded">
              <button
                onClick={handleLogut}
                className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      )}
    </nav>
    </div>
  );
};
