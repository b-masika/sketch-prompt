import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <footer className="bg-white py-12 border-t mt-20">
            <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10 text-sm text-gray-600">

                <div className="flex flex-col gap-3">
                    <div>
                        <span className="text-2xl">🎨</span>
                        <h3 className="font-black text-gray-900 text-lg tracking-tighter">SketchPrompt</h3>
                    </div>
                    <p className="leading-relaxed opacity-70">
                        Daily inspiration for urban sketchers and digital artists. 
                        Built to help you master the art of the 20-minute sketch.
                    </p>
                </div>

                <div>
                    <h4 className="font-black text-gray-900 mb-4 uppercase tracking-widest text-xs">Quick Navigation</h4>
                    <ul className="space-y-3">
                        <li>
                            <Link to="/" onClick={scrollToTop} className="hover:text-purple-600 transition-colors font-medium">Home Gallery</Link>
                        </li>
                        <li>
                            <Link to="/calendar" onClick={scrollToTop} className="hover:text-purple-600 transition-colors font-medium">Daily Calendar</Link>
                        </li>
                        <li>
                            <Link to="/saved" onClick={scrollToTop} className="hover:text-purple-600 transition-colors font-medium">Saved Collection</Link>
                        </li>
                        {/* Legal Placeholders */}
                        <li>
                            <span className="opacity-40 cursor-not-allowed">Privacy Policy</span>
                        </li>
                    </ul>
                </div>

                <div>
                    <h4 className="font-black text-gray-900 mb-4 uppercase tracking-widest text-xs">Join the Community</h4>
                    <div className="flex gap-4">
                        <a href="#" className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center hover:bg-purple-50 hover:text-purple-600 transition-all text-xl">🐦</a>
                        <a href="#" className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center hover:bg-purple-50 hover:text-purple-600 transition-all text-xl">📸</a>
                        <a href="#" className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center hover:bg-purple-50 hover:text-purple-600 transition-all text-xl">💬</a>
                    </div>
                    <p className="mt-4 text-[10px] uppercase font-bold tracking-widest opacity-40">Follow #SketchPrompt</p>
                </div>
            </div>

            <div className="border-t border-gray-50 mt-12 pt-8 text-center text-[10px] font-bold text-gray-400 uppercase tracking-[0.3em]">
                © 2026 SketchPrompt. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;