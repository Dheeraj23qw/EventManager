import React from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useAuth } from "../context/AuthProvider";
import { Mail, Lock, LogIn, X } from "lucide-react";

function Login() {
  const [authUser, setAuthUser] = useAuth(); // Use context to update UI instantly

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const userInfo = {
      email: data.email,
      password: data.password,
    };

    try {
      const res = await axios.post("http://localhost:4001/user/login", userInfo);
      if (res.data) {
        alert("🎉 Welcome back!");
        
        // Save to localStorage
        localStorage.setItem("Users", JSON.stringify(res.data.user));
        
        // Update Auth Context (Instantly updates Navbar/Cards)
        setAuthUser(res.data.user);
        
        // Close modal
        document.getElementById("my_modal_3").close();
      }
    } catch (err) {
      if (err.response) {
        alert("Error: " + err.response.data.message);
      }
    }
  };

  return (
    <div>
      <dialog id="my_modal_3" className="modal backdrop-blur-md">
        <div className="modal-box bg-[#0f172a] border border-slate-800 rounded-[2.5rem] p-10 shadow-2xl relative overflow-hidden">
          
          {/* Decorative Glow inside modal */}
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-sky-500/10 blur-[50px] rounded-full pointer-events-none"></div>

          <form onSubmit={handleSubmit(onSubmit)} method="dialog">
            {/* Close Button */}
            <button
              type="button"
              className="absolute right-6 top-6 text-slate-500 hover:text-white transition-colors"
              onClick={() => document.getElementById("my_modal_3").close()}
            >
              <X size={20} />
            </button>

            <div className="mb-8">
              <h3 className="text-2xl font-black text-white tracking-tight">
                Welcome <span className="text-sky-400">Back</span>
              </h3>
              <p className="text-slate-400 text-sm mt-1">Please enter your details to sign in.</p>
            </div>

            {/* Email Input */}
            <div className="space-y-2 mb-5">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] ml-1">Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full bg-slate-900/50 border border-slate-800 rounded-2xl py-3.5 pl-12 pr-4 text-white focus:border-sky-500 outline-none transition-all placeholder:text-slate-700"
                  {...register("email", { required: true })}
                />
              </div>
              {errors.email && <span className="text-xs text-red-500 ml-1">This field is required</span>}
            </div>

            {/* Password Input */}
            <div className="space-y-2 mb-8">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] ml-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                <input
                  type="password"
                  placeholder="Enter your password"
                  className="w-full bg-slate-900/50 border border-slate-800 rounded-2xl py-3.5 pl-12 pr-4 text-white focus:border-sky-500 outline-none transition-all placeholder:text-slate-700"
                  {...register("password", { required: true })}
                />
              </div>
              {errors.password && <span className="text-xs text-red-500 ml-1">This field is required</span>}
            </div>

            {/* Login Button */}
            <button className="w-full bg-sky-500 hover:bg-sky-400 text-white font-bold py-4 rounded-2xl transition-all shadow-lg shadow-sky-500/20 active:scale-[0.98] flex items-center justify-center gap-2 mb-6">
              <LogIn size={20} />
              Sign In
            </button>

            {/* Footer */}
            <div className="text-center">
              <p className="text-slate-400 text-sm">
                New here?{" "}
                <Link
                  to="/signup"
                  className="text-sky-400 font-bold hover:underline ml-1"
                  onClick={() => document.getElementById("my_modal_3").close()}
                >
                  Create an account
                </Link>
              </p>
            </div>
          </form>
        </div>
        
        {/* Click outside to close */}
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
}

export default Login;