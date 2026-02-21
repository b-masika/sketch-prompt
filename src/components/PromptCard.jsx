import { usePromptStore } from "../store/usePromptStore"

const PromptCard = ({ id, title, description, mood, difficulty, showSave = true }) => {
    const addSaved = usePromptStore((state) => state.addSaved);
    const removeSaved = usePromptStore((state) => state.removeSaved);

    return (
        <div className="bg-white shadow-md rounded-xl p-6 max-w-md border border-gray-200">
            <h2 className="text-xl font-bold mb-2">{title}</h2>

            <p className="text-gray-600">{description}</p>

            <div className="mt-4 flex items-center justify-between">
                <span>🎭 {mood}</span>
                <span>⚡ {difficulty}</span>
            </div>

            {showSave && (
                <div className="mt-4 flex gap-3">
                    <button
                    onClick={() =>
                        addSaved({id, title, description, mood, difficulty })
                    }
                    className="text-sm bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-500"
                    >
                        Save
                    </button>

                    <button
                    onClick={() => removeSaved(id)}
                    className="text-sm bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
                    >
                        Remove
                    </button>
                </div>
            )}
        </div>
    );
};

export default PromptCard;