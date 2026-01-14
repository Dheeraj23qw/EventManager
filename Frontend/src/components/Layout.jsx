import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

function Layout() {
  return (
    /* Changed bg-neutral-950 to the Midnight color #020617 */
    <div className="min-h-screen flex flex-col bg-[#020617] text-slate-100">
      
      {/* Fixed Navbar sits on top */}
      <Navbar />

      {/* pt-20: Adds padding at the top so content starts below the Navbar.
        bg-[#020617]: Ensures the background matches the theme perfectly.
      */}
      <main className="flex-grow bg-[#020617] pt-20 lg:pt-24">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}

export default Layout;