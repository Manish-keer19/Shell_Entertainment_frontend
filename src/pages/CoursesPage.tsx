import { Share2, Palette, TrendingUp, Users, ArrowRight, Clock, Users as UsersIcon, Award, Star } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import SEO from "@/components/SEO";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const CoursesPage = () => {
  const courses = [
    {
      icon: Share2,
      title: "Social Media Strategy & Growth",
      description: "Master the art of social media marketing and grow your online presence organically with proven strategies and techniques.",
      duration: "8 weeks",
      level: "Beginner to Advanced",
      price: "₹4,999",
      originalPrice: "₹7,999",
      students: "500+",
      rating: 4.8,
      gradient: "from-blue-500 to-blue-600",
      features: [
        "Content creation strategies",
        "Platform-specific optimization",
        "Analytics and insights",
        "Community building",
        "Influencer collaboration",
        "Monetization techniques"
      ]
    },
    {
      icon: Palette,
      title: "Creative Design & Branding",
      description: "Learn professional design principles and create stunning visual content for brands, social media, and digital platforms.",
      duration: "6 weeks", 
      level: "Intermediate",
      price: "₹3,999",
      originalPrice: "₹5,999",
      students: "350+",
      rating: 4.9,
      gradient: "from-purple-500 to-purple-600",
      features: [
        "Design fundamentals",
        "Brand identity creation",
        "Adobe Creative Suite",
        "Typography and color theory",
        "Logo and poster design",
        "Portfolio development"
      ]
    },
    {
      icon: Users,
      title: "Personal Development",
      description: "Develop leadership skills and personal branding for career advancement in the creative and digital industry.",
      duration: "4 weeks",
      level: "All Levels",
      price: "₹2,999",
      originalPrice: "₹4,499",
      students: "200+",
      rating: 4.7,
      gradient: "from-blue-600 to-purple-500",
      features: [
        "Leadership skills",
        "Personal branding",
        "Communication mastery",
        "Goal setting and planning",
        "Networking strategies",
        "Career advancement"
      ]
    },
    {
      icon: TrendingUp,
      title: "Digital Marketing Fundamentals",
      description: "Comprehensive digital marketing course covering all major platforms, strategies, and tools for business growth.",
      duration: "10 weeks",
      level: "Beginner",
      price: "₹5,999",
      originalPrice: "₹8,999",
      students: "750+",
      rating: 4.8,
      gradient: "from-purple-600 to-blue-500",
      features: [
        "SEO and SEM strategies",
        "Social media advertising",
        "Email marketing",
        "Content marketing",
        "Analytics and reporting",
        "Conversion optimization"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <SEO 
        title="Courses - Shell Entertainment | Learn Digital Marketing & Creative Skills"
        description="Enroll in Shell Entertainment's comprehensive learning programs: Social Media Strategy, Creative Design, Personal Development, and Digital Marketing. Learn from industry experts and grow your career."
        keywords="digital marketing courses, social media courses, graphic design training, creative courses, online learning, skill development, career growth, Mumbai courses"
      />
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-blue-50 via-purple-50 to-white dark:from-gray-900 dark:via-blue-900 dark:to-gray-800">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Learn, Create, and Grow
              </span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-3xl mx-auto">
              Transform your creative potential with our comprehensive learning programs designed by industry experts. 
              Join thousands of successful creators who've accelerated their careers with Shell Entertainment.
            </p>
          </div>
        </div>
      </section>

      {/* Courses Grid */}
      <section className="py-24 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8 mb-16">
              {courses.map((course, index) => (
                <Card
                  key={index}
                  className="group hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 bg-gray-50 dark:bg-gray-800 hover:bg-white dark:hover:bg-gray-700"
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
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                      {course.description}
                    </p>
                    
                    {/* Course Stats */}
                    <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-4">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{course.duration}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <UsersIcon className="w-4 h-4" />
                        <span>{course.students}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span>{course.rating}</span>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="pt-0">
                    {/* Features */}
                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-800 dark:text-white mb-3">What you'll learn:</h4>
                      <ul className="space-y-2">
                        {course.features.slice(0, 4).map((feature, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-300">
                            <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    {/* Pricing */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">{course.price}</span>
                        <span className="text-lg text-gray-400 line-through">{course.originalPrice}</span>
                      </div>
                      <Badge className="bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300">
                        Limited Time Offer
                      </Badge>
                    </div>

                    <Button 
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white group/btn"
                    >
                      Enroll Now
                      <ArrowRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Our Courses */}
      <section className="py-24 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-6">
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Why Choose Shell Learning
                </span>
              </h2>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: Award,
                  title: "Industry Experts",
                  description: "Learn from professionals with years of real-world experience"
                },
                {
                  icon: Users,
                  title: "Community Support",
                  description: "Join a vibrant community of learners and get peer support"
                },
                {
                  icon: TrendingUp,
                  title: "Career Growth",
                  description: "Get job placement assistance and career guidance"
                }
              ].map((benefit, index) => (
                <div key={index} className="text-center p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-sm">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-6">
                    <benefit.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3">{benefit.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Start Learning?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Join thousands of successful creators and take the first step towards your dream career. 
              Get started with any course today and unlock your creative potential.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg"
                className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-8 py-6 group"
              >
                Browse All Courses
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button 
                size="lg"
                variant="outline"
                className="border-2 border-white text-white hover:bg-white hover:text-blue-600 text-lg px-8 py-6"
              >
                Free Trial Class
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CoursesPage;