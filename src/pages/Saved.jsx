import React from "react";
import { usePromptStore } from "../store/usePromptStore";
import { prompts } from "../data/prompts";
import { Link } from "react-router-dom";
import PromptCard from "../components/PromptCard";

const Saved = () => {

    const savedPromptIds = usePromptStore((state)=> state.savedPromptIds);
    const clearSaved = usePromptStore((state) => state.clearSaved);

    const savedItems = prompts.filter(prompt => 
        savedPromptIds.map(String).includes(String(prompt.id)));

    return (
        <div className="min-h-screen bg-[#FDF8FF] py-12 px-6">
            <div className="max-w-6xl mx-auto w-full animate-fadeIn">


                <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-12 gap-6">
                    <div className="text-center md:text-left">
                        <h1 className="text-4xl font-black text-gray-900 mb-2 tracking-tight">Your Collections</h1>
                        <p className="text-gray-500 font-medium">
                        You have {savedItems.length} {savedItems.length === 1 ? 'inspiration' : 'inspirations'} saved.
                        </p>
                    </div>

                    {savedItems.length > 0 && (
                            <button 
                                onClick={clearSaved}
                                className="text-sm font-bold text-red-500 hover:bg-red-50 px-4 py-2 rounded-xl transition-all border border-transparent hover:border-red-100"
                            >
                                Clear All
                            </button>
                    )}      
                </div>

                {savedItems.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 animate-fadeIn">
                    {savedItems.map((prompt) => (
                            <PromptCard key={prompt.id} {...prompt} />
                        ))}
                </div>

                ) : (
                /* Empty State */
                <div className="flex flex-col items-center justify-center py-24 bg-white rounded-[2.5rem] border-2 border-dashed border-gray-100 shadow-inner">
                        <div className="text-6xl mb-6 grayscale opacity-30">🎨</div>
                        <h2 className="text-2xl font-bold text-gray-400 mb-2">Your collection is empty</h2>
                        <p className="text-gray-400 mb-8 text-center max-w-sm">
                            Save prompts from the Random or Mood pages to see them here later!
                        </p>
                        <Link 
                            to="/moodSelector" 
                            className="bg-purple-600 text-white px-10 py-4 rounded-2xl font-bold hover:bg-purple-700 transition-all shadow-lg"
                        >
                            Browse Prompts
                        </Link>
                    </div>
                )}
            </div>     
        </div>
    );
};

export default Saved;