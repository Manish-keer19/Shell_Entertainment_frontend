import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { 
  Play, 
  CheckCircle, 
  ArrowLeft,
  Clock,
  ChevronDown,
  ChevronRight,
  Loader2,
  BookOpen
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Navbar from '@/components/Navbar';
import { courseService } from '@/service/course.service';
import { useAppSelector } from '@/hooks/redux';

const CourseLearning = () => {
  const { id } = useParams();
  const courseId = id;
  const navigate = useNavigate();
  const { toast } = useToast();
  const { token, user } = useAppSelector((state) => state.auth);
  
  const [course, setCourse] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [completedLessons, setCompletedLessons] = useState([]);
  const [progress, setProgress] = useState(0);
  const [expandedSections, setExpandedSections] = useState({});

  const fetchCourseDetails = async () => {
    if (!courseId || !token) return;
    
    try {
      setIsLoading(true);
      const res = await courseService.getFullCourseDetails(courseId, token);
      const courseData = res.data.courseDetails;
      
      if (!courseData.studentsEnrolled?.includes(user?._id)) {
        toast({
          title: "Access Denied",
          description: "You need to enroll in this course to access the content",
          variant: "destructive"
        });
        navigate(`/course-detail/${courseId}`);
        return;
      }
      
      setCourse(courseData);
      setCompletedLessons(res.data.completedVideos || []);
      
      const totalLessons = courseData.courseContent?.reduce((total, section) => 
        total + (section.subSection?.length || 0), 0) || 0;
      const completed = res.data.completedVideos?.length || 0;
      setProgress(totalLessons > 0 ? (completed / totalLessons) * 100 : 0);
      
      // Expand all sections by default
      const expanded = {};
      courseData.courseContent?.forEach(section => {
        expanded[section._id] = true;
      });
      setExpandedSections(expanded);
      
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch course details",
        variant: "destructive"
      });
      navigate('/courses');
    } finally {
      setIsLoading(false);
    }
  };

  const markLessonComplete = async (lessonId) => {
    if (!token || completedLessons.includes(lessonId)) return;
    
    try {
      await courseService.markLectureComplete(courseId, lessonId, token);
      setCompletedLessons(prev => [...prev, lessonId]);
      
      const totalLessons = course.courseContent?.reduce((total, section) => 
        total + (section.subSection?.length || 0), 0) || 0;
      const newCompleted = completedLessons.length + 1;
      setProgress(totalLessons > 0 ? (newCompleted / totalLessons) * 100 : 0);
      
      toast({
        title: "Progress Updated",
        description: "Lesson marked as complete!",
      });
    } catch (error) {
      console.error('Error marking lesson complete:', error);
    }
  };

  const toggleSection = (sectionId) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  const watchVideo = (section, lesson) => {
    navigate(`/course/${courseId}?section=${section._id}&lesson=${lesson._id}`);
  };

  useEffect(() => {
    fetchCourseDetails();
  }, [courseId, token]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-shell-darker via-shell-dark to-shell-dark">
        <Navbar />
        <div className="container mx-auto px-4 py-12 flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4" />
            <p>Loading course...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-shell-darker via-shell-dark to-shell-dark">
        <Navbar />
        <div className="container mx-auto px-4 py-12 text-center">
          <h1 className="text-2xl font-bold mb-4">Course not found</h1>
          <Button onClick={() => navigate('/courses')} variant="outline">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Courses
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-shell-darker via-shell-dark to-shell-dark">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8 pt-24">
        <Button 
          onClick={() => navigate(`/course-detail/${courseId}`)} 
          variant="ghost" 
          className="mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Course Details
        </Button>

        {/* Course Header */}
        <Card className="bg-card/80 backdrop-blur-lg border-border mb-8">
          <div className="flex flex-col md:flex-row">
            {course.thumbnail && (
              <div className="md:w-1/3">
                <img 
                  src={course.thumbnail} 
                  alt={course.courseName}
                  className="w-full h-48 md:h-full object-cover rounded-t-lg md:rounded-l-lg md:rounded-t-none"
                />
              </div>
            )}
            <div className="flex-1">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-2xl mb-2">{course.courseName}</CardTitle>
                    <p className="text-muted-foreground">{course.courseDescription}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-muted-foreground mb-2">Progress</div>
                    <div className="text-2xl font-bold">{Math.round(progress)}%</div>
                  </div>
                </div>
                <Progress value={progress} className="h-3 mt-4" />
              </CardHeader>
            </div>
          </div>
        </Card>

        {/* Course Content */}
        <div className="space-y-6">
          {course.courseContent?.sort((a, b) => new Date(a.createdAt || 0).getTime() - new Date(b.createdAt || 0).getTime()).map((section, sectionIndex) => (
            <Card key={section._id} className="bg-card/80 backdrop-blur-lg border-border">
              <CardHeader>
                <button
                  onClick={() => toggleSection(section._id)}
                  className="w-full text-left flex items-center justify-between hover:bg-muted/50 p-2 rounded transition-colors"
                >
                  <div>
                    <CardTitle className="text-lg">
                      Section {sectionIndex + 1}: {section.sectionName}
                    </CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">
                      {section.subSection?.length || 0} lessons
                    </p>
                  </div>
                  {expandedSections[section._id] ? (
                    <ChevronDown className="w-5 h-5" />
                  ) : (
                    <ChevronRight className="w-5 h-5" />
                  )}
                </button>
              </CardHeader>
              
              {expandedSections[section._id] && (
                <CardContent className="pt-0">
                  <div className="space-y-3">
                    {section.subSection?.sort((a, b) => new Date(a.createdAt || 0).getTime() - new Date(b.createdAt || 0).getTime()).map((lesson, lessonIndex) => (
                      <div
                        key={lesson._id}
                        className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/30 transition-colors"
                      >
                        <div className="flex items-center space-x-4 flex-1">
                          <div className="flex-shrink-0">
                            {completedLessons.includes(lesson._id) ? (
                              <CheckCircle className="w-6 h-6 text-green-500" />
                            ) : (
                              <Play className="w-6 h-6 text-muted-foreground" />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium truncate">
                              {lessonIndex + 1}. {lesson.title}
                            </h4>
                            {lesson.description && (
                              <p className="text-sm text-muted-foreground truncate">
                                {lesson.description}
                              </p>
                            )}
                            {lesson.timeDuration && (
                              <div className="flex items-center space-x-1 text-xs text-muted-foreground mt-1">
                                <Clock className="w-3 h-3" />
                                <span>{Math.floor(lesson.timeDuration / 60)}:{(lesson.timeDuration % 60).toString().padStart(2, '0')}</span>
                              </div>
                            )}
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => watchVideo(section, lesson)}
                          >
                            <Play className="w-4 h-4 mr-1" />
                            Watch
                          </Button>
                          
                          {!completedLessons.includes(lesson._id) && (
                            <Button
                              size="sm"
                              onClick={() => markLessonComplete(lesson._id)}
                            >
                              <CheckCircle className="w-4 h-4 mr-1" />
                              Complete
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              )}
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CourseLearning;