import SEO from "@/components/SEO";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import WhyChooseShell from "@/components/WhyChooseShell";
import Services from "@/components/Services";
import CoursesSection from "@/components/CoursesSection";
import ShellStudio from "@/components/ShellStudio";
import Portfolio from "@/components/Portfolio";
import Testimonials from "@/components/Testimonials";
import JoinCommunity from "@/components/JoinCommunity";
import Footer from "@/components/Footer";
import AllCourses from "./Course/AllCourses";
import FeaturedCourses from "./Course/FeaturedCourses";

const Index = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <SEO 
        title="Shell Entertainment - Entertainment Reimagined for the Future"
        description="Shell Entertainment empowers creators, learners, and dreamers to grow through creativity. We offer social media strategy, digital marketing, graphic design, influencer management, branding & campaigns, and comprehensive learning programs."
        keywords="shell entertainment, digital marketing, social media strategy, graphic design, influencer management, creative courses, branding, campaigns, Mumbai, entertainment company"
      />
      <Navbar />
      <Hero />
      <About />
      <WhyChooseShell />
      <Services />
      <FeaturedCourses />
      <ShellStudio />
      <Portfolio />
      <Testimonials />
      <JoinCommunity />
      <Footer />
    </div>
  );
};

export default Index;
