import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Login from './Login'
import { useForm } from 'react-hook-form';
import axios from 'axios';

function SignUp() {
const location=useLocation();
const navigate=useNavigate();
const from=location.state?.from?.pathname || "/";
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Function to handle form submission
  const onSubmit =async (data) => {
    const userInfo={
      fullname:data.fullname,
      email:data.email,
      password:data.password,
    }
    //axios use to call api
    await axios.post("http://localhost:4001/user/signup",userInfo)
    .then((res)=>{ //on success it will work
      console.log(res.data)
      if(res.data){
        alert("Signup successfull")
        navigate(from,{replace:true});
      }
      localStorage.setItem("Users",JSON.stringify(res.data.user));
    }).catch((err)=>{ //on fail this will work
     if(err.response){
      console.log(err);
      alert("error :"+err.response.data.message);
     }
    });
  };

  return (
 <>
 <div className=" flex h-screen items-center justify-center ">
 <div  className="w-[600px]">
  <div className="modal-box">
    <form onSubmit={handleSubmit(onSubmit)} method="dialog">
      {/* if there is a button in form, it will close the modal */}
      <Link to="/" className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</Link>
   
    <h3 className="font-bold text-lg">SignUp</h3>

    <div className="mt-4 space-y-2">
    <span>Name</span><br/>
    <input type="text" placeholder="enter your name" className="w-80 px-3 py-1 border rounded outline-none" 
     {...register('fullname', { required: true })}/>
      <br/>
      {errors.fullname && <span className="text-sm text-red-500">This field is required</span>}
   </div>

   <div className="mt-4 space-y-2">
    <span>Email</span><br/>
    <input type="email" placeholder="enter your email" className="w-80 px-3 py-1 border rounded outline-none"
     {...register('email', { required: true })} />
      <br/>
      {errors.email && <span className="text-sm text-red-500">This field is required</span>}
   </div>

   <div className="mt-4 space-y-2">
    <span>Password</span><br/>
    <input type="password" placeholder="enter your password" className="w-80 px-3 py-1 border rounded outline-none" 
     {...register('password', { required: true })}/>
      <br/>
      {errors.password && <span className="text-sm text-red-500">This field is required</span>}
   </div>
<div className="flex justify-around mt-4">
    <button className="bg-pink-500 text-white rounded-md px-3 py-1">SignUp</button>
<p>Have Account? {" "}
    <button
      className=" underline text-blue-500 cursor-pointer" 
     onClick={()=>document.getElementById("my_modal_3").showModal()}>
      Login</button>
      <Login />
      </p>

</div>
</form>
  </div>
</div>
 </div>
 </>
  )
}

export default SignUp