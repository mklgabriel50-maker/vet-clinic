import { useState } from "react";
import { api, setToken } from "../api.js";
import { useNavigate } from "react-router-dom";
export default function Login(){
  const [email,setEmail]=useState(""); const [password,setPassword]=useState(""); const [error,setError]=useState("");
  const nav=useNavigate();
  const submit=async e=>{ e.preventDefault(); setError(""); try{ const data=await api.login(email,password); setToken(data.access_token); nav("/"); } catch(e){ setError("Autentificare eșuată."); } };
  return (<div className="max-w-md mx-auto mt-12 bg-white p-6 rounded-xl shadow">
    <h1 className="text-2xl font-semibold mb-4">Autentificare</h1>
    <form onSubmit={submit} className="space-y-3">
      <div><label className="block text-sm mb-1">Email</label><input value={email} onChange={e=>setEmail(e.target.value)} className="w-full border rounded-md px-3 py-2" placeholder="admin@clinic.ro"/></div>
      <div><label className="block text-sm mb-1">Parolă</label><input type="password" value={password} onChange={e=>setPassword(e.target.value)} className="w-full border rounded-md px-3 py-2" placeholder="••••••••"/></div>
      {error && <p className="text-red-600 text-sm">{error}</p>}
      <button className="w-full bg-blue-600 text-white rounded-md py-2">Intră</button>
    </form>
    <p className="text-xs text-gray-500 mt-3">Creează primul cont din Swagger (`/auth/signup`).</p>
  </div>);
}
