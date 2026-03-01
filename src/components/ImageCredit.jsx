import React from "react";

const ImageCredit = ({ credit, url }) => {
    if (!credit) return null;

    return (
        <div className="flex justify-center">
            <a 
                href={url} 
                target="_blank" 
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()} 
                className="group flex flex-col items-center justify-center text-center gap-1 bg-black/60 backdrop-blur-xl border border-white/20 px-6 py-3 rounded-3xl transition-all hover:bg-black/80 hover:scale-105 active:scale-95 shadow-2xl"
            >
                
                <span className="text-[9px] font-black uppercase tracking-[0.2em] text-purple-400 opacity-80 leading-none">
                    Photo Credits:
                </span>
                <span className="text-sm font-bold text-white leading-tight flex items-center gap-1">
                    {credit} <span className="text-white/40 font-light">on Unsplash</span>
                </span>
            </a>
        </div>
    );
};

export default ImageCredit;