import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { GraduationCap, Play, Award, LogOut } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Dashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const isAuth = localStorage.getItem("isAuthenticated");
    if (!isAuth) {
      navigate("/auth");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    toast({
      title: "Logged out successfully",
      description: "See you soon!",
    });
    navigate("/");
  };

  const courses = [
    {
      id: 1,
      title: "Social Media Management",
      description: "Master Instagram, YouTube & Facebook growth strategies",
      duration: "2 hours",
      questions: 20,
      image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&h=400&fit=crop",
    },
    {
      id: 2,
      title: "Digital Marketing",
      description: "Learn modern marketing techniques and influencer collaborations",
      duration: "2.5 hours",
      questions: 20,
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop",
    },
    {
      id: 3,
      title: "Content Creation & Video Editing",
      description: "Create stunning content with professional editing skills",
      duration: "3 hours",
      questions: 20,
      image: "https://images.unsplash.com/photo-1492619375914-88005aa9e8fb?w=800&h=400&fit=crop",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-shell-light via-shell-lighter to-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-lg sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <span className="text-xl font-bold text-white">S</span>
              </div>
              <span className="text-xl font-bold text-foreground">Shell Entertainment</span>
            </Link>
            <Button
              variant="outline"
              size="sm"
              onClick={handleLogout}
              className="border-primary text-primary hover:bg-primary hover:text-white"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Welcome Section */}
          <div className="mb-12 text-center animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Certification Courses
              </span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Learn. Create. Grow. Get certified with Shell Entertainment
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {[
              { icon: GraduationCap, label: "Available Courses", value: "3" },
              { icon: Play, label: "Total Duration", value: "7.5 hrs" },
              { icon: Award, label: "Certificates", value: "0" },
            ].map((stat, index) => (
              <Card
                key={index}
                className="bg-card/80 backdrop-blur-lg border-border hover:border-primary transition-all duration-300 hover:shadow-blue animate-scale-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent className="flex items-center gap-4 p-6">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Courses Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course, index) => (
              <Card
                key={course.id}
                className="group bg-card/80 backdrop-blur-lg border-border hover:border-primary transition-all duration-300 hover:shadow-blue overflow-hidden animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                </div>
                <CardHeader>
                  <CardTitle className="text-xl text-foreground group-hover:text-primary transition-colors">
                    {course.title}
                  </CardTitle>
                  <CardDescription>{course.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>Duration: {course.duration}</span>
                    <span>{course.questions} Questions</span>
                  </div>
                  <Link to={`/course/${course.id}`}>
                    <Button className="w-full bg-gradient-to-r from-primary to-accent hover:shadow-blue">
                      Start Course
                      <Play className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
