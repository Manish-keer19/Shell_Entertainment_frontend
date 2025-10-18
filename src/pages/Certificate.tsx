import { useEffect, useRef } from "react";
import { useNavigate, useParams, useLocation, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Award, Download, Home } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Certificate = () => {
  const { courseId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const certificateRef = useRef<HTMLDivElement>(null);

  const { score, total, courseName } = location.state || {};

  useEffect(() => {
    const isAuth = localStorage.getItem("isAuthenticated");
    if (!isAuth || !score) {
      navigate("/dashboard");
    }
  }, [navigate, score]);

  const handleDownload = () => {
    toast({
      title: "Certificate downloaded!",
      description: "Your certificate has been saved to your device.",
    });
  };

  const percentage = Math.round((score / total) * 100);
  const currentDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-shell-darker via-shell-dark to-shell-dark py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Success Message */}
          <div className="text-center animate-fade-in">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center animate-scale-in">
              <Award className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Congratulations!
              </span>
            </h1>
            <p className="text-xl text-muted-foreground">
              You've successfully completed the course and passed the quiz with {percentage}%
            </p>
          </div>

          {/* Certificate */}
          <Card
            ref={certificateRef}
            className="p-12 bg-gradient-to-br from-card to-background border-2 border-primary relative overflow-hidden animate-scale-in"
          >
            {/* Decorative Elements */}
            <div className="absolute top-0 left-0 w-32 h-32 border-t-4 border-l-4 border-primary" />
            <div className="absolute top-0 right-0 w-32 h-32 border-t-4 border-r-4 border-primary" />
            <div className="absolute bottom-0 left-0 w-32 h-32 border-b-4 border-l-4 border-primary" />
            <div className="absolute bottom-0 right-0 w-32 h-32 border-b-4 border-r-4 border-primary" />

            <div className="text-center space-y-6 relative z-10">
              {/* Logo */}
              <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <span className="text-4xl font-bold text-shell-dark">S</span>
              </div>

              {/* Title */}
              <div>
                <h2 className="text-3xl font-bold text-primary mb-2">
                  Certificate of Completion
                </h2>
                <p className="text-sm text-muted-foreground">
                  This is to certify that
                </p>
              </div>

              {/* Recipient Name */}
              <div className="py-4 border-b-2 border-primary/30">
                <p className="text-4xl font-bold text-foreground">
                  [Student Name]
                </p>
              </div>

              {/* Course Details */}
              <div className="space-y-2">
                <p className="text-muted-foreground">
                  has successfully completed the course
                </p>
                <p className="text-2xl font-bold text-foreground">
                  {courseName}
                </p>
                <p className="text-muted-foreground">
                  with a score of {score} out of {total} ({percentage}%)
                </p>
              </div>

              {/* Date & Signature */}
              <div className="grid md:grid-cols-2 gap-8 pt-8">
                <div>
                  <div className="border-t-2 border-muted pt-2">
                    <p className="text-sm text-muted-foreground">Date</p>
                    <p className="font-semibold text-foreground">{currentDate}</p>
                  </div>
                </div>
                <div>
                  <div className="border-t-2 border-muted pt-2">
                    <p className="text-sm text-muted-foreground">Authorized By</p>
                    <p className="font-semibold text-foreground">Shell Entertainment</p>
                  </div>
                </div>
              </div>

              {/* MSME Badge */}
              <div className="pt-4">
                <p className="text-xs text-primary font-semibold">
                  MSME Verified | Shell Entertainment
                </p>
              </div>
            </div>
          </Card>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={handleDownload}
              size="lg"
              className="bg-gradient-to-r from-primary to-accent hover:shadow-gold"
            >
              <Download className="w-5 h-5 mr-2" />
              Download Certificate
            </Button>
            <Link to="/dashboard">
              <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary hover:text-shell-dark w-full sm:w-auto">
                <Home className="w-5 h-5 mr-2" />
                Back to Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Certificate;
