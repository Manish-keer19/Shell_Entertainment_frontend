import { Share2, Palette, TrendingUp, Users, ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const CoursesSection = () => {
  const courses = [
    {
      icon: Share2,
      title: "Social Media Strategy & Growth",
      description: "Master the art of social media marketing and grow your online presence organically.",
      duration: "8 weeks",
      level: "Beginner to Advanced",
      price: "₹4,999",
      gradient: "from-blue-500 to-blue-600"
    },
    {
      icon: Palette,
      title: "Creative Design & Branding",
      description: "Learn professional design principles and create stunning visual content for brands.",
      duration: "6 weeks", 
      level: "Intermediate",
      price: "₹3,999",
      gradient: "from-purple-500 to-purple-600"
    },
    {
      icon: Users,
      title: "Personal Development",
      description: "Develop leadership skills and personal branding for career advancement.",
      duration: "4 weeks",
      level: "All Levels",
      price: "₹2,999",
      gradient: "from-blue-600 to-purple-500"
    },
    {
      icon: TrendingUp,
      title: "Digital Marketing Fundamentals",
      description: "Comprehensive digital marketing course covering all major platforms and strategies.",
      duration: "10 weeks",
      level: "Beginner",
      price: "₹5,999",
      gradient: "from-purple-600 to-blue-500"
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
                Shell Learning Programs
              </span>
            </h2>
          </div>

          {/* Courses Grid */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {courses.map((course, index) => (
              <Card
                key={index}
                className="group hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 bg-gray-50 dark:bg-gray-800 hover:bg-white dark:hover:bg-gray-700 animate-fade-in-up"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-16 h-16 rounded-xl bg-gradient-to-r ${course.gradient} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                      <course.icon className="w-8 h-8 text-white" />
                    </div>
                    <Badge variant="secondary" className="bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300">
                      {course.level}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl text-gray-800 dark:text-white group-hover:text-blue-600 transition-colors mb-2">
                    {course.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                    {course.description}
                  </p>
                  
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                      <span>📅 {course.duration}</span>
                    </div>
                    <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                      {course.price}
                    </div>
                  </div>

                  <Button 
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white group/btn"
                  >
                    Join Now
                    <ArrowRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CoursesSection;