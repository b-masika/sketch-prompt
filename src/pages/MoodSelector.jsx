import React, { useState } from "react";
import { prompts } from "../data/prompts";
import PromptCard from "../components/PromptCard";

const MoodSelector = () => {
    const [activeMood, setActiveMood] = useState('All');
    const moods = ['All', 'Focused', 'Energetic', 'Calm'];

    const filteredPrompts = activeMood === 'All'
        ? prompts
        : prompts.filter(p => p.mood === activeMood);

    return (
        <div className="min-h-screen bg-[#FDF8FF] py-12 px-6">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Mood Selector</h1>
                <p className="text-gray-600">How are you feeling today? Choose a vibe to see matching prompts.</p>
            </div>

            {/* Filter Buttons */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
                {moods.map((mood) => (
                    <button
                        key={mood}
                        onClick={() => setActiveMood(mood)}
                        className={`px-8 py-3 rounded-2xl font-bold transition-all transform active:scale-95 ${
                            activeMood === mood
                            ? "bg-purple-600 text-white shadow-lg -translate-y-1"
                            : "bg-white text-gray-600 border border-purple-100 hover:bg-purple-50"
                        }`}
                    >
                            {mood}
                    </button>
                ))}
            </div>
            
            {/* Grid Display */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {filteredPrompts.map((prompt) => (
                    <div key={prompt.id} className="bg-white rounded-3xl shadow-md overflow-hidden border border-purple-50">
                        <img 
                            src={prompt.image} 
                            alt={prompt.title}
                            className="w-full h-48 object-cover"
                            crossOrigin="anonymous"
                        />

                        <div className="p-6 flex flex-col flex-grow">
                            <h3 className="text-xl font-bold mb-2 text-gray-800">{prompt.title}</h3>
                            <p className="text-gray-600 text-sm mb-4 flex-grow">
                                {prompt.description}
                            </p>
                            <div className="mt-auto">
                                <span className="text-xs font-bold uppercase py-1 px-3 bg-purple-100 text-purple-700 rounded-full inline-block">
                                    {prompt.mood}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

             {/* // Empty State Handler */}
            {filteredPrompts.length === 0 && (
                <div className="text-center py-20">
                    <p className="text-gray-400 italic">No prompt found for "{activeMood}" yet.</p>
                </div>
        )}
    </div>
    );       
};
export default MoodSelector