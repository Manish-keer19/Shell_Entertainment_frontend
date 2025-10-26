import { useAppSelector } from "@/hooks/redux";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { BookOpen, Plus, Settings, User, Loader2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import { courseService } from "@/service/course.service";
import { useState, useEffect } from "react";

const Profile = () => {
  const { user, token, isLoading: authLoading } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();
  const [coursesWithProgress, setCoursesWithProgress] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/auth');
      return;
    }
    
    const fetchCoursesProgress = async () => {
      if (!user.courses || !token) return;
      
      setIsLoading(true);
      try {
        const coursesWithProgressData = await Promise.all(
          user.courses.map(async (course) => {
            try {
              const progressRes = await courseService.getFullCourseDetails(course._id, token);
              const completedVideos = progressRes.data?.completedVideos || [];
              const totalLectures = course.courseContent?.reduce((total, section) => 
                total + (section.subSection?.length || 0), 0) || 0;
              const progress = totalLectures > 0 ? (completedVideos.length / totalLectures) * 100 : 0;
              
              return {
                ...course,
                progress: Math.round(progress),
                completedLectures: completedVideos.length,
                totalLectures
              };
            } catch (error) {
              return {
                ...course,
                progress: 0,
                completedLectures: 0,
                totalLectures: 0
              };
            }
          })
        );
        setCoursesWithProgress(coursesWithProgressData);
      } catch (error) {
        console.error('Error fetching progress:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (user?.courses && token) {
      fetchCoursesProgress();
    }
  }, [user, token, navigate]);

  if (authLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-shell-light via-shell-lighter to-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const isAdmin = user.accountType === 'Admin';

  return (
    <div className="min-h-screen bg-gradient-to-br from-shell-light via-shell-lighter to-background">
      <Navbar/>
      <div className="max-w-6xl mx-auto px-4 py-8 pt-24">
        {/* Header */}
        <div className="mb-8">
          <Card className="bg-card/80 backdrop-blur-lg border-border">
            <CardHeader>
              <div className="flex items-center gap-4">
                <Avatar className="w-20 h-20">
                  <AvatarImage src={user.image} alt={user.fullNamme} />
                  <AvatarFallback>
                    <User className="w-8 h-8" />
                  </AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-2xl">{user.fullNamme}</CardTitle>
                  <CardDescription className="text-lg">{user.email}</CardDescription>
                  <Badge variant={isAdmin ? "default" : "secondary"} className="mt-2">
                    {user.accountType}
                  </Badge>
                </div>
              </div>
            </CardHeader>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="bg-card/80 backdrop-blur-lg border-border hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() => navigate('/dashboard')}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Dashboard
                </CardTitle>
                <CardDescription>
                  View your personalized dashboard
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-card/80 backdrop-blur-lg border-border hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() => navigate('/courses')}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5" />
                  All Courses
                </CardTitle>
                <CardDescription>
                  Browse and explore all available courses
                </CardDescription>
              </CardHeader>
            </Card>

            {isAdmin && (
              <>
                <Card className="bg-card/80 backdrop-blur-lg border-border hover:shadow-lg transition-shadow cursor-pointer"
                      onClick={() => navigate('/create-course')}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Plus className="w-5 h-5" />
                      Create Course
                    </CardTitle>
                    <CardDescription>
                      Create and publish new courses
                    </CardDescription>
                  </CardHeader>
                </Card>

                <Card className="bg-card/80 backdrop-blur-lg border-border hover:shadow-lg transition-shadow cursor-pointer"
                      onClick={() => navigate('/manage-courses')}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Settings className="w-5 h-5" />
                      Manage Courses
                    </CardTitle>
                    <CardDescription>
                      Edit and manage existing courses
                    </CardDescription>
                  </CardHeader>
                </Card>

                <Card className="bg-card/80 backdrop-blur-lg border-border hover:shadow-lg transition-shadow cursor-pointer"
                      onClick={() => navigate('/add-category')}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Plus className="w-5 h-5" />
                      Add Category
                    </CardTitle>
                    <CardDescription>
                      Add new course categories
                    </CardDescription>
                  </CardHeader>
                </Card>
              </>
            )}
          </div>
        </div>

        {/* My Courses */}
        {!isAdmin && (
          <div>
            <h2 className="text-2xl font-bold mb-6">My Courses</h2>
            {isLoading ? (
              <div className="flex justify-center py-8">
                <Loader2 className="w-6 h-6 animate-spin" />
              </div>
            ) : (user.courses && user.courses.length > 0) ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {coursesWithProgress.map((course: any, index: number) => (
                  <Card key={course._id || index} className="bg-card/80 backdrop-blur-lg border-border hover:shadow-lg transition-shadow">
                    {course.thumbnail && (
                      <div className="aspect-video overflow-hidden rounded-t-lg">
                        <img 
                          src={course.thumbnail} 
                          alt={course.courseName || `Course ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <CardHeader>
                      <CardTitle>{course.courseName || course.title || `Course ${index + 1}`}</CardTitle>
                      <CardDescription>{course.courseDescription || course.description || "Course description"}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3 mb-4">
                        <div className="flex items-center justify-between text-sm">
                          <span>Progress</span>
                          <span className="font-medium">{course.progress || 0}%</span>
                        </div>
                        <Progress value={course.progress || 0} className="h-2" />
                        <div className="text-xs text-muted-foreground">
                          {course.completedLectures || 0} of {course.totalLectures || 0} lessons completed
                        </div>
                      </div>
                      <Button 
                        className="w-full"
                        onClick={() => navigate(`/course-learning/${course._id || course.id}`)}
                      >
                        Continue Learning
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="bg-card/80 backdrop-blur-lg border-border">
                <CardContent className="text-center py-12">
                  <BookOpen className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-xl font-semibold mb-2">No Courses Yet</h3>
                  <p className="text-muted-foreground mb-4">
                    You haven't enrolled in any courses yet. Browse our catalog to get started!
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;