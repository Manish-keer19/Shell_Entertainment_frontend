import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Compare, X, Users, Clock, BookOpen, DollarSign } from "lucide-react";

interface CourseComparisonProps {
  courses: any[];
  onRemoveCourse: (courseId: string) => void;
  onClearAll: () => void;
}

const CourseComparison: React.FC<CourseComparisonProps> = ({
  courses,
  onRemoveCourse,
  onClearAll
}) => {
  if (courses.length === 0) return null;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="fixed bottom-20 right-6 z-40 bg-card/90 backdrop-blur-lg border border-border shadow-lg"
        >
          <Compare className="w-4 h-4 mr-2" />
          Compare ({courses.length})
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-6xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle>Course Comparison</DialogTitle>
            <Button variant="outline" size="sm" onClick={onClearAll}>
              Clear All
            </Button>
          </div>
        </DialogHeader>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {courses.map((course) => (
            <Card key={course._id} className="relative">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onRemoveCourse(course._id)}
                className="absolute top-2 right-2 h-6 w-6 p-0"
              >
                <X className="w-4 h-4" />
              </Button>
              
              <div className="aspect-video relative overflow-hidden rounded-t-lg">
                <img 
                  src={course.thumbnail || '/placeholder.svg'} 
                  alt={course.courseName}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <CardHeader className="pb-3">
                <CardTitle className="text-lg line-clamp-2">{course.courseName}</CardTitle>
                <p className="text-sm text-muted-foreground">
                  by {course.instructor?.firstName} {course.instructor?.lastName}
                </p>
              </CardHeader>
              
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1">
                    <DollarSign className="w-4 h-4 text-green-500" />
                    <span className="font-bold text-lg">${course.price}</span>
                  </div>
                  <Badge variant="outline">{course.category?.name}</Badge>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-1">
                      <Users className="w-4 h-4 text-muted-foreground" />
                      <span>Students</span>
                    </div>
                    <span className="font-medium">{course.studentsEnrolled?.length || 0}</span>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-1">
                      <BookOpen className="w-4 h-4 text-muted-foreground" />
                      <span>Sections</span>
                    </div>
                    <span className="font-medium">{course.courseContent?.length || 0}</span>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4 text-muted-foreground" />
                      <span>Status</span>
                    </div>
                    <Badge variant={course.status === 'Published' ? 'default' : 'secondary'}>
                      {course.status}
                    </Badge>
                  </div>
                </div>
                
                <div className="pt-2">
                  <p className="text-xs text-muted-foreground line-clamp-3">
                    {course.courseDescription}
                  </p>
                </div>
                
                <div className="flex flex-wrap gap-1 pt-2">
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
                
                <Button className="w-full mt-4">
                  View Details
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CourseComparison;