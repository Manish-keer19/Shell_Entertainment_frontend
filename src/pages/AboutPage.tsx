import { ArrowRight, Target, Users, Award, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import SEO from "@/components/SEO";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Logo from "../assets/logo.jpg";

const AboutPage = () => {
  const milestones = [
    {
      year: "2024",
      title: "Shell Entertainment Founded",
      description: "Started our journey to empower creators and dreamers"
    },
    {
      year: "2024",
      title: "MSME Verification",
      description: "Officially recognized and verified by MSME"
    },
    {
      year: "2024",
      title: "100+ Projects Completed",
      description: "Successfully delivered creative solutions to clients"
    },
    {
      year: "2024",
      title: "Community Growth",
      description: "Built a thriving community of creators and learners"
    },
    {
      year: "2025",
      title: "Launched Shell Studio",
      description: "Introduced AI-powered creative tools revolutionizing content creation"
    }
  ];

  const team = [
    {
      name: "Amit Patel",
      role: "Founder & CEO",
      image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=300&h=300&fit=crop&crop=face",
      description: "Visionary leader driving creative innovation"
    },
    {
      name: "Priya Sharma",
      role: "Head of Marketing",
      image: "https://images.unsplash.com/photo-1556228453-efd7e5e4c7b5?w=300&h=300&fit=crop&crop=face", 
      description: "Expert in digital marketing and brand growth"
    },
    {
      name: "Rajesh Kumar",
      role: "Creative Director",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=300&h=300&fit=crop&crop=face", 
      description: "Master of visual storytelling and design"
    },
    {
      name: "Neha Desai",
      role: "Community Manager",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face",
      description: "Building and nurturing our creative community"
    }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <SEO 
        title="About Us - Shell Entertainment | Our Story & Mission"
        description="Learn about Shell Entertainment's journey, mission, and vision. Meet our team of creative professionals dedicated to empowering creators and dreamers through innovative digital solutions."
        keywords="about shell entertainment, our story, mission, vision, team, creative professionals, digital agency Mumbai"
      />
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-blue-50 via-purple-50 to-white dark:from-gray-900 dark:via-blue-900 dark:to-gray-800">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-mobile-4xl md:text-5xl lg:text-6xl font-bold mb-6 font-heading">
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
                Our Story
              </span>
            </h1>
            <p className="text-mobile-lg md:text-xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-3xl mx-auto font-body">
              Shell Entertainment was born from a vision to bridge the gap between creativity and technology, 
              empowering creators, learners, and dreamers to achieve their full potential through innovative 
              digital solutions.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-24 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16 items-center mb-16">
              <div className="space-y-8">
                <div>
                  <h2 className="text-mobile-2xl md:text-3xl font-bold text-gray-800 dark:text-white mb-4 font-heading">Our Mission</h2>
                  <p className="text-mobile-base md:text-lg text-gray-600 dark:text-gray-300 leading-relaxed font-body">
                    To empower creators, learners, and dreamers by providing innovative digital solutions, 
                    comprehensive learning programs, and a supportive community that fosters growth and creativity.
                  </p>
                </div>
                <div>
                  <h2 className="text-mobile-2xl md:text-3xl font-bold text-gray-800 dark:text-white mb-4 font-heading">Our Vision</h2>
                  <p className="text-mobile-base md:text-lg text-gray-600 dark:text-gray-300 leading-relaxed font-body">
                    To become India's leading creative entertainment company, known for transforming ideas into 
                    impactful digital experiences and nurturing the next generation of creative professionals.
                  </p>
                </div>
              </div>
              <div className="relative">
                <div className="aspect-square rounded-2xl bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 p-8 flex items-center justify-center">
                  <img src={Logo} alt="Shell Entertainment" className="w-48 h-48 rounded-full" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-mobile-3xl md:text-4xl font-bold mb-6 font-heading">
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
                  Our Journey
                </span>
              </h2>
            </div>
            
            <div className="space-y-8">
              {milestones.map((milestone, index) => (
                <div key={index} className="flex items-start gap-6 p-6 bg-white dark:bg-gray-700 rounded-xl shadow-sm">
                  <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                    <Calendar className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <div className="text-mobile-sm md:text-sm font-medium text-blue-600 dark:text-blue-400 mb-1 font-body">{milestone.year}</div>
                    <h3 className="text-mobile-lg md:text-xl font-bold text-gray-800 dark:text-white mb-2 font-heading">{milestone.title}</h3>
                    <p className="text-mobile-sm md:text-base text-gray-600 dark:text-gray-300 font-body">{milestone.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-mobile-3xl md:text-4xl font-bold mb-6 font-heading">
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
                  Meet Our Team
                </span>
              </h2>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {team.map((member, index) => (
                <div key={index} className="text-center group">
                  <div className="relative mb-6">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-32 h-32 rounded-full mx-auto object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 w-32 h-32 rounded-full mx-auto bg-gradient-to-r from-blue-600/20 to-purple-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <h3 className="text-mobile-base md:text-lg font-bold text-gray-800 dark:text-white mb-1 font-heading">{member.name}</h3>
                  <p className="text-mobile-sm md:text-base text-blue-600 dark:text-blue-400 font-medium mb-2 font-body">{member.role}</p>
                  <p className="text-mobile-xs md:text-sm text-gray-600 dark:text-gray-300 font-body">{member.description}</p>
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
            <h2 className="text-mobile-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 font-heading">
              Be Part of Our Story
            </h2>
            <p className="text-mobile-base md:text-xl text-blue-100 mb-8 max-w-2xl mx-auto font-body">
              Join Shell Entertainment and become part of India's fastest growing creative community. 
              Let's create something amazing together.
            </p>
            <Button 
              size="lg"
              className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-8 py-6 group"
            >
              Join Shell
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AboutPage;