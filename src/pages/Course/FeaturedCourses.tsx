import SEO from "@/components/SEO";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import WhyChooseShell from "@/components/WhyChooseShell";
import Services from "@/components/Services";
import ShellStudio from "@/components/ShellStudio";
import Portfolio from "@/components/Portfolio";
import Testimonials from "@/components/Testimonials";
import JoinCommunity from "@/components/JoinCommunity";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, BookOpen } from "lucide-react";
import { useState, useEffect } from 'react';
import { courseService } from '@/service/course.service';
import { useToast } from "@/hooks/use-toast";
import { useAppSelector } from '@/hooks/redux';

const FeaturedCourses = () => {
  const { toast } = useToast();
  const { user } = useAppSelector((state) => state.auth);
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchCourses = async () => {
    try {
      setIsLoading(true);
      const res = await courseService.getAllCourses();
      const coursesData = res.data || [];
      // Sort by newest for featured
      const sortedCourses = coursesData.sort((a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime());
      setCourses(sortedCourses.slice(0, 6)); // Show only 6 featured courses
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to fetch courses",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  if (isLoading) {
    return (
      <div className="py-24">
        <div className="container mx-auto px-4 text-center">
          <p>Loading courses...</p>
        </div>
      </div>
    );
  }

  return (
    <section className="py-24 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
              Our Featured Courses
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Discover top-rated courses to boost your creative skills
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          {courses.map(course => (
            <Card key={course._id} className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300 group cursor-pointer" onClick={() => window.location.href = `/course-detail/${course._id}`}>
              <div className="aspect-video relative overflow-hidden rounded-t-lg">
                <img 
                  src={course.thumbnail || '/placeholder.svg'} 
                  alt={course.courseName}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 right-4">
                  <Badge variant={course.status === 'Published' ? 'default' : 'secondary'}>
                    {course.status}
                  </Badge>
                </div>
              </div>
              
              <CardHeader className="pb-3">
                <CardTitle className="text-lg line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {course.courseName}
                </CardTitle>
                <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
                  {course.courseDescription}
                </p>
                <p className="text-sm font-medium text-blue-600 dark:text-blue-400">
                  by {course.instructor?.firstName} {course.instructor?.lastName}
                </p>
              </CardHeader>
              
              <CardContent className="pt-0">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                    <div className="flex items-center space-x-1">
                      <Users className="w-4 h-4" />
                      <span>{course.studentsEnrolled?.length || 0}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <BookOpen className="w-4 h-4" />
                      <span>{course.courseContent?.length || 0} sections</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-1 mb-4">
                  {course.tag?.slice(0, 3).map((tag, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                  {course.tag?.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{course.tag.length - 3}
                    </Badge>
                  )}
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                      ₹{course.price}
                    </span>
                  </div>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="group-hover:bg-blue-600 dark:group-hover:bg-blue-400 group-hover:text-white transition-colors"
                  >
                    View Course
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Link to="/all-courses">
            <Button 
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 group"
            >
              View All Courses
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};
export default FeaturedCourses;