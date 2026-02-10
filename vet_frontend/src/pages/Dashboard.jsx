import { useEffect, useState } from "react";
import { api } from "../api.js";
export default function Dashboard(){
  const [health,setHealth]=useState(null); const [appointments,setAppointments]=useState([]);
  useEffect(()=>{ api.health().then(setHealth).catch(()=>{}); api.appointments.list().then(setAppointments).catch(()=>setAppointments([])); },[]);
  return (<div className="space-y-6">
    <div className="grid md:grid-cols-3 gap-4">
      <div className="bg-white p-4 rounded-xl shadow"><h2 className="font-semibold">Stare API</h2><p className="text-sm text-gray-600">{health?"OK":"N/A"}</p></div>
      <div className="bg-white p-4 rounded-xl shadow"><h2 className="font-semibold">Programări</h2><p className="text-sm text-gray-600">{appointments.length}</p></div>
      <div className="bg-white p-4 rounded-xl shadow"><h2 className="font-semibold">Bun venit!</h2><p className="text-sm text-gray-600">Folosește meniul.</p></div>
    </div>
  </div>);
}
