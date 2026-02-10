import { Link, useNavigate } from "react-router-dom";
import { clearToken } from "../api.js";
export default function Navbar(){
  const nav=useNavigate(); const logged=!!localStorage.getItem("token");
  const logout=()=>{ clearToken(); nav("/login"); };
  return (<nav className="bg-white border-b border-gray-200">
    <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <Link to="/" className="font-semibold text-lg text-gray-900">Vet Clinic</Link>
        {logged&&(<div className="hidden md:flex items-center gap-3 text-sm">
          <Link to="/" className="hover:text-blue-600">Dashboard</Link>
          <Link to="/owners" className="hover:text-blue-600">Proprietari</Link>
          <Link to="/pets" className="hover:text-blue-600">Animale</Link>
          <Link to="/appointments" className="hover:text-blue-600">Programări</Link>
          <Link to="/consultations" className="hover:text-blue-600">Consultații</Link>
          <Link to="/invoices" className="hover:text-blue-600">Facturi</Link>
        </div>)}
      </div>
      <div>{logged?(
        <button onClick={logout} className="px-3 py-1.5 rounded-md bg-blue-600 text-white">Delogare</button>
      ):(<Link to="/login" className="px-3 py-1.5 rounded-md bg-blue-600 text-white">Autentificare</Link>)}</div>
    </div>
  </nav>);
}
