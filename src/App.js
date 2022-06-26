import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login.jsx";
import { AuthProvider } from "./context/authContext.js";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";
import Edit from "./components/Edit";
import Create from "./components/Create";

function App() {
  return (
    <div className="flex flex-col w-full h-screen font-sans text-black bg-slate-300">
      <AuthProvider>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Navbar />
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/edit/:id"
            element={
              <ProtectedRoute>
                <Navbar />
                <Edit />
              </ProtectedRoute>
            }
          />
          <Route
            path="/create"
            element={
              <ProtectedRoute>
                <Navbar />
                <Create />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<Login />} />
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
