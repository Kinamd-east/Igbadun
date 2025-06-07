import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { Home, Signin, Signup } from "./pages";
import { useAuth } from "../src/context/AuthContent";
import Tapping from "./pages/Tapping";
import { Toaster } from "@/components/ui/sonner";
const App = () => {
  const { currentUser } = useAuth();

  return (
    <Router>
      <Routes>
        {/* Accessible to everyone */}
        <Route path="/" element={<Home />} />

        {/* Block access to auth routes if already logged in */}
        <Route path="/sign-up" element={<Signup />} />
        <Route
          path="/sign-in"
          element={!currentUser ? <Signin /> : <Navigate to="/" />}
        />

        {/* Protected routes */}
        <Route
          path="/tapping"
          element={!currentUser ? <Signin /> : <Tapping />}
        />

        {/* Add more protected routes here */}
        {/* <Route path="/earn" element={<PrivateRoute><Earn /></PrivateRoute>} /> */}
      </Routes>
      <Toaster />
    </Router>
  );
};

export default App;
