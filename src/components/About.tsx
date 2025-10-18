import { Target, Heart, Zap } from "lucide-react";
import Logo from "../assets/logo.jpg"

const About = () => {
  const values = [
    {
      icon: Target,
      title: "Purpose-Driven",
      description: "We blend traditional values with modern digital storytelling",
    },
    {
      icon: Heart,
      title: "Culture First",
      description: "Every story deserves its spotlight — we help you find it",
    },
    {
      icon: Zap,
      title: "Innovation",
      description: "From concept to execution, we craft experiences that resonate",
    },
  ];

  return (
    <section id="about" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Heading */}
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                About Shell Entertainment
              </span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto mb-8" />
          </div>

          {/* Main Content */}
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            {/* Left Column - Text */}
            <div className="space-y-6 animate-fade-in">
              <p className="text-lg text-muted-foreground leading-relaxed">
                Welcome to <span className="text-primary font-semibold">Shell Entertainment</span>,
                a house of creativity built on culture, rhythm, and innovation.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                We're a digital and entertainment agency that helps brands, creators, and artists
                grow organically across platforms like Instagram, YouTube, and Facebook.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Our purpose is simple — to blend traditional values with modern digital storytelling.
                From designing posters to managing influencer campaigns, we do it all with soul.
              </p>
              <div className="p-6 rounded-xl bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20">
                <p className="text-xl font-semibold text-foreground italic">
                  "Every story deserves its spotlight — we just help you find it."
                </p>
              </div>
            </div>

            {/* Right Column - Visual Element */}
            <div className="relative animate-scale-in">
              <div className="aspect-square rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 p-8 backdrop-blur-sm border border-primary/30">
                <div className="w-full h-full rounded-xl bg-card flex items-center justify-center relative overflow-hidden">
                  <div className="text-center p-8">
                    <div className="w-32 h-32 mx-auto mb-6 rounded-full  from-primary to-accent flex items-center justify-center animate-glow-pulse">
                      {/* <span className="text-6xl font-bold text-shell-dark">S</span> */}
                      <img src={Logo} alt="Logo" className="w-32 h-32 rounded-full" />
                    </div>
                    <h3 className="text-2xl font-bold text-foreground mb-2">
                      Shell Entertainment
                    </h3>
                    <p className="text-primary font-medium">
                      Creativity • Culture • Connection
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Values Grid */}
          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="p-8 rounded-xl bg-card border border-border hover:border-primary transition-all duration-300 hover:shadow-blue group animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <value.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">{value.title}</h3>
                <p className="text-muted-foreground">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
