import React, { useState, useEffect } from "react";
import { prompts } from "../data/prompts";
import toast, {Toaster} from "react-hot-toast";

const Calendar = () => {
    const [view, setView] = useState('daily');
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [completed, setCompleted] = useState(() => {
        const saved = localStorage.getItem('sketch_completed');
        return saved ? JSON.parse(saved) : {};
    });

    // Sync completed tasks to localStorage
    useEffect(() => {
        localStorage.setItem('sketch_completed', JSON.stringify(completed));
    }, [completed]);

    // Real-Time logic: Get prompt based on the date
    const getPromptForDate = (date) => {
        const start = new Date(date.getFullYear(), 0, 0);
        const diff = date - start;
        const oneDay = 1000 * 60 * 60 * 24;
        const dayOfYear = Math.floor(diff / oneDay);
        return prompts[dayOfYear % prompts.length];
    };

    const currentPrompt = getPromptForDate(selectedDate);

    const toggleCOmplete = (id) => {
        const dateKey = selectedDate.toDateString();
        setCompleted(prev => ({ ...prev, [dateKey]: !prev[dateKey] }));
        if (!completed[dateKey]) toast.success('Daily foal reached!', {icon: '🎨'});
    };

    return (
        <div className="min-h-screen bg-[#FDF8FF] py-12 px-6 flex flex-col items-center">
            <Toaster/>

            {/* View Toggle */}
            <div className="flex bg-white p-1 rounded-xl shadow-inner border border-gray-100 mb-10">
                <button 
                    onClick={() => setView('daily')}
                    className={`px-6 py-2 rounded-lg font-bold transition-all ${view === 'daily' ? "bg-blue-600 text-white shadow-md" : "text-gray-500 hover:text-gray-700"}`}>
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
                        <button onClick={() => setSelectedDate(new Date(selectedDate.setDate(selectedDate.getDate() - 1)))} className="p-2 text-gray-400">❮</button>
                        <div className="text-center">
                            <h2 className="text-xl font-bold">{selectedDate.toLocaleDateString('en-US', {weekday: 'long', month: 'long', day: "numeric"})}</h2>
                            <button onClick={() => setSelectedDate(newDate())} className="text-xs text-blue-600 font-bold hover:underline">Today's Prompt</button>
                        </div>
                        <button onClick={() => setSelectedDate(new Date(selectedDate.setDate(setSelectedDate.getDate() + 1)))} className="p-2 text-gray-400">❯</button>
                    </div>

                    <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-purple-50">
                        <img src={currentPrompt.image} className="w-full h-72 object-cover" alt={currentPrompt.title}/>
                        <div className="p-8">
                            <div className="flex justify-between mb-4">
                                <h2 className="text-2xl font-bold">{currentPrompt.title}</h2>
                                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold uppercase">{currentPrompt.difficulty}</span>
                            </div>
                            <p className="text-gray-600 mb-6">{currentPrompt.title}</p>
                            <button
                                onClick={() => toggleCOmplete(currentPrompt.id)}
                                className={`w-full py-4 rounded-xl font-bold border-2 transition-all ${completed[selectedDate.toDateString()] ? "bg-green-50 border-green-500 text-green-600": "border-gray-200 text-gray-600 hover:bg-gray-50"}`}>
                                    {completed[selectedDate.toDateString()] ? "✓ Mark as Complete" : "Mark as COmplete"}
                            </button>
                        </div>
                    </div>
                </div>            
            ): (
                // Weekly View: Grid implementation
                <div className="grid grid-cols-1 md:grid-cols-7 gap-4 w-full max-w-7xl animate-fadeIn">
                    {[...Array(7)].map((_, i) => {
                        const date = new Date();
                        date.setDate(date.getDate() - date.getDay() + i);
                        const prompt = getPromptForDate(date);
                        const isDone = completed[date.toDateString()];

                        return (
                            <div key={i} className={`p-4 rounded-2xl border bg-white transition-all ${isDone ? "border-green-500 shadow-green-50" : "border-gray-100" }`}>
                                <p className="text-[10px] font-bold text-gray-400 uppercase">{date.toLocaleDateString('en-US', {Weekday: 'short'})}</p>
                                <p className="text-sm font-bold mb-3">{date.getDate()}</p>
                                <img src={prompt.image} className="w-full h-20 object-cover rounded-lg mb-2" alt=""/>
                                <p className="text-[10px] font-bold truncate">{prompt.title}</p>
                                {isDone && <span className="text-[10px] text-green-600 font-bold">✓ Done</span>}
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    )


}

export default Calendar