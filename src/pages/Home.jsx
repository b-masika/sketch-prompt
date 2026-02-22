import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import FeatureCard from "../components/FeatureCard";
import PromptCard from "../components/PromptCard";
import CTASection from "../components/CTASection";
import Footer from "../components/Footer"

const Home = () => {

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
                        to="/mood"
                        />
                </div>
                
            </section>

            {/* Example Prompts */}
            <section className="py-20 text-center">
                <h2 className="text-3xl font-bold mb-12">
                    Example Prompts
                </h2>

                <div className="grid md:grid-cols-4 gap-6 px-6 max-w-6xl mx-auto">
                    <PromptCard
                    image="https://source.unsplash.com/400x300/?city"
                    title="City Corner"
                    description="Sketch the intersection near your favorite coffee shop"
                    />

                    <PromptCard
                    image="https://source.unsplash.com/400x300/?architecture"
                    title="Street View"
                    description="Capture architectural details from street level."
                    />

                    <PromptCard
                    image="https://source.unsplash.com/400x300/?cafe"
                    title="Cafe Scene"
                    description="Draw the interior of your local coffee shop."
                    />

                    <PromptCard
                    image="https://source.unsplash.com/400x300/?park"
                    title="Park Life"
                    description="Sketch people relaxing on a park bench."
                    />
                </div>
            </section>

            <CTASection/>


        </div>
    );
};

export default Home