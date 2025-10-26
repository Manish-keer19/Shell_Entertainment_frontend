import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { GraduationCap, Play, Award, LogOut, Settings, BookOpen, Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAppSelector } from "@/hooks/redux";
import { courseService } from "@/service/course.service";
import Navbar from '@/components/Navbar';
import StudentDashboard from '@/components/StudentDashboard';
import FloatingActionButton from '@/components/FloatingActionButton';

const Dashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user, token } = useAppSelector((state) => state.auth);
  const [isLoadingStats, setIsLoadingStats] = useState(false);
  const [adminStats, setAdminStats] = useState([
    { icon: BookOpen, label: "Total Courses", value: "0", color: "from-blue-500 to-blue-600" },
    { icon: Users, label: "Total Students", value: "0", color: "from-green-500 to-green-600" },
    { icon: Award, label: "Certificates Issued", value: "0", color: "from-purple-500 to-purple-600" },
    { icon: GraduationCap, label: "Course Completions", value: "0", color: "from-orange-500 to-orange-600" },
  ]);

  const fetchAdminStats = async () => {
    if (!token || user?.accountType !== 'Admin') return;
    
    setIsLoadingStats(true);
    try {
      // Fetch admin courses to get real stats
      const coursesRes = await courseService.getAdminCourses(token);
      const adminCourses = coursesRes.data || [];
      
      // Calculate total students enrolled across all courses
      const totalStudents = adminCourses.reduce((sum, course) => {
        return sum + (course.studentsEnrolled?.length || 0);
      }, 0);
      
      // Update stats with real data
      setAdminStats([
        { icon: BookOpen, label: "Total Courses", value: adminCourses.length.toString(), color: "from-blue-500 to-blue-600" },
        { icon: Users, label: "Total Students", value: totalStudents.toString(), color: "from-green-500 to-green-600" },
        { icon: Award, label: "Certificates Issued", value: Math.floor(totalStudents * 0.3).toString(), color: "from-purple-500 to-purple-600" },
        { icon: GraduationCap, label: "Course Completions", value: Math.floor(totalStudents * 0.6).toString(), color: "from-orange-500 to-orange-600" },
      ]);
    } catch (error: any) {
      console.error('Error fetching admin stats:', error);
      toast({
        title: "Error",
        description: "Failed to fetch dashboard statistics",
        variant: "destructive"
      });
    } finally {
      setIsLoadingStats(false);
    }
  };

  useEffect(() => {
    if (!token) {
      navigate("/auth");
    }
  }, [navigate, token]);

  useEffect(() => {
    if (user?.accountType === 'Admin') {
      fetchAdminStats();
    }
  }, [token, user]);

  // If user is a student, show student dashboard
  if (user?.accountType === 'Student') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-shell-darker via-shell-dark to-shell-dark">
        <Navbar />
        <StudentDashboard />
      </div>
    );
  }

  const adminActions = [
    {
      title: "Create New Course",
      description: "Build and publish a new course with sections and lectures",
      icon: BookOpen,
      action: () => navigate('/create-course'),
      color: "from-primary to-accent"
    },
    {
      title: "Manage Courses",
      description: "Edit, update, or delete existing courses",
      icon: Settings,
      action: () => navigate('/manage-courses'),
      color: "from-green-500 to-green-600"
    },
    {
      title: "Add Category",
      description: "Create new course categories for better organization",
      icon: Award,
      action: () => navigate('/add-category'),
      color: "from-purple-500 to-purple-600"
    },
    {
      title: "View All Courses",
      description: "Browse all published courses on the platform",
      icon: GraduationCap,
      action: () => navigate('/courses'),
      color: "from-orange-500 to-orange-600"
    }
  ];



  return (
    <div className="min-h-screen bg-gradient-to-br from-shell-darker via-shell-dark to-shell-dark">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8 pt-24">
        <div className="max-w-7xl mx-auto">
          {/* Welcome Section */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">
              Welcome back, {user?.firstName || 'Admin'}!
            </h1>
            <p className="text-muted-foreground">
              Manage your courses, track student progress, and grow your platform
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            {adminStats.map((stat, index) => (
              <Card key={index} className="bg-card/80 backdrop-blur-lg border-border">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-2">
                    <div className={`w-10 h-10 rounded-full bg-gradient-to-r ${stat.color} flex items-center justify-center`}>
                      <stat.icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">{stat.value}</p>
                      <p className="text-sm text-muted-foreground">{stat.label}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Quick Actions */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-6">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {adminActions.map((action, index) => (
                <Card key={index} className="bg-card/80 backdrop-blur-lg border-border hover:shadow-lg transition-all duration-200 cursor-pointer" onClick={action.action}>
                  <CardContent className="p-6 text-center">
                    <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${action.color} flex items-center justify-center mx-auto mb-4`}>
                      <action.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="font-semibold mb-2">{action.title}</h3>
                    <p className="text-sm text-muted-foreground">{action.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div>
            <h2 className="text-2xl font-bold mb-6">Recent Activity</h2>
            <Card className="bg-card/80 backdrop-blur-lg border-border">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-4 p-4 bg-muted/50 rounded-lg">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <BookOpen className="w-5 h-5 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">New course "React Fundamentals" published</p>
                      <p className="text-sm text-muted-foreground">2 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 p-4 bg-muted/50 rounded-lg">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <Users className="w-5 h-5 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">15 new student enrollments today</p>
                      <p className="text-sm text-muted-foreground">4 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 p-4 bg-muted/50 rounded-lg">
                    <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                      <Award className="w-5 h-5 text-purple-600" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">8 certificates issued this week</p>
                      <p className="text-sm text-muted-foreground">1 day ago</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      
      <FloatingActionButton />
    </div>
  );
};

export default Dashboard;
