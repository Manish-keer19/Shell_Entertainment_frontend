import { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Course = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [videoWatched, setVideoWatched] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answers, setAnswers] = useState<number[]>([]);

  useEffect(() => {
    const isAuth = localStorage.getItem("isAuthenticated");
    if (!isAuth) {
      navigate("/auth");
    }
  }, [navigate]);

  const courseData = {
    1: {
      title: "Social Media Management",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    },
    2: {
      title: "Digital Marketing",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    },
    3: {
      title: "Content Creation & Video Editing",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    },
  }[courseId as string] || { title: "Course", videoUrl: "" };

  const questions = Array.from({ length: 20 }, (_, i) => ({
    id: i + 1,
    question: `Question ${i + 1}: What is the best practice for ${
      i % 2 === 0 ? "social media engagement" : "content creation"
    }?`,
    options: [
      "Post consistently with quality content",
      "Buy followers and engagement",
      "Copy competitors' content",
      "Focus only on self-promotion",
    ],
    correct: 0,
  }));

  const handleVideoEnd = () => {
    setVideoWatched(true);
    toast({
      title: "Video completed!",
      description: "You can now take the quiz.",
    });
  };

  const handleStartQuiz = () => {
    setShowQuiz(true);
  };

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
  };

  const handleNextQuestion = () => {
    if (selectedAnswer === null) return;

    const newAnswers = [...answers, selectedAnswer];
    setAnswers(newAnswers);

    if (selectedAnswer === questions[currentQuestion].correct) {
      setScore(score + 1);
    }

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
    } else {
      // Quiz completed
      const finalScore = selectedAnswer === questions[currentQuestion].correct ? score + 1 : score;
      const percentage = (finalScore / questions.length) * 100;

      if (percentage >= 70) {
        navigate(`/certificate/${courseId}`, {
          state: { score: finalScore, total: questions.length, courseName: courseData.title },
        });
      } else {
        toast({
          title: "Quiz not passed",
          description: `You scored ${finalScore}/${questions.length}. You need at least 70% to pass. Please try again.`,
          variant: "destructive",
        });
        setTimeout(() => {
          setShowQuiz(false);
          setCurrentQuestion(0);
          setScore(0);
          setAnswers([]);
          setSelectedAnswer(null);
        }, 3000);
      }
    }
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-shell-darker via-shell-dark to-shell-dark">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-lg">
        <div className="container mx-auto px-4 py-4">
          <Link to="/dashboard" className="inline-flex items-center text-primary hover:text-accent transition-colors">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Courses
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {!showQuiz ? (
            <Card className="bg-card/80 backdrop-blur-lg border-border animate-fade-in">
              <CardHeader>
                <CardTitle className="text-3xl text-foreground">{courseData.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Video Player */}
                <div className="aspect-video rounded-lg overflow-hidden bg-black">
                  <iframe
                    src={courseData.videoUrl}
                    title={courseData.title}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    onLoad={() => {
                      // Simulate video completion for demo
                      setTimeout(() => setVideoWatched(true), 5000);
                    }}
                  />
                </div>

                {/* Video Status */}
                {videoWatched ? (
                  <div className="flex items-center justify-center gap-2 text-green-500">
                    <CheckCircle2 className="w-5 h-5" />
                    <span>Video completed</span>
                  </div>
                ) : (
                  <div className="text-center text-muted-foreground">
                    Watch the complete video to unlock the quiz
                  </div>
                )}

                {/* Start Quiz Button */}
                <Button
                  onClick={handleStartQuiz}
                  disabled={!videoWatched}
                  className="w-full bg-gradient-to-r from-primary to-accent hover:shadow-gold disabled:opacity-50 disabled:cursor-not-allowed"
                  size="lg"
                >
                  Start Quiz (20 Questions)
                </Button>
              </CardContent>
            </Card>
          ) : (
            <Card className="bg-card/80 backdrop-blur-lg border-border animate-scale-in">
              <CardHeader>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-2xl text-foreground">
                      Question {currentQuestion + 1} of {questions.length}
                    </CardTitle>
                    <span className="text-lg text-primary font-semibold">
                      Score: {score}/{currentQuestion}
                    </span>
                  </div>
                  <Progress value={progress} className="h-2" />
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-xl text-foreground">{questions[currentQuestion].question}</p>

                <div className="space-y-3">
                  {questions[currentQuestion].options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleAnswerSelect(index)}
                      className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
                        selectedAnswer === index
                          ? "border-primary bg-primary/10"
                          : "border-border hover:border-primary/50"
                      }`}
                    >
                      <span className="text-foreground">{option}</span>
                    </button>
                  ))}
                </div>

                <Button
                  onClick={handleNextQuestion}
                  disabled={selectedAnswer === null}
                  className="w-full bg-gradient-to-r from-primary to-accent hover:shadow-gold disabled:opacity-50"
                  size="lg"
                >
                  {currentQuestion < questions.length - 1 ? "Next Question" : "Finish Quiz"}
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default Course;
