import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Owners from "./pages/Owners.jsx";
import Pets from "./pages/Pets.jsx";
import Appointments from "./pages/Appointments.jsx";
import Consultations from "./pages/Consultations.jsx";
import Invoices from "./pages/Invoices.jsx";
import Navbar from "./components/Navbar.jsx";

export default function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="max-w-6xl mx-auto p-4">
        <Routes>
          <Route path="/login" element={<Navigate to="/" replace />} />

          {/* NO AUTH (TEST MODE) */}
          <Route path="/" element={<Dashboard />} />
          <Route path="/owners" element={<Owners />} />
          <Route path="/pets" element={<Pets />} />
          <Route path="/appointments" element={<Appointments />} />
          <Route path="/consultations" element={<Consultations />} />
          <Route path="/invoices" element={<Invoices />} />

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </div>
  );
}
