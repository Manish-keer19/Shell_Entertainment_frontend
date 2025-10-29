// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Badge } from "@/components/ui/badge";
// import { Search, Filter, Users, BookOpen, Loader2 } from "lucide-react";
// import { useToast } from "@/hooks/use-toast";
// import Navbar from '@/components/Navbar';
// import { courseService } from '@/service/course.service';
// import CourseSearch from '@/components/CourseSearch';
// import FloatingActionButton from '@/components/FloatingActionButton';
// import BackToTop from '@/components/BackToTop';
// import CourseFilters from '@/components/CourseFilters';
// import { useAppSelector } from '@/hooks/redux';

// const AllCourses = () => {
//   const navigate = useNavigate();
//   const { toast } = useToast();
//   const { user } = useAppSelector((state) => state.auth);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [selectedCategory, setSelectedCategory] = useState('all');
//   const [sortBy, setSortBy] = useState('newest');
//   const [priceRange, setPriceRange] = useState('all');
//   const [courses, setCourses] = useState([]);
//   const [allCourses, setAllCourses] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [enrollingCourseId, setEnrollingCourseId] = useState<string | null>(null);
//   const [viewingCourseId, setViewingCourseId] = useState<string | null>(null);

//   const fetchCourses = async () => {
//     try {
//       setIsLoading(true);
//       const res = await courseService.getAllCourses();
//       const coursesData = res.data || [];
//       setAllCourses(coursesData);
//       setCourses(coursesData);
//     } catch (error: any) {
//       toast({
//         title: "Error",
//         description: "Failed to fetch courses",
//         variant: "destructive"
//       });
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const fetchCategories = async () => {
//     try {
//       const res = await courseService.getAllCategories();
//       setCategories(res.data || []);
//     } catch (error: any) {
//       console.error('Error fetching categories:', error);
//     }
//   };

//   useEffect(() => {
//     fetchCourses();
//     fetchCategories();
//   }, []);

//   useEffect(() => {
//     if (allCourses.length > 0) {
//       applyFilters();
//     }
//   }, [selectedCategory, sortBy, priceRange]);

//   const applyFilters = () => {
//     if (allCourses.length === 0) return;
    
//     let filtered = [...allCourses];

//     // Category filter
//     if (selectedCategory !== 'all') {
//       filtered = filtered.filter(course => course.category?._id === selectedCategory);
//     }

//     // Price filter
//     if (priceRange !== 'all') {
//       switch (priceRange) {
//         case 'free':
//           filtered = filtered.filter(course => parseFloat(course.price) === 0);
//           break;
//         case '0-50':
//           filtered = filtered.filter(course => {
//             const price = parseFloat(course.price);
//             return price >= 0 && price <= 50;
//           });
//           break;
//         case '50-100':
//           filtered = filtered.filter(course => {
//             const price = parseFloat(course.price);
//             return price > 50 && price <= 100;
//           });
//           break;
//         case '100-200':
//           filtered = filtered.filter(course => {
//             const price = parseFloat(course.price);
//             return price > 100 && price <= 200;
//           });
//           break;
//         case '200+':
//           filtered = filtered.filter(course => parseFloat(course.price) > 200);
//           break;
//       }
//     }

//     // Sort
//     switch (sortBy) {
//       case 'price-low':
//         filtered.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
//         break;
//       case 'price-high':
//         filtered.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
//         break;
//       case 'popular':
//         filtered.sort((a, b) => (b.studentsEnrolled?.length || 0) - (a.studentsEnrolled?.length || 0));
//         break;
//       case 'oldest':
//         filtered.sort((a, b) => new Date(a.createdAt || 0).getTime() - new Date(b.createdAt || 0).getTime());
//         break;
//       case 'newest':
//       default:
//         filtered.sort((a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime());
//         break;
//     }

//     setCourses(filtered);
//   };

//   const clearFilters = () => {
//     setSelectedCategory('all');
//     setSortBy('newest');
//     setPriceRange('all');
//   };

//   const handleViewCourse = async (courseId: string) => {
//     setViewingCourseId(courseId);
//     try {
//       // Add a small delay to show loading state
//       await new Promise(resolve => setTimeout(resolve, 500));
//       navigate(`/course-detail/${courseId}`);
//     } finally {
//       setViewingCourseId(null);
//     }
//   };

//   const handleEnrollCourse = async (courseId: string) => {
//     setEnrollingCourseId(courseId);
//     try {
//       // Add a small delay to show loading state
//       await new Promise(resolve => setTimeout(resolve, 500));
//       navigate(`/course-detail/${courseId}`);
//     } finally {
//       setEnrollingCourseId(null);
//     }
//   };

//   const filteredCourses = courses;

//   if (isLoading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-shell-darker via-shell-dark to-shell-dark">
//         <Navbar />
//         <div className="container mx-auto px-4 py-12 flex items-center justify-center">
//           <div className="text-center">
//             <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4" />
//             <p>Loading courses...</p>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-shell-darker via-shell-dark to-shell-dark">
//       <Navbar />
      
//       {/* Hero Section */}
//       <div className="bg-gradient-to-r from-primary/20 to-accent/20 py-16">
//         <div className="container mx-auto px-4 text-center">
//           <h1 className="text-4xl md:text-6xl font-bold mb-6">
//             <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
//               Explore Courses
//             </span>
//           </h1>
//           <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
//             Discover courses from expert instructors and advance your skills
//           </p>
          
//           {/* Search Bar */}
//           <div className="max-w-2xl mx-auto">
//             <CourseSearch 
//               placeholder="Search for courses, instructors, or topics..."
//               showResults={false}
//               onSearchResults={(results) => {
//                 if (results.length > 0) {
//                   setCourses(results);
//                 } else if (allCourses.length > 0) {
//                   setCourses(allCourses); // Reset to all courses if no search results
//                 }
//               }}
//             />
//           </div>
//         </div>
//       </div>

//       <div className="container mx-auto px-4 py-12 pt-24">
//         {/* Filters */}
//         <CourseFilters
//           categories={categories}
//           selectedCategory={selectedCategory}
//           onCategoryChange={setSelectedCategory}
//           sortBy={sortBy}
//           onSortChange={setSortBy}
//           priceRange={priceRange}
//           onPriceRangeChange={setPriceRange}
//           onClearFilters={clearFilters}
//         />

//         {/* Results Count */}
//         <div className="mb-6">
//           <p className="text-muted-foreground">
//             Showing {filteredCourses.length} of {courses.length} courses
//           </p>
//         </div>

//         {/* Courses Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//           {filteredCourses.map(course => (
//             <Card key={course._id} className="bg-card/80 backdrop-blur-lg border-border hover:shadow-xl transition-all duration-300 group cursor-pointer" onClick={() => navigate(`/course-detail/${course._id}`)}>
//               <div className="aspect-video relative overflow-hidden rounded-t-lg">
//                 <img 
//                   src={course.thumbnail || '/placeholder.svg'} 
//                   alt={course.courseName}
//                   className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
//                 />
//                 <div className="absolute top-4 right-4">
//                   <Badge variant={course.status === 'Published' ? 'default' : 'secondary'}>
//                     {course.status}
//                   </Badge>
//                 </div>
//               </div>
              
//               <CardHeader className="pb-3">
//                 <CardTitle className="text-lg line-clamp-2 group-hover:text-primary transition-colors">
//                   {course.courseName}
//                 </CardTitle>
//                 <p className="text-sm text-muted-foreground line-clamp-2">
//                   {course.courseDescription}
//                 </p>
//                 <p className="text-sm font-medium text-primary">
//                   by {course.instructor?.firstName} {course.instructor?.lastName}
//                 </p>
//               </CardHeader>
              
//               <CardContent className="pt-0">
//                 <div className="flex items-center justify-between mb-4">
//                   <div className="flex items-center space-x-4 text-sm text-muted-foreground">
//                     <div className="flex items-center space-x-1">
//                       <Users className="w-4 h-4" />
//                       <span>{course.studentsEnrolled?.length || 0}</span>
//                     </div>
//                     <div className="flex items-center space-x-1">
//                       <BookOpen className="w-4 h-4" />
//                       <span>{course.courseContent?.length || 0} sections</span>
//                     </div>
//                   </div>
//                 </div>
                
//                 <div className="flex flex-wrap gap-1 mb-4">
//                   {course.tag?.slice(0, 3).map((tag, index) => (
//                     <Badge key={index} variant="outline" className="text-xs">
//                       {tag}
//                     </Badge>
//                   ))}
//                   {course.tag?.length > 3 && (
//                     <Badge variant="outline" className="text-xs">
//                       +{course.tag.length - 3}
//                     </Badge>
//                   )}
//                 </div>
                
//                 <div className="flex items-center justify-between">
//                   <div className="flex items-center space-x-2">
//                     <span className="text-2xl font-bold text-primary">
//                       ${course.price}
//                     </span>
//                   </div>
//                   <div className="flex space-x-2">
//                     <Button 
//                       size="sm" 
//                       variant="outline" 
//                       className="flex-1"
//                       onClick={(e) => {
//                         e.stopPropagation();
//                         handleViewCourse(course._id);
//                       }}
//                       disabled={viewingCourseId === course._id}
//                     >
//                       {viewingCourseId === course._id ? (
//                         <Loader2 className="w-4 h-4 animate-spin" />
//                       ) : (
//                         'View Details'
//                       )}
//                     </Button>
//                     {!(course.studentsEnrolled?.includes(user?._id) || course.studentsEnroled?.includes(user?._id)) && (
//                       <Button 
//                         size="sm" 
//                         className="bg-gradient-to-r from-primary to-accent"
//                         onClick={(e) => {
//                           e.stopPropagation();
//                           handleEnrollCourse(course._id);
//                         }}
//                         disabled={enrollingCourseId === course._id}
//                       >
//                         {enrollingCourseId === course._id ? (
//                           <Loader2 className="w-4 h-4 animate-spin" />
//                         ) : (
//                           'Enroll'
//                         )}
//                       </Button>
//                     )}
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>
//           ))}
//         </div>

//         {filteredCourses.length === 0 && (
//           <div className="text-center py-16">
//             <BookOpen className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-50" />
//             <h3 className="text-xl font-semibold mb-2">No courses found</h3>
//             <p className="text-muted-foreground">Try adjusting your search or filter criteria</p>
//           </div>
//         )}
//       </div>
      
//       <FloatingActionButton />
//       <BackToTop />
//     </div>
//   );
// };

// export default AllCourses;











import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, Users, BookOpen, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Navbar from '@/components/Navbar';
import { courseService } from '@/service/course.service';
import CourseSearch from '@/components/CourseSearch';
import FloatingActionButton from '@/components/FloatingActionButton';
import BackToTop from '@/components/BackToTop';
import CourseFilters from '@/components/CourseFilters';
import { useAppSelector } from '@/hooks/redux';

const AllCourses = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAppSelector((state) => state.auth);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [priceRange, setPriceRange] = useState('all');
  const [courses, setCourses] = useState([]);
  const [allCourses, setAllCourses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [enrollingCourseId, setEnrollingCourseId] = useState<string | null>(null);
  const [viewingCourseId, setViewingCourseId] = useState<string | null>(null);

  const fetchCourses = async () => {
    try {
      setIsLoading(true);
      const res = await courseService.getAllCourses();
      const coursesData = res.data || [];
      setAllCourses(coursesData);
      setCourses(coursesData);
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

  const fetchCategories = async () => {
    try {
      const res = await courseService.getAllCategories();
      setCategories(res.data || []);
    } catch (error: any) {
      console.error('Error fetching categories:', error);
    }
  };

  useEffect(() => {
    fetchCourses();
    fetchCategories();
  }, []);

  useEffect(() => {
    if (allCourses.length > 0) {
      applyFilters();
    }
  }, [selectedCategory, sortBy, priceRange]);

  const applyFilters = () => {
    if (allCourses.length === 0) return;
    
    let filtered = [...allCourses];

    // Category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(course => course.category?._id === selectedCategory);
    }

    // Price filter
    if (priceRange !== 'all') {
      switch (priceRange) {
        case 'free':
          filtered = filtered.filter(course => parseFloat(course.price) === 0);
          break;
        case '0-50':
          filtered = filtered.filter(course => {
            const price = parseFloat(course.price);
            return price >= 0 && price <= 50;
          });
          break;
        case '50-100':
          filtered = filtered.filter(course => {
            const price = parseFloat(course.price);
            return price > 50 && price <= 100;
          });
          break;
        case '100-200':
          filtered = filtered.filter(course => {
            const price = parseFloat(course.price);
            return price > 100 && price <= 200;
          });
          break;
        case '200+':
          filtered = filtered.filter(course => parseFloat(course.price) > 200);
          break;
      }
    }

    // Sort
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
        break;
      case 'price-high':
        filtered.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
        break;
      case 'popular':
        filtered.sort((a, b) => (b.studentsEnrolled?.length || 0) - (a.studentsEnrolled?.length || 0));
        break;
      case 'oldest':
        filtered.sort((a, b) => new Date(a.createdAt || 0).getTime() - new Date(b.createdAt || 0).getTime());
        break;
      case 'newest':
      default:
        filtered.sort((a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime());
        break;
    }

    setCourses(filtered);
  };

  const clearFilters = () => {
    setSelectedCategory('all');
    setSortBy('newest');
    setPriceRange('all');
  };

  const handleViewCourse = async (courseId: string) => {
    setViewingCourseId(courseId);
    try {
      // Add a small delay to show loading state
      await new Promise(resolve => setTimeout(resolve, 500));
      navigate(`/course-detail/${courseId}`);
    } finally {
      setViewingCourseId(null);
    }
  };

  const handleEnrollCourse = async (courseId: string) => {
    setEnrollingCourseId(courseId);
    try {
      // Add a small delay to show loading state
      await new Promise(resolve => setTimeout(resolve, 500));
      navigate(`/course-detail/${courseId}`);
    } finally {
      setEnrollingCourseId(null);
    }
  };

  const filteredCourses = courses;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-shell-darker via-shell-dark to-shell-dark">
        <Navbar />
        <div className="container mx-auto px-4 py-12 flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4" />
            <p>Loading courses...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-shell-darker via-shell-dark to-shell-dark">
      <Navbar />
      
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary/20 to-accent/20 py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              All Courses
            </span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Browse our complete collection of courses and find the perfect one for your learning journey
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <CourseSearch 
              placeholder="Search for courses, instructors, or topics..."
              showResults={false}
              onSearchResults={(results) => {
                if (results.length > 0) {
                  setCourses(results);
                } else if (allCourses.length > 0) {
                  setCourses(allCourses); // Reset to all courses if no search results
                }
              }}
            />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 pt-24">
        {/* Filters */}
        <CourseFilters
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          sortBy={sortBy}
          onSortChange={setSortBy}
          priceRange={priceRange}
          onPriceRangeChange={setPriceRange}
          onClearFilters={clearFilters}
        />

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-muted-foreground">
            Showing {filteredCourses.length} of {courses.length} courses
          </p>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCourses.map(course => (
            <Card key={course._id} className="bg-card/80 backdrop-blur-lg border-border hover:shadow-xl transition-all duration-300 group cursor-pointer" onClick={() => navigate(`/course-detail/${course._id}`)}>
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
                <CardTitle className="text-lg line-clamp-2 group-hover:text-primary transition-colors">
                  {course.courseName}
                </CardTitle>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {course.courseDescription}
                </p>
                <p className="text-sm font-medium text-primary">
                  by {course.instructor?.firstName} {course.instructor?.lastName}
                </p>
              </CardHeader>
              
              <CardContent className="pt-0">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
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
                    <span className="text-2xl font-bold text-primary">
                      ${course.price}
                    </span>
                  </div>
                  <div className="flex space-x-2">
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="flex-1"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleViewCourse(course._id);
                      }}
                      disabled={viewingCourseId === course._id}
                    >
                      {viewingCourseId === course._id ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        'View Details'
                      )}
                    </Button>
                    {!(course.studentsEnrolled?.includes(user?._id) || course.studentsEnroled?.includes(user?._id)) && (
                      <Button 
                        size="sm" 
                        className="bg-gradient-to-r from-primary to-accent"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEnrollCourse(course._id);
                        }}
                        disabled={enrollingCourseId === course._id}
                      >
                        {enrollingCourseId === course._id ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          'Enroll'
                        )}
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredCourses.length === 0 && (
          <div className="text-center py-16">
            <BookOpen className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-50" />
            <h3 className="text-xl font-semibold mb-2">No courses found</h3>
            <p className="text-muted-foreground">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>
      
      <FloatingActionButton />
      <BackToTop />
    </div>
  );
};

export default AllCourses;