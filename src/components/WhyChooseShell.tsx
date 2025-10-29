import { BookOpen, TrendingUp, Users, Award } from "lucide-react";

const WhyChooseShell = () => {
  const features = [
    {
      icon: BookOpen,
      title: "Easy Learning",
      description: "Simplified learning paths designed for creators of all levels with hands-on practical experience.",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: TrendingUp,
      title: "Creative Growth",
      description: "Accelerate your creative journey with proven strategies and industry-leading techniques.",
      color: "from-purple-500 to-purple-600"
    },
    {
      icon: Users,
      title: "Expert Support",
      description: "Get guidance from industry professionals and experienced mentors throughout your journey.",
      color: "from-blue-600 to-purple-500"
    },
    {
      icon: Award,
      title: "Community of Creators",
      description: "Join a vibrant community of like-minded creators and build lasting professional connections.",
      color: "from-purple-600 to-blue-500"
    }
  ];

  return (
    <section className="py-24 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Heading */}
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Why Choose Shell
              </span>
            </h2>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group p-8 rounded-2xl bg-gray-50 dark:bg-gray-800 hover:bg-white dark:hover:bg-gray-700 border border-gray-100 dark:border-gray-700 hover:border-blue-200 dark:hover:border-blue-600 transition-all duration-300 hover:shadow-lg animate-fade-in-up"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className={`w-16 h-16 rounded-xl bg-gradient-to-r ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4 group-hover:text-blue-600 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseShell;