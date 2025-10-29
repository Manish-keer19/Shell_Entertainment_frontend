import { Mail, Phone, MapPin, Clock, Send, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import SEO from "@/components/SEO";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const ContactPage = () => {
  const contactInfo = [
    {
      icon: Mail,
      title: "Email Us",
      details: "shellentertainment30@gmail.com",
      description: "Send us an email anytime",
      link: "mailto:shellentertainment30@gmail.com"
    },
    {
      icon: Phone,
      title: "Call Us",
      details: "+91 8003570024",
      description: "Mon-Sat from 9am to 6pm",
      link: "tel:+918003570024"
    },
    {
      icon: MapPin,
      title: "Visit Us",
      details: "Indore, Madhya Pradesh",
      description: "India",
      link: "#"
    },
    {
      icon: Clock,
      title: "Working Hours",
      details: "Mon - Sat: 9:00 AM - 6:00 PM",
      description: "Sunday: Closed",
      link: "#"
    }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <SEO 
        title="Contact Us - Shell Entertainment | Get In Touch Today"
        description="Contact Shell Entertainment for digital marketing, creative services, and learning programs. Reach us via email, phone, or WhatsApp. Located in Indore, Madhya Pradesh, India."
        keywords="contact shell entertainment, digital marketing agency Indore, creative services contact, get in touch, WhatsApp contact, email contact"
      />
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-blue-50 via-purple-50 to-white dark:from-gray-900 dark:via-blue-900 dark:to-gray-800">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Let's Connect
              </span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-3xl mx-auto">
              Ready to transform your creative vision into reality? Get in touch with our team and 
              let's discuss how Shell Entertainment can help you achieve your goals.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
              {contactInfo.map((info, index) => (
                <Card key={index} className="text-center hover:shadow-lg transition-all duration-300 border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600">
                  <CardHeader className="pb-4">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                      <info.icon className="w-8 h-8 text-white" />
                    </div>
                    <CardTitle className="text-lg text-gray-800 dark:text-white">{info.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    {info.link !== "#" ? (
                      <a href={info.link} className="block">
                        <p className="font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-500 mb-2">{info.details}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-300">{info.description}</p>
                      </a>
                    ) : (
                      <>
                        <p className="font-semibold text-gray-800 dark:text-white mb-2">{info.details}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-300">{info.description}</p>
                      </>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form & Map */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <div>
                <div className="mb-8">
                  <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">Send us a Message</h2>
                  <p className="text-gray-600 dark:text-gray-300">
                    Fill out the form below and we'll get back to you within 24 hours.
                  </p>
                </div>
                
                <form className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        First Name *
                      </label>
                      <Input 
                        type="text" 
                        placeholder="Enter your first name"
                        className="w-full"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Last Name *
                      </label>
                      <Input 
                        type="text" 
                        placeholder="Enter your last name"
                        className="w-full"
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Email Address *
                    </label>
                    <Input 
                      type="email" 
                      placeholder="Enter your email address"
                      className="w-full"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Phone Number
                    </label>
                    <Input 
                      type="tel" 
                      placeholder="Enter your phone number"
                      className="w-full"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Subject *
                    </label>
                    <Input 
                      type="text" 
                      placeholder="What's this about?"
                      className="w-full"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Message *
                    </label>
                    <Textarea 
                      placeholder="Tell us more about your project or inquiry..."
                      className="w-full h-32 resize-none"
                      required
                    />
                  </div>
                  
                  <Button 
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 group"
                  >
                    Send Message
                    <Send className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </form>
              </div>

              {/* Map & Additional Info */}
              <div className="space-y-8">
                {/* Google Map Placeholder */}
                <div>
                  <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Find Us</h3>
                  <div className="aspect-video bg-gray-200 dark:bg-gray-700 rounded-xl flex items-center justify-center">
                    <div className="text-center">
                      <MapPin className="w-12 h-12 text-gray-400 dark:text-gray-500 mx-auto mb-2" />
                      <p className="text-gray-500 dark:text-gray-400">Interactive Map</p>
                      <p className="text-sm text-gray-400 dark:text-gray-500">Indore, Madhya Pradesh, India</p>
                    </div>
                  </div>
                </div>

                {/* Quick Contact Options */}
                <div>
                  <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Quick Contact</h3>
                  <div className="space-y-4">
                    <a
                      href="https://wa.me/918003570024?text=Hi%20Shell%20Entertainment%20Team!%20I%20want%20to%20know%20about%20your%20services."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-4 p-4 bg-green-50 dark:bg-green-900/20 hover:bg-green-100 dark:hover:bg-green-800/20 rounded-xl transition-colors group"
                    >
                      <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                        <MessageCircle className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800 dark:text-white group-hover:text-green-600 dark:group-hover:text-green-400">
                          WhatsApp Chat
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-300">Get instant response</p>
                      </div>
                    </a>
                    
                    <a
                      href="mailto:shellentertainment30@gmail.com"
                      className="flex items-center gap-4 p-4 bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-800/20 rounded-xl transition-colors group"
                    >
                      <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                        <Mail className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800 dark:text-white group-hover:text-blue-600">
                          Email Direct
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-300">shellentertainment30@gmail.com</p>
                      </div>
                    </a>
                    
                    <a
                      href="tel:+918003570024"
                      className="flex items-center gap-4 p-4 bg-purple-50 dark:bg-purple-900/20 hover:bg-purple-100 dark:hover:bg-purple-800/20 rounded-xl transition-colors group"
                    >
                      <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center">
                        <Phone className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800 dark:text-white group-hover:text-purple-600">
                          Call Now
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-300">+91 8003570024</p>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-6">
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Frequently Asked Questions
                </span>
              </h2>
            </div>
            
            <div className="space-y-6">
              {[
                {
                  question: "What services does Shell Entertainment offer?",
                  answer: "We offer comprehensive digital solutions including social media strategy, digital marketing, graphic design, influencer management, and branding & campaigns."
                },
                {
                  question: "How long does a typical project take?",
                  answer: "Project timelines vary based on scope and complexity. Most projects are completed within 2-8 weeks. We'll provide a detailed timeline during our initial consultation."
                },
                {
                  question: "Do you offer ongoing support after project completion?",
                  answer: "Yes, we provide ongoing support and maintenance packages to ensure your continued success. We're here to help you grow long-term."
                },
                {
                  question: "Can I enroll in multiple courses at once?",
                  answer: "Absolutely! We offer bundle discounts for multiple course enrollments. Contact us to learn about our special packages."
                }
              ].map((faq, index) => (
                <div key={index} className="p-6 bg-gray-50 dark:bg-gray-800 rounded-xl">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">{faq.question}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ContactPage;