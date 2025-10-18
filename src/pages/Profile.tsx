import { useAppSelector } from "@/hooks/redux";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { BookOpen, Plus, Settings, User } from "lucide-react";
import Navbar from "@/components/Navbar";

const Profile = () => {
  const { user } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();

  if (!user) {
    navigate('/auth');
    return null;
  }

  const isAdmin = user.accountType === 'Admin';

  return (
    <div className="min-h-screen bg-gradient-to-br from-shell-light via-shell-lighter to-background p-4">
      <Navbar/>
      <div className="max-w-6xl mx-auto">
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

        {/* Admin Dashboard */}
        {isAdmin && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Card className="bg-card/80 backdrop-blur-lg border-border hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() => navigate('/add-catagory')}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Plus className="w-5 h-5" />
                  Create Category
                </CardTitle>
                <CardDescription>
                  Add new course categories to organize your content
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-card/80 backdrop-blur-lg border-border hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() => navigate('/add-course')}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5" />
                  Create Course
                </CardTitle>
                <CardDescription>
                  Create and publish new courses for students
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        )}

        {/* User Courses */}
        {!isAdmin && (
          <div>
            <h2 className="text-2xl font-bold mb-6">My Courses</h2>
            {user.courses.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {user.courses.map((course: any, index: number) => (
                  <Card key={index} className="bg-card/80 backdrop-blur-lg border-border hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <CardTitle>{course.title || `Course ${index + 1}`}</CardTitle>
                      <CardDescription>{course.description || "Course description"}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button 
                        className="w-full"
                        onClick={() => navigate(`/course/${course._id || course.id}`)}
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
                  <Button onClick={() => navigate('/courses')}>
                    Browse Courses
                  </Button>
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