import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Film, Instagram, ExternalLink } from 'lucide-react';

const BACKEND_URL = (process.env.REACT_APP_BACKEND_URL || '').replace(/\/$/, '').replace(/^http:/, 'https:');
const API = `${BACKEND_URL}/api`;

const ReelsSection = () => {
    const [reels, setReels] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchReels = async () => {
            try {
                const url = `${API}/reels`;
                const res = await axios.get(url);
                if (Array.isArray(res.data)) {
                    setReels(res.data);
                }
            } catch (err) {
                console.error('Failed to fetch reels', err);
                setError(`Failed to load reels from ${API}/reels. Please view directly on Instagram.`);
            } finally {
                setLoading(false);
            }
        };
        fetchReels();
    }, []);



    const getEmbedUrl = (url) => {
        if (!url) return null;
        // Support /reel/, /reels/, /p/, /tv/
        const match = url.match(/(?:reels|reel|p|tv)\/([^\/?#&]+)/);
        if (match && match[1]) {
            return `https://www.instagram.com/p/${match[1]}/embed`;
        }
        return null;
    };

    // Removed the "return null" conditions to ensure the section header always renders

    return (
        <section id="reels" className="py-10 bg-black overflow-hidden">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                    <div>
                        <div className="flex items-center gap-2 text-[var(--ds-red)] font-bold tracking-widest uppercase text-xs mb-3">
                            <Film size={14} />
                            <span>Portfolio</span>
                        </div>
                        <h2 className="text-3xl md:text-5xl font-extrabold text-white">
                            Our <span className="text-[var(--ds-red)]">Recent Work</span>
                        </h2>
                    </div>
                    <p className="text-gray-400 max-w-md text-sm md:text-base leading-relaxed">
                        Check out our latest shoots and creative content captured for our amazing clients.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {reels.map((reel) => {
                        const embedUrl = getEmbedUrl(reel.url);
                        if (!embedUrl) return null;
                        return (
                            <div key={reel.id} className="group relative">
                                <div className="aspect-[9/16] w-full rounded-3xl overflow-hidden border border-[var(--ds-border)] bg-[#070707] shadow-2xl transition-all duration-300">
                                    <iframe
                                        src={`${embedUrl}?utm_source=ig_web_copy_link`}
                                        className="w-full h-full border-0"
                                        allowFullScreen
                                        title={reel.title || "Instagram Reel"}
                                        scrolling="no"
                                        allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                                    ></iframe>

                                    {/* Fallback for blocked embeds (e.g. Jio) */}
                                    <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center bg-[#070707] -z-10">
                                        <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-6">
                                            <Instagram size={32} className="text-gray-600" />
                                        </div>
                                        <h4 className="text-white font-bold text-sm mb-2">Can't see the Reel?</h4>
                                        <p className="text-gray-500 text-[11px] leading-relaxed mb-6">
                                            Some networks (like Jio) or slow connections might block Instagram content.
                                            You can still view this shoot directly on Instagram.
                                        </p>
                                        <a
                                            href={reel.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="bg-white/5 hover:bg-white/10 border border-white/10 px-5 py-2.5 rounded-full text-white text-xs font-bold flex items-center gap-2 transition-all"
                                        >
                                            View on Instagram <ExternalLink size={14} className="text-[var(--ds-red)]" />
                                        </a>
                                    </div>

                                    {/* Overlay for direct social link */}
                                    <div className="absolute top-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <a
                                            href={reel.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="bg-black/60 backdrop-blur-md p-2 rounded-full border border-white/10 text-white hover:bg-[var(--ds-red)] transition-all flex h-10 w-10 items-center justify-center"
                                            title="View on Instagram"
                                        >
                                            <Instagram size={18} />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        );
                    })}

                    {reels.length === 0 && !loading && (
                        <div className="col-span-1 sm:col-span-2 lg:col-span-3 text-center py-12 border border-dashed border-white/10 rounded-3xl">
                            <Instagram className="mx-auto text-gray-700 mb-4" size={48} />
                            <h3 className="text-white font-bold mb-2">
                                {error ? 'Connection Issue' : 'No Reels Found'}
                            </h3>
                            <p className="text-gray-500 text-sm max-w-xs mx-auto mb-6">
                                {error || 'Our portfolio is currently being updated. Check back soon or visit our Instagram.'}
                            </p>
                            <a
                                href="https://www.instagram.com/dreamshoots_inc/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 text-[var(--ds-red)] font-bold text-sm hover:underline"
                            >
                                Visit Instagram Portfolio <ExternalLink size={16} />
                            </a>
                        </div>
                    )}

                    {loading && (
                        <div className="col-span-1 sm:col-span-2 lg:col-span-3 text-center py-12">
                            <div className="inline-block w-8 h-8 border-2 border-[var(--ds-red)] border-t-transparent rounded-full animate-spin mb-4 transition-all"></div>
                            <p className="text-gray-500 text-sm">Loading portfolio...</p>
                        </div>
                    )}
                </div>
            </div >
        </section >
    );
};

export default ReelsSection;
