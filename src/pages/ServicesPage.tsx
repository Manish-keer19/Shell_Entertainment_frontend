import { Share2, TrendingUp, Palette, Users, Briefcase, ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import SEO from "@/components/SEO";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const ServicesPage = () => {
  const services = [
    {
      icon: Share2,
      title: "Social Media Strategy",
      description: "Comprehensive social media planning and execution to grow your online presence and engage your target audience effectively.",
      features: [
        "Content Strategy Development",
        "Platform-specific Optimization",
        "Audience Analysis & Targeting",
        "Performance Analytics & Reporting",
        "Community Management",
        "Hashtag Research & Strategy"
      ],
      gradient: "from-blue-500 to-blue-600"
    },
    {
      icon: TrendingUp,
      title: "Digital Marketing",
      description: "Data-driven marketing campaigns that deliver measurable results and maximize your return on investment across all digital channels.",
      features: [
        "Search Engine Optimization (SEO)",
        "Pay-Per-Click (PPC) Advertising",
        "Email Marketing Campaigns",
        "Conversion Rate Optimization",
        "Marketing Automation",
        "ROI Tracking & Analysis"
      ],
      gradient: "from-purple-500 to-purple-600"
    },
    {
      icon: Palette,
      title: "Graphic Designing",
      description: "Creative visual solutions that capture your brand's essence and engage audiences with stunning, professional designs.",
      features: [
        "Brand Identity Design",
        "Social Media Graphics",
        "Print Design Materials",
        "Web Design Elements",
        "Packaging Design",
        "Motion Graphics"
      ],
      gradient: "from-blue-600 to-purple-500"
    },
    {
      icon: Users,
      title: "Influencer Management",
      description: "Strategic influencer partnerships to amplify your brand reach, build credibility, and connect with your target audience authentically.",
      features: [
        "Influencer Discovery & Vetting",
        "Campaign Strategy & Planning",
        "Contract Negotiation",
        "Content Collaboration",
        "Performance Monitoring",
        "Relationship Management"
      ],
      gradient: "from-purple-600 to-blue-500"
    },
    {
      icon: Briefcase,
      title: "Branding & Campaigns",
      description: "Complete brand identity development and integrated campaign management services to establish and grow your market presence.",
      features: [
        "Brand Strategy Development",
        "Logo & Visual Identity",
        "Brand Guidelines Creation",
        "Campaign Conceptualization",
        "Multi-channel Execution",
        "Brand Monitoring & Management"
      ],
      gradient: "from-blue-500 to-purple-600"
    }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <SEO 
        title="Our Services - Shell Entertainment | Digital Marketing & Creative Solutions"
        description="Explore Shell Entertainment's comprehensive digital services: Social Media Strategy, Digital Marketing, Graphic Design, Influencer Management, and Branding & Campaigns. Get started today!"
        keywords="digital marketing services, social media strategy, graphic design, influencer management, branding campaigns, digital agency Mumbai, creative solutions"
      />
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-blue-50 via-purple-50 to-white dark:from-gray-900 dark:via-blue-900 dark:to-gray-800">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                What We Offer
              </span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-3xl mx-auto">
              Comprehensive digital solutions designed to elevate your brand, engage your audience, 
              and drive measurable growth across all platforms.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid gap-12">
              {services.map((service, index) => (
                <Card
                  key={index}
                  className="group hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 bg-gray-50 dark:bg-gray-800 hover:bg-white dark:hover:bg-gray-700"
                >
                  <CardHeader className="pb-6">
                    <div className="flex items-start gap-6">
                      <div className={`w-20 h-20 rounded-2xl bg-gradient-to-r ${service.gradient} flex items-center justify-center group-hover:scale-110 transition-transform duration-300 flex-shrink-0`}>
                        <service.icon className="w-10 h-10 text-white" />
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-2xl text-gray-800 dark:text-white group-hover:text-blue-600 transition-colors mb-3">
                          {service.title}
                        </CardTitle>
                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                          {service.description}
                        </p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="grid md:grid-cols-2 gap-4">
                      {service.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-3">
                          <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                          <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                        </div>
                      ))}
                    </div>
                    <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                      <Button 
                        className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white group/btn"
                      >
                        Get Started
                        <ArrowRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-6">
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Our Process
                </span>
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                A streamlined approach to deliver exceptional results for every project
              </p>
            </div>
            
            <div className="grid md:grid-cols-4 gap-8">
              {[
                {
                  step: "01",
                  title: "Discovery",
                  description: "Understanding your goals, audience, and requirements"
                },
                {
                  step: "02", 
                  title: "Strategy",
                  description: "Developing a comprehensive plan tailored to your needs"
                },
                {
                  step: "03",
                  title: "Execution",
                  description: "Implementing the strategy with precision and creativity"
                },
                {
                  step: "04",
                  title: "Optimization",
                  description: "Continuous monitoring and improvement for best results"
                }
              ].map((process, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg mx-auto mb-4">
                    {process.step}
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3">{process.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{process.description}</p>
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
              Start Your Project With Us
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Ready to transform your brand and achieve your digital goals? Let's discuss how 
              Shell Entertainment can help you succeed.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg"
                className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-8 py-6 group"
              >
                Get Free Consultation
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button 
                size="lg"
                variant="outline"
                className="border-2 border-white text-white hover:bg-white hover:text-blue-600 text-lg px-8 py-6"
              >
                View Portfolio
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ServicesPage;