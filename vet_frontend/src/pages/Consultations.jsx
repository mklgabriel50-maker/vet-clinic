import { useEffect, useState } from "react";
import { api } from "../api.js";
export default function Consultations(){
  const [items,setItems]=useState([]); const [form,setForm]=useState({pet_id:"",doctor_id:"",symptoms:"",diagnosis:"",treatment:""}); const [pets,setPets]=useState([]);
  const load=()=>api.consultations.list().then(setItems); const loadPets=()=>api.pets.list().then(setPets);
  useEffect(()=>{ load(); loadPets(); },[]);
  const submit=async e=>{ e.preventDefault(); const payload={...form,pet_id:parseInt(form.pet_id),doctor_id:parseInt(form.doctor_id)};
    await api.consultations.create(payload); setForm({pet_id:"",doctor_id:"",symptoms:"",diagnosis:"",treatment:""}); load(); };
  return (<div className="space-y-4">
    <div className="bg-white p-4 rounded-xl shadow">
      <h1 className="text-xl font-semibold mb-3">Consultații</h1>
      <form onSubmit={submit} className="grid md:grid-cols-6 gap-3">
        <select className="border rounded-md px-3 py-2" value={form.pet_id} onChange={e=>setForm({...form,pet_id:e.target.value})} required>
          <option value="">Alege animal</option>{pets.map(p=><option key={p.id} value={p.id}>{p.name} (#{p.id})</option>)}
        </select>
        <input className="border rounded-md px-3 py-2" placeholder="Doctor ID" value={form.doctor_id} onChange={e=>setForm({...form,doctor_id:e.target.value})} required/>
        <input className="border rounded-md px-3 py-2 md:col-span-2" placeholder="Simptome" value={form.symptoms} onChange={e=>setForm({...form,symptoms:e.target.value})}/>
        <input className="border rounded-md px-3 py-2 md:col-span-2" placeholder="Diagnostic" value={form.diagnosis} onChange={e=>setForm({...form,diagnosis:e.target.value})}/>
        <input className="border rounded-md px-3 py-2 md:col-span-6" placeholder="Tratament" value={form.treatment} onChange={e=>setForm({...form,treatment:e.target.value})}/>
        <button className="md:col-span-6 bg-blue-600 text-white rounded-md py-2">Adaugă</button>
      </form>
    </div>
    <div className="bg-white p-4 rounded-xl shadow overflow-x-auto">
      <table className="min-w-full text-sm"><thead><tr className="text-left border-b">
        <th className="py-2">ID</th><th>Pet</th><th>Doctor</th><th>Simptome</th><th>Diagnostic</th><th>Tratament</th><th>Data</th></tr></thead>
        <tbody>{items.map(c=>(<tr key={c.id} className="border-b">
          <td className="py-2">{c.id}</td><td>#{c.pet_id}</td><td>#{c.doctor_id}</td><td>{c.symptoms||"-"}</td><td>{c.diagnosis||"-"}</td><td>{c.treatment||"-"}</td><td>{new Date(c.date).toLocaleString()}</td>
        </tr>))}</tbody></table>
    </div>
  </div>);
}
