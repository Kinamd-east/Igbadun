import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Home, Signin, Signup } from "./pages";
import Tapping from "./pages/Tapping";
import { useAuth } from "./context/AuthContent"; // fix path if needed
import { Toaster } from "@/components/ui/sonner";
import Profile from "./pages/Profile";
import TappingMarketplace from "./pages/TappingMarketplace";

const App = () => {
  const { currentUser, loading } = useAuth();

  if (loading) {
    return <div className="text-center p-8 text-lg">Loading...</div>;
  }

  return (
    <Router>
      <Routes>
        {/* Public page */}
        <Route path="/" element={<Home />} />

        {/* Auth pages - redirect if logged in */}
        <Route
          path="/sign-in"
          element={currentUser ? <Navigate to="/tapping" /> : <Signin />}
        />
        <Route
          path="/sign-up"
          element={currentUser ? <Navigate to="/tapping" /> : <Signup />}
        />

        {/* Protected route */}
        <Route
          path="/tapping"
          element={currentUser ? <TappingMarketplace /> : <Navigate to="/sign-in" />}
        />
        <Route
          path="/tapping/landoftheforgotten"
          element={currentUser ? <Tapping /> : <Navigate to="/sign-in" />}
        />
        <Route
          path="/profile/:id"
          element={currentUser ? <Profile /> : <Navigate to="/sign-in" />}
        />
      </Routes>
      <Toaster />
    </Router>
  );
};

export default App;
