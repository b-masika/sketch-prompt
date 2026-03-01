import React from "react";
import { usePromptStore } from "../store/usePromptStore";

const SaveButton = ({ id, className = "" }) => {
    const toggleSave = usePromptStore((state) => state.toggleSave);
    const savedPromptIds = usePromptStore((state) => state.savedPromptIds);
    const isSaved = savedPromptIds.includes(id);

    return (
        <button
            onClick={(e) => {
                e.preventDefault();
                toggleSave(id);
            }}
            className={`w-12 h-12 rounded-full shadow-lg flex items-center justify-center transition-all active:scale-90 z-20 ${
                isSaved ? "bg-purple-600 text-white" : "bg-white/90 text-gray-400 hover:bg-white"
            } ${className}`}
        >
            <span className="text-xl">🔖</span>
        </button>
    );
};

export default SaveButton;