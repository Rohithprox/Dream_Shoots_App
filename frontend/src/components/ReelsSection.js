import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Film, Instagram, ExternalLink } from 'lucide-react';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const ReelsSection = () => {
    const [reels, setReels] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeReels, setActiveReels] = useState({}); // Track which reels are loaded

    useEffect(() => {
        const fetchReels = async () => {
            try {
                const res = await axios.get(`${API}/reels`);
                setReels(res.data);
            } catch (err) {
                console.error('Failed to fetch reels', err);
            } finally {
                setLoading(false);
            }
        };
        fetchReels();
    }, []);



    const getEmbedUrl = (url) => {
        // Support /reel/, /reels/, /p/, /tv/
        const match = url.match(/(?:reels|reel|p|tv)\/([^\/?#&]+)/);
        if (match && match[1]) {
            return `https://www.instagram.com/p/${match[1]}/embed`;
        }
        return null;
    };

    if (loading && reels.length === 0) return null;
    if (!loading && reels.length === 0) return null;

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

                        const isActive = activeReels[reel.id];

                        return (
                            <div key={reel.id} className="group relative">
                                <div className="aspect-[9/16] w-full rounded-3xl overflow-hidden border border-[var(--ds-border)] bg-[#070707] shadow-2xl transition-all duration-300">
                                    {isActive ? (
                                        <>
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
                                        </>
                                    ) : (
                                        <div
                                            className="w-full h-full flex flex-col items-center justify-center p-8 cursor-pointer group/card"
                                            onClick={() => setActiveReels(prev => ({ ...prev, [reel.id]: true }))}
                                        >
                                            <div className="w-20 h-20 bg-[var(--ds-red)]/5 rounded-full flex items-center justify-center mb-6 group-hover/card:bg-[var(--ds-red)]/10 transition-colors border border-[var(--ds-red)]/20">
                                                <Film size={32} className="text-[var(--ds-red)]" />
                                            </div>
                                            <h4 className="text-white font-extrabold text-lg mb-2">Click to Play</h4>
                                            <p className="text-gray-500 text-xs text-center mb-6">Professional Short-form Content</p>
                                            <div className="bg-[var(--ds-red)] text-white px-6 py-2 rounded-full text-xs font-bold tracking-widest uppercase">
                                                Load Reel
                                            </div>
                                        </div>
                                    )}

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
                                <div className="mt-4 text-center">
                                    <h3 className="text-white font-medium text-sm group-hover:text-[var(--ds-red)] transition-colors">
                                        {reel.title || "Professional Shoot"}
                                    </h3>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default ReelsSection;
