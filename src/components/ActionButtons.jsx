import React from "react";
import toast from "react-hot-toast";

export const CopyButton = ({ title, description }) => {
    const handleCopy = async (e) => {
        e.preventDefault();
        try {
            await navigator.clipboard.writeText(`${title}: ${description}`);
            toast.success("Prompt copied!", { icon: "🎨" });
        } catch (err) {
            toast.error("Failed to copy");
        }
    };

    return (
        <button 
            onClick={handleCopy}
            className="flex-1 py-5 bg-purple-600 text-white font-black text-lg rounded-2xl hover:bg-purple-700 transition-all shadow-xl shadow-purple-100 active:scale-95"
        >
            Copy Prompt
        </button>
    );
};

export const ShareButton = ({ id, title, description }) => {
    const handleShare = async (e) => {
        e.preventDefault();
        const url = `${window.location.origin}/prompt/${id}`;
        if (navigator.share) {
            try {
                await navigator.share({ title, text: description, url });
            } catch (err) { console.log(err); }
        } else {
            await navigator.clipboard.writeText(url);
            toast.success("Link copied!");
        }
    };

    return (
        <button 
            onClick={handleShare}
            className="w-16 h-16 border-2 border-gray-100 rounded-2xl flex items-center justify-center hover:bg-gray-50 transition-colors text-2xl text-gray-400"
        >
            📤
        </button>
    );
};