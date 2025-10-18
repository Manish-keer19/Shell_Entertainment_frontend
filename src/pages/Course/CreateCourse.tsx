import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Plus, Trash2, X, Image, Tag, Clock, Video, FileText, Edit, Send, Upload, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Navbar from '@/components/Navbar';
import { adminService } from '@/service/admin.service';
import { useAppSelector } from '@/hooks/redux';

const CreateCourse = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { token } = useAppSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    courseName: '',
    courseDescription: '',
    whatYouWillLearn: '',
    price: '',
    thumbnail: null,
    thumbnailPreview: '',
    tags: [],
    category: '',
    instructions: [],
    status: 'Draft',
    sections: []
  });
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingCategories, setIsLoadingCategories] = useState(true);

  const [currentTag, setCurrentTag] = useState('');
  const [currentInstruction, setCurrentInstruction] = useState('');
  const [currentSectionName, setCurrentSectionName] = useState('');
  const [currentSubSection, setCurrentSubSection] = useState({
    title: '',
    timeDuration: '',
    description: '',
    videoFile: null,
    videoPreview: ''
  });

  // Fetch categories
  const fetchCategories = async () => {
    if (!token) return;
    try {
      setIsLoadingCategories(true);
      const res = await adminService.getAllCatagory(token);
      setCategories(res.data?.allCategory || []);
    } catch (error: any) {
      console.error('Error fetching categories:', error);
    } finally {
      setIsLoadingCategories(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, [token]);

  // Handler for basic text inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handler for thumbnail upload
  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setFormData(prev => ({ ...prev, thumbnail: file, thumbnailPreview: previewUrl }));
      toast({ title: "Thumbnail uploaded", description: "Preview available below." });
    }
  };

  // Add tag
  const addTag = () => {
    if (currentTag.trim() && !formData.tags.includes(currentTag.trim())) {
      setFormData(prev => ({ ...prev, tags: [...prev.tags, currentTag.trim()] }));
      setCurrentTag('');
    }
  };

  // Remove tag
  const removeTag = (index) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter((_, i) => i !== index)
    }));
  };

  // Add instruction
  const addInstruction = () => {
    if (currentInstruction.trim()) {
      setFormData(prev => ({ ...prev, instructions: [...prev.instructions, currentInstruction.trim()] }));
      setCurrentInstruction('');
    }
  };

  // Remove instruction
  const removeInstruction = (index) => {
    setFormData(prev => ({
      ...prev,
      instructions: prev.instructions.filter((_, i) => i !== index)
    }));
  };

  // Add section
  const addSection = () => {
    if (currentSectionName.trim()) {
      setFormData(prev => ({
        ...prev,
        sections: [...prev.sections, {
          sectionName: currentSectionName.trim(),
          subSections: []
        }]
      }));
      setCurrentSectionName('');
      toast({ title: "Section added", description: "New section created successfully." });
    }
  };

  // Handler for video file upload
  const handleVideoChange = (sectionIndex) => (e) => {
    const file = e.target.files[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setFormData(prev => ({
        ...prev,
        sections: prev.sections.map((section, idx) =>
          idx === sectionIndex
            ? {
                ...section,
                subSections: section.subSections.map((sub) => {
                  return sub;
                })
              }
            : section
        )
      }));
      setCurrentSubSection(prev => ({ ...prev, videoFile: file, videoPreview: previewUrl }));
      toast({ title: "Video uploaded", description: "Local video file selected." });
    }
  };

  // Add subsection to a specific section
  const addSubSection = (sectionIndex) => {
    if (currentSubSection.title.trim()) {
      setFormData(prev => ({
        ...prev,
        sections: prev.sections.map((section, idx) =>
          idx === sectionIndex
            ? { ...section, subSections: [...section.subSections, { ...currentSubSection }] }
            : section
        )
      }));
      setCurrentSubSection({ title: '', timeDuration: '', description: '', videoFile: null, videoPreview: '' });
      toast({ title: "Subsection added", description: "New subsection created." });
    }
  };

  // Remove subsection
  const removeSubSection = (sectionIndex, subIndex) => {
    setFormData(prev => ({
      ...prev,
      sections: prev.sections.map((section, idx) =>
        idx === sectionIndex
          ? { ...section, subSections: section.subSections.filter((_, i) => i !== subIndex) }
          : section
      )
    }));
  };

  // Remove section
  const removeSection = (index) => {
    setFormData(prev => ({
      ...prev,
      sections: prev.sections.filter((_, i) => i !== index)
    }));
  };

  // Handle subsection changes
  const handleSubSectionChange = (field, value) => {
    setCurrentSubSection(prev => ({ ...prev, [field]: value }));
  };



  // Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.courseName || !formData.price || formData.tags.length === 0) {
      toast({ title: "Incomplete form", description: "Please fill required fields.", variant: "destructive" });
      return;
    }
    if (!token) {
      toast({ title: "Authentication Error", description: "Please login again", variant: "destructive" });
      return;
    }

    try {
      setIsLoading(true);
      const courseData = new FormData();
      
      // Append basic course data
      courseData.append('courseName', formData.courseName);
      courseData.append('courseDescription', formData.courseDescription);
      courseData.append('whatYouWillLearn', formData.whatYouWillLearn);
      courseData.append('price', formData.price);
      courseData.append('category', formData.category);
      courseData.append('status', formData.status);
      courseData.append('tag', JSON.stringify(formData.tags));
      courseData.append('instructions', JSON.stringify(formData.instructions));
      
      if (formData.thumbnail) {
        courseData.append('thumbnailImage', formData.thumbnail);
      }
      
      const res = await adminService.createCourse(courseData, token);
      
      toast({
        title: "Success",
        description: res.message || "Course created successfully!"
      });
      navigate('/profile');
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to create course",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-shell-darker via-shell-dark to-shell-dark">
      {/* Header */}
      <Navbar/>
      <header className="border-b border-border bg-card/50 backdrop-blur-lg sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button onClick={() => navigate('/dashboard')} className="flex items-center space-x-3 text-muted-foreground hover:text-foreground transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <span>Back to Dashboard</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <Card className="bg-card/80 backdrop-blur-lg border-border animate-fade-in">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl font-bold mb-2">
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  Create New Course
                </span>
              </CardTitle>
              <p className="text-muted-foreground">Build your course step by step and get certified excellence</p>
            </CardHeader>
            <CardContent className="space-y-8 p-6 md:p-8">
              <form onSubmit={handleSubmit}>
                {/* Basic Info Section */}
                <Card className="bg-card/50 border-border">
                  <CardHeader className="flex flex-row items-center space-x-2">
                    <FileText className="w-5 h-5 text-primary" />
                    <CardTitle className="text-lg">Basic Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="courseName">Course Name *</Label>
                        <Input
                          id="courseName"
                          name="courseName"
                          value={formData.courseName}
                          onChange={handleInputChange}
                          placeholder="Enter course title"
                          className="w-full"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="price">Price *</Label>
                        <Input
                          id="price"
                          name="price"
                          value={formData.price}
                          onChange={handleInputChange}
                          placeholder="$99.99"
                          className="w-full"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="courseDescription">Course Description</Label>
                      <Textarea
                        id="courseDescription"
                        name="courseDescription"
                        value={formData.courseDescription}
                        onChange={handleInputChange}
                        placeholder="Describe your course..."
                        rows={3}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="whatYouWillLearn">What You Will Learn</Label>
                      <Textarea
                        id="whatYouWillLearn"
                        name="whatYouWillLearn"
                        value={formData.whatYouWillLearn}
                        onChange={handleInputChange}
                        placeholder="Key takeaways..."
                        rows={3}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="thumbnail">Thumbnail Image</Label>
                      <div className="relative">
                        {!formData.thumbnailPreview ? (
                          <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary transition-colors cursor-pointer group">
                            <input
                              id="thumbnail"
                              type="file"
                              accept="image/*"
                              onChange={handleThumbnailChange}
                              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            />
                            <div className="space-y-2">
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
                                src={formData.thumbnailPreview} 
                                alt="Course Thumbnail" 
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                              <div className="flex space-x-2">
                                <Button
                                  type="button"
                                  size="sm"
                                  variant="secondary"
                                  onClick={() => document.getElementById('thumbnail').click()}
                                >
                                  <Edit className="w-4 h-4 mr-1" />
                                  Change
                                </Button>
                                <Button
                                  type="button"
                                  size="sm"
                                  variant="destructive"
                                  onClick={() => setFormData(prev => ({ ...prev, thumbnail: null, thumbnailPreview: '' }))}
                                >
                                  <X className="w-4 h-4 mr-1" />
                                  Remove
                                </Button>
                              </div>
                            </div>
                            <input
                              id="thumbnail"
                              type="file"
                              accept="image/*"
                              onChange={handleThumbnailChange}
                              className="hidden"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Category & Tags */}
                <div className="grid md:grid-cols-2 gap-6">
                  <Card className="bg-card/50 border-border">
                    <CardHeader className="flex flex-row items-center space-x-2">
                      <Tag className="w-5 h-5 text-primary" />
                      <CardTitle className="text-lg">Category</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <Select value={formData.category} onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          {isLoadingCategories ? (
                            <div className="flex items-center justify-center py-2">
                              <Loader2 className="w-4 h-4 animate-spin" />
                              <span className="ml-2">Loading...</span>
                            </div>
                          ) : categories.length > 0 ? (
                            categories.map((cat: any) => (
                              <SelectItem key={cat._id} value={cat._id}>{cat.name}</SelectItem>
                            ))
                          ) : (
                            <div className="py-2 text-center text-muted-foreground">
                              No categories available
                            </div>
                          )}
                        </SelectContent>
                      </Select>
                    </CardContent>
                  </Card>

                  <Card className="bg-card/50 border-border">
                    <CardHeader className="flex flex-row items-center space-x-2">
                      <Tag className="w-5 h-5 text-primary" />
                      <CardTitle className="text-lg">Tags *</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
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
                        {formData.tags.map((tag, index) => (
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
                    </CardContent>
                  </Card>
                </div>

                {/* Instructions */}
                <Card className="bg-card/50 border-border">
                  <CardHeader className="flex flex-row items-center space-x-2">
                    <FileText className="w-5 h-5 text-primary" />
                    <CardTitle className="text-lg">Instructions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
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
                      {formData.instructions.map((inst, index) => (
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
                  </CardContent>
                </Card>

                {/* Status */}
                <Card className="bg-card/50 border-border">
                  <CardHeader className="flex flex-row items-center space-x-2">
                    <Edit className="w-5 h-5 text-primary" />
                    <CardTitle className="text-lg">Status</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Select value={formData.status} onValueChange={(value) => setFormData(prev => ({ ...prev, status: value }))}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Draft">
                          <Edit className="w-4 h-4 mr-2" />
                          Draft
                        </SelectItem>
                        <SelectItem value="Published">
                          <Send className="w-4 h-4 mr-2" />
                          Published
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </CardContent>
                </Card>

                {/* Course Content */}
                <Card className="bg-card/50 border-border">
                  <CardHeader className="flex flex-row items-center space-x-2">
                    <Video className="w-5 h-5 text-primary" />
                    <CardTitle className="text-lg">Course Content</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Add Section */}
                    <div className="flex space-x-2">
                      <Input
                        value={currentSectionName}
                        onChange={(e) => setCurrentSectionName(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && addSection()}
                        placeholder="Section Name"
                        className="flex-1"
                      />
                      <Button type="button" variant="outline" onClick={addSection}>
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>

                    {/* Sections */}
                    <div className="space-y-4">
                      {formData.sections.map((section, sectionIndex) => (
                        <Card key={sectionIndex} className="bg-card/30 border-primary/50">
                          <CardHeader className="flex justify-between items-center">
                            <CardTitle className="text-base">{section.sectionName}</CardTitle>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => removeSection(sectionIndex)}
                              className="text-destructive hover:bg-destructive/10"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </CardHeader>
                          <CardContent className="space-y-4">
                            {/* Add Subsection */}
                            <div className="space-y-2 p-4 border border-border rounded-md bg-muted/50">
                              <Input
                                placeholder="Subsection Title"
                                value={currentSubSection.title}
                                onChange={(e) => handleSubSectionChange('title', e.target.value)}
                              />
                              <div className="grid md:grid-cols-2 gap-2">
                                <div className="space-y-1">
                                  <Label className="text-xs flex items-center">
                                    <Clock className="w-3 h-3 mr-1" />
                                    Duration
                                  </Label>
                                  <Input
                                    placeholder="e.g., 10:30"
                                    value={currentSubSection.timeDuration}
                                    onChange={(e) => handleSubSectionChange('timeDuration', e.target.value)}
                                  />
                                </div>
                                <div className="space-y-1">
                                  <Label className="text-xs flex items-center">
                                    <Upload className="w-3 h-3 mr-1" />
                                    Video File
                                  </Label>
                                  <div className="relative">
                                    {!currentSubSection.videoPreview ? (
                                      <div className="border-2 border-dashed border-border rounded-lg p-4 text-center hover:border-primary transition-colors cursor-pointer group">
                                        <input
                                          type="file"
                                          accept="video/*"
                                          onChange={handleVideoChange(sectionIndex)}
                                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                        />
                                        <div className="space-y-1">
                                          <div className="w-8 h-8 mx-auto bg-secondary rounded-full flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                                            <Video className="w-4 h-4 text-muted-foreground group-hover:text-primary" />
                                          </div>
                                          <p className="text-xs font-medium text-foreground">Upload Video</p>
                                          <p className="text-xs text-muted-foreground">MP4, MOV, AVI</p>
                                        </div>
                                      </div>
                                    ) : (
                                      <div className="relative group">
                                        <div className="aspect-video w-full rounded-lg overflow-hidden border border-border bg-black">
                                          <video 
                                            src={currentSubSection.videoPreview} 
                                            controls 
                                            className="w-full h-full object-contain"
                                            preload="metadata"
                                          >
                                            Your browser does not support the video tag.
                                          </video>
                                        </div>
                                        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                          <Button
                                            type="button"
                                            size="sm"
                                            variant="destructive"
                                            onClick={() => setCurrentSubSection(prev => ({ ...prev, videoFile: null, videoPreview: '' }))}
                                          >
                                            <X className="w-3 h-3" />
                                          </Button>
                                        </div>
                                        {currentSubSection.videoFile && (
                                          <div className="mt-2 p-2 bg-secondary/50 rounded text-xs">
                                            <div className="flex items-center justify-between">
                                              <span className="text-muted-foreground">File: {currentSubSection.videoFile.name}</span>
                                              <span className="text-primary">{(currentSubSection.videoFile.size / (1024 * 1024)).toFixed(1)} MB</span>
                                            </div>
                                          </div>
                                        )}
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>
                              <div className="space-y-1">
                                <Label className="text-xs">Description</Label>
                                <Textarea
                                  placeholder="Description"
                                  value={currentSubSection.description}
                                  onChange={(e) => handleSubSectionChange('description', e.target.value)}
                                  rows={2}
                                />
                              </div>
                              <Button
                                type="button"
                                size="sm"
                                onClick={() => addSubSection(sectionIndex)}
                                className="w-full"
                              >
                                <Plus className="w-4 h-4 mr-2" />
                                Add Subsection
                              </Button>
                            </div>

                            {/* Subsections */}
                            <div className="space-y-2">
                              {section.subSections.map((sub, subIndex) => (
                                <div key={subIndex} className="p-3 border border-border/50 rounded-md bg-card/50 flex justify-between items-start">
                                  <div className="flex-1">
                                    <h4 className="font-medium">{sub.title}</h4>
                                    <p className="text-sm text-muted-foreground flex items-center space-x-1">
                                      <Clock className="w-3 h-3" />
                                      {sub.timeDuration}
                                    </p>
                                    <p className="text-sm text-muted-foreground mt-1">{sub.description}</p>
                                    {sub.videoFile && (
                                      <p className="text-xs text-primary mt-1 flex items-center space-x-1">
                                        <Video className="w-3 h-3" />
                                        Video: {sub.videoFile.name}
                                      </p>
                                    )}
                                  </div>
                                  <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => removeSubSection(sectionIndex, subIndex)}
                                    className="text-destructive hover:bg-destructive/10"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </Button>
                                </div>
                              ))}
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Submit Button */}
                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-primary to-accent hover:shadow-blue"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  ) : (
                    <Send className="w-4 h-4 mr-2" />
                  )}
                  {isLoading ? 'Creating...' : (formData.status === 'Published' ? 'Publish Course' : 'Save Draft')}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CreateCourse;