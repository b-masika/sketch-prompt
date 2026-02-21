const FeatureCard = ({icon, title, description}) => {
    return (
        <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition w-full max-w-sm">
            <div className="text-3xl mb-4">{icon}</div>
            <h3 className="font-semibold text-lg mb-2">{title}</h3>
            <p className="text-gray-600 text-sm">{description}</p>
        </div>
    )
}

export default FeatureCard;