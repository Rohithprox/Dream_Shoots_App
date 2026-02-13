import React, { useState } from 'react';
import { Lock, User, Eye, EyeOff } from 'lucide-react';

const AdminLogin = ({ onLogin }) => {
    const [credentials, setCredentials] = useState({ username: '', password: '' });
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        // Get credentials from environment variables or use defaults
        const ADMIN_USERNAME = process.env.REACT_APP_ADMIN_USERNAME || 'admin';
        const ADMIN_PASSWORD = process.env.REACT_APP_ADMIN_PASSWORD || 'admin123';

        // Simple authentication check
        if (credentials.username === ADMIN_USERNAME && credentials.password === ADMIN_PASSWORD) {
            // Store authentication token in sessionStorage
            sessionStorage.setItem('adminAuth', 'true');
            onLogin();
        } else {
            setError('Invalid username or password');
        }
        setLoading(false);
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4" style={{ background: 'var(--ds-bg)' }}>
            <div className="max-w-md w-full">
                {/* Logo */}
                <div className="text-center mb-8">
                    <img src="/dreamshoots-logo.png" alt="Dream Shoots" className="h-16 mx-auto mb-4" />
                    <h2 className="text-2xl font-bold text-white mb-2">Admin Login</h2>
                    <p className="text-gray-500 text-sm">Enter your credentials to access the admin panel</p>
                </div>

                {/* Login Form */}
                <form onSubmit={handleSubmit} className="bg-[var(--ds-card)] border border-[var(--ds-border)] rounded-xl p-8 space-y-6">
                    <div>
                        <label className="ds-label">
                            <User size={14} className="text-[var(--ds-red)]" /> Username
                        </label>
                        <input
                            type="text"
                            value={credentials.username}
                            onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                            placeholder="Enter username"
                            required
                            className="ds-input"
                            autoComplete="username"
                        />
                    </div>

                    <div>
                        <label className="ds-label">
                            <Lock size={14} className="text-[var(--ds-red)]" /> Password
                        </label>
                        <div className="relative">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                value={credentials.password}
                                onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                                placeholder="Enter password"
                                required
                                className="ds-input pr-10"
                                autoComplete="current-password"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
                            >
                                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                            </button>
                        </div>
                    </div>

                    {error && (
                        <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 text-red-400 text-sm">
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="btn-red w-full justify-center text-sm py-4 rounded-lg"
                    >
                        <Lock size={16} />
                        {loading ? 'LOGGING IN...' : 'LOGIN'}
                    </button>
                </form>

                <p className="text-center text-gray-600 text-xs mt-6">
                    Protected admin area. Unauthorized access is prohibited.
                </p>
            </div>
        </div>
    );
};

export default AdminLogin;
