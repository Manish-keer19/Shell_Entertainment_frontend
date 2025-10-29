// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { Separator } from "@/components/ui/separator";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Progress } from "@/components/ui/progress";
// import { 
//   Clock, 
//   Users, 
//   BookOpen, 
//   Star, 
//   Play, 
//   CheckCircle, 
//   ArrowLeft,
//   Calendar,
//   Award,
//   Globe,
//   Loader2
// } from "lucide-react";
// import { useCustomToast } from "@/components/ui/custom-toast";
// import Navbar from '@/components/Navbar';
// import { courseService } from '@/service/course.service';
// import { paymentService } from '@/service/payment.service';
// import { useAppSelector } from '@/hooks/redux';
// import CourseEnrollment from '@/components/CourseEnrollment';

// const CourseDetail = () => {
//   const { courseId } = useParams();
//   const navigate = useNavigate();
//   const { showToast } = useCustomToast();
//   const { token, user } = useAppSelector((state) => state.auth);
  
//   const [course, setCourse] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [isEnrolled, setIsEnrolled] = useState(false);
//   const [progress, setProgress] = useState(0);
//   const [enrolling, setEnrolling] = useState(false);

//   const fetchCourseDetails = async () => {
//     if (!courseId) return;
    
//     try {
//       setIsLoading(true);
//       const res = await courseService.getCourseDetails(courseId);
//       setCourse(res.data[0]);
      
//       // Check if user is enrolled
//       if (token && user) {
//         const courseData = res.data[0];
//         const isUserEnrolled = courseData?.studentsEnrolled?.includes(user._id) || 
//                               courseData?.studentsEnroled?.includes(user._id); // Handle typo in backend
//         setIsEnrolled(isUserEnrolled);
        
//         if (isUserEnrolled) {
//           // Fetch progress if enrolled
//           try {
//             const progressRes = await courseService.getFullCourseDetails(courseId, token);
//             const completedVideos = progressRes.data?.completedVideos || [];
//             const totalVideos = courseData?.courseContent?.reduce((total, section) => 
//               total + (section.subSection?.length || 0), 0) || 0;
//             setProgress(totalVideos > 0 ? (completedVideos.length / totalVideos) * 100 : 0);
//           } catch (error) {
//             console.log('Could not fetch progress:', error);
//             setProgress(0);
//           }
//         }
//       }
//     } catch (error: any) {
//       showToast('error', 'Failed to Load Course', 'Unable to fetch course details. Please refresh the page or try again later.');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleEnroll = () => {
//     if (!token) {
//       navigate('/auth');
//       return;
//     }
//     // Enrollment is now handled by CourseEnrollment component
//   };

//   useEffect(() => {
//     fetchCourseDetails();
//   }, [courseId, token]);

//   if (isLoading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-shell-darker via-shell-dark to-shell-dark">
//         <Navbar />
//         <div className="container mx-auto px-4 py-12 flex items-center justify-center">
//           <div className="text-center">
//             <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4" />
//             <p>Loading course details...</p>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   if (!course) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-shell-darker via-shell-dark to-shell-dark">
//         <Navbar />
//         <div className="container mx-auto px-4 py-12 text-center">
//           <h1 className="text-2xl font-bold mb-4">Course not found</h1>
//           <Button onClick={() => navigate('/courses')} variant="outline">
//             <ArrowLeft className="w-4 h-4 mr-2" />
//             Back to Courses
//           </Button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-shell-darker via-shell-dark to-shell-dark">
//       <Navbar />
      
//       <div className="container mx-auto px-4 py-8 pt-24">
//         <Button 
//           onClick={() => navigate('/courses')} 
//           variant="ghost" 
//           className="mb-6"
//         >
//           <ArrowLeft className="w-4 h-4 mr-2" />
//           Back to Courses
//         </Button>

//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//           {/* Main Content */}
//           <div className="lg:col-span-2 space-y-6">
//             {/* Course Header */}
//             <Card className="bg-card/80 backdrop-blur-lg border-border">
//               <CardContent className="p-6">
//                 <div className="flex items-start justify-between mb-4">
//                   <div className="flex-1">
//                     <h1 className="text-3xl font-bold mb-2">{course.courseName}</h1>
//                     <p className="text-muted-foreground mb-4">{course.courseDescription}</p>
                    
//                     <div className="flex items-center space-x-4 mb-4">
//                       <div className="flex items-center space-x-2">
//                         <Avatar className="w-8 h-8">
//                           <AvatarImage src={course.instructor?.image} />
//                           <AvatarFallback>
//                             {course.instructor?.firstName?.[0]}{course.instructor?.lastName?.[0]}
//                           </AvatarFallback>
//                         </Avatar>
//                         <span className="text-sm font-medium">
//                           {course.instructor?.firstName} {course.instructor?.lastName}
//                         </span>
//                       </div>
//                       <Badge variant="outline">{course.category?.name}</Badge>
//                     </div>
                    
//                     <div className="flex items-center space-x-6 text-sm text-muted-foreground">
//                       <div className="flex items-center space-x-1">
//                         <Users className="w-4 h-4" />
//                         <span>{course.studentsEnrolled?.length || 0} students</span>
//                       </div>
//                       <div className="flex items-center space-x-1">
//                         <BookOpen className="w-4 h-4" />
//                         <span>{course.courseContent?.length || 0} sections</span>
//                       </div>
//                       <div className="flex items-center space-x-1">
//                         <Clock className="w-4 h-4" />
//                         <span>Self-paced</span>
//                       </div>
//                     </div>
//                   </div>
                  
//                   <Badge variant={course.status === 'Published' ? 'default' : 'secondary'}>
//                     {course.status}
//                   </Badge>
//                 </div>
                
//                 {isEnrolled && (
//                   <div className="mb-4">
//                     <div className="flex items-center justify-between mb-2">
//                       <span className="text-sm font-medium">Progress</span>
//                       <span className="text-sm text-muted-foreground">{Math.round(progress)}%</span>
//                     </div>
//                     <Progress value={progress} className="h-2" />
//                     <Button 
//                       className="w-full mt-4 bg-green-600 hover:bg-green-700"
//                       onClick={() => navigate(`/course-learning/${course._id}`)}
//                     >
//                       <Play className="w-4 h-4 mr-2" />
//                       Continue Learning
//                     </Button>
//                   </div>
//                 )}
//               </CardContent>
//             </Card>

//             {/* Course Image */}
//             <Card className="bg-card/80 backdrop-blur-lg border-border overflow-hidden">
//               <div className="aspect-video relative">
//                 <img 
//                   src={course.thumbnail || '/placeholder.svg'} 
//                   alt={course.courseName}
//                   className="w-full h-full object-cover"
//                 />
//                 {!isEnrolled && (
//                   <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
//                     <Button 
//                       size="lg" 
//                       className="bg-primary/90 hover:bg-primary"
//                       onClick={handleEnroll}
//                       disabled={enrolling}
//                     >
//                       {enrolling ? (
//                         <Loader2 className="w-5 h-5 mr-2 animate-spin" />
//                       ) : (
//                         <Play className="w-5 h-5 mr-2" />
//                       )}
//                       {enrolling ? 'Enrolling...' : 'Preview Course'}
//                     </Button>
//                   </div>
//                 )}
//               </div>
//             </Card>

//             {/* What You'll Learn */}
//             <Card className="bg-card/80 backdrop-blur-lg border-border">
//               <CardHeader>
//                 <CardTitle className="flex items-center space-x-2">
//                   <Award className="w-5 h-5" />
//                   <span>What you'll learn</span>
//                 </CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <p className="text-muted-foreground">{course.whatYouWillLearn}</p>
//               </CardContent>
//             </Card>

//             {/* Course Content */}
//             <Card className="bg-card/80 backdrop-blur-lg border-border">
//               <CardHeader>
//                 <CardTitle className="flex items-center space-x-2">
//                   <BookOpen className="w-5 h-5" />
//                   <span>Course Content</span>
//                 </CardTitle>
//               </CardHeader>
//               <CardContent>
//                 {isEnrolled ? (
//                   <div className="space-y-4">
//                     {course.courseContent?.sort((a, b) => new Date(a.createdAt || 0).getTime() - new Date(b.createdAt || 0).getTime()).map((section, index) => (
//                       <div key={section._id} className="border border-border rounded-lg p-4">
//                         <h3 className="font-semibold mb-2">
//                           Section {index + 1}: {section.sectionName}
//                         </h3>
//                         <div className="space-y-2">
//                           {section.subSection?.sort((a, b) => new Date(a.createdAt || 0).getTime() - new Date(b.createdAt || 0).getTime()).map((subSection) => (
//                             <div key={subSection._id} className="flex items-center space-x-2 text-sm text-muted-foreground hover:text-foreground cursor-pointer p-2 rounded hover:bg-muted/50 transition-colors"
//                                  onClick={() => navigate(`/course/${course._id}?section=${section._id}&lesson=${subSection._id}`)}>
//                               <Play className="w-3 h-3" />
//                               <span>{subSection.title}</span>
//                               {subSection.timeDuration && (
//                                 <span className="ml-auto">{Math.floor(subSection.timeDuration / 60)}:{(subSection.timeDuration % 60).toString().padStart(2, '0')}</span>
//                               )}
//                             </div>
//                           ))}
//                         </div>

//                       </div>
//                     ))}
//                   </div>
//                 ) : (
//                   <div className="space-y-4">
//                     {course.courseContent?.sort((a, b) => new Date(a.createdAt || 0).getTime() - new Date(b.createdAt || 0).getTime()).slice(0, 2).map((section, index) => (
//                       <div key={section._id} className="border border-border rounded-lg p-4 relative">
//                         <h3 className="font-semibold mb-2">
//                           Section {index + 1}: {section.sectionName}
//                         </h3>
//                         <div className="space-y-2">
//                           {section.subSection?.sort((a, b) => new Date(a.createdAt || 0).getTime() - new Date(b.createdAt || 0).getTime()).slice(0, 2).map((subSection) => (
//                             <div key={subSection._id} className="flex items-center space-x-2 text-sm text-muted-foreground">
//                               <Play className="w-3 h-3" />
//                               <span>{subSection.title}</span>
//                               <Badge variant="outline" className="ml-auto text-xs">Preview</Badge>
//                             </div>
//                           ))}
//                           {section.subSection?.length > 2 && (
//                             <div className="text-sm text-muted-foreground italic">
//                               +{section.subSection.length - 2} more lessons
//                             </div>
//                           )}
//                         </div>
//                       </div>
//                     ))}
//                     {course.courseContent?.length > 2 && (
//                       <div className="text-center p-6 border border-dashed border-border rounded-lg">
//                         <p className="text-muted-foreground mb-4">
//                           +{course.courseContent.length - 2} more sections available after enrollment
//                         </p>
//                         <Button onClick={() => document.querySelector('.enrollment-card')?.scrollIntoView({ behavior: 'smooth' })}>
//                           Enroll to Access All Content
//                         </Button>
//                       </div>
//                     )}
//                   </div>
//                 )}
//               </CardContent>
//             </Card>

//             {/* Instructions */}
//             {course.instructions && course.instructions.length > 0 && (
//               <Card className="bg-card/80 backdrop-blur-lg border-border">
//                 <CardHeader>
//                   <CardTitle>Instructions</CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   <ul className="space-y-2">
//                     {course.instructions.map((instruction, index) => (
//                       <li key={index} className="flex items-start space-x-2">
//                         <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
//                         <span className="text-sm">{instruction}</span>
//                       </li>
//                     ))}
//                   </ul>
//                 </CardContent>
//               </Card>
//             )}

//             {/* Tags */}
//             {course.tag && course.tag.length > 0 && (
//               <Card className="bg-card/80 backdrop-blur-lg border-border">
//                 <CardHeader>
//                   <CardTitle>Tags</CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   <div className="flex flex-wrap gap-2">
//                     {course.tag.map((tag, index) => (
//                       <Badge key={index} variant="outline">{tag}</Badge>
//                     ))}
//                   </div>
//                 </CardContent>
//               </Card>
//             )}
//           </div>

//           {/* Sidebar */}
//           <div className="space-y-6">
//             {/* Enrollment Card */}
//             {!isEnrolled && (
//               <div className="enrollment-card">
//                 <CourseEnrollment 
//                   course={course}
//                   isEnrolled={isEnrolled}
//                   onEnrollmentSuccess={() => {
//                     setIsEnrolled(true);
//                     setProgress(0);
//                     // Refresh course data to get updated enrollment status
//                     setTimeout(() => {
//                       fetchCourseDetails();
//                     }, 1000);
//                   }}
//                 />
//               </div>
//             )}

//             {/* Instructor Card */}
//             <Card className="bg-card/80 backdrop-blur-lg border-border">
//               <CardHeader>
//                 <CardTitle>Instructor</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <div className="flex items-center space-x-3 mb-4">
//                   <Avatar className="w-12 h-12">
//                     <AvatarImage src={course.instructor?.image} />
//                     <AvatarFallback>
//                       {course.instructor?.firstName?.[0]}{course.instructor?.lastName?.[0]}
//                     </AvatarFallback>
//                   </Avatar>
//                   <div>
//                     <h3 className="font-semibold">
//                       {course.instructor?.firstName} {course.instructor?.lastName}
//                     </h3>
//                     <p className="text-sm text-muted-foreground">
//                       {course.instructor?.additionalDetails?.about || 'Course Instructor'}
//                     </p>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CourseDetail;








import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  Clock, 
  Users, 
  BookOpen, 
  Star, 
  Play, 
  CheckCircle, 
  ArrowLeft,
  Calendar,
  Award,
  Globe,
  Loader2
} from "lucide-react";
import { useCustomToast } from "@/components/ui/custom-toast";
import Navbar from '@/components/Navbar';
import { courseService } from '@/service/course.service';
import { paymentService } from '@/service/payment.service';
import { useAppSelector } from '@/hooks/redux';
import CourseEnrollment from '@/components/CourseEnrollment';
import CourseSignupForm from '../CourseSignupForm';

const CourseDetail = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const { showToast } = useCustomToast();
  const { token, user } = useAppSelector((state) => state.auth);
  
  const [course, setCourse] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [enrolling, setEnrolling] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);

  const fetchCourseDetails = async () => {
    if (!courseId) return;
    
    try {
      setIsLoading(true);
      const res = await courseService.getCourseDetails(courseId);
      setCourse(res.data[0]);
      
      // Check if user is enrolled
      if (token && user) {
        const courseData = res.data[0];
        const isUserEnrolled = courseData?.studentsEnrolled?.includes(user._id) || 
                              courseData?.studentsEnroled?.includes(user._id); // Handle typo in backend
        setIsEnrolled(isUserEnrolled);
        
        if (isUserEnrolled) {
          // Fetch progress if enrolled
          try {
            const progressRes = await courseService.getFullCourseDetails(courseId, token);
            const completedVideos = progressRes.data?.completedVideos || [];
            const totalVideos = courseData?.courseContent?.reduce((total, section) => 
              total + (section.subSection?.length || 0), 0) || 0;
            setProgress(totalVideos > 0 ? (completedVideos.length / totalVideos) * 100 : 0);
          } catch (error) {
            console.log('Could not fetch progress:', error);
            setProgress(0);
          }
        }
      }
    } catch (error: any) {
      showToast('error', 'Failed to Load Course', 'Unable to fetch course details. Please refresh the page or try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleEnroll = () => {
    if (!token || !user) {
      setShowSignupModal(true); // Show signup modal if not logged in
      return;
    }
    // If logged in, handle direct enrollment (via CourseEnrollment or API call)
    // Enrollment is now handled by CourseEnrollment component
  };

  // Function to refresh after signup/enrollment
  const refreshCourse = () => {
    fetchCourseDetails();
    setShowSignupModal(false);
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
            <p>Loading course details...</p>
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
          onClick={() => navigate('/courses')} 
          variant="ghost" 
          className="mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Courses
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Course Header */}
            <Card className="bg-card/80 backdrop-blur-lg border-border">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h1 className="text-3xl font-bold mb-2">{course.courseName}</h1>
                    <p className="text-muted-foreground mb-4">{course.courseDescription}</p>
                    
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="flex items-center space-x-2">
                        <Avatar className="w-8 h-8">
                          <AvatarImage src={course.instructor?.image} />
                          <AvatarFallback>
                            {course.instructor?.firstName?.[0]}{course.instructor?.lastName?.[0]}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-sm font-medium">
                          {course.instructor?.firstName} {course.instructor?.lastName}
                        </span>
                      </div>
                      <Badge variant="outline">{course.category?.name}</Badge>
                    </div>
                    
                    <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <Users className="w-4 h-4" />
                        <span>{course.studentsEnrolled?.length || 0} students</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <BookOpen className="w-4 h-4" />
                        <span>{course.courseContent?.length || 0} sections</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>Self-paced</span>
                      </div>
                    </div>
                  </div>
                  
                  <Badge variant={course.status === 'Published' ? 'default' : 'secondary'}>
                    {course.status}
                  </Badge>
                </div>
                
                {isEnrolled && (
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Progress</span>
                      <span className="text-sm text-muted-foreground">{Math.round(progress)}%</span>
                    </div>
                    <Progress value={progress} className="h-2" />
                    <Button 
                      className="w-full mt-4 bg-green-600 hover:bg-green-700"
                      onClick={() => navigate(`/course-learning/${course._id}`)}
                    >
                      <Play className="w-4 h-4 mr-2" />
                      Continue Learning
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Course Image */}
            <Card className="bg-card/80 backdrop-blur-lg border-border overflow-hidden">
              <div className="aspect-video relative">
                <img 
                  src={course.thumbnail || '/placeholder.svg'} 
                  alt={course.courseName}
                  className="w-full h-full object-cover"
                />
                {!isEnrolled && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <Dialog open={showSignupModal} onOpenChange={setShowSignupModal}>
                      <DialogTrigger asChild>
                        <Button 
                          size="lg" 
                          className="bg-primary/90 hover:bg-primary"
                          onClick={handleEnroll}
                          disabled={enrolling}
                        >
                          {enrolling ? (
                            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                          ) : (
                            <Play className="w-5 h-5 mr-2" />
                          )}
                          {enrolling ? 'Enrolling...' : 'Enroll Now'}
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-md">
                        <DialogHeader>
                          <DialogTitle>Create Account to Enroll</DialogTitle>
                        </DialogHeader>
                        <CourseSignupForm onSuccess={refreshCourse} />
                      </DialogContent>
                    </Dialog>
                  </div>
                )}
              </div>
            </Card>

            {/* What You'll Learn */}
            <Card className="bg-card/80 backdrop-blur-lg border-border">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Award className="w-5 h-5" />
                  <span>What you'll learn</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{course.whatYouWillLearn}</p>
              </CardContent>
            </Card>

            {/* Course Content */}
            <Card className="bg-card/80 backdrop-blur-lg border-border">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BookOpen className="w-5 h-5" />
                  <span>Course Content</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {isEnrolled ? (
                  <div className="space-y-4">
                    {course.courseContent?.sort((a, b) => new Date(a.createdAt || 0).getTime() - new Date(b.createdAt || 0).getTime()).map((section, index) => (
                      <div key={section._id} className="border border-border rounded-lg p-4">
                        <h3 className="font-semibold mb-2">
                          Section {index + 1}: {section.sectionName}
                        </h3>
                        <div className="space-y-2">
                          {section.subSection?.sort((a, b) => new Date(a.createdAt || 0).getTime() - new Date(b.createdAt || 0).getTime()).map((subSection) => (
                            <div key={subSection._id} className="flex items-center space-x-2 text-sm text-muted-foreground hover:text-foreground cursor-pointer p-2 rounded hover:bg-muted/50 transition-colors"
                                 onClick={() => navigate(`/course/${course._id}?section=${section._id}&lesson=${subSection._id}`)}>
                              <Play className="w-3 h-3" />
                              <span>{subSection.title}</span>
                              {subSection.timeDuration && (
                                <span className="ml-auto">{Math.floor(subSection.timeDuration / 60)}:{(subSection.timeDuration % 60).toString().padStart(2, '0')}</span>
                              )}
                            </div>
                          ))}
                        </div>

                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {course.courseContent?.sort((a, b) => new Date(a.createdAt || 0).getTime() - new Date(b.createdAt || 0).getTime()).slice(0, 2).map((section, index) => (
                      <div key={section._id} className="border border-border rounded-lg p-4 relative">
                        <h3 className="font-semibold mb-2">
                          Section {index + 1}: {section.sectionName}
                        </h3>
                        <div className="space-y-2">
                          {section.subSection?.sort((a, b) => new Date(a.createdAt || 0).getTime() - new Date(b.createdAt || 0).getTime()).slice(0, 2).map((subSection) => (
                            <div key={subSection._id} className="flex items-center space-x-2 text-sm text-muted-foreground">
                              <Play className="w-3 h-3" />
                              <span>{subSection.title}</span>
                              <Badge variant="outline" className="ml-auto text-xs">Preview</Badge>
                            </div>
                          ))}
                          {section.subSection?.length > 2 && (
                            <div className="text-sm text-muted-foreground italic">
                              +{section.subSection.length - 2} more lessons
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                    {course.courseContent?.length > 2 && (
                      <div className="text-center p-6 border border-dashed border-border rounded-lg">
                        <p className="text-muted-foreground mb-4">
                          +{course.courseContent.length - 2} more sections available after enrollment
                        </p>
                        <Button onClick={handleEnroll}>
                          Enroll to Access All Content
                        </Button>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Instructions */}
            {course.instructions && course.instructions.length > 0 && (
              <Card className="bg-card/80 backdrop-blur-lg border-border">
                <CardHeader>
                  <CardTitle>Instructions</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {course.instructions.map((instruction, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{instruction}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            {/* Tags */}
            {course.tag && course.tag.length > 0 && (
              <Card className="bg-card/80 backdrop-blur-lg border-border">
                <CardHeader>
                  <CardTitle>Tags</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {course.tag.map((tag, index) => (
                      <Badge key={index} variant="outline">{tag}</Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Enrollment Card - Only show if enrolled or logged in */}
            {isEnrolled ? (
              <Card className="bg-card/80 backdrop-blur-lg border-border">
                <CardHeader>
                  <CardTitle>You're Enrolled!</CardTitle>
                </CardHeader>
                <CardContent>
                  <Button 
                    className="w-full bg-green-600 hover:bg-green-700"
                    onClick={() => navigate(`/course-learning/${course._id}`)}
                  >
                    <Play className="w-4 h-4 mr-2" />
                    Start Learning
                  </Button>
                </CardContent>
              </Card>
            ) : token ? (
              // If logged in but not enrolled, show CourseEnrollment
              <CourseEnrollment 
                course={course}
                isEnrolled={isEnrolled}
                onEnrollmentSuccess={() => {
                  setIsEnrolled(true);
                  setProgress(0);
                  // Refresh course data to get updated enrollment status
                  setTimeout(() => {
                    fetchCourseDetails();
                  }, 1000);
                }}
              />
            ) : (
              // If not logged in, show enroll button that triggers modal
              <Card className="bg-card/80 backdrop-blur-lg border-border">
                <CardHeader>
                  <CardTitle>Ready to Enroll?</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <Dialog open={showSignupModal} onOpenChange={setShowSignupModal}>
                    <DialogTrigger asChild>
                      <Button 
                        size="lg" 
                        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                        onClick={handleEnroll}
                      >
                        Enroll Now - ₹{course.price}
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-md">
                      <DialogHeader>
                        <DialogTitle>Create Account to Enroll</DialogTitle>
                      </DialogHeader>
                      <CourseSignupForm onSuccess={refreshCourse} />
                    </DialogContent>
                  </Dialog>
                </CardContent>
              </Card>
            )}

            {/* Instructor Card */}
            <Card className="bg-card/80 backdrop-blur-lg border-border">
              <CardHeader>
                <CardTitle>Instructor</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-3 mb-4">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={course.instructor?.image} />
                    <AvatarFallback>
                      {course.instructor?.firstName?.[0]}{course.instructor?.lastName?.[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold">
                      {course.instructor?.firstName} {course.instructor?.lastName}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {course.instructor?.additionalDetails?.about || 'Course Instructor'}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;