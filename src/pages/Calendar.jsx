import React, { useState } from "react";
import { prompts } from "../data/prompts";
import { usePromptStore } from "../store/usePromptStore";
import toast, {Toaster} from "react-hot-toast";
import { Link } from "react-router-dom";
import ImageCredit from "../components/ImageCredit";
import { CopyButton, ShareButton } from "../components/ActionButtons";
import SaveButton from "../components/SaveButton";

const Calendar = () => {
    const [view, setView] = useState('daily');
    const [selectedDate, setSelectedDate] = useState(new Date());

    // Store Hooks
    const completedDates = usePromptStore(state => state.completedDates);
    const toggleStoreComplete = usePromptStore(state => state.toggleComplete);

    // Real-Time logic: Get prompt based on the date
    const getPromptForDate = (date) => {
        const start = new Date(date.getFullYear(), 0, 0);
        const diff = date - start;
        const oneDay = 1000 * 60 * 60 * 24;
        const dayOfYear = Math.floor(diff / oneDay);
        return prompts[dayOfYear % prompts.length];
    };

    const getDifficultyColor = (level) => {
        switch (level?.toLowerCase()) {
            case "beginner": return "bg-green-100 text-green-700";
            case "intermediate": return "bg-yellow-100 text-yellow-700";
            case "advanced": return "bg-red-100 text-red-700";
            default: return "bg-purple-100 text-purple-700";
        }
    };

    const currentPrompt = getPromptForDate(selectedDate);
    const dateKey = selectedDate.toDateString();

    const isTodayDone = completedDates[dateKey];

    const handleToggle = () => {
        toggleStoreComplete(dateKey);
        if (!isTodayDone) {
        toast.success('Daily goal reached!', { icon: '🎨' });
        }
    };

    const changeDate = (days) => {
        const newDate = new Date(selectedDate);
        newDate.setDate(newDate.getDate() + days);
        setSelectedDate(newDate);
    };

    return (
        <div className="min-h-screen bg-[#FDF8FF] py-12 px-6 flex flex-col items-center">
            <Toaster/>

            {/* View Toggle */}
            <div className="flex bg-white p-1 rounded-2xl shadow-sm border border-purple-100 mb-10">
                <button 
                    onClick={() => setView('daily')}
                    className={`px-8 py-2.5 rounded-xl font-bold transition-all ${view === 'daily' ? "bg-purple-600 text-white shadow-lg shadow-purple-200" : "text-gray-400 hover:text-purple-600"}`}>
                        Daily View
                    </button>
                    <button
                        onClick={() => setView('weekly')}
                        className={`px-6 py-2 rounded-lg font-bold transition-all ${view === 'weekly' ? "bg-blue-600 text-white shadow-md" : "text-gray-500 hover:text-gray-700"}`}>
                            Weekly View
                    </button>
            </div>

            {view === 'daily' ?  (
                <div className="w-full max-w-3xl animate-fadeIn">
                    <div className="flex items-center justify-between mb-8 bg-white p-4 rounded-2xl shadow-sm">
                        <button onClick={() => changeDate(-1)} className="p-2 text-gray-400">❮</button>
                        <div className="text-center">
                            <h2 className="text-xl font-bold">{selectedDate.toLocaleDateString('en-US', {weekday: 'long', month: 'long', day: "numeric"})}</h2>
                            <button onClick={() => setSelectedDate(new Date())} className="text-xs text-blue-600 font-bold hover:underline">Today's Prompt</button>
                        </div>
                        <button onClick={() => changeDate(1)} className="p-2 text-gray-400">❯</button>
                    </div>

                    <div className="bg-white rounded-[2.5rem] shadow-xl overflow-hidden border border-purple-50 group">
                        <Link to={`/prompt/${currentPrompt.id}`}>
                            <div className="relative h-80 overflow-hidden">
                                <img 
                                    src={currentPrompt.image} 
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                                    alt={currentPrompt.title}
                                    crossOrigin="anonymous"
                                />

                                <SaveButton id={currentPrompt.id} className="absolute top-6 right-6" />
                                <ImageCredit credit={currentPrompt.credit} url={currentPrompt.sourceUrl || currentPrompt.image} />

                            </div>
                        </Link>
                        
                        <div className="p-10">
                            <div className="flex justify-between items-start mb-4">
                                <h2 className="text-3xl font-black text-gray-900 leading-tight">{currentPrompt.title}</h2>
                                <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${getDifficultyColor(currentPrompt.difficulty)}`}>
                                    {currentPrompt.difficulty}
                                </span>
                            </div>
                            <p className="text-gray-500 text-lg leading-relaxed mb-8">{currentPrompt.description}</p>
                            
                            <button
                                onClick={handleToggle}
                                className={`w-full py-5 rounded-2xl font-black text-lg transition-all active:scale-95 flex items-center justify-center gap-3 ${isTodayDone ? "bg-green-500 text-white shadow-lg shadow-green-100": "bg-gray-900 text-white hover:bg-purple-600 shadow-xl shadow-gray-200"}`}>
                                    {isTodayDone ? (
                                        <><span className="text-2xl">✓</span> Completed</>
                                    ) : "Mark as Complete"}
                            </button>
                        </div>
                    </div>
                </div>            
            ) : (
                // Weekly View: Grid implementation
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 w-full max-w-7xl animate-fadeIn">
                    {[...Array(7)].map((_, i) => {
                        const date = new Date();
                        date.setDate(date.getDate() - date.getDay() + i);
                        const prompt = getPromptForDate(date);
                        const isDone = completedDates[date.toDateString()];
                        const isCurrentSelection = date.toDateString() === new Date().toDateString();

                        return (
                            <div key={i} className={`p-4 rounded-[2rem] border bg-white transition-all flex flex-col ${isDone ? "border-green-200 bg-green-50/30" : isCurrentSelection ? "border-purple-600 ring-2 ring-purple-100" : "border-gray-100" }`}>
                                <div className="flex justify-between items-start mb-2">
                                    <div>
                                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-tighter">{date.toLocaleDateString('en-US', {weekday: 'short'})}</p>
                                        <p className={`text-lg font-black ${isCurrentSelection ? "text-purple-600" : "text-gray-900"}`}>{date.getDate()}</p>
                                    </div>
                                    {isDone && <span className="text-xl">✅</span>}
                                </div>
                                
                                <Link to={`/prompt/${prompt.id}`} className="block group">
                                    <div className="relative h-24 overflow-hidden rounded-2xl mb-3">
                                        <img src={prompt.image} className="w-full h-full object-cover transition-transform group-hover:scale-110" alt=""/>
                                        <div className={`absolute top-2 right-2 w-2 h-2 rounded-full ${getDifficultyColor(prompt.difficulty).split(' ')[0]}`}></div>
                                    </div>
                                    <p className="text-[11px] font-bold text-gray-800 leading-tight group-hover:text-purple-600 transition-colors line-clamp-2">{prompt.title}</p>
                                </Link>

                                <div className="mt-auto pt-3">
                                    <span className={`text-[8px] font-black uppercase tracking-tighter px-2 py-0.5 rounded-md border ${getDifficultyColor(prompt.difficulty)}`}>
                                        {prompt.difficulty}
                                    </span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    )


}

export default Calendar