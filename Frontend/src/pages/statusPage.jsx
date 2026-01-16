import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  CheckCircle2, 
  XCircle, 
  ArrowRight, 
  History, 
  Ticket, 
  Home 
} from 'lucide-react';

function StatusPage() {
  const { status } = useParams(); // 'success' or 'cancel'
  const navigate = useNavigate();
  const [isSuccess, setIsSuccess] = useState(status === 'success');

  useEffect(() => {
    setIsSuccess(status === 'success');
  }, [status]);

  return (
    <div className="min-h-screen bg-[#020617] flex items-center justify-center px-6">
      {/* Background Glow Effect */}
      <div className={`absolute w-96 h-96 rounded-full blur-[120px] opacity-20 transition-colors duration-700 ${
        isSuccess ? 'bg-emerald-500' : 'bg-red-500'
      }`} />

      <div className="max-w-md w-full bg-[#0f172a]/60 border border-white/10 backdrop-blur-xl rounded-[3rem] p-10 text-center relative z-10 shadow-2xl">
        
        {/* ICON SECTION */}
        <div className="mb-8 flex justify-center">
          {isSuccess ? (
            <div className="relative">
              <div className="absolute inset-0 bg-emerald-500 blur-2xl opacity-20 animate-pulse" />
              <CheckCircle2 size={100} className="text-emerald-500 relative" />
            </div>
          ) : (
            <div className="relative">
              <div className="absolute inset-0 bg-red-500 blur-2xl opacity-20 animate-pulse" />
              <XCircle size={100} className="text-red-500 relative" />
            </div>
          )}
        </div>

        {/* TEXT SECTION */}
        <h1 className="text-4xl font-black text-white mb-4">
          {isSuccess ? 'Payment Success!' : 'Payment Cancelled'}
        </h1>
        <p className="text-slate-400 leading-relaxed mb-10">
          {isSuccess 
            ? "Your spot has been reserved. We've sent the booking details and the QR ticket to your registered email."
            : "The transaction was not completed. If money was deducted, it will be refunded within 3-5 business days."}
        </p>

        {/* BUTTONS SECTION */}
        <div className="space-y-4">
          {isSuccess ? (
            <Link 
              to="/joined-events" 
              className="w-full bg-sky-500 hover:bg-sky-400 text-white py-4 rounded-2xl font-black flex items-center justify-center gap-2 transition-all shadow-lg shadow-sky-500/20"
            >
              <Ticket size={18} /> View Booked Tickets <ArrowRight size={18} />
            </Link>
          ) : (
            <Link 
              to="/joined-events" 
              className="w-full bg-slate-800 hover:bg-slate-700 text-white py-4 rounded-2xl font-black flex items-center justify-center gap-2 transition-all"
            >
              <History size={18} /> View Booking History
            </Link>
          )}

          <Link 
            to="/" 
            className="w-full flex items-center justify-center gap-2 text-slate-500 hover:text-white font-bold py-2 transition-colors"
          >
            <Home size={16} /> Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default StatusPage;