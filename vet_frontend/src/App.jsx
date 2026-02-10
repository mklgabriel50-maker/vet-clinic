import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Owners from "./pages/Owners.jsx";
import Pets from "./pages/Pets.jsx";
import Appointments from "./pages/Appointments.jsx";
import Consultations from "./pages/Consultations.jsx";
import Invoices from "./pages/Invoices.jsx";
import Navbar from "./components/Navbar.jsx";
import Protected from "./components/Protected.jsx";
export default function App(){
  return (<div className="min-h-screen"><Navbar/><div className="max-w-6xl mx-auto p-4">
    <Routes>
      <Route path="/login" element={<Login/>}/>
      <Route path="/" element={<Protected><Dashboard/></Protected>}/>
      <Route path="/owners" element={<Protected><Owners/></Protected>}/>
      <Route path="/pets" element={<Protected><Pets/></Protected>}/>
      <Route path="/appointments" element={<Protected><Appointments/></Protected>}/>
      <Route path="/consultations" element={<Protected><Consultations/></Protected>}/>
      <Route path="/invoices" element={<Protected><Invoices/></Protected>}/>
      <Route path="*" element={<Navigate to="/" />}/>
    </Routes>
  </div></div>);
}
