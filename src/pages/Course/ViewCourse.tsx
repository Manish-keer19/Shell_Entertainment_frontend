import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { 
  Play, 
  Pause,
  CheckCircle, 
  ArrowLeft,
  Lock,
  BookOpen,
  Clock,
  ChevronDown,
  ChevronRight,
  Loader2,
  Settings,
  Volume2
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Navbar from '@/components/Navbar';
import { courseService } from '@/service/course.service';
import { useAppSelector } from '@/hooks/redux';

const ViewCourse = () => {
  const { id } = useParams();
  const courseId = id;
  const navigate = useNavigate();
  const { toast } = useToast();
  const { token, user } = useAppSelector((state) => state.auth);
  const [searchParams, setSearchParams] = useSearchParams();
  const videoRef = useRef<HTMLVideoElement>(null);
  
  const [course, setCourse] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentSection, setCurrentSection] = useState(null);
  const [currentLesson, setCurrentLesson] = useState(null);
  const [completedLessons, setCompletedLessons] = useState([]);
  const [progress, setProgress] = useState(0);
  const [expandedSections, setExpandedSections] = useState({});
  const [videoLoading, setVideoLoading] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);

  const fetchCourseDetails = async () => {
    if (!courseId || !token) return;
    
    try {
      setIsLoading(true);
      const res = await courseService.getFullCourseDetails(courseId, token);
      const courseData = res.data.courseDetails;
      
      // Check if user is enrolled
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
      
      // Calculate progress
      const totalLessons = courseData.courseContent?.reduce((total, section) => 
        total + (section.subSection?.length || 0), 0) || 0;
      const completed = res.data.completedVideos?.length || 0;
      setProgress(totalLessons > 0 ? (completed / totalLessons) * 100 : 0);
      
      // Set initial section and lesson from URL params or first available
      const sectionParam = searchParams.get('section');
      const lessonParam = searchParams.get('lesson');
      
      let initialSection = null;
      let initialLesson = null;
      
      if (sectionParam && lessonParam) {
        initialSection = courseData.courseContent?.find(s => s._id === sectionParam);
        initialLesson = initialSection?.subSection?.find(l => l._id === lessonParam);
      }
      
      if (!initialSection || !initialLesson) {
        initialSection = courseData.courseContent?.[0];
        initialLesson = initialSection?.subSection?.[0];
      }
      
      setCurrentSection(initialSection);
      setCurrentLesson(initialLesson);
      
      // Expand current section
      if (initialSection) {
        setExpandedSections({ [initialSection._id]: true });
      }
      
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
      
      // Update progress
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

  const selectLesson = (section, lesson) => {
    setCurrentSection(section);
    setCurrentLesson(lesson);
    setVideoLoading(true);
    
    // Update URL
    setSearchParams({ section: section._id, lesson: lesson._id });
    
    // Expand the section
    setExpandedSections(prev => ({ ...prev, [section._id]: true }));
  };

  const toggleSection = (sectionId) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  const handleVideoEnd = () => {
    if (currentLesson && !completedLessons.includes(currentLesson._id)) {
      markLessonComplete(currentLesson._id);
    }
  };

  const changePlaybackRate = (rate) => {
    setPlaybackRate(rate);
    if (videoRef.current) {
      videoRef.current.playbackRate = rate;
    }
  };

  // Disable right-click and keyboard shortcuts for video protection
  const handleContextMenu = (e) => {
    e.preventDefault();
  };

  const handleKeyDown = (e) => {
    // Disable common download/save shortcuts
    if (
      (e.ctrlKey && (e.key === 's' || e.key === 'S')) || // Ctrl+S
      (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'i')) || // Ctrl+Shift+I
      e.key === 'F12' // F12
    ) {
      e.preventDefault();
    }
  };

  useEffect(() => {
    fetchCourseDetails();
  }, [courseId, token]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

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

  if (!course || !currentLesson) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-shell-darker via-shell-dark to-shell-dark">
        <Navbar />
        <div className="container mx-auto px-4 py-12 text-center">
          <h1 className="text-2xl font-bold mb-4">Course not accessible</h1>
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
      
      <div className="container mx-auto px-4 py-4 pt-24">
        <Button 
          onClick={() => navigate(`/course-detail/${courseId}`)} 
          variant="ghost" 
          className="mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Course Details
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Video Player */}
          <div className="lg:col-span-3">
            <Card className="bg-card/80 backdrop-blur-lg border-border">
              <CardContent className="p-0">
                <div className="aspect-video relative bg-black rounded-t-lg overflow-hidden">
                  {videoLoading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-10">
                      <Loader2 className="w-8 h-8 animate-spin text-white" />
                    </div>
                  )}
                  <video
                    ref={videoRef}
                    className="w-full h-full"
                    controls
                    controlsList="nodownload nofullscreen noremoteplayback"
                    disablePictureInPicture
                    onContextMenu={handleContextMenu}
                    onLoadStart={() => setVideoLoading(true)}
                    onLoadedData={() => setVideoLoading(false)}
                    onEnded={handleVideoEnd}
                    src={currentLesson.videoUrl}
                    key={currentLesson._id}
                  >
                    Your browser does not support the video tag.
                  </video>
                  
                  {/* Custom playback rate controls */}
                  <div className="absolute bottom-4 right-4 flex space-x-2">
                    {[0.5, 0.75, 1, 1.25, 1.5, 2].map(rate => (
                      <Button
                        key={rate}
                        size="sm"
                        variant={playbackRate === rate ? "default" : "secondary"}
                        onClick={() => changePlaybackRate(rate)}
                        className="text-xs"
                      >
                        {rate}x
                      </Button>
                    ))}
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h1 className="text-2xl font-bold mb-2">{currentLesson.title}</h1>
                      <p className="text-muted-foreground">{currentLesson.description}</p>
                    </div>
                    <Button
                      onClick={() => markLessonComplete(currentLesson._id)}
                      disabled={completedLessons.includes(currentLesson._id)}
                      variant={completedLessons.includes(currentLesson._id) ? "default" : "outline"}
                    >
                      <CheckCircle className="w-4 h-4 mr-2" />
                      {completedLessons.includes(currentLesson._id) ? 'Completed' : 'Mark Complete'}
                    </Button>
                  </div>
                  
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <span>Section: {currentSection.sectionName}</span>
                    {currentLesson.timeDuration && (
                      <span className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{Math.floor(currentLesson.timeDuration / 60)}:{(currentLesson.timeDuration % 60).toString().padStart(2, '0')}</span>
                      </span>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Course Sidebar */}
          <div className="lg:col-span-1">
            <Card className="bg-card/80 backdrop-blur-lg border-border sticky top-4">
              <CardHeader>
                <CardTitle className="text-lg">{course.courseName}</CardTitle>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Progress</span>
                    <span>{Math.round(progress)}%</span>
                  </div>
                  <Progress value={progress} className="h-2" />
                </div>
              </CardHeader>
              
              <CardContent className="p-0">
                <div className="max-h-96 overflow-y-auto">
                  {course.courseContent?.map((section, sectionIndex) => (
                    <div key={section._id} className="border-b border-border last:border-b-0">
                      <button
                        onClick={() => toggleSection(section._id)}
                        className="w-full p-4 text-left hover:bg-muted/50 transition-colors flex items-center justify-between"
                      >
                        <div>
                          <h3 className="font-medium text-sm">
                            Section {sectionIndex + 1}: {section.sectionName}
                          </h3>
                          <p className="text-xs text-muted-foreground">
                            {section.subSection?.length || 0} lessons
                          </p>
                        </div>
                        {expandedSections[section._id] ? (
                          <ChevronDown className="w-4 h-4" />
                        ) : (
                          <ChevronRight className="w-4 h-4" />
                        )}
                      </button>
                      
                      {expandedSections[section._id] && (
                        <div className="pb-2">
                          {section.subSection?.map((lesson, lessonIndex) => (
                            <button
                              key={lesson._id}
                              onClick={() => selectLesson(section, lesson)}
                              className={`w-full p-3 text-left text-sm hover:bg-muted/50 transition-colors flex items-center space-x-3 ${
                                currentLesson._id === lesson._id ? 'bg-primary/10 border-r-2 border-primary' : ''
                              }`}
                            >
                              <div className="flex-shrink-0">
                                {completedLessons.includes(lesson._id) ? (
                                  <CheckCircle className="w-4 h-4 text-green-500" />
                                ) : (
                                  <Play className="w-4 h-4 text-muted-foreground" />
                                )}
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="truncate">{lesson.title}</p>
                                {lesson.timeDuration && (
                                  <p className="text-xs text-muted-foreground">
                                    {Math.floor(lesson.timeDuration / 60)}:{(lesson.timeDuration % 60).toString().padStart(2, '0')}
                                  </p>
                                )}
                              </div>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewCourse;