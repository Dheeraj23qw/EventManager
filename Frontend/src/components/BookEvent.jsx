import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  Ticket, 
  ArrowLeft, 
  CreditCard, 
  Smartphone, 
  Globe, 
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import axios from 'axios';
import { useAuth } from '../context/AuthProvider';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';

function BookEvent() {
  const location = useLocation();
  const navigate = useNavigate();
  const [authUser] = useAuth(); 
  
  const stripe = useStripe();
  const elements = useElements();

  const [selectedMethod, setSelectedMethod] = useState('upi');
  const [isProcessing, setIsProcessing] = useState(false);

  // Safely grab event data
  const { event } = location.state || { 
    event: { heading: "Event", price: 0, _id: null } 
  };

  const userId = authUser?._id;

  // Handle Redirection if data is missing
  useEffect(() => {
    if (!event._id && !event.id) {
      navigate('/browse-events');
    }
  }, [event, navigate]);

  const handlePayment = async (e) => {
    if (e) e.preventDefault();
    if (!stripe || !elements) return;

    setIsProcessing(true);

    try {
      const response = await axios.post('http://localhost:4001/payment/create-intent', {
        amount: event.price,
        eventId: event._id || event.id,
        userId: userId,
        paymentMethodType: selectedMethod
      });

      if (response.data.success) {
        const { clientSecret } = response.data;

        if (selectedMethod === 'card') {
          const cardElement = elements.getElement(CardElement);
          const result = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
              card: cardElement,
              billing_details: { name: authUser?.username || 'Customer' },
            },
          });

          if (result.error) {
            console.error(result.error.message);
            navigate(`/payment-status/cancel`);
          } else if (result.paymentIntent.status === 'succeeded') {
            navigate(`/payment-status/success`);
          }
        } else {
          // Simulation for UPI/Netbanking
          navigate(`/payment-status/success`); 
        }
      }
    } catch (error) {
      console.error("Payment Error:", error);
      navigate(`/payment-status/cancel`);
    } finally {
      setIsProcessing(false);
    }
  };

  const paymentMethods = [
    { id: 'upi', name: 'UPI / Google Pay', icon: <Smartphone className="text-emerald-400" />, desc: 'Instant transfer via VPA' },
    { id: 'card', name: 'Credit / Debit Card', icon: <CreditCard className="text-sky-400" />, desc: 'Visa, Mastercard, RuPay' },
    { id: 'netbanking', name: 'Net Banking', icon: <Globe className="text-orange-400" />, desc: 'All major Indian banks' },
  ];

  if (!event._id && !event.id) return null;

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 pt-28 pb-12 px-6">
      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
        
        {/* LEFT: Summary */}
        <div className="space-y-6">
          <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-slate-500 hover:text-white text-sm font-bold">
            <ArrowLeft size={16} /> Back
          </button>
          <div className="bg-[#0f172a]/40 border border-slate-800 rounded-[2.5rem] p-8 shadow-2xl">
            <h2 className="text-3xl font-black text-white mb-6">Order <span className="text-sky-400">Summary</span></h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center bg-slate-950/50 p-4 rounded-2xl border border-slate-800/50">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-sky-500/10 rounded-lg text-sky-500"><Ticket size={20} /></div>
                  <span className="font-bold text-sm">{event.heading || event.title}</span>
                </div>
                <span className="text-white font-bold text-sm">₹{event.price}</span>
              </div>
              <div className="pt-4 border-t border-slate-800 flex justify-between items-center">
                <span className="text-lg font-bold">Total</span>
                <span className="text-2xl font-black text-sky-400">₹{event.price}</span>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT: Payment Options */}
        <div className="bg-[#0f172a]/60 border border-slate-800 rounded-[2.5rem] p-8 shadow-2xl">
          <h3 className="text-xl font-bold text-white mb-8">Select Payment Method</h3>
          
          <div className="space-y-4">
            {paymentMethods.map((method) => (
              <div key={method.id} className="space-y-3">
                <div 
                  onClick={() => setSelectedMethod(method.id)}
                  className={`cursor-pointer p-5 rounded-3xl border-2 flex items-center gap-4 transition-all ${
                    selectedMethod === method.id ? 'border-sky-500 bg-sky-500/5' : 'border-slate-800 bg-slate-900/30'
                  }`}
                >
                  <div className={`p-3 rounded-2xl ${selectedMethod === method.id ? 'bg-sky-500/10' : 'bg-slate-800'}`}>
                    {method.icon}
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-sm">{method.name}</p>
                    <p className="text-[10px] text-slate-500 font-medium tracking-wider">{method.desc}</p>
                  </div>
                  {selectedMethod === method.id && <CheckCircle2 size={20} className="text-sky-500" />}
                </div>

                {/* THIS IS THE CARD INPUT FIELD */}
                {method.id === 'card' && selectedMethod === 'card' && (
                  <div className="p-5 bg-slate-950 border border-slate-700 rounded-2xl animate-in fade-in slide-in-from-top-2">
                    <label className="text-[10px] text-slate-500 font-bold uppercase mb-3 block">Card Details</label>
                    <CardElement 
                      options={{
                        style: {
                          base: {
                            fontSize: '16px',
                            color: '#ffffff',
                            '::placeholder': { color: '#64748b' },
                          },
                          invalid: { color: '#ef4444' },
                        },
                      }}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>

          <button
            onClick={handlePayment}
            disabled={isProcessing || !stripe}
            className="w-full mt-10 bg-sky-500 hover:bg-sky-400 text-white py-5 rounded-2xl font-black text-lg transition-all flex items-center justify-center gap-3 disabled:opacity-50"
          >
            {isProcessing ? <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : `Pay ₹${event.price}`}
          </button>
        </div>
      </div>
    </div>
  );
}

export default BookEvent;