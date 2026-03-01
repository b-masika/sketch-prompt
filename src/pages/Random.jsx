// 
import React, { useEffect, useRef, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { prompts } from "../data/prompts";
import { usePromptStore } from "../store/usePromptStore";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import ImageCredit from "../components/ImageCredit";
import { CopyButton, ShareButton } from "../components/ActionButtons";
import SaveButton from "../components/SaveButton";

const Random = () => {
    const location = useLocation();
    const [currentPrompt, setCurrentPrompt] = useState(prompts[0]);

    const toastShown = useRef(false);

    const savedPromptIds = usePromptStore((state) => state.savedPromptIds);
    const toggleSave = usePromptStore((state) => state.toggleSave);
    const isSaved = savedPromptIds.includes(currentPrompt.id);

    useEffect(() => {
        if (prompts && prompts.length > 0) {

            const initial = prompts[Math.floor(Math.random() * prompts.length)];
            setCurrentPrompt(initial);

            if (location.state?.fromHero && !toastShown.current) {
                toast("Fresh inspiration generated!", {
                    icon: "✨",
                    duration: 3000,
                    position: "bottom-center",
                });

                toastShown.current = true;

                window.history.replaceState({}, document.title);
            }
        }
    }, [location]);

    const generateNewPrompt = () => {
        if (!prompts || prompts.length <= 1) return;

        let nextPrompt;
        do {
            nextPrompt = prompts[Math.floor(Math.random() * prompts.length)];
        } while (nextPrompt.id === currentPrompt.id);
        setCurrentPrompt(nextPrompt);
    };

    // Safety check: Don't render UI if state is null

    if (!currentPrompt) return <div className="p-20 text-center">
        Loading prompts.
    </div>

    // Style difficulty tag dynamically
    const getDifficultyColor = (level) => {
        switch (level.toLowerCase()) {
            case "beginner": return "bg-green-100 text-green-700";
            case "intermediate": return "bg-yellow-100 text-yellow-700";
            case "advanced": return "bg-red-100 text-red-700";
            default: return "bg-gray-100 text-gray-700";
        }
    };

    const handleCopy = async () => {
        try {
            const textToCopy = `${currentPrompt.title}: ${currentPrompt.description}`
            await navigator.clipboard.writeText(textToCopy);
            toast.success("Prompt copied to clipboard!", {
                icon: "🎨",
                duration: 3000,
                position: "bottom-center",
            });
        } catch (err) {
            console.error('Failed to copy:', err);
        }

    };

    const handleShare = async () => {
        if (navigator.canShare) {
            try {
                await navigator.share({
                    title: currentPrompt.title,
                    text: currentPrompt.description,
                    url: window.location.href,
                });
            } catch (err) {
                console.error('Failed to share:', err);
            }
        } else {
            await navigator.clipboard.writeText(window.location.href);
            toast.success("Link copied to share!");
        }
    };

    return (
        <div className="min-h-screen bg-[#FDF8FF] flex flex-col items-center py-12 px-4">
            {/* Header Area */}
            <Toaster />

            <div className="text-center mb-10">
                <div className="bg-purple-500 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <span className="text-white text-xl">🎲</span>
                </div>
                <h1 className="text-4xl font-extrabold text-gray-900 mb-2">Random Prompt Generator</h1>
                <p className="text-gray-600 max-w-md mx-auto">
                    Get instant inspiration with a random urban sketching prompt.
                </p>
            </div>

            {/* Main Card */}
            <div className="max-w-2xl w-full bg-white rounded-3xl shadow-xl overflow-hidden border border-purple-50">
                <div className="relative">
                    <Link to={`/prompt/${currentPrompt.id}`}>
                        <img 
                            src={currentPrompt.image} 
                            alt={currentPrompt.title}
                            crossOrigin="anonymous"
                            className="w-full h-72 object-cover"
                            loading="lazy"
                            onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = "https://placehold.co/800x600/6366f1/white?text=Click+Generate+Again";
                            }}
                        />
                    </Link>

                    {/* Credit Badge */}
                    <ImageCredit
                        credit={currentPrompt.imageCredit}
                        url={currentPrompt.sourceUrl || currentPrompt.image}
                    />

                    <SaveButton id={currentPrompt.id} className="absolute top-6 right-6" />
                </div>

                <div className="p-8">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-2xl font-bold text-gray-800">{currentPrompt.title}</h2>
                        <span className={`px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${getDifficultyColor(currentPrompt.difficulty)}`}>
                            {currentPrompt.difficulty}
                        </span>
                    </div>

                    <p className="text-gray-600 leading-relaxed mb-6">
                        {currentPrompt.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-6">
                        {currentPrompt.tags?.map(tag => (
                            <span key={tag} className="text-purple-600 bg-purple-50 px-3 py-1 rounded-lg text-sm font-medium border border-purple-100">
                                #{tag}
                            </span>
                        ))}
                    </div>

                    <div className="flex items-center text-gray-500 font-medium mb-8">
                        <span className="mr-2 text-lg">⏱️</span> {currentPrompt.timeEstimate}
                    </div>

                    <div className="flex gap-4">
                        <CopyButton title={currentPrompt.title} description={currentPrompt.description} />
                        <ShareButton id={currentPrompt.id} title={currentPrompt.title} description={currentPrompt.description} />
                    </div>
                </div>
            </div>

            {/* Action Button */}
            <button 
                onClick={generateNewPrompt}
                className="mt-10 px-10 py-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl font-bold shadow-xl hover:shadow-2xl hover:-translate-y-1 transform transition-all active:scale-95 flex items-center gap-3">
                    <span className="text-lg">🔄</span>
                    Generate New Prompt
                </button>
        </div>
    )
}
export default Random