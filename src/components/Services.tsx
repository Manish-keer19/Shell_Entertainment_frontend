import { Instagram, Youtube, Briefcase, Palette, TrendingUp, Music, Film } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Services = () => {
  const services = [
    {
      icon: Instagram,
      title: "Social Media Growth",
      tagline: "Your audience isn't just numbers — it's your tribe",
      features: [
        "Instagram Views, Likes, Comments",
        "YouTube Growth & Monetization",
        "Facebook Page Optimization",
        "Organic Reach & Analytics",
      ],
      gradient: "from-pink-500 to-purple-500",
    },
    {
      icon: Briefcase,
      title: "Shell Management",
      tagline: "Every event is a story — we make sure yours gets the standing ovation",
      features: [
        "Event Operations & Management",
        "Post-Sales Coordination",
        "On-Ground Execution",
        "End-to-End Event Solutions",
      ],
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      icon: Palette,
      title: "Shell Studio",
      tagline: "Design that feels good and tells your story",
      features: [
        "Poster & Banner Design",
        "Festival & Brand Posters",
        "Reels & Video Editing",
        "Creative Visual Content",
      ],
      gradient: "from-orange-500 to-red-500",
    },
    {
      icon: TrendingUp,
      title: "Shell Marketing",
      tagline: "Marketing with meaning — that's the Shell way",
      features: [
        "Influencer Collaborations",
        "Brand Promotion Campaigns",
        "Social Media Advertising",
        "Strategic Growth Planning",
      ],
      gradient: "from-green-500 to-emerald-500",
    },
    {
      icon: Music,
      title: "Shell Music",
      tagline: "Because every voice deserves to be heard",
      features: [
        "Launching New Artists",
        "Music Video Production",
        "YouTube Music Channel",
        "Song Distribution",
      ],
      gradient: "from-purple-500 to-pink-500",
    },
    {
      icon: Film,
      title: "Animation & Video",
      tagline: "Every frame tells a story",
      features: [
        "Motion Graphics",
        "Animated Explainer Videos",
        "2D/3D Animation",
        "Professional Video Production",
      ],
      gradient: "from-yellow-500 to-orange-500",
    },
  ];

  return (
    <section id="services" className="py-24 bg-card">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Our Services
            </span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto mb-6" />
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Comprehensive solutions to elevate your brand and reach
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {services.map((service, index) => (
            <Card
              key={index}
              className="group hover:shadow-blue transition-all duration-300 border-border hover:border-primary bg-background animate-scale-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardHeader>
                <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${service.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <service.icon className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-2xl text-foreground group-hover:text-primary transition-colors">
                  {service.title}
                </CardTitle>
                <CardDescription className="text-primary/80 italic font-medium">
                  "{service.tagline}"
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start text-muted-foreground">
                      <span className="text-primary mr-2">•</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
