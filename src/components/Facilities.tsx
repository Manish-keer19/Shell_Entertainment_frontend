import { Video, Image, Calendar, Music2, BarChart3 } from "lucide-react";

const Facilities = () => {
  const facilities = [
    {
      icon: Video,
      title: "Video & Editing Suite",
      description: "Professional video production and post-production facilities",
    },
    {
      icon: Image,
      title: "Poster & Graphic Design Studio",
      description: "Creative design workspace with latest tools and software",
    },
    {
      icon: Calendar,
      title: "Event Management Unit",
      description: "Complete event planning and execution infrastructure",
    },
    {
      icon: Music2,
      title: "Music Production Setup",
      description: "State-of-the-art recording and production equipment",
    },
    {
      icon: BarChart3,
      title: "Marketing Strategy Hub",
      description: "Analytics and campaign management center",
    },
  ];

  return (
    <section id="facilities" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Our Facilities
            </span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto mb-6" />
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Every idea needs the right tools — and we've got them all
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {facilities.map((facility, index) => (
            <div
              key={index}
              className="p-8 rounded-xl bg-card border border-border hover:border-primary transition-all duration-300 hover:shadow-blue group animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <facility.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                {facility.title}
              </h3>
              <p className="text-muted-foreground">{facility.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Facilities;
