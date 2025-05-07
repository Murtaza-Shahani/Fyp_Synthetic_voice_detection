import { useState } from "react";
import InputField from "../components/ui/InputField";
import Button from "../components/ui/Button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";  // Import ToastContainer and toast
import "react-toastify/dist/ReactToastify.css";  // Import CSS for Toastify

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      // Send login data to backend
      const response = await axios.post("http://localhost:5000/api/users/login", formData);

      if (response.data.token) {
        // Store the JWT token in localStorage
        localStorage.setItem("authToken", response.data.token);

        // Show success flash message
        toast.success("Login successful! Redirecting to dashboard...", {
          position: "top-center",
          autoClose: 3000,  // auto close after 3 seconds
          hideProgressBar: true,
        });

        // Redirect to dashboard after successful login
        setTimeout(() => {
          navigate("/Detection");  // Redirect to your dashboard or home page
        }, 3000); // Wait for the toast to be shown before redirecting
      }
    } catch (err) {
      setError(err.response?.data?.error || "Login failed. Please try again.");
      toast.error("Login failed. Please check your credentials.", {
        position: "top-center",
        autoClose: 3000,  // auto close after 3 seconds
        hideProgressBar: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow">
        <div>
          <h2 className="text-center text-3xl font-bold">Welcome back</h2>
          <p className="mt-2 text-center text-gray-600">
            Don't have an account?{" "}
            <span
              className="text-blue-600 hover:underline cursor-pointer"
              onClick={() => navigate("/signup")}
            >
              Sign up
            </span>
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && <p className="text-red-500 text-center">{error}</p>}

          <InputField
            label="Email"
            placeholder="Enter Email"
            type="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />

          <InputField
            label="Password"
            placeholder="Enter Password"
            type="password"
            required
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          />

          <div className="flex items-center justify-between">
            <label className="flex items-center">
              {/* <input type="checkbox" className="h-4 w-4 text-blue-600" /> */}
              {/* <span className="ml-2 text-sm text-gray-600">Remember me</span> */}
            </label>
            {/* <Link to="/forgot-password" className="text-sm text-blue-600 hover:underline">
              Forgot password?
            </Link> */}
          </div>

          <Button type="submit" variant="primary" className="w-full" disabled={loading}>
            {loading ? "Signing In..." : "Sign In"}
          </Button>
        </form>
      </div>

      {/* Toast Container for success/error messages */}
      <ToastContainer />
    </div>
  );
}
