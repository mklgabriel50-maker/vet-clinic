import { useEffect, useState } from "react";
import { api } from "../api.js";
export default function Pets(){
  const [items,setItems]=useState([]); const [owners,setOwners]=useState([]);
  const [form,setForm]=useState({name:"",species:"dog",breed:"",sex:"",age_years:"",chip:"",owner_id:""});
  const load=()=>api.pets.list().then(setItems); const loadOwners=()=>api.owners.list().then(setOwners);
  useEffect(()=>{ load(); loadOwners(); },[]);
  const submit=async e=>{ e.preventDefault(); const payload={...form,age_years:form.age_years?parseInt(form.age_years):null,owner_id:parseInt(form.owner_id)};
    await api.pets.create(payload); setForm({name:"",species:"dog",breed:"",sex:"",age_years:"",chip:"",owner_id:""}); load(); };
  return (<div className="space-y-4">
    <div className="bg-white p-4 rounded-xl shadow">
      <h1 className="text-xl font-semibold mb-3">Animale</h1>
      <form onSubmit={submit} className="grid md:grid-cols-6 gap-3">
        <input className="border rounded-md px-3 py-2" placeholder="Nume" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} required/>
        <select className="border rounded-md px-3 py-2" value={form.species} onChange={e=>setForm({...form,species:e.target.value})}>
          <option value="dog">Câine</option><option value="cat">Pisică</option><option value="other">Altă specie</option>
        </select>
        <input className="border rounded-md px-3 py-2" placeholder="Rasă" value={form.breed} onChange={e=>setForm({...form,breed:e.target.value})}/>
        <input className="border rounded-md px-3 py-2" placeholder="Sex" value={form.sex} onChange={e=>setForm({...form,sex:e.target.value})}/>
        <input className="border rounded-md px-3 py-2" placeholder="Vârstă (ani)" value={form.age_years} onChange={e=>setForm({...form,age_years:e.target.value})}/>
        <input className="border rounded-md px-3 py-2" placeholder="CIP" value={form.chip} onChange={e=>setForm({...form,chip:e.target.value})}/>
        <select className="border rounded-md px-3 py-2 md:col-span-3" value={form.owner_id} onChange={e=>setForm({...form,owner_id:e.target.value})} required>
          <option value="">Alege proprietar</option>{owners.map(o=><option key={o.id} value={o.id}>{o.name} (#{o.id})</option>)}
        </select>
        <button className="md:col-span-6 bg-blue-600 text-white rounded-md py-2">Adaugă</button>
      </form>
    </div>
    <div className="bg-white p-4 rounded-xl shadow overflow-x-auto">
      <table className="min-w-full text-sm"><thead><tr className="text-left border-b">
        <th className="py-2">ID</th><th>Nume</th><th>Specie</th><th>Rasă</th><th>Sex</th><th>Vârstă</th><th>CIP</th><th>Owner</th></tr></thead>
        <tbody>{items.map(p=>(<tr key={p.id} className="border-b">
          <td className="py-2">{p.id}</td><td>{p.name}</td><td>{p.species}</td><td>{p.breed||"-"}</td><td>{p.sex||"-"}</td><td>{p.age_years??"-"}</td><td>{p.chip||"-"}</td><td>{p.owner_id}</td>
        </tr>))}</tbody></table>
    </div>
  </div>);
}
