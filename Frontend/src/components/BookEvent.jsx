import React, { useState } from 'react';

function BookEvent() {
  const [formData, setFormData] = useState({
    eventName: '',
    eventDate: '',
    paymentMethod: ''
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });

  const handleChange = (e) => {
    const { name, value, id, type } = e.target;
    setFormData({ 
      ...formData, 
      [type === 'radio' ? 'paymentMethod' : name]: type === 'radio' ? id : value 
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ text: '', type: '' });
    
    try {
      const response = await fetch('http://localhost:4000/api/events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage({ text: data.message, type: 'success' });
      } else {
        setMessage({ text: data.message, type: 'error' });
      }
    } catch (error) {
      setMessage({ text: "Server is offline.", type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-slate-950 text-slate-200">
      <form 
        onSubmit={handleSubmit} 
        className="bg-slate-900 shadow-2xl rounded-2xl p-8 max-w-lg w-full border border-slate-800"
      >
        <h2 className="text-2xl font-bold mb-1 text-center text-white">Event Registration</h2>
        <p className="text-center text-slate-400 mb-8 text-sm">Fill in the details to reserve your spot.</p>

        {/* Status Message */}
        {message.text && (
          <div className={`mb-6 p-3 rounded-lg text-center text-sm border ${
            message.type === 'success' 
              ? 'bg-blue-500/10 border-blue-500/50 text-blue-400' 
              : 'bg-red-500/10 border-red-500/50 text-red-400'
          }`}>
            {message.text}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col">
            <label htmlFor="eventName" className="text-slate-400 font-medium mb-2 text-xs uppercase tracking-wider">Event Name</label>
            <input
              name="eventName"
              id="eventName"
              type="text"
              onChange={handleChange}
              placeholder="Developer Meetup"
              className="bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
              required
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="eventDate" className="text-slate-400 font-medium mb-2 text-xs uppercase tracking-wider">Event Date</label>
            <input
              name="eventDate"
              id="eventDate"
              type="date"
              onChange={handleChange}
              className="bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500 transition-all [color-scheme:dark]"
              required
            />
          </div>
        </div>

        <div className="mt-8">
          <label className="text-slate-400 font-medium mb-4 block text-xs uppercase tracking-wider">Payment Method</label>
          <div className="space-y-3">
            {['credit-card', 'paypal', 'bank-transfer'].map((method) => (
              <label 
                key={method} 
                className="flex items-center gap-3 p-4 bg-slate-800/50 border border-slate-700 rounded-xl cursor-pointer hover:bg-slate-800 hover:border-slate-600 transition-all group"
              >
                <input 
                  type="radio" 
                  id={method} 
                  name="payment" 
                  onChange={handleChange}
                  className="w-4 h-4 text-blue-500 bg-slate-700 border-slate-600 focus:ring-blue-500 focus:ring-offset-slate-900" 
                  required
                />
                <span className="text-slate-300 capitalize text-sm font-medium group-hover:text-white">
                  {method.replace('-', ' ')}
                </span>
              </label>
            ))}
          </div>
        </div>

        <div className="mt-10">
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3.5 rounded-xl font-bold text-white transition-all shadow-lg ${
                loading 
                ? 'bg-slate-700 cursor-not-allowed' 
                : 'bg-blue-600 hover:bg-blue-500 hover:shadow-blue-900/20 active:scale-[0.98]'
            }`}
          >
            {loading ? 'Processing...' : 'Confirm Registration'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default BookEvent;