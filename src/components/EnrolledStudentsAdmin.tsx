import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Skeleton } from './ui/skeleton';
import { Users, Search, Mail, Calendar, User } from 'lucide-react';
import { paymentService } from '../service/payment.service';
import { toast } from './ui/use-toast';

interface EnrolledStudent {
  _id: string;
  fullName?: string;
  fullNamme?: string;
  email: string;
  image: string;
  accountType: string;
  additionalDetails?: {
    about?: string;
    dateOfBirth?: string;
    gender?: string;
    contactNumber?: string;
  };
}

interface EnrolledStudentsData {
  courseName: string;
  enrolledStudents: EnrolledStudent[];
  totalEnrolled: number;
}

interface EnrolledStudentsAdminProps {
  courseId: string;
  token: string;
}

const EnrolledStudentsAdmin: React.FC<EnrolledStudentsAdminProps> = ({
  courseId,
  token
}) => {
  const [studentsData, setStudentsData] = useState<EnrolledStudentsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchEnrolledStudents();
  }, [courseId, token]);

  const fetchEnrolledStudents = async () => {
    try {
      setLoading(true);
      const response = await paymentService.getEnrolledStudents(courseId, token);
      
      if (response.success) {
        setStudentsData(response.data);
      } else {
        setError(response.message);
      }
    } catch (error: any) {
      setError(error.response?.data?.message || error.message || 'Failed to fetch enrolled students');
      toast({
        title: "Error",
        description: "Failed to fetch enrolled students",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const getStudentName = (student: EnrolledStudent) => {
    return student.fullName || student.fullNamme || 'Unknown Student';
  };

  const filteredStudents = studentsData?.enrolledStudents.filter(student =>
    getStudentName(student).toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.email.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  if (loading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-8 w-64" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Card key={i}>
              <CardHeader className="flex flex-row items-center space-y-0 pb-2">
                <Skeleton className="h-10 w-10 rounded-full" />
                <div className="ml-4 space-y-1">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-3 w-24" />
                </div>
              </CardHeader>
              <CardContent>
                <Skeleton className="h-3 w-full mb-2" />
                <Skeleton className="h-3 w-2/3" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="text-red-600 mb-4">
          <Users className="h-12 w-12 mx-auto mb-2" />
          <h3 className="text-lg font-semibold">Error Loading Students</h3>
          <p className="text-gray-600">{error}</p>
        </div>
        <Button onClick={fetchEnrolledStudents}>Try Again</Button>
      </div>
    );
  }

  if (!studentsData || studentsData.enrolledStudents.length === 0) {
    return (
      <div className="text-center py-12">
        <Users className="h-12 w-12 mx-auto mb-4 text-gray-400" />
        <h3 className="text-lg font-semibold mb-2">No Enrolled Students</h3>
        <p className="text-gray-600">No students have enrolled in this course yet.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Enrolled Students</h2>
          <p className="text-gray-600">{studentsData.courseName}</p>
        </div>
        <Badge variant="secondary">
          {studentsData.totalEnrolled} Student{studentsData.totalEnrolled !== 1 ? 's' : ''}
        </Badge>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input
          placeholder="Search students by name or email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredStudents.map((student) => (
          <Card key={student._id} className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center space-y-0 pb-2">
              <div className="relative">
                <img
                  src={student.image || '/placeholder.svg'}
                  alt={getStudentName(student)}
                  className="h-10 w-10 rounded-full object-cover"
                />
                <Badge 
                  className="absolute -bottom-1 -right-1 text-xs px-1 py-0"
                  variant={student.accountType === 'Student' ? 'default' : 'secondary'}
                >
                  {student.accountType}
                </Badge>
              </div>
              <div className="ml-4">
                <h4 className="font-semibold text-sm">{getStudentName(student)}</h4>
                <div className="flex items-center text-xs text-gray-500">
                  <Mail className="h-3 w-3 mr-1" />
                  {student.email}
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="pt-2">
              {student.additionalDetails && (
                <div className="space-y-2 text-sm">
                  {student.additionalDetails.contactNumber && (
                    <div className="flex items-center text-gray-600">
                      <span className="font-medium mr-2">Phone:</span>
                      {student.additionalDetails.contactNumber}
                    </div>
                  )}
                  
                  {student.additionalDetails.dateOfBirth && (
                    <div className="flex items-center text-gray-600">
                      <Calendar className="h-3 w-3 mr-2" />
                      {new Date(student.additionalDetails.dateOfBirth).toLocaleDateString()}
                    </div>
                  )}
                  
                  {student.additionalDetails.gender && (
                    <div className="flex items-center text-gray-600">
                      <User className="h-3 w-3 mr-2" />
                      {student.additionalDetails.gender}
                    </div>
                  )}
                  
                  {student.additionalDetails.about && (
                    <p className="text-gray-600 text-xs line-clamp-2">
                      {student.additionalDetails.about}
                    </p>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredStudents.length === 0 && searchTerm && (
        <div className="text-center py-8">
          <Search className="h-8 w-8 mx-auto mb-2 text-gray-400" />
          <p className="text-gray-600">No students found matching "{searchTerm}"</p>
        </div>
      )}
    </div>
  );
};

export default EnrolledStudentsAdmin;