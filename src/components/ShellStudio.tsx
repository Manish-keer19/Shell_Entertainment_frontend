import { Sparkles, ArrowRight, Palette, Video, Camera } from "lucide-react";
import { Button } from "@/components/ui/button";

const ShellStudio = () => {
  return (
    <section className="py-24 bg-gradient-to-br from-blue-50 via-purple-50 to-white dark:from-gray-900 dark:via-blue-900 dark:to-gray-800 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-blue-400/10 to-purple-400/10 rounded-full blur-3xl animate-glow-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-gradient-to-r from-purple-400/10 to-blue-400/10 rounded-full blur-3xl animate-glow-pulse delay-1000" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main Content */}
          <div className="mb-12 animate-fade-in-up">
            <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-blue-200 dark:border-blue-400 text-sm text-blue-600 dark:text-blue-400 shadow-lg mb-8">
              <Sparkles className="w-4 h-4" />
              <span className="font-medium">Introducing Shell Studio</span>
            </div>

            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Your Creative Studio,
              </span>
              <br />
              <span className="text-gray-800 dark:text-white">Always With You</span>
            </h2>

            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
              Experience the future of creative collaboration with Shell Studio - your AI-powered 
              creative companion that brings professional-grade tools to your fingertips.
            </p>

            <Button 
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white text-lg px-8 py-6 group shadow-lg"
            >
              Try Shell Studio
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>

          {/* Feature Icons */}
          <div className="grid grid-cols-3 gap-8 max-w-md mx-auto animate-fade-in">
            {[
              { icon: Palette, label: "Design Tools" },
              { icon: Video, label: "Video Editing" },
              { icon: Camera, label: "Content Creation" }
            ].map((feature, index) => (
              <div 
                key={index}
                className="flex flex-col items-center group animate-scale-in"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className="w-16 h-16 rounded-2xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-blue-200 dark:border-blue-600 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <feature.icon className="w-8 h-8 text-blue-600" />
                </div>
                <span className="text-sm font-medium text-gray-600 dark:text-gray-300">{feature.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShellStudio;