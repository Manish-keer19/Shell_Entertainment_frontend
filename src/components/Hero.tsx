import { ArrowRight, Sparkles, Palette, Users, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-50 via-purple-50 to-white dark:from-gray-900 dark:via-blue-900 dark:to-gray-800">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-glow-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-purple-400/20 to-blue-400/20 rounded-full blur-3xl animate-glow-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-full blur-3xl" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 pt-32 pb-20 relative z-10">
        <div className="text-center max-w-6xl mx-auto space-y-8 animate-fade-in-up">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-blue-200 dark:border-blue-400 text-sm text-blue-600 dark:text-blue-400 shadow-lg animate-scale-in">
            <Sparkles className="w-4 h-4" />
            <span className="font-medium font-body">Entertainment Reimagined for the Future</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-mobile-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-tight font-heading">
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
              Entertainment Reimagined
            </span>
            <br />
            <span className="text-gray-800 dark:text-white">for the Future</span>
          </h1>

          {/* Subheading */}
          <p className="text-mobile-lg md:text-xl lg:text-2xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed font-body">
            Shell Entertainment empowers creators, learners, and dreamers to grow through creativity.
            Where innovation meets imagination.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
            <Link to="/#services">
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white text-mobile-base md:text-lg px-6 md:px-8 py-4 md:py-6 group shadow-lg hover:shadow-blue transition-all duration-300 font-body"
              >
                Explore Shell
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to="/courses">
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-blue-600 dark:border-blue-400 text-blue-600 dark:text-blue-400 hover:bg-blue-600 hover:text-white text-mobile-base md:text-lg px-6 md:px-8 py-4 md:py-6 transition-all duration-300 font-body"
              >
                Join Community
              </Button>
            </Link>
          </div>

          {/* Feature Highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-16 max-w-4xl mx-auto">
            {[
              { 
                title: "Creative Excellence", 
                description: "Award-winning creative solutions",
                icon: Palette
              },
              { 
                title: "Expert Mentorship", 
                description: "Learn from industry professionals",
                icon: Users
              },
              { 
                title: "Community Growth", 
                description: "Join India's fastest growing creative community",
                icon: TrendingUp
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="p-6 rounded-2xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-blue-200 dark:border-gray-600 hover:border-blue-300 dark:hover:border-blue-400 transition-all duration-300 hover:shadow-lg animate-scale-in group"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-mobile-base md:text-lg font-semibold text-gray-800 dark:text-white mb-2 font-heading">
                  {feature.title}
                </h3>
                <p className="text-mobile-xs md:text-sm text-gray-600 dark:text-gray-300 font-body">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float">
        <div className="w-6 h-10 border-2 border-blue-600 rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-3 bg-gradient-to-b from-blue-600 to-purple-600 rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default Hero;