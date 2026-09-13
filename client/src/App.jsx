import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Home from "./pages/public/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Dashboard from "./pages/user/Dashboard";

import ProtectedRoute from "./components/common/ProtectedRoute";

function App() {
  const token = localStorage.getItem("token");

  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />

        <Route
          path="/login"
          element={token ? <Navigate to="/user/dashboard" replace /> : <Login />}
        />

        <Route
          path="/register"
          element={token ? <Navigate to="/user/dashboard" replace /> : <Register />}
        />

        {/* Protected User Dashboard */}
        <Route
          path="/user/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* Temporary Routes */}
        <Route path="/user/labs" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/user/progress" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/user/certificates" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/user/competitions" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />

        {/* 404 Redirect */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;