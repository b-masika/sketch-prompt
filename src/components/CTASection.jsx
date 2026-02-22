import React from "react";
import { useNavigate } from "react-router-dom";
import { usePromptStore } from "../store/usePromptStore";

const CTASection = () => {
    const navigate = useNavigate();
    const generatePrompt= usePromptStore((state) => state.generatePrompt);

    const handleAction = () => {
        // Trigger logic to pick random prompt in the background
        generatePrompt();

        navigate("/random");
    }

    return (
        <section className="text-center py-20 bg-gray-100">
            <h2 className="text-3xl font-bold mb-4">
                Ready to Start Sketching?
            </h2>

            <p className="text-gray-600 mb-8">
                Join thousands of urban sketchers using daily prompts to improve their skills.
            </p>

            <button 
            onClick={handleAction}
            className="bg-gradient-to-r from-purple-600 to-pink-500 text-white px-6 py-3 rounded-lg font-semibold hover:scale-105 transition"
            >
                Generate Your First Prompt
            </button>
        </section>
    );
};

export default CTASection;