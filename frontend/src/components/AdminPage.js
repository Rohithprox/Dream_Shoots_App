import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Check, X, Clock, Trash2, RefreshCw, Download, Filter, CheckCircle, Film, Plus, ExternalLink } from 'lucide-react';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const getAuthHeader = () => ({
  headers: { 'X-Admin-Token': localStorage.getItem('ds_admin_token') }
});

const statusColors = {
  pending: 'bg-yellow-500/15 text-yellow-400 border-yellow-500/30',
  confirmed: 'bg-green-500/15 text-green-400 border-green-500/30',
  completed: 'bg-blue-500/15 text-blue-400 border-blue-500/30',
};

const AdminPage = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('');
  const [activeTab, setActiveTab] = useState('bookings');
  const [reels, setReels] = useState([]);
  const [newReelUrl, setNewReelUrl] = useState('');
  const [isAddingReel, setIsAddingReel] = useState(false);

  const fetchBookings = useCallback(async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API}/bookings`, getAuthHeader());
      setBookings(res.data);
    } catch (err) {
      console.error('Failed to fetch bookings', err);
    }
    setLoading(false);
  }, []);

  const fetchReels = useCallback(async () => {
    try {
      const res = await axios.get(`${API}/reels`);
      setReels(res.data);
    } catch (err) {
      console.error('Failed to fetch reels', err);
    }
  }, []);

  useEffect(() => {
    if (activeTab === 'bookings') fetchBookings();
    else if (activeTab === 'reels') fetchReels();
  }, [activeTab, fetchBookings, fetchReels]);

  const updateStatus = async (id, status) => {
    try {
      await axios.patch(`${API}/bookings/${id}/status`, { status }, getAuthHeader());
      fetchBookings();
    } catch (err) { console.error(err); }
  };

  const deleteBooking = async (id) => {
    if (!window.confirm('Delete this booking?')) return;
    try {
      await axios.delete(`${API}/bookings/${id}`, getAuthHeader());
      fetchBookings();
    } catch (err) { console.error(err); }
  };

  const handleLogout = () => {
    localStorage.removeItem('ds_admin_auth');
    localStorage.removeItem('ds_admin_token');
    window.location.href = '/login';
  };

  const addReel = async (e) => {
    e.preventDefault();
    if (!newReelUrl) return;
    setIsAddingReel(true);
    try {
      await axios.post(`${API}/reels`, { url: newReelUrl }, getAuthHeader());
      setNewReelUrl('');
      fetchReels();
    } catch (err) {
      console.error('Failed to add reel', err);
      alert('Failed to add reel. Make sure you are logged in.');
    } finally {
      setIsAddingReel(false);
    }
  };

  const deleteReel = async (id) => {
    if (!window.confirm('Remove this reel?')) return;
    try {
      await axios.delete(`${API}/reels/${id}`, getAuthHeader());
      fetchReels();
    } catch (err) {
      console.error('Failed to delete reel', err);
    }
  };

  const exportCSV = () => {
    const headers = ['Name', 'Phone', 'Date', 'Time', 'Location', 'Event', 'Package', 'Status', 'Notes', 'Booked On'];
    const rows = bookings.map((b) => [
      b.name, b.phone, b.preferred_date, b.preferred_time, b.location || '-', b.event_type,
      b.selected_package || '-', b.status, b.important_info || '-',
      new Date(b.created_at).toLocaleString(),
    ]);
    const csv = [headers, ...rows].map((r) => r.map((c) => `"${c}"`).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `bookings_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  let filtered = bookings;
  if (statusFilter !== 'all') filtered = filtered.filter((b) => b.status === statusFilter);
  if (dateFilter) filtered = filtered.filter((b) => b.preferred_date === dateFilter);

  const counts = {
    all: bookings.length,
    pending: bookings.filter((b) => b.status === 'pending').length,
    confirmed: bookings.filter((b) => b.status === 'confirmed').length,
    completed: bookings.filter((b) => b.status === 'completed').length,
  };

  return (
    <div className="admin-container" data-testid="admin-dashboard">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-[var(--ds-border)] pb-6">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3 pr-6 border-r border-[var(--ds-border)]">
              <img src="/Dream Shoots Logo.svg" alt="Dream Shoots" className="h-10" />
              <span className="text-gray-500 text-sm font-medium">Admin Panel</span>
            </div>
            <nav className="flex items-center gap-1">
              {[
                { id: 'bookings', label: 'Bookings', icon: Clock },
                { id: 'reels', label: 'Instagram Reels', icon: Film },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === tab.id
                      ? 'bg-[var(--ds-red)]/10 text-[var(--ds-red)]'
                      : 'text-gray-500 hover:text-white hover:bg-[#111]'
                    }`}
                >
                  <tab.icon size={16} />
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleLogout}
              className="px-3 py-2 rounded-lg border border-red-900/30 text-red-500 hover:bg-red-500/10 transition-colors text-xs font-medium mr-2"
            >
              Logout
            </button>
            {activeTab === 'bookings' && (
              <>
                <button data-testid="admin-export-btn" onClick={exportCSV} className="flex items-center gap-2 px-3 py-2 rounded-lg border border-[var(--ds-border)] text-gray-400 hover:text-white hover:border-gray-500 transition-colors text-xs font-medium">
                  <Download size={14} /> Export CSV
                </button>
                <button data-testid="admin-refresh-btn" onClick={fetchBookings} className="p-2 rounded-lg border border-[var(--ds-border)] text-gray-400 hover:text-white hover:border-gray-500 transition-colors">
                  <RefreshCw size={16} />
                </button>
              </>
            )}
            {activeTab === 'reels' && (
              <button onClick={fetchReels} className="p-2 rounded-lg border border-[var(--ds-border)] text-gray-400 hover:text-white hover:border-gray-500 transition-colors">
                <RefreshCw size={16} />
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto">
        {activeTab === 'bookings' ? (
          <>
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
              {[
                { label: 'Total', count: counts.all, color: 'text-white' },
                { label: 'Pending', count: counts.pending, color: 'text-yellow-400' },
                { label: 'Confirmed', count: counts.confirmed, color: 'text-green-400' },
                { label: 'Completed', count: counts.completed, color: 'text-blue-400' },
              ].map((s, i) => (
                <div key={i} data-testid={`admin-stat-${s.label.toLowerCase()}`} className="admin-card text-center py-4">
                  <div className={`text-2xl font-extrabold ${s.color}`}>{s.count}</div>
                  <div className="text-gray-500 text-xs mt-1">{s.label}</div>
                </div>
              ))}
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-2 mb-6 items-center">
              <Filter size={14} className="text-gray-500" />
              <select
                data-testid="admin-status-filter"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="ds-input !w-auto !py-2 !px-3 text-xs"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="confirmed">Confirmed</option>
                <option value="completed">Completed</option>
              </select>
              <input
                data-testid="admin-date-filter"
                type="date"
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className="ds-input !w-auto !py-2 !px-3 text-xs"
              />
              {(statusFilter !== 'all' || dateFilter) && (
                <button
                  data-testid="admin-clear-filters"
                  onClick={() => { setStatusFilter('all'); setDateFilter(''); }}
                  className="text-[var(--ds-red)] text-xs font-medium hover:underline"
                >
                  Clear filters
                </button>
              )}
              <span className="text-gray-600 text-xs ml-auto">{filtered.length} results</span>
            </div>

            {loading ? (
              <div className="text-center py-12 text-gray-500">Loading...</div>
            ) : filtered.length === 0 ? (
              <div data-testid="admin-no-bookings" className="text-center py-16 text-gray-500">
                <p className="text-lg mb-1">No bookings found</p>
                <p className="text-xs">Try adjusting your filters</p>
              </div>
            ) : (
              <>
                {/* Desktop Table */}
                <div className="hidden lg:block overflow-x-auto">
                  <table data-testid="admin-bookings-table" className="w-full">
                    <thead>
                      <tr className="border-b border-[var(--ds-border)]">
                        {['Name', 'Phone', 'Date', 'Time', 'Event', 'Location', 'Status', 'Actions'].map((h) => (
                          <th key={h} className="text-left text-gray-500 text-[10px] uppercase tracking-wider font-bold py-3 px-4">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {filtered.map((b) => (
                        <tr key={b.id} data-testid={`admin-booking-row-${b.id}`} className="border-b border-[var(--ds-border)] hover:bg-[var(--ds-card)] transition-colors">
                          <td className="py-3 px-4">
                            <div className="text-white font-semibold text-sm">{b.name}</div>
                            {b.important_info && <div className="text-gray-600 text-xs mt-0.5 truncate max-w-[150px]">{b.important_info}</div>}
                          </td>
                          <td className="py-3 px-4 text-gray-300 text-sm">{b.phone}</td>
                          <td className="py-3 px-4 text-gray-300 text-sm">{b.preferred_date}</td>
                          <td className="py-3 px-4 text-gray-300 text-sm">{b.preferred_time}</td>
                          <td className="py-3 px-4 text-gray-300 text-sm">{b.event_type}</td>
                          <td className="py-3 px-4 text-gray-300 text-sm">{b.location || '-'}</td>
                          <td className="py-3 px-4">
                            <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold border capitalize ${statusColors[b.status] || statusColors.pending}`}>
                              {b.status}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-1">
                              {b.status === 'pending' && (
                                <button data-testid={`confirm-btn-${b.id}`} onClick={() => updateStatus(b.id, 'confirmed')} className="p-1.5 rounded-lg bg-green-500/10 text-green-400 hover:bg-green-500/20 transition-colors" title="Confirm">
                                  <Check size={14} />
                                </button>
                              )}
                              {b.status === 'confirmed' && (
                                <button data-testid={`complete-btn-${b.id}`} onClick={() => updateStatus(b.id, 'completed')} className="p-1.5 rounded-lg bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 transition-colors" title="Mark Complete">
                                  <CheckCircle size={14} />
                                </button>
                              )}
                              {b.status !== 'pending' && (
                                <button data-testid={`reset-btn-${b.id}`} onClick={() => updateStatus(b.id, 'pending')} className="p-1.5 rounded-lg bg-yellow-500/10 text-yellow-400 hover:bg-yellow-500/20 transition-colors" title="Reset to Pending">
                                  <Clock size={14} />
                                </button>
                              )}
                              <button data-testid={`delete-btn-${b.id}`} onClick={() => deleteBooking(b.id)} className="p-1.5 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors" title="Delete">
                                <Trash2 size={14} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Mobile Cards */}
                <div className="lg:hidden space-y-3">
                  {filtered.map((b) => (
                    <div key={b.id} data-testid={`admin-booking-${b.id}`} className="admin-card">
                      <div className="flex items-start justify-between gap-3 mb-3">
                        <div>
                          <div className="text-white font-semibold text-sm">{b.name}</div>
                          <div className="text-gray-500 text-xs">{b.phone}</div>
                        </div>
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold border capitalize flex-shrink-0 ${statusColors[b.status] || statusColors.pending}`}>
                          {b.status}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-sm mb-3">
                        <div><span className="text-gray-600 text-xs">Date:</span> <span className="text-gray-300">{b.preferred_date}</span></div>
                        <div><span className="text-gray-600 text-xs">Time:</span> <span className="text-gray-300">{b.preferred_time}</span></div>
                        <div><span className="text-gray-600 text-xs">Event:</span> <span className="text-gray-300">{b.event_type}</span></div>
                        <div><span className="text-gray-600 text-xs">Location:</span> <span className="text-gray-300">{b.location || '-'}</span></div>
                      </div>
                      {b.important_info && (
                        <div className="text-gray-500 text-xs mb-3 border-t border-[var(--ds-border)] pt-2">{b.important_info}</div>
                      )}
                      <div className="flex items-center gap-1.5 border-t border-[var(--ds-border)] pt-3">
                        {b.status === 'pending' && (
                          <button onClick={() => updateStatus(b.id, 'confirmed')} className="p-2 rounded-lg bg-green-500/10 text-green-400 hover:bg-green-500/20 transition-colors text-xs flex items-center gap-1">
                            <Check size={12} /> Confirm
                          </button>
                        )}
                        {b.status === 'confirmed' && (
                          <button onClick={() => updateStatus(b.id, 'completed')} className="p-2 rounded-lg bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 transition-colors text-xs flex items-center gap-1">
                            <CheckCircle size={12} /> Complete
                          </button>
                        )}
                        {b.status !== 'pending' && (
                          <button onClick={() => updateStatus(b.id, 'pending')} className="p-2 rounded-lg bg-yellow-500/10 text-yellow-400 hover:bg-yellow-500/20 transition-colors text-xs flex items-center gap-1">
                            <Clock size={12} /> Reset
                          </button>
                        )}
                        <button onClick={() => deleteBooking(b.id)} className="p-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors text-xs flex items-center gap-1 ml-auto">
                          <Trash2 size={12} /> Delete
                        </button>
                      </div>
                      <div className="mt-2 text-gray-700 text-[10px]">Booked: {new Date(b.created_at).toLocaleString()}</div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </>
        ) : (
          <div className="space-y-6">
            <div className="admin-card p-6">
              <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                <Plus size={18} className="text-[var(--ds-red)]" />
                Add New Instagram Reel
              </h3>
              <form onSubmit={addReel} className="flex gap-3">
                <input
                  type="url"
                  value={newReelUrl}
                  onChange={(e) => setNewReelUrl(e.target.value)}
                  placeholder="Paste Instagram Reel URL here..."
                  className="ds-input flex-1"
                  required
                />
                <button
                  type="submit"
                  disabled={isAddingReel}
                  className="bg-[var(--ds-red)] hover:bg-[var(--ds-red-dark)] disabled:opacity-50 text-white px-6 py-2 rounded-xl font-bold transition-all flex items-center gap-2"
                >
                  {isAddingReel ? 'Adding...' : 'Add Reel'}
                </button>
              </form>
              <p className="text-gray-500 text-[10px] mt-3 italic">
                Example: https://www.instagram.com/reels/C42bX9vS_9p/
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {reels.map((reel) => (
                <div key={reel.id} className="admin-card overflow-hidden group">
                  <div className="aspect-[9/16] bg-[#050505] relative flex items-center justify-center">
                    <Film size={48} className="text-gray-900 group-hover:text-[var(--ds-red)]/20 transition-colors" />
                    <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black to-transparent">
                      <div className="flex items-center justify-between gap-2">
                        <a
                          href={reel.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-400 hover:text-white transition-colors flex items-center gap-1.5 text-xs truncate"
                        >
                          <ExternalLink size={12} />
                          View on Instagram
                        </a>
                        <button
                          onClick={() => deleteReel(reel.id)}
                          className="p-1.5 rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500 transition-colors active:scale-90"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPage;
