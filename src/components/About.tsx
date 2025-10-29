import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Logo from "../assets/logo.jpg"

const About = () => {
  return (
    <section id="about" className="py-24 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Heading */}
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                About Shell Entertainment
              </span>
            </h2>
          </div>

          {/* Main Content - Two Column Layout */}
          <div className="grid lg:grid-cols-2 gap-16 items-center mb-16">
            {/* Left Column - Text */}
            <div className="space-y-6 animate-fade-in">
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                Shell Entertainment is a creative powerhouse that empowers creators, learners, and dreamers 
                to grow through innovative digital solutions and entertainment experiences.
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                We specialize in transforming ideas into compelling digital narratives, helping brands and 
                individuals build meaningful connections with their audiences across all platforms.
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                Our mission is to bridge the gap between creativity and technology, providing comprehensive 
                solutions that drive growth, engagement, and success in the digital landscape.
              </p>
              
              <Link to="/about">
                <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white mt-6 group">
                  Know More
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>

            {/* Right Column - Image/Video */}
            <div className="relative animate-scale-in">
              <div className="aspect-video rounded-2xl bg-gradient-to-br from-blue-100 to-purple-100 dark:from-gray-800 dark:to-gray-700 p-8 backdrop-blur-sm border border-blue-200 dark:border-gray-600 overflow-hidden">
                <div className="w-full h-full rounded-xl bg-white/80 dark:bg-gray-800/80 flex items-center justify-center relative">
                  <div className="text-center p-8">
                    <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center">
                      <img src={Logo} alt="Shell Entertainment Logo" className="w-20 h-20 rounded-full" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
                      Shell Entertainment
                    </h3>
                    <p className="text-blue-600 dark:text-blue-400 font-medium">
                      Creativity • Innovation • Growth
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;