import "./App.css";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Features from "./pages/Features";
import Detection from "./pages/Detection";
import Contact from "./pages/Contact";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import Home from "./pages/Home";

const AppLayout = ({ children }) => {
  return (
    <>
      <Navigation />
      {children}
      <Footer />
    </>
  );
};

const App = () => {
  return (
    <Routes>
      {/* Routes with Header and Footer */}
      <Route
        path="/"
        element={
          <AppLayout>
            <Home />
          </AppLayout>
        }
      />
      <Route
        path="/features"
        element={
          <AppLayout>
            <Features />
          </AppLayout>
        }
      />
      <Route
        path="/detection"
        element={
          <AppLayout>
            <Detection />
          </AppLayout>
        }
      />
      <Route
        path="/contact"
        element={
          <AppLayout>
            <Contact />
          </AppLayout>
        }
      />

      {/* Full page routes (no Header/Footer) */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  );
};

export default App;
