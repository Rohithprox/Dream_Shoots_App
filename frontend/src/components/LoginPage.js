import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Lock, User, AlertCircle } from 'lucide-react';

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();

        // Credentials from environment variables
        const adminUser = process.env.REACT_APP_ADMIN_USERNAME || 'admin';
        const adminPass = process.env.REACT_APP_ADMIN_PASSWORD || 'password';
        const adminToken = process.env.REACT_APP_ADMIN_TOKEN || 'ds-secret-token';

        if (username === adminUser && password === adminPass) {
            localStorage.setItem('ds_admin_auth', 'true');
            localStorage.setItem('ds_admin_token', adminToken);
            navigate('/admin');
        } else {
            setError('Invalid username or password');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a] px-4 font-sans">
            <div className="w-full max-w-md">
                {/* Logo/Brand */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[var(--ds-red)]/10 border border-[var(--ds-red)]/20 mb-4">
                        <Shield className="text-[var(--ds-red)]" size={32} />
                    </div>
                    <h1 className="text-2xl font-bold text-white tracking-tight">Admin Login</h1>
                    <p className="text-gray-500 text-sm mt-1">Authorized Access Only</p>
                </div>

                {/* Login Card */}
                <div className="bg-[#111] border border-[#222] rounded-2xl p-8 shadow-2xl">
                    <form onSubmit={handleLogin} className="space-y-6">
                        {error && (
                            <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 flex items-center gap-3 text-red-400 text-sm">
                                <AlertCircle size={18} />
                                {error}
                            </div>
                        )}

                        <div className="space-y-2">
                            <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Username</label>
                            <div className="relative">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" size={18} />
                                <input
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="w-full bg-[#1a1a1a] border border-[#222] rounded-xl py-3.5 pl-12 pr-4 text-white focus:outline-none focus:border-[var(--ds-red)]/50 transition-colors"
                                    placeholder="Enter username"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Password</label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" size={18} />
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full bg-[#1a1a1a] border border-[#222] rounded-xl py-3.5 pl-12 pr-4 text-white focus:outline-none focus:border-[var(--ds-red)]/50 transition-colors"
                                    placeholder="••••••••"
                                    required
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-[var(--ds-red)] hover:bg-[var(--ds-red-dark)] text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-red-600/10 active:scale-[0.98]"
                        >
                            Sign In
                        </button>
                    </form>
                </div>

                <div className="text-center mt-8">
                    <button
                        onClick={() => navigate('/')}
                        className="text-gray-600 hover:text-gray-400 text-xs transition-colors"
                    >
                        &lsaquo; Back to Homepage
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
