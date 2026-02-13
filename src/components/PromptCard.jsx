const PromptCard = ({ title, description, mood, difficulty }) => {
    return (
        <div className="bg-white shadow-md rounded-xl p-6 max-w-md border border-gray-200">
            <h2 className="text-xl font-bold mb-2">{title}</h2>

            <p className="text-gray-600">{description}</p>

            <div className="mt-4 flex items-center justify-between">
                <span>🎭 {mood}</span>
                <span>⚡ {difficulty}</span>
            </div>
        </div>
    );
};

export default PromptCard;