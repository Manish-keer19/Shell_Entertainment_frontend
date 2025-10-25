import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import Facilities from "@/components/Facilities";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import CoursesList from "./Course/CoursesList";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <About />
      <Services />
      <CoursesList/>
      <Facilities />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
