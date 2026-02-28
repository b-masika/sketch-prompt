import React from "react";
import { usePromptStore } from "../store/usePromptStore";
import { prompts } from "../data/prompts";
import { Link } from "react-router-dom";

const Saved = () => {

    const savedPromptIds = usePromptStore((state)=> state.savedPromptIds);
    const toggleSave = usePromptStore((state)=> state.toggleSave);

    const savedItems = prompts.filter(prompt => savedPromptIds.includes(prompt.id));

    return (
        <div className="min-h-screen bg-[#FDF8FF] py-12 px-6 flex flex-col items-center">
            <div className="max-w-6xl mx-auto w-full animate-fadeIn">
                <div className="mb-10 text-center md:text-left">
                    <h1 className="text-4xl font-bold mb-2">Your Saved Inspirations</h1>
                    <p className="text-gray-600">
                        You have {savedItems.length} {savedItems.length === 1 ? 'inspiration' : 'inspirations'} saved.
                    </p>
                </div>

                {savedItems.length === 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 animate-fadeIn">
                        {savedItems.map((prompt) => (
                            <div key={prompt.id} className="bg-white rounded-3xl shadow-md hover:shadow-xl transition-shadow border border-purple-50 overflow-hidden group">
                                <div className="relative h-52">
                                    <img 
                                        src={prompt.image} 
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                                        alt={prompt.title} 
                                    />
                                    {/* Unsave Button */}
                                    <button 
                                        onClick={() => toggleSave(prompt.id)}
                                        className="absolute top-4 right-4 p-2 bg-white/90 backdrop-blur rounded-full shadow-md text-orange-500 hover:bg-orange-50 transition-colors"
                                        title="Remove from saved"
                                    >
                                        🔖
                                    </button>
                                </div>

                                <div className="p-6">
                                    <div className="flex justify-between items-start mb-3">
                                        <h3 className="text-xl font-bold text-gray-800">{prompt.title}</h3>
                                        <span className={`text-[10px] font-bold px-2 py-1 rounded-md uppercase ${
                                            prompt.difficulty === 'beginner' ? 'bg-green-100 text-green-700' : 
                                            prompt.difficulty === 'intermediate' ? 'bg-blue-100 text-blue-700' : 'bg-red-100 text-red-700'
                                        }`}>
                                            {prompt.difficulty}
                                        </span>
                                    </div>
                                    
                                    <p className="text-gray-600 text-sm line-clamp-2 mb-6">
                                        {prompt.description}
                                    </p>

                                    <div className="flex items-center justify-between border-t border-gray-50 pt-4">
                                        <span className="text-xs text-gray-400 font-medium italic">
                                            Est: {prompt.timeEstimate || '30 mins'}
                                        </span>
                                        <Link 
                                            to="/calendar" 
                                            className="text-blue-600 text-sm font-bold hover:text-blue-800 transition-colors"
                                        >
                                            View in Calendar →
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    /* Empty State logic */
                    <div className="flex flex-col items-center justify-center py-24 bg-white rounded-3xl border-2 border-dashed border-gray-100 shadow-inner">
                        <div className="text-6xl mb-6 grayscale opacity-50">🎨</div>
                        <h2 className="text-2xl font-bold text-gray-400 mb-2">Your collection is empty</h2>
                        <p className="text-gray-400 mb-8 text-center max-w-sm">
                            Save prompts from the Random or Mood pages to see them here later!
                        </p>
                        <Link 
                            to="/mood" 
                            className="bg-blue-600 text-white px-10 py-4 rounded-2xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-200"
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