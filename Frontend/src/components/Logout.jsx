import React from 'react'
import { useAuth } from '../context/AuthProvider'

function Logout() {
  const [authUser,setAuthUser]=useAuth();
const handleLogout=()=>{
  try {
    setAuthUser({
      ...authUser,
      user:null,

    })
    localStorage.removeItem("Users");
    alert("Logout successfully");
    window.location.reload();
  } catch (error) {
    alert("Error:" +error.message);
  }
}

  return (
    <div className='pl-4'>
<button className="px-2 py-1  bg-sky-500 text-white rounded-md cursor-pointer " onClick={handleLogout}>
  Logout
</button>
       </div>
)}

export default Logout