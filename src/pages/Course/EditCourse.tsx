// import React, { useState, useEffect } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Textarea } from "@/components/ui/textarea";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { Badge } from "@/components/ui/badge";
// import { Progress } from "@/components/ui/progress";
// import { Plus, Trash2, X, Image, Tag, Video, FileText, Edit, Send, Upload, Loader2, CheckCircle, ArrowRight, ArrowLeft } from "lucide-react";
// import { useToast } from "@/hooks/use-toast";
// import Navbar from '@/components/Navbar';
// import { courseService } from '@/service/course.service';
// import { useAppSelector } from '@/hooks/redux';

// const EditCourse = () => {
//   const navigate = useNavigate();
//   const { courseId } = useParams();
//   const { toast } = useToast();
//   const { token } = useAppSelector((state) => state.auth);

//   const [currentStage, setCurrentStage] = useState(1);
//   const [isLoading, setIsLoading] = useState(false);
//   const [isLoadingCourse, setIsLoadingCourse] = useState(true);
//   const [categories, setCategories] = useState([]);

//   // Stage 1: Course Data
//   const [courseData, setCourseData] = useState({
//     courseName: '',
//     courseDescription: '',
//     whatYouWillLearn: '',
//     price: '',
//     thumbnail: null,
//     thumbnailImage: '',
//     tags: [],
//     category: '',
//     instructions: [],
//     status: 'Draft'
//   });

//   // Track original data for change detection
//   const [originalCourseData, setOriginalCourseData] = useState({});
//   const [originalSections, setOriginalSections] = useState([]);
//   const [hasChanges, setHasChanges] = useState(false);

//   // Stage 2: Sections and Subsections
//   const [sections, setSections] = useState([]);
//   const [currentSectionName, setCurrentSectionName] = useState('');
//   const [currentSubSection, setCurrentSubSection] = useState({
//     title: '',
//     description: '',
//     videoFile: null,
//     videoPreview: ''
//   });

//   // Helper states
//   const [currentTag, setCurrentTag] = useState('');
//   const [currentInstruction, setCurrentInstruction] = useState('');

//   // Fetch course details
//   const fetchCourseDetails = async () => {
//     if (!courseId || !token) return;
//     try {
//       setIsLoadingCourse(true);
//       const res = await courseService.getFullCourseDetails(courseId, token);
//       const course = res.data.courseDetails;
      
//       const courseDataObj = {
//         courseName: course.courseName || '',
//         courseDescription: course.courseDescription || '',
//         whatYouWillLearn: course.whatYouWillLearn || '',
//         price: course.price || '',
//         thumbnail: null,
//         thumbnailImage: course.thumbnail || '',
//         tags: course.tag || [],
//         category: course.category?._id || '',
//         instructions: course.instructions || [],
//         status: course.status || 'Draft'
//       };
      
//       setCourseData(courseDataObj);
//       setOriginalCourseData(courseDataObj);

//       // Convert existing sections to editable format
//       const existingSections = course.courseContent?.map(section => ({
//         sectionName: section.sectionName,
//         sectionId: section._id,
//         isCreated: true,
//         subSections: section.subSection?.map(sub => ({
//           title: sub.title,
//           description: sub.description,
//           videoFile: null,
//           videoPreview: sub.videoUrl,
//           subSectionId: sub._id,
//           isCreated: true
//         })) || []
//       })) || [];
      
//       setSections(existingSections);
//       setOriginalSections(JSON.parse(JSON.stringify(existingSections)));
//     } catch (error) {
//       toast({
//         title: "Error",
//         description: "Failed to fetch course details",
//         variant: "destructive"
//       });
//       navigate('/manage-courses');
//     } finally {
//       setIsLoadingCourse(false);
//     }
//   };

//   // Fetch categories
//   const fetchCategories = async () => {
//     if (!token) return;
//     try {
//       const res = await courseService.getAllCategories();
//       setCategories(res.data || []);
//     } catch (error) {
//       console.error('Error fetching categories:', error);
//     }
//   };

//   useEffect(() => {
//     fetchCourseDetails();
//     fetchCategories();
//   }, [courseId, token]);

//   // Stage 1 Handlers
//   const handleCourseInputChange = (e) => {
//     const { name, value } = e.target;
//     setCourseData(prev => ({ ...prev, [name]: value }));
//   };

//   const handleThumbnailChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const previewUrl = URL.createObjectURL(file);
//       setCourseData(prev => ({ ...prev, thumbnail: file, thumbnailImage: previewUrl }));
//     }
//   };

//   const addTag = () => {
//     if (currentTag.trim() && !courseData.tags.includes(currentTag.trim())) {
//       setCourseData(prev => ({ ...prev, tags: [...prev.tags, currentTag.trim()] }));
//       setCurrentTag('');
//     }
//   };

//   const removeTag = (index) => {
//     setCourseData(prev => ({
//       ...prev,
//       tags: prev.tags.filter((_, i) => i !== index)
//     }));
//   };

//   const addInstruction = () => {
//     if (currentInstruction.trim()) {
//       setCourseData(prev => ({ ...prev, instructions: [...prev.instructions, currentInstruction.trim()] }));
//       setCurrentInstruction('');
//     }
//   };

//   const removeInstruction = (index) => {
//     setCourseData(prev => ({
//       ...prev,
//       instructions: prev.instructions.filter((_, i) => i !== index)
//     }));
//   };

//   // Check if course data has changed
//   const hasCourseDataChanged = () => {
//     return JSON.stringify({
//       courseName: courseData.courseName,
//       courseDescription: courseData.courseDescription,
//       whatYouWillLearn: courseData.whatYouWillLearn,
//       price: courseData.price,
//       category: courseData.category,
//       tags: courseData.tags,
//       instructions: courseData.instructions
//     }) !== JSON.stringify({
//       courseName: originalCourseData.courseName,
//       courseDescription: originalCourseData.courseDescription,
//       whatYouWillLearn: originalCourseData.whatYouWillLearn,
//       price: originalCourseData.price,
//       category: originalCourseData.category,
//       tags: originalCourseData.tags,
//       instructions: originalCourseData.instructions
//     }) || courseData.thumbnail !== null;
//   };

//   // Stage 1: Update Course
//   const handleStage1Submit = async () => {
//     if (!courseData.courseName || !courseData.price || courseData.tags.length === 0) {
//       toast({ title: "Incomplete form", description: "Please fill required fields.", variant: "destructive" });
//       return;
//     }

//     // Check if there are changes
//     if (!hasCourseDataChanged()) {
//       toast({
//         title: "No Changes Detected",
//         description: "Moving to next stage without updating."
//       });
//       setCurrentStage(2);
//       return;
//     }

//     try {
//       setIsLoading(true);
      
//       const formData = new FormData();
//       formData.append('courseId', courseId);
//       formData.append('courseName', courseData.courseName);
//       formData.append('courseDescription', courseData.courseDescription);
//       formData.append('whatYouWillLearn', courseData.whatYouWillLearn);
//       formData.append('price', courseData.price);
//       formData.append('category', courseData.category);
//       formData.append('tag', JSON.stringify(courseData.tags));
//       formData.append('instructions', JSON.stringify(courseData.instructions));
      
//       if (courseData.thumbnail) {
//         formData.append('thumbnailImage', courseData.thumbnail);
//       }
      
//       await courseService.editCourse(formData, token);
      
//       toast({
//         title: "Course Updated Successfully!",
//         description: "Now you can manage sections and lessons."
//       });
      
//       setCurrentStage(2);
//     } catch (error) {
//       toast({
//         title: "Error",
//         description: error.response?.data?.message || "Failed to update course",
//         variant: "destructive"
//       });
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Stage 2 Handlers
//   const addSection = async () => {
//     if (!currentSectionName.trim()) return;
    
//     try {
//       setIsLoading(true);
//       const sectionRes = await courseService.createSection({
//         sectionName: currentSectionName.trim(),
//         courseId: courseId
//       }, token);
      
//       const newSectionId = sectionRes.updatedCourse.courseContent[sectionRes.updatedCourse.courseContent.length - 1]._id || sectionRes.updatedCourse.courseContent[sectionRes.updatedCourse.courseContent.length - 1];
      
//       setSections(prev => [...prev, {
//         sectionName: currentSectionName.trim(),
//         sectionId: newSectionId,
//         isCreated: true,
//         subSections: []
//       }]);
      
//       setCurrentSectionName('');
//       toast({ title: "Section added successfully!" });
//     } catch (error) {
//       toast({
//         title: "Error",
//         description: "Failed to add section",
//         variant: "destructive"
//       });
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const removeSection = async (index) => {
//     const section = sections[index];
//     if (section.isCreated && section.sectionId) {
//       try {
//         setIsLoading(true);
//         await courseService.deleteSection({
//           sectionId: section.sectionId,
//           courseId: courseId
//         }, token);
        
//         setSections(prev => prev.filter((_, i) => i !== index));
//         toast({ title: "Section deleted successfully!" });
//       } catch (error) {
//         toast({
//           title: "Error",
//           description: "Failed to delete section",
//           variant: "destructive"
//         });
//       } finally {
//         setIsLoading(false);
//       }
//     } else {
//       setSections(prev => prev.filter((_, i) => i !== index));
//     }
//   };

//   const handleVideoChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const previewUrl = URL.createObjectURL(file);
//       setCurrentSubSection(prev => ({ ...prev, videoFile: file, videoPreview: previewUrl }));
//     }
//   };

//   const addSubSection = async (sectionIndex) => {
//     if (!currentSubSection.title.trim() || !currentSubSection.videoFile) return;
    
//     const section = sections[sectionIndex];
//     if (!section.sectionId) return;
    
//     try {
//       setIsLoading(true);
//       const subSectionData = new FormData();
//       // console.log("section ",section);
//       subSectionData.append('sectionId', section.sectionId);
//       subSectionData.append('title', currentSubSection.title);
//       subSectionData.append('description', currentSubSection.description);
//       subSectionData.append('courseId', courseId);
//       subSectionData.append('videoFile', currentSubSection.videoFile);
      
//       await courseService.createSubSection(subSectionData, token);
      
//       setSections(prev => prev.map((s, idx) =>
//         idx === sectionIndex
//           ? { ...s, subSections: [...s.subSections, { ...currentSubSection, isCreated: true }] }
//           : s
//       ));
      
//       setCurrentSubSection({ title: '', description: '', videoFile: null, videoPreview: '' });
//       toast({ title: "Lesson added successfully!" });
//     } catch (error) {
//       toast({
//         title: "Error",
//         description: "Failed to add lesson",
//         variant: "destructive"
//       });
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const removeSubSection = async (sectionIndex, subIndex) => {
//     const section = sections[sectionIndex];
//     const subSection = section.subSections[subIndex];
    
//     if (subSection.isCreated && subSection.subSectionId) {
//       try {
//         setIsLoading(true);
//         await courseService.deleteSubSection({
//           subSectionId: subSection.subSectionId,
//           sectionId: section.sectionId,
//           courseId: courseId
//         }, token);
        
//         setSections(prev => prev.map((s, idx) =>
//           idx === sectionIndex
//             ? { ...s, subSections: s.subSections.filter((_, i) => i !== subIndex) }
//             : s
//         ));
        
//         toast({ title: "Lesson deleted successfully!" });
//       } catch (error) {
//         toast({
//           title: "Error",
//           description: "Failed to delete lesson",
//           variant: "destructive"
//         });
//       } finally {
//         setIsLoading(false);
//       }
//     } else {
//       setSections(prev => prev.map((s, idx) =>
//         idx === sectionIndex
//           ? { ...s, subSections: s.subSections.filter((_, i) => i !== subIndex) }
//           : s
//       ));
//     }
//   };

//   // Stage 3: Update Course Status
//   const handleStage3Submit = async () => {
//     // Check if status has changed
//     if (courseData.status === originalCourseData.status) {
//       toast({
//         title: "No Changes Detected",
//         description: "Course status unchanged. Returning to manage courses."
//       });
//       navigate('/manage-courses');
//       return;
//     }

//     try {
//       setIsLoading(true);
      
//       const formData = new FormData();
//       formData.append('courseId', courseId);
//       formData.append('status', courseData.status);
      
//       await courseService.editCourse(formData, token);
      
//       toast({
//         title: "Course Updated!",
//         description: `Course has been ${courseData.status === 'Published' ? 'published' : 'saved as draft'} successfully.`
//       });
      
//       navigate('/manage-courses');
//     } catch (error) {
//       toast({
//         title: "Error",
//         description: error.response?.data?.message || "Failed to update course status",
//         variant: "destructive"
//       });
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const getStageProgress = () => {
//     return (currentStage / 3) * 100;
//   };

//   if (isLoadingCourse) {
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

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-shell-darker via-shell-dark to-shell-dark">
//       <Navbar />
      
//       {/* Progress Header */}
//       <div className="border-b border-border bg-card/50 backdrop-blur-lg sticky top-0 z-10">
//         <div className="container mx-auto px-4 py-6">
//           <div className="max-w-4xl mx-auto">
//             <div className="flex items-center justify-between mb-4">
//               <button 
//                 onClick={() => navigate('/manage-courses')} 
//                 className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors"
//               >
//                 <ArrowLeft className="w-4 h-4" />
//                 <span>Back to Manage Courses</span>
//               </button>
//               <div className="text-sm text-muted-foreground">
//                 Stage {currentStage} of 3
//               </div>
//             </div>
            
//             <div className="space-y-2">
//               <div className="flex justify-between text-sm">
//                 <span className={currentStage >= 1 ? "text-primary font-medium" : "text-muted-foreground"}>
//                   1. Edit Course Details
//                 </span>
//                 <span className={currentStage >= 2 ? "text-primary font-medium" : "text-muted-foreground"}>
//                   2. Manage Content
//                 </span>
//                 <span className={currentStage >= 3 ? "text-primary font-medium" : "text-muted-foreground"}>
//                   3. Update Status
//                 </span>
//               </div>
//               <Progress value={getStageProgress()} className="h-2" />
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="container mx-auto px-4 py-8">
//         <div className="max-w-4xl mx-auto">
          
//           {/* Stage 1: Course Details */}
//           {currentStage === 1 && (
//             <Card className="bg-card/80 backdrop-blur-lg border-border">
//               <CardHeader className="text-center">
//                 <CardTitle className="text-2xl font-bold">
//                   <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
//                     Stage 1: Edit Course Details
//                   </span>
//                 </CardTitle>
//                 <p className="text-muted-foreground">Update the basic information for your course</p>
//               </CardHeader>
//               <CardContent className="space-y-6">
                
//                 {/* Basic Info */}
//                 <div className="grid md:grid-cols-2 gap-6">
//                   <div className="space-y-2">
//                     <Label htmlFor="courseName">Course Name *</Label>
//                     <Input
//                       id="courseName"
//                       name="courseName"
//                       value={courseData.courseName}
//                       onChange={handleCourseInputChange}
//                       placeholder="Enter course title"
//                     />
//                   </div>
//                   <div className="space-y-2">
//                     <Label htmlFor="price">Price *</Label>
//                     <Input
//                       id="price"
//                       name="price"
//                       value={courseData.price}
//                       onChange={handleCourseInputChange}
//                       placeholder="$99.99"
//                     />
//                   </div>
//                 </div>

//                 <div className="space-y-2">
//                   <Label htmlFor="courseDescription">Course Description</Label>
//                   <Textarea
//                     id="courseDescription"
//                     name="courseDescription"
//                     value={courseData.courseDescription}
//                     onChange={handleCourseInputChange}
//                     placeholder="Describe your course..."
//                     rows={3}
//                   />
//                 </div>

//                 <div className="space-y-2">
//                   <Label htmlFor="whatYouWillLearn">What You Will Learn</Label>
//                   <Textarea
//                     id="whatYouWillLearn"
//                     name="whatYouWillLearn"
//                     value={courseData.whatYouWillLearn}
//                     onChange={handleCourseInputChange}
//                     placeholder="Key takeaways..."
//                     rows={3}
//                   />
//                 </div>

//                 {/* Category */}
//                 <div className="space-y-2">
//                   <Label>Category</Label>
//                   <Select value={courseData.category} onValueChange={(value) => setCourseData(prev => ({ ...prev, category: value }))}>
//                     <SelectTrigger>
//                       <SelectValue placeholder="Select category" />
//                     </SelectTrigger>
//                     <SelectContent>
//                       {categories.map((cat) => (
//                         <SelectItem key={cat._id} value={cat._id}>{cat.name}</SelectItem>
//                       ))}
//                     </SelectContent>
//                   </Select>
//                 </div>

//                 {/* Tags */}
//                 <div className="space-y-2">
//                   <Label>Tags *</Label>
//                   <div className="flex space-x-2">
//                     <Input
//                       value={currentTag}
//                       onChange={(e) => setCurrentTag(e.target.value)}
//                       onKeyDown={(e) => e.key === 'Enter' && addTag()}
//                       placeholder="Add tag"
//                       className="flex-1"
//                     />
//                     <Button type="button" variant="outline" size="sm" onClick={addTag}>
//                       <Plus className="w-4 h-4" />
//                     </Button>
//                   </div>
//                   <div className="flex flex-wrap gap-2">
//                     {courseData.tags.map((tag, index) => (
//                       <Badge key={index} variant="secondary" className="flex items-center space-x-1">
//                         {tag}
//                         <Button
//                           type="button"
//                           variant="ghost"
//                           size="sm"
//                           onClick={() => removeTag(index)}
//                           className="h-4 w-4 p-0"
//                         >
//                           <X className="w-3 h-3" />
//                         </Button>
//                       </Badge>
//                     ))}
//                   </div>
//                 </div>

//                 {/* Instructions */}
//                 <div className="space-y-2">
//                   <Label>Instructions</Label>
//                   <div className="flex space-x-2">
//                     <Input
//                       value={currentInstruction}
//                       onChange={(e) => setCurrentInstruction(e.target.value)}
//                       onKeyDown={(e) => e.key === 'Enter' && addInstruction()}
//                       placeholder="Add instruction"
//                       className="flex-1"
//                     />
//                     <Button type="button" variant="outline" size="sm" onClick={addInstruction}>
//                       <Plus className="w-4 h-4" />
//                     </Button>
//                   </div>
//                   <div className="flex flex-wrap gap-2">
//                     {courseData.instructions.map((inst, index) => (
//                       <Badge key={index} variant="outline" className="flex items-center space-x-1">
//                         {inst}
//                         <Button
//                           type="button"
//                           variant="ghost"
//                           size="sm"
//                           onClick={() => removeInstruction(index)}
//                           className="h-4 w-4 p-0"
//                         >
//                           <X className="w-3 h-3" />
//                         </Button>
//                       </Badge>
//                     ))}
//                   </div>
//                 </div>

//                 {/* Thumbnail */}
//                 <div className="space-y-2">
//                   <Label>Thumbnail Image</Label>
//                   {!courseData.thumbnailImage ? (
//                     <div className="relative border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary transition-colors cursor-pointer group">
//                       <input
//                         type="file"
//                         accept="image/*"
//                         onChange={handleThumbnailChange}
//                         className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
//                       />
//                       <div className="space-y-2 pointer-events-none">
//                         <div className="w-16 h-16 mx-auto bg-secondary rounded-full flex items-center justify-center group-hover:bg-primary/10 transition-colors">
//                           <Image className="w-8 h-8 text-muted-foreground group-hover:text-primary" />
//                         </div>
//                         <div>
//                           <p className="text-sm font-medium text-foreground">Click to upload thumbnail</p>
//                           <p className="text-xs text-muted-foreground">PNG, JPG up to 10MB</p>
//                         </div>
//                       </div>
//                     </div>
//                   ) : (
//                     <div className="relative group">
//                       <div className="aspect-video w-full max-w-md rounded-lg overflow-hidden border border-border">
//                         <img 
//                           src={courseData.thumbnailImage} 
//                           alt="Course Thumbnail" 
//                           className="w-full h-full object-cover"
//                         />
//                       </div>
//                       <Button
//                         type="button"
//                         size="sm"
//                         variant="destructive"
//                         onClick={() => setCourseData(prev => ({ ...prev, thumbnail: null, thumbnailImage: '' }))}
//                         className="absolute top-2 right-2"
//                       >
//                         <X className="w-4 h-4" />
//                       </Button>
//                     </div>
//                   )}
//                 </div>

//                 <Button 
//                   onClick={handleStage1Submit}
//                   className="w-full bg-gradient-to-r from-primary to-accent"
//                   disabled={isLoading}
//                 >
//                   {isLoading ? (
//                     <>
//                       <Loader2 className="w-4 h-4 mr-2 animate-spin" />
//                       Updating Course...
//                     </>
//                   ) : (
//                     <>
//                       Update Course & Continue
//                       <ArrowRight className="w-4 h-4 ml-2" />
//                     </>
//                   )}
//                 </Button>
//               </CardContent>
//             </Card>
//           )}

//           {/* Stage 2: Manage Content */}
//           {currentStage === 2 && (
//             <Card className="bg-card/80 backdrop-blur-lg border-border">
//               <CardHeader className="text-center">
//                 <CardTitle className="text-2xl font-bold">
//                   <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
//                     Stage 2: Manage Course Content
//                   </span>
//                 </CardTitle>
//                 <p className="text-muted-foreground">Add, edit, or remove sections and lessons</p>
//                 <div className="flex items-center justify-center space-x-2 mt-2">
//                   <CheckCircle className="w-5 h-5 text-green-500" />
//                   <span className="text-sm text-green-500">Course details updated successfully</span>
//                 </div>
//               </CardHeader>
//               <CardContent className="space-y-6">
                
//                 {/* Add Section */}
//                 <div className="p-4 bg-gradient-to-r from-primary/5 to-accent/5 rounded-lg border border-primary/20">
//                   <Label className="text-sm font-medium mb-3 block">Add New Section</Label>
//                   <div className="flex space-x-2">
//                     <Input
//                       value={currentSectionName}
//                       onChange={(e) => setCurrentSectionName(e.target.value)}
//                       onKeyDown={(e) => e.key === 'Enter' && addSection()}
//                       placeholder="Enter section name"
//                       className="flex-1"
//                     />
//                     <Button 
//                       type="button" 
//                       variant="default" 
//                       onClick={addSection}
//                       disabled={!currentSectionName.trim() || isLoading}
//                     >
//                       <Plus className="w-4 h-4" />
//                     </Button>
//                   </div>
//                 </div>

//                 {/* Sections */}
//                 <div className="space-y-4">
//                   {sections.length === 0 && (
//                     <div className="text-center py-8 text-muted-foreground">
//                       <FileText className="w-12 h-12 mx-auto mb-4 opacity-50" />
//                       <h3 className="text-lg font-medium mb-2">No sections yet</h3>
//                       <p className="text-sm">Add your first section above</p>
//                     </div>
//                   )}
                  
//                   {sections.map((section, sectionIndex) => (
//                     <Card key={sectionIndex} className="bg-gradient-to-r from-card/80 to-card/60 border-primary/30">
//                       <CardHeader className="flex flex-row justify-between items-center space-y-0 pb-3">
//                         <div className="flex items-center space-x-3">
//                           <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
//                             <span className="text-sm font-bold text-primary">{sectionIndex + 1}</span>
//                           </div>
//                           <div>
//                             <CardTitle className="text-lg">{section.sectionName}</CardTitle>
//                             <p className="text-sm text-muted-foreground">
//                               {section.subSections.length} lesson{section.subSections.length !== 1 ? 's' : ''}
//                             </p>
//                           </div>
//                         </div>
//                         <Button
//                           type="button"
//                           variant="ghost"
//                           size="sm"
//                           onClick={() => removeSection(sectionIndex)}
//                           className="text-destructive hover:bg-destructive/10"
//                           disabled={isLoading}
//                         >
//                           <Trash2 className="w-4 h-4" />
//                         </Button>
//                       </CardHeader>
//                       <CardContent className="space-y-4">
                        
//                         {/* Add Subsection */}
//                         <div className="space-y-3 p-4 border border-border rounded-md bg-muted/30">
//                           <Label className="text-sm font-medium">Add New Lesson</Label>
                          
//                           <Input
//                             placeholder="Lesson Title (Required)"
//                             value={currentSubSection.title}
//                             onChange={(e) => setCurrentSubSection(prev => ({ ...prev, title: e.target.value }))}
//                           />
                          
//                           <Textarea
//                             placeholder="Lesson Description"
//                             value={currentSubSection.description}
//                             onChange={(e) => setCurrentSubSection(prev => ({ ...prev, description: e.target.value }))}
//                             rows={2}
//                           />
                          
//                           {/* Video Upload */}
//                           <div className="space-y-2">
//                             <Label className="text-xs text-muted-foreground">Video File (Required)</Label>
//                             {!currentSubSection.videoPreview ? (
//                               <div className="relative border-2 border-dashed border-primary/30 rounded-lg p-3 text-center hover:border-primary transition-colors cursor-pointer group">
//                                 <input
//                                   type="file"
//                                   accept="video/*"
//                                   onChange={handleVideoChange}
//                                   className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
//                                 />
//                                 <div className="space-y-1 pointer-events-none">
//                                   <Video className="w-8 h-8 mx-auto text-primary" />
//                                   <p className="text-xs font-medium">Upload Video</p>
//                                 </div>
//                               </div>
//                             ) : (
//                               <div className="relative">
//                                 <video 
//                                   src={currentSubSection.videoPreview} 
//                                   controls 
//                                   className="w-full h-32 object-contain bg-black rounded"
//                                 />
//                                 <Button
//                                   type="button"
//                                   size="sm"
//                                   variant="destructive"
//                                   onClick={() => setCurrentSubSection(prev => ({ ...prev, videoFile: null, videoPreview: '' }))}
//                                   className="absolute top-2 right-2"
//                                 >
//                                   <X className="w-3 h-3" />
//                                 </Button>
//                               </div>
//                             )}
//                           </div>
                          
//                           <Button
//                             type="button"
//                             size="sm"
//                             onClick={() => addSubSection(sectionIndex)}
//                             className="w-full"
//                             disabled={!currentSubSection.title.trim() || !currentSubSection.videoFile || isLoading}
//                           >
//                             <Plus className="w-4 h-4 mr-2" />
//                             Add Lesson to Section
//                           </Button>
//                         </div>

//                         {/* Subsections List */}
//                         <div className="space-y-2">
//                           {section.subSections.map((sub, subIndex) => (
//                             <div key={subIndex} className="p-3 border border-border/50 rounded-lg bg-card/50">
//                               <div className="flex justify-between items-start">
//                                 <div className="flex-1">
//                                   <div className="flex items-center space-x-2 mb-1">
//                                     <Badge variant="secondary" className="text-xs">
//                                       Lesson {subIndex + 1}
//                                     </Badge>
//                                     <h4 className="font-medium">{sub.title}</h4>
//                                     {sub.isCreated && (
//                                       <Badge variant="outline" className="text-xs">
//                                         Saved
//                                       </Badge>
//                                     )}
//                                   </div>
//                                   {sub.description && (
//                                     <p className="text-sm text-muted-foreground">{sub.description}</p>
//                                   )}
//                                   {sub.videoPreview && (
//                                     <div className="flex items-center space-x-2 mt-2 p-2 bg-primary/10 rounded">
//                                       <Video className="w-4 h-4 text-primary" />
//                                       <span className="text-xs text-primary">Video available</span>
//                                     </div>
//                                   )}
//                                 </div>
//                                 <Button
//                                   type="button"
//                                   variant="ghost"
//                                   size="sm"
//                                   onClick={() => removeSubSection(sectionIndex, subIndex)}
//                                   className="text-destructive hover:bg-destructive/10"
//                                   disabled={isLoading}
//                                 >
//                                   <Trash2 className="w-4 h-4" />
//                                 </Button>
//                               </div>
//                             </div>
//                           ))}
//                         </div>
//                       </CardContent>
//                     </Card>
//                   ))}
//                 </div>

//                 <div className="flex space-x-4">
//                   <Button 
//                     variant="outline"
//                     onClick={() => setCurrentStage(1)}
//                     className="flex-1"
//                   >
//                     <ArrowLeft className="w-4 h-4 mr-2" />
//                     Back to Course Details
//                   </Button>
//                   <Button 
//                     onClick={() => setCurrentStage(3)}
//                     className="flex-1 bg-gradient-to-r from-primary to-accent"
//                   >
//                     Continue to Status
//                     <ArrowRight className="w-4 h-4 ml-2" />
//                   </Button>
//                 </div>
//               </CardContent>
//             </Card>
//           )}

//           {/* Stage 3: Update Status */}
//           {currentStage === 3 && (
//             <Card className="bg-card/80 backdrop-blur-lg border-border">
//               <CardHeader className="text-center">
//                 <CardTitle className="text-2xl font-bold">
//                   <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
//                     Stage 3: Update Course Status
//                   </span>
//                 </CardTitle>
//                 <p className="text-muted-foreground">Choose the final status for your course</p>
//                 <div className="flex flex-col items-center space-y-2 mt-4">
//                   <div className="flex items-center space-x-2">
//                     <CheckCircle className="w-5 h-5 text-green-500" />
//                     <span className="text-sm text-green-500">Course details updated</span>
//                   </div>
//                   <div className="flex items-center space-x-2">
//                     <CheckCircle className="w-5 h-5 text-green-500" />
//                     <span className="text-sm text-green-500">
//                       {sections.length} sections with {sections.reduce((total, section) => total + section.subSections.length, 0)} lessons
//                     </span>
//                   </div>
//                 </div>
//               </CardHeader>
//               <CardContent className="space-y-6">
                
//                 {/* Course Summary */}
//                 <Card className="bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20">
//                   <CardHeader>
//                     <CardTitle className="text-lg">Course Summary</CardTitle>
//                   </CardHeader>
//                   <CardContent className="space-y-4">
//                     <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
//                       <div className="p-3 bg-card/50 rounded-lg">
//                         <div className="text-2xl font-bold text-primary">{sections.length}</div>
//                         <div className="text-sm text-muted-foreground">Sections</div>
//                       </div>
//                       <div className="p-3 bg-card/50 rounded-lg">
//                         <div className="text-2xl font-bold text-accent">
//                           {sections.reduce((total, section) => total + section.subSections.length, 0)}
//                         </div>
//                         <div className="text-sm text-muted-foreground">Lessons</div>
//                       </div>
//                       <div className="p-3 bg-card/50 rounded-lg">
//                         <div className="text-2xl font-bold text-green-500">{courseData.tags.length}</div>
//                         <div className="text-sm text-muted-foreground">Tags</div>
//                       </div>
//                       <div className="p-3 bg-card/50 rounded-lg">
//                         <div className="text-2xl font-bold text-blue-500">${courseData.price}</div>
//                         <div className="text-sm text-muted-foreground">Price</div>
//                       </div>
//                     </div>
//                     <div className="text-center p-4 bg-card/30 rounded-lg">
//                       <h3 className="font-semibold text-lg">{courseData.courseName}</h3>
//                       <p className="text-muted-foreground text-sm mt-1">
//                         {courseData.courseDescription || 'No description provided'}
//                       </p>
//                     </div>
//                   </CardContent>
//                 </Card>

//                 {/* Status Selection */}
//                 <div className="space-y-4">
//                   <Label className="text-lg font-medium">Course Status</Label>
//                   <div className="grid md:grid-cols-2 gap-4">
//                     <Card 
//                       className={`cursor-pointer transition-all ${courseData.status === 'Draft' ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'}`}
//                       onClick={() => setCourseData(prev => ({ ...prev, status: 'Draft' }))}
//                     >
//                       <CardContent className="p-6 text-center">
//                         <Edit className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
//                         <h3 className="font-semibold mb-2">Save as Draft</h3>
//                         <p className="text-sm text-muted-foreground">
//                           Keep your course private and continue editing later
//                         </p>
//                       </CardContent>
//                     </Card>
                    
//                     <Card 
//                       className={`cursor-pointer transition-all ${courseData.status === 'Published' ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'}`}
//                       onClick={() => setCourseData(prev => ({ ...prev, status: 'Published' }))}
//                     >
//                       <CardContent className="p-6 text-center">
//                         <Send className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
//                         <h3 className="font-semibold mb-2">Publish Course</h3>
//                         <p className="text-sm text-muted-foreground">
//                           Make your course available to students immediately
//                         </p>
//                       </CardContent>
//                     </Card>
//                   </div>
//                 </div>

//                 <div className="flex space-x-4">
//                   <Button 
//                     variant="outline"
//                     onClick={() => setCurrentStage(2)}
//                     className="flex-1"
//                   >
//                     <ArrowLeft className="w-4 h-4 mr-2" />
//                     Back to Content
//                   </Button>
//                   <Button 
//                     onClick={handleStage3Submit}
//                     className="flex-1 bg-gradient-to-r from-primary to-accent"
//                     disabled={isLoading}
//                   >
//                     {isLoading ? (
//                       <>
//                         <Loader2 className="w-4 h-4 mr-2 animate-spin" />
//                         {courseData.status === 'Published' ? 'Publishing...' : 'Saving...'}
//                       </>
//                     ) : (
//                       <>
//                         {courseData.status === 'Published' ? 'Publish Course' : 'Save as Draft'}
//                         <CheckCircle className="w-4 h-4 ml-2" />
//                       </>
//                     )}
//                   </Button>
//                 </div>
//               </CardContent>
//             </Card>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EditCourse;










import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Plus, Trash2, X, Image, Tag, Video, FileText, Edit, Send, Upload, Loader2, CheckCircle, ArrowRight, ArrowLeft, ChevronDown } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Navbar from '@/components/Navbar';
import { courseService } from '@/service/course.service';
import { useAppSelector } from '@/hooks/redux';

const EditCourse = () => {
  const navigate = useNavigate();
  const { courseId } = useParams();
  const { toast } = useToast();
  const { token } = useAppSelector((state) => state.auth);

  const [currentStage, setCurrentStage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingCourse, setIsLoadingCourse] = useState(true);
  const [categories, setCategories] = useState([]);

  // Stage 1: Course Data
  const [courseData, setCourseData] = useState({
    courseName: '',
    courseDescription: '',
    whatYouWillLearn: '',
    price: '',
    thumbnail: null,
    thumbnailImage: '',
    tags: [],
    category: '',
    instructions: [],
    status: 'Draft'
  });

  // Track original data for change detection
  const [originalCourseData, setOriginalCourseData] = useState({});
  const [originalSections, setOriginalSections] = useState([]);
  const [hasChanges, setHasChanges] = useState(false);

  // Stage 2: Sections and Subsections
  const [sections, setSections] = useState([]);
  const [currentSectionName, setCurrentSectionName] = useState('');
  const [currentSubSection, setCurrentSubSection] = useState({
    title: '',
    description: '',
    videoFile: null,
    videoPreview: ''
  });

  // Helper states
  const [currentTag, setCurrentTag] = useState('');
  const [currentInstruction, setCurrentInstruction] = useState('');

  // Fetch course details
  const fetchCourseDetails = async () => {
    if (!courseId || !token) return;
    try {
      setIsLoadingCourse(true);
      const res = await courseService.getFullCourseDetails(courseId, token);
      const course = res.data.courseDetails;
      
      const courseDataObj = {
        courseName: course.courseName || '',
        courseDescription: course.courseDescription || '',
        whatYouWillLearn: course.whatYouWillLearn || '',
        price: course.price || '',
        thumbnail: null,
        thumbnailImage: course.thumbnail || '',
        tags: course.tag || [],
        category: course.category?._id || '',
        instructions: course.instructions || [],
        status: course.status || 'Draft'
      };
      
      setCourseData(courseDataObj);
      setOriginalCourseData(courseDataObj);

      // Convert existing sections to editable format
      const existingSections = course.courseContent?.map(section => ({
        sectionName: section.sectionName,
        sectionId: section._id,
        isCreated: true,
        subSections: section.subSection?.map(sub => ({
          title: sub.title,
          description: sub.description,
          videoFile: null,
          videoPreview: sub.videoUrl,
          subSectionId: sub._id,
          isCreated: true
        })) || []
      })) || [];
      
      setSections(existingSections);
      setOriginalSections(JSON.parse(JSON.stringify(existingSections)));
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch course details",
        variant: "destructive"
      });
      navigate('/manage-courses');
    } finally {
      setIsLoadingCourse(false);
    }
  };

  // Fetch categories
  const fetchCategories = async () => {
    if (!token) return;
    try {
      const res = await courseService.getAllCategories();
      setCategories(res.data || []);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  useEffect(() => {
    fetchCourseDetails();
    fetchCategories();
  }, [courseId, token]);

  // Stage 1 Handlers
  const handleCourseInputChange = (e) => {
    const { name, value } = e.target;
    setCourseData(prev => ({ ...prev, [name]: value }));
  };

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setCourseData(prev => ({ ...prev, thumbnail: file, thumbnailImage: previewUrl }));
    }
  };

  const addTag = () => {
    if (currentTag.trim() && !courseData.tags.includes(currentTag.trim())) {
      setCourseData(prev => ({ ...prev, tags: [...prev.tags, currentTag.trim()] }));
      setCurrentTag('');
    }
  };

  const removeTag = (index) => {
    setCourseData(prev => ({
      ...prev,
      tags: prev.tags.filter((_, i) => i !== index)
    }));
  };

  const addInstruction = () => {
    if (currentInstruction.trim()) {
      setCourseData(prev => ({ ...prev, instructions: [...prev.instructions, currentInstruction.trim()] }));
      setCurrentInstruction('');
    }
  };

  const removeInstruction = (index) => {
    setCourseData(prev => ({
      ...prev,
      instructions: prev.instructions.filter((_, i) => i !== index)
    }));
  };

  // Check if course data has changed
  const hasCourseDataChanged = () => {
    return JSON.stringify({
      courseName: courseData.courseName,
      courseDescription: courseData.courseDescription,
      whatYouWillLearn: courseData.whatYouWillLearn,
      price: courseData.price,
      category: courseData.category,
      tags: courseData.tags,
      instructions: courseData.instructions
    }) !== JSON.stringify({
      courseName: originalCourseData.courseName,
      courseDescription: originalCourseData.courseDescription,
      whatYouWillLearn: originalCourseData.whatYouWillLearn,
      price: originalCourseData.price,
      category: originalCourseData.category,
      tags: originalCourseData.tags,
      instructions: originalCourseData.instructions
    }) || courseData.thumbnail !== null;
  };

  // Stage 1: Update Course
  const handleStage1Submit = async () => {
    if (!courseData.courseName || !courseData.price || courseData.tags.length === 0) {
      toast({ title: "Incomplete form", description: "Please fill required fields.", variant: "destructive" });
      return;
    }

    // Check if there are changes
    if (!hasCourseDataChanged()) {
      toast({
        title: "No Changes Detected",
        description: "Moving to next stage without updating."
      });
      setCurrentStage(2);
      return;
    }

    try {
      setIsLoading(true);
      
      const formData = new FormData();
      formData.append('courseId', courseId);
      formData.append('courseName', courseData.courseName);
      formData.append('courseDescription', courseData.courseDescription);
      formData.append('whatYouWillLearn', courseData.whatYouWillLearn);
      formData.append('price', courseData.price);
      formData.append('category', courseData.category);
      formData.append('tag', JSON.stringify(courseData.tags));
      formData.append('instructions', JSON.stringify(courseData.instructions));
      
      if (courseData.thumbnail) {
        formData.append('thumbnailImage', courseData.thumbnail);
      }
      
      await courseService.editCourse(formData, token);
      
      toast({
        title: "Course Updated Successfully!",
        description: "Now you can manage sections and lessons."
      });
      
      setCurrentStage(2);
    } catch (error) {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to update course",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Stage 2 Handlers
  const addSection = async () => {
    if (!currentSectionName.trim()) return;
    
    try {
      setIsLoading(true);
      const sectionRes = await courseService.createSection({
        sectionName: currentSectionName.trim(),
        courseId: courseId
      }, token);
      
      const newSectionId = sectionRes.updatedCourse.courseContent[sectionRes.updatedCourse.courseContent.length - 1]._id || sectionRes.updatedCourse.courseContent[sectionRes.updatedCourse.courseContent.length - 1];
      
      setSections(prev => [...prev, {
        sectionName: currentSectionName.trim(),
        sectionId: newSectionId,
        isCreated: true,
        subSections: []
      }]);
      
      setCurrentSectionName('');
      toast({ title: "Section added successfully!" });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add section",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const removeSection = async (index) => {
    // UX: Add confirmation toast
    toast({
      title: "Confirm Delete",
      description: "Are you sure you want to delete this section? This action cannot be undone.",
      action: (
        <div className="flex space-x-2">
          <Button size="sm" variant="outline" onClick={() => toast.dismiss()}>Cancel</Button>
          <Button size="sm" variant="destructive" onClick={async () => {
            const section = sections[index];
            if (section.isCreated && section.sectionId) {
              try {
                setIsLoading(true);
                await courseService.deleteSection({
                  sectionId: section.sectionId,
                  courseId: courseId
                }, token);
                
                setSections(prev => prev.filter((_, i) => i !== index));
                toast({ title: "Section deleted successfully!" });
              } catch (error) {
                toast({
                  title: "Error",
                  description: "Failed to delete section",
                  variant: "destructive"
                });
              } finally {
                setIsLoading(false);
              }
            } else {
              setSections(prev => prev.filter((_, i) => i !== index));
            }
            toast.dismiss();
          }}>Delete</Button>
        </div>
      ),
      duration: 10000
    });
  };

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // UX: Validate file size (e.g., < 500MB)
      if (file.size > 500 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Video file must be less than 500MB.",
          variant: "destructive"
        });
        return;
      }
      const previewUrl = URL.createObjectURL(file);
      setCurrentSubSection(prev => ({ ...prev, videoFile: file, videoPreview: previewUrl }));
    }
  };

  const addSubSection = async (sectionIndex) => {
    if (!currentSubSection.title.trim() || !currentSubSection.videoFile) {
      toast({ title: "Incomplete Lesson", description: "Title and video are required.", variant: "destructive" });
      return;
    }
    
    const section = sections[sectionIndex];
    if (!section.sectionId) return;
    
    try {
      setIsLoading(true);
      const subSectionData = new FormData();
      subSectionData.append('sectionId', section.sectionId);
      subSectionData.append('title', currentSubSection.title);
      subSectionData.append('description', currentSubSection.description);
      subSectionData.append('courseId', courseId);
      subSectionData.append('videoFile', currentSubSection.videoFile);
      
      await courseService.createSubSection(subSectionData, token);
      
      setSections(prev => prev.map((s, idx) =>
        idx === sectionIndex
          ? { ...s, subSections: [...s.subSections, { 
              ...currentSubSection, 
              videoPreview: '', // Clear preview after upload
              isCreated: true,
              subSectionId: Date.now() // Temp ID, replace with real if returned
            }] }
          : s
      ));
      
      // Reset form for better UX
      setCurrentSubSection({ title: '', description: '', videoFile: null, videoPreview: '' });
      toast({ title: "Lesson added successfully!" });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add lesson",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const removeSubSection = async (sectionIndex, subIndex) => {
    // UX: Add confirmation toast
    toast({
      title: "Confirm Delete",
      description: "Are you sure you want to delete this lesson? This action cannot be undone.",
      action: (
        <div className="flex space-x-2">
          <Button size="sm" variant="outline" onClick={() => toast.dismiss()}>Cancel</Button>
          <Button size="sm" variant="destructive" onClick={async () => {
            const section = sections[sectionIndex];
            const subSection = section.subSections[subIndex];
            
            if (subSection.isCreated && subSection.subSectionId) {
              try {
                setIsLoading(true);
                await courseService.deleteSubSection({
                  subSectionId: subSection.subSectionId,
                  sectionId: section.sectionId,
                  courseId: courseId
                }, token);
                
                setSections(prev => prev.map((s, idx) =>
                  idx === sectionIndex
                    ? { ...s, subSections: s.subSections.filter((_, i) => i !== subIndex) }
                    : s
                ));
                
                toast({ title: "Lesson deleted successfully!" });
              } catch (error) {
                toast({
                  title: "Error",
                  description: "Failed to delete lesson",
                  variant: "destructive"
                });
              } finally {
                setIsLoading(false);
              }
            } else {
              setSections(prev => prev.map((s, idx) =>
                idx === sectionIndex
                  ? { ...s, subSections: s.subSections.filter((_, i) => i !== subIndex) }
                  : s
              ));
            }
            toast.dismiss();
          }}>Delete</Button>
        </div>
      ),
      duration: 10000
    });
  };

  // Stage 3: Update Course Status
  const handleStage3Submit = async () => {
    // Check if status has changed
    if (courseData.status === originalCourseData.status) {
      toast({
        title: "No Changes Detected",
        description: "Course status unchanged. Returning to manage courses."
      });
      navigate('/manage-courses');
      return;
    }

    try {
      setIsLoading(true);
      
      const formData = new FormData();
      formData.append('courseId', courseId);
      formData.append('status', courseData.status);
      
      await courseService.editCourse(formData, token);
      
      toast({
        title: "Course Updated!",
        description: `Course has been ${courseData.status === 'Published' ? 'published' : 'saved as draft'} successfully.`
      });
      
      navigate('/manage-courses');
    } catch (error) {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to update course status",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getStageProgress = () => {
    return (currentStage / 3) * 100;
  };

  if (isLoadingCourse) {
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-shell-darker via-shell-dark to-shell-dark">
      <Navbar />
      
      {/* Progress Header */}
      <div className="border-b border-border bg-card/50 backdrop-blur-lg sticky top-0 z-10">
        <div className="container mx-auto px-4 py-6">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-4">
              <button 
                onClick={() => navigate('/manage-courses')} 
                className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Manage Courses</span>
              </button>
              <div className="text-sm text-muted-foreground">
                Stage {currentStage} of 3
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className={currentStage >= 1 ? "text-primary font-medium" : "text-muted-foreground"}>
                  1. Edit Course Details
                </span>
                <span className={currentStage >= 2 ? "text-primary font-medium" : "text-muted-foreground"}>
                  2. Manage Content
                </span>
                <span className={currentStage >= 3 ? "text-primary font-medium" : "text-muted-foreground"}>
                  3. Update Status
                </span>
              </div>
              <Progress value={getStageProgress()} className="h-2" />
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          
          {/* Stage 1: Course Details */}
          {currentStage === 1 && (
            <Card className="bg-card/80 backdrop-blur-lg border-border">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl font-bold">
                  <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    Stage 1: Edit Course Details
                  </span>
                </CardTitle>
                <p className="text-muted-foreground">Update the basic information for your course</p>
              </CardHeader>
              <CardContent className="space-y-6">
                
                {/* Basic Info */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="courseName">Course Name *</Label>
                    <Input
                      id="courseName"
                      name="courseName"
                      value={courseData.courseName}
                      onChange={handleCourseInputChange}
                      placeholder="Enter course title"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="price">Price *</Label>
                    <Input
                      id="price"
                      name="price"
                      value={courseData.price}
                      onChange={handleCourseInputChange}
                      placeholder="$99.99"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="courseDescription">Course Description</Label>
                  <Textarea
                    id="courseDescription"
                    name="courseDescription"
                    value={courseData.courseDescription}
                    onChange={handleCourseInputChange}
                    placeholder="Describe your course..."
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="whatYouWillLearn">What You Will Learn</Label>
                  <Textarea
                    id="whatYouWillLearn"
                    name="whatYouWillLearn"
                    value={courseData.whatYouWillLearn}
                    onChange={handleCourseInputChange}
                    placeholder="Key takeaways..."
                    rows={3}
                  />
                </div>

                {/* Category */}
                <div className="space-y-2">
                  <Label>Category</Label>
                  <Select value={courseData.category} onValueChange={(value) => setCourseData(prev => ({ ...prev, category: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat._id} value={cat._id}>{cat.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Tags */}
                <div className="space-y-2">
                  <Label>Tags *</Label>
                  <div className="flex space-x-2">
                    <Input
                      value={currentTag}
                      onChange={(e) => setCurrentTag(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && addTag()}
                      placeholder="Add tag"
                      className="flex-1"
                    />
                    <Button type="button" variant="outline" size="sm" onClick={addTag}>
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {courseData.tags.map((tag, index) => (
                      <Badge key={index} variant="secondary" className="flex items-center space-x-1">
                        {tag}
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeTag(index)}
                          className="h-4 w-4 p-0"
                        >
                          <X className="w-3 h-3" />
                        </Button>
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Instructions */}
                <div className="space-y-2">
                  <Label>Instructions</Label>
                  <div className="flex space-x-2">
                    <Input
                      value={currentInstruction}
                      onChange={(e) => setCurrentInstruction(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && addInstruction()}
                      placeholder="Add instruction"
                      className="flex-1"
                    />
                    <Button type="button" variant="outline" size="sm" onClick={addInstruction}>
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {courseData.instructions.map((inst, index) => (
                      <Badge key={index} variant="outline" className="flex items-center space-x-1">
                        {inst}
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeInstruction(index)}
                          className="h-4 w-4 p-0"
                        >
                          <X className="w-3 h-3" />
                        </Button>
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Thumbnail */}
                <div className="space-y-2">
                  <Label>Thumbnail Image</Label>
                  {!courseData.thumbnailImage ? (
                    <div className="relative border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary transition-colors cursor-pointer group">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleThumbnailChange}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                      />
                      <div className="space-y-2 pointer-events-none">
                        <div className="w-16 h-16 mx-auto bg-secondary rounded-full flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                          <Image className="w-8 h-8 text-muted-foreground group-hover:text-primary" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-foreground">Click to upload thumbnail</p>
                          <p className="text-xs text-muted-foreground">PNG, JPG up to 10MB</p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="relative group">
                      <div className="aspect-video w-full max-w-md rounded-lg overflow-hidden border border-border">
                        <img 
                          src={courseData.thumbnailImage} 
                          alt="Course Thumbnail" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <Button
                        type="button"
                        size="sm"
                        variant="destructive"
                        onClick={() => setCourseData(prev => ({ ...prev, thumbnail: null, thumbnailImage: '' }))}
                        className="absolute top-2 right-2"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  )}
                </div>

                <Button 
                  onClick={handleStage1Submit}
                  className="w-full bg-gradient-to-r from-primary to-accent"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Updating Course...
                    </>
                  ) : (
                    <>
                      Update Course & Continue
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Stage 2: Manage Content */}
          {currentStage === 2 && (
            <Card className="bg-card/80 backdrop-blur-lg border-border">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl font-bold">
                  <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    Stage 2: Manage Course Content
                  </span>
                </CardTitle>
                <p className="text-muted-foreground">Add, edit, or remove sections and lessons</p>
                <div className="flex items-center justify-center space-x-2 mt-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-sm text-green-500">Course details updated successfully</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                
                {/* Add Section - Best UX: Inline form with Enter key support */}
                <div className="p-4 bg-gradient-to-r from-primary/5 to-accent/5 rounded-lg border border-primary/20">
                  <Label className="text-sm font-medium mb-3 block">Add New Section</Label>
                  <div className="flex space-x-2">
                    <Input
                      value={currentSectionName}
                      onChange={(e) => setCurrentSectionName(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && addSection()}
                      placeholder="Enter section name (e.g., Introduction)"
                      className="flex-1"
                      disabled={isLoading}
                    />
                    <Button 
                      type="button" 
                      variant="default" 
                      onClick={addSection}
                      disabled={!currentSectionName.trim() || isLoading}
                    >
                      {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">Press Enter to add</p>
                </div>

                {/* Sections - Use Accordion for better UX in listing subsections as dropdown */}
                <Accordion type="multiple" defaultValue={sections.map((_, i) => i.toString())} className="w-full">
                  {sections.length === 0 && (
                    <div className="text-center py-8 text-muted-foreground">
                      <FileText className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <h3 className="text-lg font-medium mb-2">No sections yet</h3>
                      <p className="text-sm">Add your first section above</p>
                    </div>
                  )}
                  
                  {sections.map((section, sectionIndex) => (
                    <AccordionItem key={sectionIndex} value={sectionIndex.toString()} className="border-primary/30">
                      <AccordionTrigger className="hover:no-underline p-0">
                        <Card className="w-full bg-gradient-to-r from-card/80 to-card/60 border-0 shadow-none">
                          <CardHeader className="flex flex-row justify-between items-center space-y-0 pb-3">
                            <div className="flex items-center space-x-3">
                              <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                                <span className="text-sm font-bold text-primary">{sectionIndex + 1}</span>
                              </div>
                              <div>
                                <CardTitle className="text-lg">{section.sectionName}</CardTitle>
                                <p className="text-sm text-muted-foreground">
                                  {section.subSections.length} lesson{section.subSections.length !== 1 ? 's' : ''}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center space-x-2 pr-4">
                              <ChevronDown className="w-4 h-4 transition-transform duration-200" />
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  removeSection(sectionIndex);
                                }}
                                className="text-destructive hover:bg-destructive/10"
                                disabled={isLoading}
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </CardHeader>
                        </Card>
                      </AccordionTrigger>
                      <AccordionContent className="p-0 pt-4">
                        <CardContent className="space-y-4">
                          
                          {/* Add Subsection - Best UX: Inline form with validation hints */}
                          <div className="space-y-3 p-4 border border-border rounded-md bg-muted/30">
                            <Label className="text-sm font-medium">Add New Lesson</Label>
                            
                            <Input
                              placeholder="Lesson Title (Required)"
                              value={currentSubSection.title}
                              onChange={(e) => setCurrentSubSection(prev => ({ ...prev, title: e.target.value }))}
                              className={currentSubSection.title.trim() ? '' : 'border-destructive/30'}
                            />
                            
                            <Textarea
                              placeholder="Lesson Description (Optional)"
                              value={currentSubSection.description}
                              onChange={(e) => setCurrentSubSection(prev => ({ ...prev, description: e.target.value }))}
                              rows={2}
                            />
                            
                            {/* Video Upload - Best UX: Drag & drop hint, size indicator */}
                            <div className="space-y-2">
                              <Label className="text-xs text-muted-foreground flex items-center justify-between">
                                Video File (Required, max 500MB)
                                <span className={currentSubSection.videoFile ? 'text-green-500 text-xs' : 'text-destructive text-xs'}>
                                  {currentSubSection.videoFile ? 'Selected' : 'Missing'}
                                </span>
                              </Label>
                              {!currentSubSection.videoPreview ? (
                                <div className="relative border-2 border-dashed border-primary/30 rounded-lg p-6 text-center hover:border-primary transition-colors cursor-pointer group">
                                  <input
                                    type="file"
                                    accept="video/*"
                                    onChange={handleVideoChange}
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                  />
                                  <div className="space-y-1 pointer-events-none">
                                    <Video className="w-8 h-8 mx-auto text-primary" />
                                    <p className="text-xs font-medium">Click or drag to upload video</p>
                                    <p className="text-xs text-muted-foreground">MP4, MOV up to 500MB</p>
                                  </div>
                                </div>
                              ) : (
                                <div className="relative">
                                  <video 
                                    src={currentSubSection.videoPreview} 
                                    controls 
                                    className="w-full h-32 object-contain bg-black rounded"
                                  />
                                  <div className="absolute bottom-2 left-2 bg-black/50 text-white text-xs px-2 py-1 rounded">
                                    {Math.round(currentSubSection.videoFile.size / 1024 / 1024)}MB
                                  </div>
                                  <Button
                                    type="button"
                                    size="sm"
                                    variant="destructive"
                                    onClick={() => setCurrentSubSection(prev => ({ ...prev, videoFile: null, videoPreview: '' }))}
                                    className="absolute top-2 right-2"
                                  >
                                    <X className="w-3 h-3" />
                                  </Button>
                                </div>
                              )}
                            </div>
                            
                            <Button
                              type="button"
                              size="sm"
                              onClick={() => addSubSection(sectionIndex)}
                              className="w-full"
                              disabled={!currentSubSection.title.trim() || !currentSubSection.videoFile || isLoading}
                              variant={currentSubSection.title.trim() && currentSubSection.videoFile ? "default" : "outline"}
                            >
                              {isLoading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Plus className="w-4 h-4 mr-2" />}
                              Add Lesson to Section
                            </Button>
                          </div>

                          {/* Subsections List - Now in accordion content for dropdown effect */}
                          <div className="space-y-2">
                            {section.subSections.length === 0 && (
                              <p className="text-center text-sm text-muted-foreground py-4">No lessons yet. Add one above.</p>
                            )}
                            {section.subSections.map((sub, subIndex) => (
                              <Accordion type="single" collapsible key={subIndex}>
                                <AccordionItem value="sub-lesson">
                                  <AccordionTrigger className="p-3 border border-border/50 rounded-lg bg-card/50 hover:bg-card">
                                    <div className="flex justify-between items-start w-full">
                                      <div className="flex-1">
                                        <div className="flex items-center space-x-2 mb-1">
                                          <Badge variant="secondary" className="text-xs">
                                            Lesson {subIndex + 1}
                                          </Badge>
                                          <h4 className="font-medium">{sub.title}</h4>
                                          {sub.isCreated && (
                                            <Badge variant="outline" className="text-xs">
                                              Saved
                                            </Badge>
                                          )}
                                        </div>
                                        {sub.description && (
                                          <p className="text-sm text-muted-foreground">{sub.description}</p>
                                        )}
                                        {sub.videoPreview && (
                                          <div className="flex items-center space-x-2 mt-2 p-2 bg-primary/10 rounded">
                                            <Video className="w-4 h-4 text-primary" />
                                            <span className="text-xs text-primary">Video available</span>
                                          </div>
                                        )}
                                      </div>
                                      <Button
                                        type="button"
                                        variant="ghost"
                                        size="sm"
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          removeSubSection(sectionIndex, subIndex);
                                        }}
                                        className="text-destructive hover:bg-destructive/10 ml-2"
                                        disabled={isLoading}
                                      >
                                        <Trash2 className="w-4 h-4" />
                                      </Button>
                                    </div>
                                  </AccordionTrigger>
                                  <AccordionContent className="p-4 bg-muted/20 rounded-b-lg">
                                    {/* Additional details or edit form can go here for expanded view */}
                                    <p className="text-sm text-muted-foreground">
                                      {sub.description || 'No description provided.'}
                                    </p>
                                    {sub.videoPreview && (
                                      <video 
                                        src={sub.videoPreview} 
                                        controls 
                                        className="w-full mt-2 h-32 object-contain bg-black rounded"
                                      />
                                    )}
                                  </AccordionContent>
                                </AccordionItem>
                              </Accordion>
                            ))}
                          </div>
                        </CardContent>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>

                <div className="flex space-x-4">
                  <Button 
                    variant="outline"
                    onClick={() => setCurrentStage(1)}
                    className="flex-1"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Course Details
                  </Button>
                  <Button 
                    onClick={() => setCurrentStage(3)}
                    className="flex-1 bg-gradient-to-r from-primary to-accent"
                  >
                    Continue to Status
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Stage 3: Update Status */}
          {currentStage === 3 && (
            <Card className="bg-card/80 backdrop-blur-lg border-border">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl font-bold">
                  <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    Stage 3: Update Course Status
                  </span>
                </CardTitle>
                <p className="text-muted-foreground">Choose the final status for your course</p>
                <div className="flex flex-col items-center space-y-2 mt-4">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-sm text-green-500">Course details updated</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-sm text-green-500">
                      {sections.length} sections with {sections.reduce((total, section) => total + section.subSections.length, 0)} lessons
                    </span>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                
                {/* Course Summary */}
                <Card className="bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20">
                  <CardHeader>
                    <CardTitle className="text-lg">Course Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                      <div className="p-3 bg-card/50 rounded-lg">
                        <div className="text-2xl font-bold text-primary">{sections.length}</div>
                        <div className="text-sm text-muted-foreground">Sections</div>
                      </div>
                      <div className="p-3 bg-card/50 rounded-lg">
                        <div className="text-2xl font-bold text-accent">
                          {sections.reduce((total, section) => total + section.subSections.length, 0)}
                        </div>
                        <div className="text-sm text-muted-foreground">Lessons</div>
                      </div>
                      <div className="p-3 bg-card/50 rounded-lg">
                        <div className="text-2xl font-bold text-green-500">{courseData.tags.length}</div>
                        <div className="text-sm text-muted-foreground">Tags</div>
                      </div>
                      <div className="p-3 bg-card/50 rounded-lg">
                        <div className="text-2xl font-bold text-blue-500">${courseData.price}</div>
                        <div className="text-sm text-muted-foreground">Price</div>
                      </div>
                    </div>
                    <div className="text-center p-4 bg-card/30 rounded-lg">
                      <h3 className="font-semibold text-lg">{courseData.courseName}</h3>
                      <p className="text-muted-foreground text-sm mt-1">
                        {courseData.courseDescription || 'No description provided'}
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {/* Status Selection */}
                <div className="space-y-4">
                  <Label className="text-lg font-medium">Course Status</Label>
                  <div className="grid md:grid-cols-2 gap-4">
                    <Card 
                      className={`cursor-pointer transition-all ${courseData.status === 'Draft' ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'}`}
                      onClick={() => setCourseData(prev => ({ ...prev, status: 'Draft' }))}
                    >
                      <CardContent className="p-6 text-center">
                        <Edit className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                        <h3 className="font-semibold mb-2">Save as Draft</h3>
                        <p className="text-sm text-muted-foreground">
                          Keep your course private and continue editing later
                        </p>
                      </CardContent>
                    </Card>
                    
                    <Card 
                      className={`cursor-pointer transition-all ${courseData.status === 'Published' ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'}`}
                      onClick={() => setCourseData(prev => ({ ...prev, status: 'Published' }))}
                    >
                      <CardContent className="p-6 text-center">
                        <Send className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                        <h3 className="font-semibold mb-2">Publish Course</h3>
                        <p className="text-sm text-muted-foreground">
                          Make your course available to students immediately
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <Button 
                    variant="outline"
                    onClick={() => setCurrentStage(2)}
                    className="flex-1"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Content
                  </Button>
                  <Button 
                    onClick={handleStage3Submit}
                    className="flex-1 bg-gradient-to-r from-primary to-accent"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        {courseData.status === 'Published' ? 'Publishing...' : 'Saving...'}
                      </>
                    ) : (
                      <>
                        {courseData.status === 'Published' ? 'Publish Course' : 'Save as Draft'}
                        <CheckCircle className="w-4 h-4 ml-2" />
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default EditCourse;