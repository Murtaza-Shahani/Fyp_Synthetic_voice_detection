import { Link } from "react-router-dom";
import Button from "./ui/Button";

function Navigation() {
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
            <Link to="/contact" className="text-gray-600 hover:text-blue-600">
              Contact
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <Link to="/login">
              <Button variant="outline">Login</Button>
            </Link>
            <Link to="/signup">
              <Button variant="primary">Sign Up</Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navigation;
