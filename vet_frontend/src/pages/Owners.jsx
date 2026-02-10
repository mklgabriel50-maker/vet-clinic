import { useEffect, useState } from "react";
import { api } from "../api.js";
export default function Owners(){
  const [items,setItems]=useState([]);
  const [form,setForm]=useState({name:"",phone:"",email:"",address:""});
  const load=()=>api.owners.list().then(setItems);
  useEffect(()=>{ load(); },[]);
  const submit=async e=>{ e.preventDefault(); await api.owners.create(form); setForm({name:"",phone:"",email:"",address:""}); load(); };
  return (<div className="space-y-4">
    <div className="bg-white p-4 rounded-xl shadow">
      <h1 className="text-xl font-semibold mb-3">Proprietari</h1>
      <form onSubmit={submit} className="grid md:grid-cols-4 gap-3">
        <input className="border rounded-md px-3 py-2" placeholder="Nume" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} required/>
        <input className="border rounded-md px-3 py-2" placeholder="Telefon" value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})}/>
        <input className="border rounded-md px-3 py-2" placeholder="Email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})}/>
        <input className="border rounded-md px-3 py-2" placeholder="Adresă" value={form.address} onChange={e=>setForm({...form,address:e.target.value})}/>
        <button className="md:col-span-4 bg-blue-600 text-white rounded-md py-2">Adaugă</button>
      </form>
    </div>
    <div className="bg-white p-4 rounded-xl shadow overflow-x-auto">
      <table className="min-w-full text-sm"><thead><tr className="text-left border-b">
        <th className="py-2">ID</th><th>Nume</th><th>Telefon</th><th>Email</th><th>Adresă</th></tr></thead>
        <tbody>{items.map(o=>(<tr key={o.id} className="border-b">
          <td className="py-2">{o.id}</td><td>{o.name}</td><td>{o.phone||"-"}</td><td>{o.email||"-"}</td><td>{o.address||"-"}</td>
        </tr>))}</tbody></table>
    </div>
  </div>);
}
