import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import Navbar from "./components/Navbar/Navbar";
import { ProtectedRoute } from "./components/Root/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";
import AddDvd from "./pages/AddDvd/AddDvd";
import DvdDetail from "./pages/DvdDetail/DvdDetail";
import EditDvd from "./pages/EditDvd/EditDvd";
import Home from "./pages/Home/Home";
import Landing from "./pages/Landing/Landing";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/add"
            element={
              <ProtectedRoute>
                <AddDvd />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dvd/:id"
            element={
              <ProtectedRoute>
                <DvdDetail />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dvd/:id/edit"
            element={
              <ProtectedRoute>
                <EditDvd />
              </ProtectedRoute>
            }
          />
          {/* All non definited root goes to the homepage */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
