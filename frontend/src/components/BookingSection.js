import React, { useState } from 'react';
import { Zap, Calendar, Clock, MapPin, FileText, User, Phone, CheckCircle } from 'lucide-react';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const BookingSection = () => {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    preferred_date: '',
    preferred_time: '',
    event_type: '',
    important_info: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);
    try {
      await axios.post(`${API}/bookings`, form);
      setSuccess(true);
      setForm({ name: '', phone: '', preferred_date: '', preferred_time: '', event_type: '', important_info: '' });
    } catch (err) {
      setError('Something went wrong. Please try again.');
    }
    setLoading(false);
  };

  return (
    <section id="contact" data-testid="booking-section" className="py-20 px-4 border-t border-[var(--ds-border)]">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-4">
          <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-[var(--ds-red)] text-[var(--ds-red)] text-xs font-bold tracking-widest uppercase">
            <Zap size={14} fill="currentColor" /> Book Your Slot Now
          </span>
        </div>
        <h2 className="text-center text-4xl md:text-5xl font-extrabold mb-3 tracking-tight">
          Let's Make It <span className="text-[var(--ds-red)] italic">Happen!</span>
        </h2>
        <p className="text-center text-gray-500 mb-10 text-sm">
          Fill in the details and secure your shoot slot. Our team will reach out to confirm!
        </p>

        {success ? (
          <div data-testid="booking-success" className="bg-[var(--ds-card)] border border-[var(--ds-border)] rounded-xl p-10 text-center">
            <div className="w-16 h-16 rounded-full bg-green-600/20 flex items-center justify-center mx-auto mb-4">
              <CheckCircle size={32} className="text-green-400" />
            </div>
            <h3 className="text-white font-bold text-2xl mb-2">Booking Confirmed!</h3>
            <p className="text-gray-400 text-sm mb-6">
              Our team will reach out to you shortly to confirm the details.
            </p>
            <button
              data-testid="book-another-btn"
              onClick={() => setSuccess(false)}
              className="btn-outline-red"
            >
              Book Another Shoot
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} data-testid="booking-form" className="bg-[var(--ds-card)] border border-[var(--ds-border)] rounded-xl p-8 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="ds-label"><User size={14} className="text-[var(--ds-red)]" /> Your Name *</label>
                <input data-testid="booking-name-input" type="text" name="name" value={form.name} onChange={handleChange} placeholder="John Doe" required className="ds-input" />
              </div>
              <div>
                <label className="ds-label"><Phone size={14} className="text-[var(--ds-red)]" /> Phone Number *</label>
                <input data-testid="booking-phone-input" type="tel" name="phone" value={form.phone} onChange={handleChange} placeholder="+91 98765 43210" required className="ds-input" />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="ds-label"><Calendar size={14} className="text-[var(--ds-red)]" /> Preferred Date *</label>
                <input data-testid="booking-date-input" type="date" name="preferred_date" value={form.preferred_date} onChange={handleChange} required className="ds-input" />
              </div>
              <div>
                <label className="ds-label"><Clock size={14} className="text-[var(--ds-red)]" /> Preferred Time *</label>
                <input data-testid="booking-time-input" type="time" name="preferred_time" value={form.preferred_time} onChange={handleChange} required className="ds-input" />
              </div>
            </div>
            <div>
              <label className="ds-label"><MapPin size={14} className="text-[var(--ds-red)]" /> Event Type *</label>
              <input data-testid="booking-event-type-input" type="text" name="event_type" value={form.event_type} onChange={handleChange} placeholder="Wedding, Corporate Event, Product Launch, etc." required className="ds-input" />
            </div>
            <div>
              <label className="ds-label"><FileText size={14} className="text-[var(--ds-red)]" /> Any Important Information</label>
              <textarea data-testid="booking-info-textarea" name="important_info" value={form.important_info} onChange={handleChange} placeholder="Location, special requests, preferred package, etc." rows={3} className="ds-input resize-none" />
            </div>
            {error && <p data-testid="booking-error" className="text-red-500 text-sm">{error}</p>}
            <button data-testid="confirm-booking-btn" type="submit" disabled={loading} className="btn-red w-full justify-center text-sm py-4 rounded-lg">
              <Zap size={16} fill="white" />
              {loading ? 'SUBMITTING...' : 'CONFIRM BOOKING'}
            </button>
          </form>
        )}

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
          {[
            { value: '10min', label: 'Response Time' },
            { value: '100%', label: 'Satisfaction' },
            { value: '24/7', label: 'Support' },
            { value: '1000+', label: 'Happy Clients' },
          ].map((s, i) => (
            <div key={i} data-testid={`stat-${i}`} className="stat-card">
              <div className="text-[var(--ds-red)] text-2xl font-extrabold italic">{s.value}</div>
              <div className="text-gray-500 text-xs mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BookingSection;
