import { usePromptStore } from "../store/usePromptStore";

const Hero = () => {
    const generatePrompt = usePromptStore((state) => state.generatePrompt);

    return (
        <section className="w-full bg-gradient-to-r from-purple-600 to-pink-500 text-white py-24 text-center">
            <h1 className="text-5xl font-bold mb-6">
                Urban Sketch Inspiration
            </h1>
            <p className="max-w-2xl mx-auto mb-8 text-lg">
                Never run out of ideas. Get daily prompts designed for everyday sketchers.
            </p>

            <button
            onClick={generatePrompt}
            className="bg-white text-purple-600 px-6 py03 rounded-lg font-semibold hover:scale-105 transition"
            >
                Get Started
            </button>
        </section>
    );
};

export default Hero;