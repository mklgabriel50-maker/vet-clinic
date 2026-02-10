const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";
function getToken(){ return localStorage.getItem("token"); }
async function request(path,{method="GET",body,auth=true}={}){
  const headers={"Content-Type":"application/json"};
  if(auth){ const t=getToken(); if(t) headers["Authorization"]=`Bearer ${t}`; }
  const res=await fetch(`${API_URL}${path}`,{method,headers,body:body?JSON.stringify(body):undefined});
  if(!res.ok){ throw new Error(await res.text()); }
  return res.headers.get("content-type")?.includes("application/json")?res.json():res.text();
}
export const api={
  health:()=>request("/health",{auth:false}),
  login:async (username,password)=>{
    const form=new URLSearchParams(); form.set("username",username); form.set("password",password);
    const res=await fetch(`${API_URL}/auth/login`,{method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded"},body:form.toString()});
    if(!res.ok) throw new Error(await res.text()); return res.json();
  },
  signup:(payload)=>request("/auth/signup",{method:"POST",body:payload,auth:false}),
  owners:{ list:()=>request("/owners"), create:(p)=>request("/owners",{method:"POST",body:p}) },
  pets:{ list:()=>request("/pets"), create:(p)=>request("/pets",{method:"POST",body:p}) },
  appointments:{ list:()=>request("/appointments"), create:(p)=>request("/appointments",{method:"POST",body:p}) },
  consultations:{ list:()=>request("/consultations"), create:(p)=>request("/consultations",{method:"POST",body:p}) },
  invoices:{ list:()=>request("/invoices"), create:(p)=>request("/invoices",{method:"POST",body:p}) },
};
export function setToken(t){ localStorage.setItem("token",t); }
export function clearToken(){ localStorage.removeItem("token"); }
