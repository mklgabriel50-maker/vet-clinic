import { useEffect, useState } from "react";
import { api } from "../api.js";
export default function Invoices(){
  const [items,setItems]=useState([]); const [form,setForm]=useState({owner_id:"",amount:"",description:""});
  const load=()=>api.invoices.list().then(setItems);
  useEffect(()=>{ load(); },[]);
  const submit=async e=>{ e.preventDefault(); const payload={...form,owner_id:form.owner_id?parseInt(form.owner_id):null,amount:parseFloat(form.amount)};
    await api.invoices.create(payload); setForm({owner_id:"",amount:"",description:""}); load(); };
  return (<div className="space-y-4">
    <div className="bg-white p-4 rounded-xl shadow">
      <h1 className="text-xl font-semibold mb-3">Facturi</h1>
      <form onSubmit={submit} className="grid md:grid-cols-4 gap-3">
        <input className="border rounded-md px-3 py-2" placeholder="Owner ID (opțional)" value={form.owner_id} onChange={e=>setForm({...form,owner_id:e.target.value})}/>
        <input className="border rounded-md px-3 py-2" placeholder="Sumă" value={form.amount} onChange={e=>setForm({...form,amount:e.target.value})} required/>
        <input className="border rounded-md px-3 py-2 md:col-span-2" placeholder="Descriere" value={form.description} onChange={e=>setForm({...form,description:e.target.value})}/>
        <button className="md:col-span-4 bg-blue-600 text-white rounded-md py-2">Adaugă</button>
      </form>
    </div>
    <div className="bg-white p-4 rounded-xl shadow overflow-x-auto">
      <table className="min-w-full text-sm"><thead><tr className="text-left border-b">
        <th className="py-2">ID</th><th>Owner</th><th>Sumă</th><th>Descriere</th><th>Creat la</th></tr></thead>
        <tbody>{items.map(i=>(<tr key={i.id} className="border-b">
          <td className="py-2">{i.id}</td><td>{i.owner_id??"-"}</td><td>{i.amount}</td><td>{i.description||"-"}</td><td>{new Date(i.created_at).toLocaleString()}</td>
        </tr>))}</tbody></table>
    </div>
  </div>);
}
