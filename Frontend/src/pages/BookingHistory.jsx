import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ReceiptText, Inbox, ShoppingBag, Loader2, CreditCard, Banknote, Smartphone } from "lucide-react"; // Added icons
import axios from "axios";
import { useAuth } from "../context/AuthProvider";

const BookingHistory = () => {
  const [authUser] = useAuth();
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  // Helper to get Icon and Label for Payment Methods
  const getPaymentMethodDetails = (type) => {
    switch (type?.toLowerCase()) {
      case 'card':
        return { icon: <CreditCard size={14} />, label: "Card" };
      case 'upi':
        return { icon: <Smartphone size={14} />, label: "UPI" };
      case 'netbanking':
        return { icon: <Banknote size={14} />, label: "Net Banking" };
      default:
        return { icon: <Banknote size={14} />, label: type || "Other" };
    }
  };

  useEffect(() => {
    const fetchHistory = async () => {
      if (!authUser?._id) return;
      try {
        setLoading(true);
        const url = `http://localhost:4001/payment/transaction-history/${authUser._id}`;
        const response = await axios.get(url);
        if (response.data.success) {
          setTransactions(response.data.history || []);
        }
      } catch (error) {
        console.error("Fetch Error:", error.response?.data || error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, [authUser?._id]);

  return (
    <div className="min-h-screen bg-[#020617] pt-28 px-4 md:px-6 pb-12 text-white">
      <div className="max-w-6xl mx-auto"> {/* Widened container to fit new column */}
        
        {/* Header */}
        <div className="flex items-center gap-4 mb-10">
          <div className="p-3 bg-sky-500/10 rounded-2xl text-sky-400">
            <ReceiptText size={28} />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Transaction <span className="text-sky-400">History</span></h1>
            <p className="text-slate-400 text-sm mt-1">View your bookings and payment methods.</p>
          </div>
        </div>

        {/* Table Container */}
        <div className="bg-[#0f172a]/40 border border-slate-800/60 rounded-[2rem] overflow-hidden backdrop-blur-md shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-800/50 text-slate-500 text-[10px] uppercase tracking-[0.15em] font-black bg-slate-900/30">
                  <th className="px-8 py-5">Transaction ID</th>
                  <th className="px-8 py-5">Event</th>
                  <th className="px-8 py-5">Method</th> {/* NEW COLUMN */}
                  <th className="px-8 py-5">Date</th>
                  <th className="px-8 py-5">Amount</th>
                  <th className="px-8 py-5 text-center">Status</th>
                </tr>
              </thead>
              
              <tbody className="text-sm">
                {loading ? (
                  <tr><td colSpan="6" className="py-32 text-center"><Loader2 className="animate-spin text-sky-400 mx-auto" size={40} /></td></tr>
                ) : transactions.length > 0 ? (
                  transactions.map((t) => {
                    const method = getPaymentMethodDetails(t.paymentMethodType);
                    return (
                      <tr key={t._id} className="border-b border-slate-800/30 last:border-0 hover:bg-sky-500/[0.03] transition-colors group">
                        <td className="px-8 py-6 font-mono text-sky-400/80 text-[11px]">{t.transactionId}</td>
                        <td className="px-8 py-6 font-semibold text-slate-200">{t.eventId?.heading || "Event Deleted"}</td>
                        
                        {/* PAYMENT METHOD COLUMN */}
                        <td className="px-8 py-6">
                          <div className="flex items-center gap-2 text-slate-400">
                            {method.icon}
                            <span className="text-xs uppercase font-medium tracking-wider">{method.label}</span>
                          </div>
                        </td>

                        <td className="px-8 py-6 text-slate-400 whitespace-nowrap">
                          {new Date(t.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                        </td>
                        <td className="px-8 py-6 font-bold text-white">₹{t.amount.toLocaleString('en-IN')}</td>
                        <td className="px-8 py-6 text-center">
                          <span className={`px-3 py-1 rounded-full text-[10px] font-extrabold border ${
                            t.status === 'completed' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                          }`}>
                            {t.status.toUpperCase()}
                          </span>
                        </td>
                      </tr>
                    )
                  })
                ) : (
                  /* ... Empty State Code ... */
                  <tr><td colSpan="6" className="py-24 text-center">No Records found</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingHistory;