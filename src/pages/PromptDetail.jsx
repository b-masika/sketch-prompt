import React, { useEffect, useState } from 'react';
import { useParams,useNavigate } from 'react-router-dom';
import { prompts } from '../data/prompts';
import toast, {Toaster} from 'react-hot-toast';
import { usePromptStore } from '../store/usePromptStore';

const PromptDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [timeActive, setTimeActive] = useState(false);
    const [timeLeft, setTimeLeft] = useState(0);
    const [isZoomed, setIsZoomed] = useState(false);

    const toggleSave = usePromptStore((state) => state.toggleSave);
    const savedPromptIds = usePromptStore((state) => state.savedPromptIds);

    const prompt = prompts.find((p) => String(p.id) === id);
    const isSaved =  prompt ? savedPromptIds.includes(prompt.id) : false;

    useEffect(() => {
        if (prompt?.timeEstimate && !timeActive && timeLeft === 0 ) {
            const mins = parseInt(prompt.timeEstimate.split('-')[1]) || 20;
            setTimeLeft(mins * 60);
        }
    }, [prompt, timeActive, timeLeft]);

    useEffect(() => {
        let interval = null;
        if (timeActive && timeLeft > 0) {
            interval= setInterval(() => {
                setTimeLeft(prev => prev - 1);
            }, 1000);
        } else if (timeLeft === 0 && timeActive) {
            setTimeActive(false);
            toast.success("Time's up! Great session.", { icon: "⏰" });
        }
        
        return () => clearInterval(interval);
    }, [timeActive, timeLeft]);

    const handleStartSketch = () => {
        setTimeActive(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
        toast.success("Focus mode activated! Happy sketching.");
    }

    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({ 
                    title: prompt.title, 
                    text: prompt.description, 
                    url: window.location.href 
                });
            } catch (err) { console.log(err); }
        } else {
            navigator.clipboard.writeText(window.location.href);
            toast.success("Link copied to share!");
        }
    };

    const handleCopy = async () => {
        try {
            // We combine the title and description just like your Card does
            const textToCopy = `${prompt.title}: ${prompt.description}`;
            await navigator.clipboard.writeText(textToCopy);
            toast.success("Prompt copied to clipboard!", { icon: "🎨" });
        } catch (err) {
            console.error("Copy failed", err);
            toast.error("Failed to copy text.");
        }
    };

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    if (!prompt) {
        return <div className="p-20 text-center">Prompt not found.</div>;
    }

return (
    <div className="min-h-screen bg-[#FDF8FF] pb-20 relative">
        <Toaster />

        {/* {Zoom Detail View} */}
        {isZoomed && (
            <div 
                className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center cursor-zoom-out p-4 md:p-12"
                onClick={() => setIsZoomed(false)}
            >
                <img 
                    src={prompt.image} 
                    alt="Zoomed Reference"
                    className="max-w-full max-h-full object-contain shadow-2xl animate-in zoom-in-95 duration-300"
                    crossOrigin="anonymous"
                />
                <button className="absolute top-10 right-10 text-white/50 text-2xl">✕</button>
            </div>
        )}

        {/* HERO (Reference Area) */}
        <div className="relative w-full h-[70vh] md:h-[85vh] bg-gray-950 flex items-center justify-center overflow-hidden">
            {/* Background Blur */}
            <img src={prompt.image} className="absolute inset-0 w-full h-full object-cover blur-3xl opacity-20 scale-110" alt="" />

            {/* Main Image */}
            <img 
                src={prompt.image} 
                onClick={() => setIsZoomed(true)}
                className="relative z-10 max-h-[90%] max-w-[95%] object-contain shadow-2xl cursor-zoom-in transition-all hover:scale-[1.01]"
                crossOrigin="anonymous" 
            />

            {/* Secondary Clock */}
            {timeActive && (
                <div className="absolute top-10 center z-30 bg-black/50 backdrop-blur-xl px-6 py-4 rounded-3xl border border-white/10 shadow-2xl">
                    <p className="text-[10px] text-purple-300 font-black uppercase tracking-widest text-center mb-1">Remaining</p>
                    <div className="text-4xl font-mono text-white font-black">{formatTime(timeLeft)}</div>
                </div>
            )}

            {/* Image Credits */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 opacity-60 hover:opacity-100 transition-all">
                <a 
                    href={prompt.sourceUrl || prompt.image}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 bg-black/30 backdrop-blur-md px-5 py-2.5 rounded-full border border-white/10 text-[10px] text-white font-black tracking-[0.2em] uppercase transition-all hover:bg-black/60 hover:text-purple-300 hover:scale-105 shadow-2xl"
                    >
                    <span className="opacity-50">Photo Credits:</span>
                    <span className=" decoration-purple-500/50">
                        {prompt.credit}
                    </span>
                    <span className="text-[8px] opacity-70">↗</span>
                </a>
            </div>
        </div>

        {/* Floating Nav */}
        <div className="absolute top-6 left-6 right-6 flex justify-between items-center">
                <button
                    onClick={() => navigate(-1)}
                    className="bg-white/90 backdrop-blur-md px-5 py-3 rounded-2xl shadow-xl hover:bg-white transition-all font-black text-gray-800 text-sm uppercase tracking-tight"
                >
                   ← Back
                </button>
                <button
                    onClick={() => toggleSave(prompt.id)}
                    className={`p-4 rounded-2xl shadow-xl transition-all active:scale-90 ${isSaved ? "bg-purple-600" : "bg-white/90 hover:bg-white"}`}
                >
                    <span className={isSaved ? "text-white" : "text-gray-400"}>🔖</span>
                </button>
            </div>

        {/* UI Content Card */}
        <div className="max-w-3xl mx-auto px-6 -mt-10 relative z-10">
            <div className="bg-white rounded-[3.5rem] shadow-2xl p-8 md:p-14 border border-purple-50">

                {/* Header */}
                <div className="text-center mb-10">
                    <div className="inline-flex items-center gap-2 bg-purple-50 px-4 py-1.5 rounded-full mb-6">
                        <span className="w-2 h-2 rounded-full bg-purple-600 animate-pulse" />
                        <span className="text-purple-600 font-black text-[10px] uppercase tracking-[0.2em]">{prompt.mood} • {prompt.difficulty}</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black text-gray-900 mt-4 mb-6 leading-tight tracking-tighter">
                        {prompt.title}
                    </h1>
                    <p className="text-gray-500 italic text-xl md:text-2xl mb-8">"{prompt.description}"</p>

                    <div className="flex justify-center items-center gap-6 text-gray-400 font-bold text-xs uppercase tracking-widest">
                        <span className="flex items-center gap-2">🕒 {prompt.timeEstimate} Mins</span>
                    </div>
                </div>

                {/* Artist Insight */}
                <div className="bg-purple-50 rounded-3xl p-8 border border-purple-100 mb-12">
                    <h3 className="font-black text-purple-900 mb-2 flex items-center justify-center gap-2 uppercase text-xs tracking-widest">
                        💡 Artist Insight
                    </h3>
                    <p className="text-purple-800 text-center leading-relaxed">
                        Don't worry about perfect perspective. Capture the <strong>feeling</strong> of the architecture using bold, messy lines. Let the watercolor bleed outside the lines to create energy!
                    </p>
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-4">
                    {!timeActive ? (
                        <button 
                            onClick={handleStartSketch}
                            className="w-full py-6 bg-purple-600 text-white font-black text-2xl rounded-3xl hover:bg-purple-700 transition-all shadow-xl"
                        >
                            Start This Sketch
                        </button>
                    ) : (
                        <div
                            className="bg-gray-900 rounded-[2.5rem] p-8 text-center border-4 border-purple-500 shadow-2xl">
                                <p className="text-purple-400 text-[10px] font-black uppercase tracking-widest mb-2">Sketching Session</p>
                                <div className="text-6xl font-mono font-black text-white">{formatTime(timeLeft)}</div>
                                <button onClick={() => setTimeActive(false)} className="mt-4 text-gray-400 hover:text-white text-sm font-bold underline">Stop Timer</button>
                        </div>
                    )}

                        <div className="flex gap-4">
                            <button onClick={handleCopy}
                                className="flex-1 py-4 border-2 border-gray-100 rounded-2xl font-bold text-gray-500 hover:bg-gray-50 transition-all"
                            >
                                Copy Prompt
                            </button>
                            <button onClick={handleShare}
                                className="flex-1 py-4 border-2 border-gray-100 rounded-2xl font-bold text-gray-500 hover:bg-gray-50 transition-all">
                                Share Link
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PromptDetail;
            