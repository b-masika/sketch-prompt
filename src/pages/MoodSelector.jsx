import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { prompts } from "../data/prompts";
import { usePromptStore } from "../store/usePromptStore";

const MoodSelector = () => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [activeMood, setActiveMood] = useState('All');
     const [activeDiff, setActiveDiff] = useState('All');

    const moods = ['All', 'Focused', 'Energetic', 'Calm'];
    const difficulties = ['All', 'beginner', 'intermediate', 'advanced'];

    const filteredPrompts = prompts.filter((p) => {
        const matchesSearch = p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            p.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
        
        const matchesMood = activeMood === 'All' || p.mood === activeMood;
        const matchesDiff = activeDiff === 'All' || p.difficulty === activeDiff;

        return matchesSearch && matchesMood && matchesDiff;
    });
    
    const getDiffColor = (level) => {
        switch (level) {
            case 'beginner': return "bg-green-100 text-green-700";
            case 'intermediate': return "bg-yellow-100 text-yellow-700";
            case 'advanced': return "bg-red-100 text-red-700";
            default: return "bg-gray-100 text-gray-700";
        }
    };

    return (
        <div className="min-h-screen bg-[#FDF8FF] py-12 px-6">
            {/* Header */}
            <div className="text-center mb-10">
                <div className="bg-orange-500 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <span className="text-white text-xl">🧡</span>
                </div>
                <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Mood Selector</h1>
                <p className="text-gray-600">How are you feeling today? Choose a vibe to see matching prompts.</p>
            </div>

            {/* Filter Panel */}
            <div className="max-w-6xl mx-auto bg-white p-8 rounded-3xl shadow-sm border border-gray-100 mb-12">
                <div className="mb-6">
                    <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Search by Keyword</label>
                    <input 
                        type="text"
                        placeholder="Try 'cafe', 'architecture', 'people'..."
                        className="w-full px-5 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-purple-500 outline-none transition-all"
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <div className="mb-6">
                    <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Select Your Mood</label>
                    <div className="flex flex-wrap gap-2">
                        {moods.map((mood) => (
                            <button
                                key={mood}
                                onClick={() => setActiveMood(mood)}
                                className={`px-8 py-3 rounded-2xl font-bold transition-all transform active:scale-95 ${
                                    activeMood === mood ? "bg-purple-600 text-white shadow-lg -translate-y-1" : "bg-white text-gray-600 border border-purple-100 hover:bg-purple-50"
                                }`}
                            >
                                {mood}
                            </button>
                        ))}
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Difficulty Level</label>
                    <div className="flx gap-2">
                        {difficulties.map(diff => (
                            <button 
                                key={diff}
                                onClick={() => setActiveDiff(diff)}
                                className={`px-4 py-2 rounded-full text-sm font--medium capitalize transition-all ${
                                    activeDiff === diff ? "bg-purple-600 text-white" : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                                }`}
                            >
                                {diff}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
            
            {/* Grid Display */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {filteredPrompts.map((prompt) => (
                    <div 
                        key={prompt.id} 
                        className="group bg-white rounded-[2.5rem] shadow-sm hover:shadow-2xl transition-all border border-purple-50 flex flex-col cursor-pointer"
                        onClick={() => navigate(`/prompt/${prompt.id}`)}
                    >
                        <div className="relative overflow-hidden h-56 rounded-t-[2.5rem]">
                            <img 
                                src={prompt.image} 
                                alt={prompt.title}
                                className="w-full h-48 object-cover"
                                crossOrigin="anonymous"
                            />

                            <div className="absolute top-4 right-4">
                                <span className={`text-[10px] font-black uppercase py-1.5 px-3 rounded-xl shadow-sm ${getDiffColor(prompt.difficulty)}`}>
                                    {prompt.difficulty}
                                </span>
                            </div>
                        </div>

                        <div className="p-6 flex flex-col flex-grow">
                            <h3 className="text-xl font-black text-gray-900 mb-2">{prompt.title}</h3>
                            <p className="text-gray-400 text-sm mb-6 line-clamp-2 italic leading-relaxed">
                                {prompt.description}
                            </p>

                            <div className="flex flex-wrap gap-2 mt-auto">
                                <span className="text-[10px] font-black bg-purple-600 text-white px-3 py-1 rounded-lg uppercase">
                                    {prompt.mood}
                                </span>
                                {prompt.tags.slice(0, 2).map(tag => (
                                    <span key={tag} className="text-[10px] font-bold bg-gray-100 text-gray-400 px-3 py-1 rounded-lg uppercase">
                                        #{tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

             {/* // Empty State Handler */}
            {filteredPrompts.length === 0 && (
                <div className="text-center py-40 max-w-2xl mx-auto">
                    <div className="text-6xl mb-6">🔍</div>
                    <h3 className="text-2xl font-black text-gray-900 mb-2">No matches found</h3>
                    <p className="text-gray-400">Try adjusting your mood or searching for something broader like 'city'.</p>
                    <button 
                        onClick={() => {setActiveMood('All'); setActiveDiff('All'); setSearchTerm('')}}
                        className="mt-6 text-purple-600 font-bold underline"
                    >
                        Reset all filters
                    </button>
                </div>
            )}
    </div>
    );       
};
export default MoodSelector