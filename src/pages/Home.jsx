import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import FeatureCard from "../components/FeatureCard";
import PromptCard from "../components/PromptCard";
import CTASection from "../components/CTASection";
import Footer from "../components/Footer"
import { prompts } from "../data/prompts";

const Home = () => {

    const featurePrompts = prompts.slice(0, 4)

    return (
        <div className="flex flex-col">

            <Hero/>

            {/* Features Section */}
            <section className="py-20 bg-gray-50 text-center">
                <h2 className="text-3xl font-bold mb-4">
                    Three Ways to Find Inspiration
                </h2>

                <p className="text-gray-600 mb-12">
                    Choose the approach that works best for your creative process
                </p>

                <div className="flex flex-col md:flex-row justify-center gap-6 px-6">
                        <FeatureCard
                        icon="🎲"
                        title="Random Prompts"
                        description="Get instant inspiration with our random sketch prompt generator"
                        to="/random"
                        />

                        <FeatureCard
                        icon="📅"
                        title="Calendar Prompts"
                        description="Follow structured daily or weekly prompts to build your sketching habit"
                        to="calendar"
                        />

                        <FeatureCard
                        icon="❤️"
                        title="Mood Selector"
                        description="Choose your mood or theme and discover matching prompts."
                        to="/moodSelector"
                        />
                </div>
                
            </section>

            {/* Example Prompts */}
            <section className="py-20 bg-white">
                <div className="max-w-6xl mx-auto px-6">
                    <h2 className="text-4xl font-black text-center mb-16 text-gray-900">
                        Featured Inspirations
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        {featurePrompts.map((prompt) => (
                        <PromptCard
                        key={prompt.id}
                        {...prompt}
                        />
                    ))}
                    </div>
                </div>   
            </section>

            <CTASection/>


        </div>
    );
};

export default Home