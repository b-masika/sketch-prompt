import React from "react";
import { usePromptStore } from "../store/usePromptStore"
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import ImageCredit from "./ImageCredit";

const PromptCard = ({ id, title, description, mood, difficulty, image, tags = [], timeEstimate, credit, sourceUrl}) => {

    const savedPromptIds = usePromptStore((state) => state.savedPromptIds);
    const toggleSave = usePromptStore((state) => state.toggleSave);
    const isSaved = savedPromptIds.includes(id);

    const handleCopy = async (e) => {
        e.preventDefault();
        try {
            const textToCopy = `${title}: ${description}`;
            await navigator.clipboard.writeText(textToCopy);
            toast.success("Prompt copied!", { icon: "🎨" });
        } catch (err) {
            console.error("Copy failed", err);
        }
    };

    const handleShare = async (e) => {
        e.preventDefault();
        if (navigator.share) {
            try {
                await navigator.share({ title, text: description, url: window.location.href });
            } catch (err) { console.log(err); }
        } else {
            navigator.clipboard.writeText(window.location.href);
            toast.success("Link copied to share!");
        }
    };

    // Helper for Difficulty Tag Colors
    const getDifficultyColor = (level) => {
        switch (level?.toLowerCase()) {
            case "beginner": return "bg-green-100 text-green-700";
            case "intermediate": return "bg-yellow-100 text-yellow-700";
            case "advanced": return "bg-red-100 text-red-700";
            default: return "bg-gray-100 text-gray-700";
        }
    };
    
    return (
        <div className="max-w-2xl w-full bg-white rounded-[2.5rem] shadow-xl overflow-hidden border border-purple-50 transition-all hover:shadow-2xl mx-auto">

            <div>
                <Link to={`/prompt/${id}`} className="relative h-64 overflow-hidden block">
                    <img 
                        src={image} 
                        className="w-full h-full object-cover" 
                        alt={title}
                        crossOrigin="anonymous"
                        loading="lazy"
                        onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = "https://placehold.co/800x600/6366f1/white?text=Click+Generate+Again";}}
                    />
                    </Link>

                    {/* Image Credit Badge */}
                    <ImageCredit credit={credit} url={sourceUrl || image} />

                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            toggleSave(id);
                        }}
                        className={`absolute top-5 right-5 w-12 h-12 rounded-full shadow-lg flex items-center justify-center transition-all active:scale-90 z-10 ${
                            isSaved ? "bg-purple-600 text-white" : "bg-white/90 text-gray-400 hover:bg-white"
                        }`}
                        >
                            <span className={`text-xl ${isSaved ? "text-white" : "text-gray-400"}`}>🔖</span>
                    </button>

            
            </div>
            

            <div className="p-10 text-left">
                <div className="flex justify-between items-center mb-3">
                    <Link to={`/prompt/${id}`}>
                        <h2 className="text-2xl font-bold text-gray-900 hover:text-purple-600 transition-colors">{title}</h2>
                    </Link>

                    {/* DIFFICULTY BADGE */}
                    <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${getDifficultyColor(difficulty)}`}>
                        {difficulty}
                    </span>
                </div>

                <p className="text-gray-600 text-lg leading-relaxed mb-6">
                    {description}
                </p>

                {/* TAGS (MOOD + CUSTOM TAGS) */}
                <div className="flex flex-wrap gap-2 mb-8">
                    <span className="bg-purple-100 text-purple-600 px-3 py-1 rounded-full text-xs font-bold">
                        {mood}
                    </span>
                    {tags.map((tag, index) => (
                        <span key={index} className="bg-gray-100 text-gray-500 px-3 py-1 rounded-full text-xs font-bold">
                            #{tag}
                        </span>
                    ))}
                </div>

                {/* TIME ESTIMATE */}
                <div className="flex items-center text-gray-400 text-sm mb-8">
                    <span className="mr-2">🕒</span>
                    {timeEstimate || "15-20 minutes"}
                </div>

                {/* --- ACTION BUTTONS (BOTTOM) --- */}
                <div className="flex gap-4">
                    {/* 3. PURPLE COPY BUTTON */}
                    <button 
                        onClick={handleCopy}
                        className="flex-1 py-5 bg-purple-600 text-white font-black text-lg rounded-2xl hover:bg-purple-700 transition-all shadow-xl shadow-purple-100 active:scale-95"
                    >
                        Copy Prompt
                    </button>

                    {/* 4. SHARE BUTTON */}
                    <button 
                        onClick={handleShare}
                        className="w-16 h-16 border-2 border-gray-100 rounded-2xl flex items-center justify-center hover:bg-gray-50 transition-colors text-2xl text-gray-400"
                        title="Share">
                        📤
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PromptCard;