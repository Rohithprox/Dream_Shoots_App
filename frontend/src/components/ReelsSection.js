import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Film, Instagram, ExternalLink } from 'lucide-react';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const ReelsSection = () => {
    const [reels, setReels] = useState([]);
    const [loading, setLoading] = useState(true);

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

    useEffect(() => {
        // Process Instagram embeds whenever reels change
        if (window.instgrm && window.instgrm.Embeds) {
            window.instgrm.Embeds.process();
        }
    }, [reels]);

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

                        return (
                            <div key={reel.id} className="group relative">
                                <div className="aspect-[9/16] w-full rounded-3xl overflow-hidden border border-[var(--ds-border)] bg-[#050505] shadow-2xl transition-all duration-500 group-hover:border-[var(--ds-red)]/50 group-hover:translate-y-[-8px]">
                                    <iframe
                                        src={`${embedUrl}?utm_source=ig_web_copy_link`}
                                        className="w-full h-full border-0"
                                        allowFullScreen
                                        title={reel.title || "Instagram Reel"}
                                        scrolling="no"
                                        allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                                    ></iframe>

                                    {/* Overlay for interaction */}
                                    <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-black via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                                        <div className="flex items-center justify-between">
                                            <a
                                                href={reel.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 text-white text-xs font-bold flex items-center gap-2 hover:bg-white hover:text-black transition-all pointer-events-auto"
                                            >
                                                <Instagram size={14} />
                                                View Reel
                                            </a>
                                            <div className="bg-[var(--ds-red)] p-2 rounded-full pointer-events-auto">
                                                <ExternalLink size={14} className="text-white" />
                                            </div>
                                        </div>
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
