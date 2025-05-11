import { Link, useNavigate } from "react-router-dom";
import Button from "./ui/Button";
import { useState, useEffect } from "react";  // Use state and effect for conditionally showing buttons
import { ToastContainer, toast } from "react-toastify"; // Import ToastContainer and toast
import "react-toastify/dist/ReactToastify.css";  // Import CSS for Toastify

function Navigation() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);  // State to track user login status

  useEffect(() => {
    // Check if the authToken exists in localStorage to determine if user is logged in
    const token = localStorage.getItem("authToken");
    if (token) {
      setIsLoggedIn(true);  // Set user as logged in if token is found
    } else {
      setIsLoggedIn(false);  // User is not logged in if no token
    }
  }, []);  // Empty dependency array to check only once when component mounts

  const handleLogout = () => {
    // Remove the JWT token from localStorage
    localStorage.removeItem("authToken");

    // Update the login state immediately
    setIsLoggedIn(false);

    // Show success flash message
        toast.success("Logout  successful!", {
          position: "top-center",
          autoClose: 1000,  // auto close after 3 seconds
          hideProgressBar: true,
        });

    // Redirect to home page after logout
    navigate("/");
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-2xl font-bold text-blue-600">
            VoiceDetect
          </Link>

          <div className="flex-1 flex justify-center space-x-8">
            <Link to="/" className="text-gray-600 hover:text-blue-600">
              Home
            </Link>
            <Link to="/features" className="text-gray-600 hover:text-blue-600">
              Features
            </Link>
            <Link to="/detection" className="text-gray-600 hover:text-blue-600">
              Detection
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            {isLoggedIn ? (
              // Show Logout button if user is logged in
              <Button variant="outline" onClick={handleLogout}>
                Logout
              </Button>
            ) : (
              // Show Login and Signup buttons if user is not logged in
              <>
                <Link to="/login">
                  <Button variant="outline">Login</Button>
                </Link>
                <Link to="/signup">
                  <Button variant="primary">Sign Up</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>

      {/* ToastContainer to show success/error messages */}
     <ToastContainer />
    </nav>
  );
}

export default Navigation;
