import React from "react";

function Footer() {
  return (
    <footer className="bg-[#020617] border-t border-blue-900/20">
      <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row justify-between items-start md:items-center gap-10">

        {/* LEFT SECTION */}
        <div className="space-y-3">
          <h3 className="text-2xl font-bold text-white tracking-tighter">
            Event<span className="text-sky-400">Manager</span>
          </h3>
          <p className="text-sm text-slate-400 max-w-xs leading-relaxed">
            Crafting the next generation of event management tools with a focus on speed and reliability.
          </p>
        </div>

        {/* CENTER - QUICK LINKS (Added for better UI balance) */}
        <div className="flex gap-8 text-[11px] font-bold uppercase tracking-[0.2em] text-slate-500">
           <a href="#" className="hover:text-sky-400 transition-colors">Privacy</a>
           <a href="#" className="hover:text-sky-400 transition-colors">Terms</a>
           <a href="#" className="hover:text-sky-400 transition-colors">Support</a>
        </div>

        {/* RIGHT - SOCIAL ICONS */}
        <div className="flex items-center gap-3">
          
          {/* Twitter/X */}
          <a
            href="#"
            className="w-11 h-11 flex items-center justify-center rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-sky-500/50 hover:bg-slate-800 transition-all group"
          >
            <svg
              viewBox="0 0 24 24"
              className="w-5 h-5 fill-slate-400 group-hover:fill-sky-400 transition-colors"
            >
              <path d="M24 4.557a9.93 9.93 0 01-2.828.775 4.93 4.93 0 002.165-2.724 9.864 9.864 0 01-3.127 1.195 4.916 4.916 0 00-8.384 4.482A13.94 13.94 0 011.671 3.149a4.917 4.917 0 001.523 6.573 4.9 4.9 0 01-2.229-.616v.06a4.918 4.918 0 003.946 4.827 4.902 4.902 0 01-2.224.085 4.918 4.918 0 004.588 3.417A9.867 9.867 0 010 19.54a13.94 13.94 0 007.548 2.212c9.057 0 14.01-7.496 14.01-13.986 0-.21 0-.423-.015-.634A10.012 10.012 0 0024 4.557z" />
            </svg>
          </a>

          {/* YouTube */}
          <a
            href="#"
            className="w-11 h-11 flex items-center justify-center rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-sky-500/50 hover:bg-slate-800 transition-all group"
          >
            <svg
              viewBox="0 0 24 24"
              className="w-5 h-5 fill-slate-400 group-hover:fill-sky-400 transition-colors"
            >
              <path d="M23.498 6.186a2.955 2.955 0 00-2.08-2.087C19.505 3.5 12 3.5 12 3.5s-7.505 0-9.418.599A2.955 2.955 0 00.502 6.186 30.3 30.3 0 000 12a30.3 30.3 0 00.502 5.814 2.955 2.955 0 002.08 2.087C4.495 20.5 12 20.5 12 20.5s7.505 0 9.418-.599a2.955 2.955 0 002.08-2.087A30.3 30.3 0 0024 12a30.3 30.3 0 00-.502-5.814zM9.75 15.568V8.432L15.818 12 9.75 15.568z" />
            </svg>
          </a>

          {/* Facebook */}
          <a
            href="#"
            className="w-11 h-11 flex items-center justify-center rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-sky-500/50 hover:bg-slate-800 transition-all group"
          >
            <svg
              viewBox="0 0 24 24"
              className="w-5 h-5 fill-slate-400 group-hover:fill-sky-400 transition-colors"
            >
              <path d="M22.675 0h-21.35C.597 0 0 .597 0 1.326v21.348C0 23.403.597 24 1.326 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.894-4.788 4.659-4.788 1.325 0 2.464.099 2.795.143v3.24l-1.918.001c-1.504 0-1.796.715-1.796 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116C23.403 24 24 23.403 24 22.674V1.326C24 .597 23.403 0 22.675 0z" />
            </svg>
          </a>
        </div>
      </div>

      {/* BOTTOM STRIP */}
      <div className="border-t border-slate-900 bg-slate-950/50 py-6 text-center text-[12px] font-medium text-slate-600 tracking-wide">
        © {new Date().getFullYear()} <span className="text-slate-500">EventManager Studio.</span> Built for the modern web.
      </div>
    </footer>
  );
}

export default Footer;