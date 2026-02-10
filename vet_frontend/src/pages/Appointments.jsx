import { useEffect, useState } from "react";
import { api } from "../api.js";
export default function Appointments(){
  const [items,setItems]=useState([]); const [form,setForm]=useState({date:"",time:"",doctor_id:"",pet_id:"",reason:"",notes:""}); const [pets,setPets]=useState([]);
  const load=()=>api.appointments.list().then(setItems); const loadPets=()=>api.pets.list().then(setPets);
  useEffect(()=>{ load(); loadPets(); },[]);
  const submit=async e=>{ e.preventDefault(); const payload={...form,doctor_id:parseInt(form.doctor_id),pet_id:parseInt(form.pet_id)};
    await api.appointments.create(payload); setForm({date:"",time:"",doctor_id:"",pet_id:"",reason:"",notes:""}); load(); };
  return (<div className="space-y-4">
    <div className="bg-white p-4 rounded-xl shadow">
      <h1 className="text-xl font-semibold mb-3">Programări</h1>
      <form onSubmit={submit} className="grid md:grid-cols-6 gap-3">
        <input type="date" className="border rounded-md px-3 py-2" value={form.date} onChange={e=>setForm({...form,date:e.target.value})} required/>
        <input type="time" className="border rounded-md px-3 py-2" value={form.time} onChange={e=>setForm({...form,time:e.target.value})} required/>
        <input className="border rounded-md px-3 py-2" placeholder="Doctor ID" value={form.doctor_id} onChange={e=>setForm({...form,doctor_id:e.target.value})} required/>
        <select className="border rounded-md px-3 py-2" value={form.pet_id} onChange={e=>setForm({...form,pet_id:e.target.value})} required>
          <option value="">Alege animal</option>{pets.map(p=><option key={p.id} value={p.id}>{p.name} (#{p.id})</option>)}
        </select>
        <input className="border rounded-md px-3 py-2 md:col-span-2" placeholder="Motiv" value={form.reason} onChange={e=>setForm({...form,reason:e.target.value})}/>
        <input className="border rounded-md px-3 py-2 md:col-span-6" placeholder="Note" value={form.notes} onChange={e=>setForm({...form,notes:e.target.value})}/>
        <button className="md:col-span-6 bg-blue-600 text-white rounded-md py-2">Adaugă</button>
      </form>
    </div>
    <div className="bg-white p-4 rounded-xl shadow overflow-x-auto">
      <table className="min-w-full text-sm"><thead><tr className="text-left border-b">
        <th className="py-2">Data</th><th>Ora</th><th>Pet</th><th>Doctor</th><th>Motiv</th><th>Note</th></tr></thead>
        <tbody>{items.map(a=>(<tr key={a.id} className="border-b">
          <td className="py-2">{a.date}</td><td>{a.time}</td><td>#{a.pet_id}</td><td>#{a.doctor_id}</td><td>{a.reason||"-"}</td><td>{a.notes||"-"}</td>
        </tr>))}</tbody></table>
    </div>
  </div>);
}
