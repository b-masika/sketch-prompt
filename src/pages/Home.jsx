import { usePromptStore } from "../store/usePromptStore";
import PromptCard from "../components/PromptCard";

const Home = () => {
    const prompts = usePromptStore((state) => state.prompts);

    return (
        <div className="flex flex-col items-center gap-8 py-12">
            <div className="text-center max-w-2xl">
                <h1 className="text-4xl font-bold mb-4">Sketch Prompt</h1>
                <p className="text-gray-600">
                    Your daily source of creative sketching prompts.
                </p>
            </div>

            {prompts.length === 0 ? (
                <p className="text-gray-400">No prompts yet...</p>
            ) : (
                prompts.map((prompt) =>(
                    <PromptCard key={prompt.id} {...prompt} />
                ))
            )}        
        </div>
    );
};

export default Home