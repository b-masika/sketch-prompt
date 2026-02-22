import { Link } from "react-router-dom";

const FeatureCard = ({icon, title, description, to }) => {
    return (
        <Link 
            to={to}
            className="block bg-white p-6 rounded-xl shadow-md hover:shadow-xl hover:-translate-y-1 transition duration- w-full max-w-sm"       
        >
            <div className="text-3xl mb-4">{icon}</div>

            <h3 className="font-semibold text-lg mb-2">{title}</h3>

            <p className="text-gray-600 text-sm">{description}</p>
        </Link>

    );
};

export default FeatureCard;