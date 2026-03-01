import React, { useEffect } from 'react';
import { useParams,useNavigate } from 'react-router-dom';
import { prompts } from '../data/prompts';
import toast, {Toaster} from 'react-hot-toast';
import { usePromptStore } from '../store/usePromptStore';

const PromptDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [timeActive, setTimeActive] = useState(false);
    const [timeLeft, setTimeLeft] = useState(0);

    const toggleSave = usePromptStore((state) => state.toggleSave);
    const savedPromptIds = usePromptStore((state) => state.savedPromptIds);

    const prompt = prompts.find((p) => String(p.id) === id);
    const isSaved =  prompt ? savedPromptIds.includes(prompt.id) : false;

    useEffect(() => {
        if (prompt?.timeEstimate && timeLeft === 0 ) {
            const mins = parseInt(prompt.timeEstimate.split('-')[1]) || 20;
            setTimeLeft(mins * 60);
        }
    }, [prompt]);

    if (!prompt) {
        return <div className="p-20 text-center">Prompt not found.</div>;
    }

return (
    <div className="min-h-screen bg-[#FDF8FF] pb-20">
        <Toaster />

        <div className="relative w-full h-[50vh] md:h-[60vh] overflow-hidden bg-gray-900">
            <img 
                    src={prompt.image} 
                    alt={prompt.title} 
                    className="w-full h-full object-cover opacity-90"
                    crossOrigin="anonymous"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent" />

            {/* Floating Nav */}
            <div className="absolute top-6 left-6 right-6 flex justify-between items-center">
                <button
                    onClick={() => navigate(-1)}
                    className="bg-white/90 backdrop-blur-md p-3 rounded-2xl shadow-xl hover:bg-white transition-all font-bold text-gray-800"
                >
                   ← Back to Gallery
                </button>
                <button
                    onClick={() => toggleSave(prompt.id)}
                    className={`p-4 rounded-2xl shadow-xl transition-all active:scale-90 ${isSaved ? "bg-purple-600" : "bg-white/90 hover:bg-white"}`}
                >
                    <span className={isSaved ? "text-white" : "text-gray-400"}>🔖</span>
                    </button>
            </div>
        </div>

        {/* COntent */}
        <div className="max-w-3xl mx-auto px-6 -mt-32 relative z-10">
            <div className="bg-white rounded-[3rem] shadow-2xl shadow-purple-100/50 p-8 md:p-14 border border-purple-50">
                {/* Header */}
                <div className="text-center mb-10">
                        <span className="text-purple-600 font-black text-xs uppercase tracking-[0.2em]">{prompt.mood} • {prompt.difficulty}</span>
                        <h1 className="text-4xl md:text-5xl font-black text-gray-900 mt-4 mb-6 leading-tight tracking-tighter">
                            {prompt.title}
                        </h1>
                        <div className="flex justify-center items-center gap-6 text-gray-400 font-bold text-sm">
                            <span className="flex items-center gap-2">⏱️ {prompt.timeEstimate}</span>
                            <span className="flex items-center gap-2">🎨 Urban Sketching</span>
                        </div>
                </div>

                {/* Description */}
                <div className="relative">
                        <span className="absolute -left-4 -top-4 text-6xl text-purple-100 font-serif italic">“</span>
                        <p className="text-gray-700 text-xl md:text-2xl leading-relaxed text-center font-medium mb-12 italic px-4">
                            {prompt.description}
                        </p>
                </div>

                {/* Callouts */}
                <div className="bg-purple-50 rounded-3xl p-8 border border-purple-100 mb-12">
                        <h3 className="font-black text-purple-900 mb-2 flex items-center justify-center gap-2 uppercase text-xs tracking-widest">
                            💡 Artist Insight
                        </h3>
                        <p className="text-purple-800 text-center leading-relaxed">
                            Don't worry about perfect perspective. Capture the <strong>feeling</strong> of the architecture using bold, messy lines. Let the watercolor bleed outside the lines to create energy!
                        </p>
                </div>

                {/* CTA */}
                <div className="flex flex-col gap-4">
                        <button 
                            className="w-full py-5 bg-purple-600 text-white font-black text-xl rounded-2xl hover:bg-purple-700 transition-all shadow-xl shadow-purple-200 active:scale-95"
                            onClick={() => toast.success("Focus mode activated! Happy sketching.")}
                        >
                            Start This Sketch
                        </button>
                        <div className="flex gap-4">
                            <button 
                                onClick={() => {
                                    navigator.clipboard.writeText(prompt.description);
                                    toast.success("Text copied!");
                                }}
                                className="flex-1 py-4 border-2 border-gray-100 rounded-2xl font-bold text-gray-500 hover:bg-gray-50 transition-all"
                            >
                                Copy Prompt
                            </button>
                            <button className="flex-1 py-4 border-2 border-gray-100 rounded-2xl font-bold text-gray-500 hover:bg-gray-50 transition-all">
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
            