import React from "react";
import { usePromptStore } from "../store/usePromptStore"
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import ImageCredit from "./ImageCredit";
import SaveButton from "./SaveButton";
import {CopyButton, ShareButton} from "./ActionButtons";

const PromptCard = ({ id, title, description, mood, difficulty, image, tags = [], timeEstimate, credit, sourceUrl}) => {

    const savedPromptIds = usePromptStore((state) => state.savedPromptIds);
    const toggleSave = usePromptStore((state) => state.toggleSave);
    const isSaved = savedPromptIds.includes(id);

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

                <SaveButton id={id} className="absolute top-5 right-5" />
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
                    <CopyButton title={title} description={description} />
                    <ShareButton id={id} title={title} description={description} />
                </div>
            </div>
        </div>
    );
};

export default PromptCard;