import PromptCard from "../components/PromptCard";

const Home = () => {
    return (
        <div className="flex flex-col items-center gap-8">
            <div className="text-center">
                <h1 className="text-4xl font-bold mb-4">Sketch Prompt</h1>
                <p className="text-gray-600">
                    Your daily source of creative sketching prompts. Explore different themes, moods, and random ideas to spark your creativity. Save your favorite prompts and track your progress in the calendar. Let's get sketching!
                </p>
            </div>            
        
            <PromptCard 
                title="Floating in the Clouds"
                description="Sketch a character floating in the clouds, with soft, ethereal lighting."
                mood="Serene"
                difficulty="Easy"
            />
        </div>
    );
};

export default Home