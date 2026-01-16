import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  Ticket, 
  Calendar, 
  ArrowLeft, 
  CreditCard, 
  Smartphone, 
  Globe, 
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';

function BookEvent() {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Local state for UI interaction
  const [selectedMethod, setSelectedMethod] = useState('upi');
  const [isProcessing, setIsProcessing] = useState(false);

  // Fallback data if no state is passed
  const { event } = location.state || { 
    event: { heading: "Developer Conference 2024", price: 1299, date: new Date(), location: "Patna, India" } 
  };

  const paymentMethods = [
    { id: 'upi', name: 'UPI / Google Pay', icon: <Smartphone className="text-emerald-400" />, desc: 'Instant transfer via VPA' },
    { id: 'card', name: 'Credit / Debit Card', icon: <CreditCard className="text-sky-400" />, desc: 'Visa, Mastercard, RuPay' },
    { id: 'netbanking', name: 'Net Banking', icon: <Globe className="text-orange-400" />, desc: 'All major Indian banks' },
  ];

  const handleFakeSubmit = (e) => {
    e.preventDefault();
    setIsProcessing(true);
    // Simulate a delay for the UI feel
    setTimeout(() => {
      setIsProcessing(false);
      alert(`Demo: Redirecting to ${selectedMethod} gateway...`);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 pt-28 pb-12 px-6">
      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
        
        {/* LEFT: Order Summary */}
        <div className="space-y-6">
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-slate-500 hover:text-white transition-colors text-sm font-bold"
          >
            <ArrowLeft size={16} /> Back
          </button>

          <div className="bg-[#0f172a]/40 border border-slate-800 rounded-[2.5rem] p-8 shadow-2xl relative overflow-hidden">
            <h2 className="text-3xl font-black text-white mb-6">Order <span className="text-sky-400">Summary</span></h2>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center bg-slate-950/50 p-4 rounded-2xl border border-slate-800/50">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-sky-500/10 rounded-lg text-sky-500"><Ticket size={20} /></div>
                  <span className="font-bold text-sm">{event.heading || event.title}</span>
                </div>
                <span className="text-white font-bold text-sm">₹{event.price}</span>
              </div>

              <div className="flex justify-between items-center px-4 py-2 text-slate-400 text-xs">
                <span>Platform Fee</span>
                <span className="text-emerald-500 font-bold">₹0.00</span>
              </div>

              <div className="pt-4 border-t border-slate-800 flex justify-between items-center">
                <span className="text-lg font-bold">Total Amount</span>
                <span className="text-2xl font-black text-sky-400">₹{event.price}</span>
              </div>
            </div>

            <div className="mt-8 flex items-center gap-3 text-xs text-slate-500 bg-slate-900/50 p-4 rounded-xl">
              <ShieldCheck size={18} className="text-emerald-500" />
              Your payment is secured with industry-standard encryption.
            </div>
          </div>
        </div>

        {/* RIGHT: Payment Options UI */}
        <div className="bg-[#0f172a]/60 border border-slate-800 rounded-[2.5rem] p-8 shadow-2xl">
          <h3 className="text-xl font-bold text-white mb-2">Select Payment Method</h3>
          <p className="text-slate-500 text-xs mb-8 font-medium">Choose your preferred way to pay</p>

          <div className="space-y-4">
            {paymentMethods.map((method) => (
              <div 
                key={method.id}
                onClick={() => setSelectedMethod(method.id)}
                className={`relative cursor-pointer transition-all duration-300 p-5 rounded-3xl border-2 flex items-center gap-4 ${
                  selectedMethod === method.id 
                  ? 'border-sky-500 bg-sky-500/5 shadow-[0_0_20px_rgba(14,165,233,0.1)]' 
                  : 'border-slate-800 bg-slate-900/30 hover:border-slate-700'
                }`}
              >
                <div className={`p-3 rounded-2xl ${selectedMethod === method.id ? 'bg-sky-500/10' : 'bg-slate-800'}`}>
                  {method.icon}
                </div>
                
                <div className="flex-1">
                  <p className={`font-bold text-sm ${selectedMethod === method.id ? 'text-white' : 'text-slate-300'}`}>
                    {method.name}
                  </p>
                  <p className="text-[10px] text-slate-500 font-medium uppercase tracking-wider">
                    {method.desc}
                  </p>
                </div>

                {selectedMethod === method.id && (
                  <CheckCircle2 size={20} className="text-sky-500" />
                )}
              </div>
            ))}
          </div>

          <button
            onClick={handleFakeSubmit}
            disabled={isProcessing}
            className="w-full mt-10 bg-sky-500 hover:bg-sky-400 text-white py-5 rounded-2xl font-black text-lg transition-all shadow-lg shadow-sky-500/20 active:scale-95 flex items-center justify-center gap-3"
          >
            {isProcessing ? (
              <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              `Pay ₹${event.price}`
            )}
          </button>
          
          <p className="text-center text-[10px] text-slate-600 mt-4 font-bold uppercase tracking-widest">
            Secured by Global Standards
          </p>
        </div>

      </div>
    </div>
  );
}

export default BookEvent;