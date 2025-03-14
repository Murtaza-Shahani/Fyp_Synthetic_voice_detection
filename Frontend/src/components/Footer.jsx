import { Link } from "react-router-dom"
import Button from "./ui/Button"
import InputField from "./ui/InputField"

function Footer() {
  return (
    <footer className="bg-blue-600 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Column 1 - Logo and Description */}
          <div>
            <Link to="/" className="text-2xl font-bold">
              VoiceDetect
            </Link>
            <p className="mt-4 text-gray-200">
              Protecting digital integrity with advanced synthetic voice detection technology. Our mission is to ensure
              authenticity in the digital age.
            </p>
          </div>

          {/* Column 2 - Navigation Links */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/about" className="hover:text-gray-200">
                    About
                  </Link>
                </li>
                <li>
                  <Link to="/features" className="hover:text-gray-200">
                    Features
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="hover:text-gray-200">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/privacy" className="hover:text-gray-200">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link to="/terms" className="hover:text-gray-200">
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Column 3 - Newsletter */}
          <div>
            <h3 className="font-semibold mb-4">Stay Updated</h3>
            <form className="space-y-4">
              <InputField
                type="email"
                placeholder="Enter your email"
                className="bg-white/10 border-white/20 text-white placeholder:text-gray-300"
              />
              <Button variant="secondary" className="w-full">
                Subscribe
              </Button>
            </form>
            <div className="flex space-x-4 mt-6">
              <Link to="#" className="hover:text-gray-200">
                <i className="fab fa-facebook-f"></i>
              </Link>
              <Link to="#" className="hover:text-gray-200">
                <i className="fab fa-twitter"></i>
              </Link>
              <Link to="#" className="hover:text-gray-200">
                <i className="fab fa-linkedin-in"></i>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer