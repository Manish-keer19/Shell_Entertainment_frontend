import { ArrowRight, Users, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const JoinCommunity = () => {
  return (
    <section className="py-24 bg-gradient-to-br from-blue-50 via-purple-50 to-white dark:from-blue-600 dark:via-purple-600 dark:to-blue-800 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/10 dark:bg-white/5 rounded-full blur-3xl animate-glow-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-white/10 dark:bg-white/5 rounded-full blur-3xl animate-glow-pulse delay-1000" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-blue-200 dark:border-blue-400 text-sm text-blue-600 dark:text-blue-400 mb-8 animate-scale-in shadow-lg">
            <Sparkles className="w-4 h-4" />
            <span className="font-medium">Join the Movement</span>
          </div>

          {/* Main Heading */}
          <h2 className="text-4xl md:text-6xl font-bold text-gray-800 dark:text-white mb-6 animate-fade-in-up">
            Join India's Fastest Growing
            <br />
            <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
              Creative Community
            </span>
          </h2>

          {/* Description */}
          <p className="text-xl text-gray-600 dark:text-blue-100 mb-8 max-w-2xl mx-auto leading-relaxed animate-fade-in">
            Connect with like-minded creators, learn from industry experts, and grow your creative career 
            with Shell Entertainment's vibrant community.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 mb-12 max-w-2xl mx-auto animate-fade-in">
            {[
              { number: "10K+", label: "Active Members" },
              { number: "500+", label: "Success Stories" },
              { number: "50+", label: "Expert Mentors" }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-2">
                  {stat.number}
                </div>
                <div className="text-sm text-gray-500 dark:text-blue-200">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-up">
            <Link to="/courses">
              <Button
                size="lg"
                className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-8 py-6 group shadow-lg dark:bg-gray-800 dark:text-blue-400 dark:hover:bg-gray-700"
              >
                Join Now
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to="/contact">
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-blue-600 dark:border-white text-blue-600 dark:text-white hover:bg-blue-600 dark:hover:bg-white hover:text-white dark:hover:text-blue-600 text-lg px-8 py-6 transition-all duration-300"
              >
                Contact Us
              </Button>
            </Link>
          </div>

          {/* Community Features */}
          <div className="grid md:grid-cols-3 gap-6 mt-16 animate-fade-in">
            {[
              {
                icon: Users,
                title: "Networking Events",
                description: "Regular meetups and workshops"
              },
              {
                icon: Sparkles,
                title: "Exclusive Resources",
                description: "Access to premium tools and content"
              },
              {
                icon: ArrowRight,
                title: "Career Growth",
                description: "Job opportunities and collaborations"
              }
            ].map((feature, index) => (
              <div key={index} className="text-center p-6 rounded-xl bg-white/80 dark:bg-gray-800/50 backdrop-blur-sm border border-blue-200 dark:border-white/20 shadow-lg">
                <feature.icon className="w-8 h-8 text-blue-600 dark:text-white mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-600 dark:text-blue-100">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default JoinCommunity;