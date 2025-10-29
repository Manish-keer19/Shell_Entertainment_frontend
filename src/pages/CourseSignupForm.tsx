import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ArrowRight, Mail, Phone, User, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { authService } from '@/service/auth.service';

interface SignupModalProps {
  triggerButton?: React.ReactNode; // Optional custom trigger button
  onSuccess?: () => void; // Optional callback after successful signup
}

const SignupModal: React.FC<SignupModalProps> = ({ triggerButton, onSuccess }) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    contactNumber: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email address is invalid';
    }
    if (!formData.contactNumber.trim()) {
      newErrors.contactNumber = 'Mobile number is required';
    } else if (!/^\d{10}$/.test(formData.contactNumber)) {
      newErrors.contactNumber = 'Mobile number must be 10 digits';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const data = await authService.signup({
        fullName: formData.fullName,
        email: formData.email,
        contactNumber: formData.contactNumber,
        password: formData.password,
        accountType: 'Student', // Default for learning platform
      });

      if (data.success) {
        toast({
          title: "Success",
          description: "Account created successfully! Welcome to Shell Entertainment.",
        });
        setOpen(false); // Close modal on success
        if (onSuccess) {
          onSuccess(); // Call parent callback if provided
        } else {
          navigate('/courses'); // Default redirect
        }
      } else {
        toast({
          title: "Error",
          description: data.message || "Signup failed. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error: any) {
      console.error('Signup error:', error);
      toast({
        title: "Error",
        description: error.response?.data?.message || "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {triggerButton ? (
        <DialogTrigger asChild>{triggerButton}</DialogTrigger>
      ) : (
        <DialogTrigger asChild>
          <Button variant="outline" className="w-full">
            <User className="w-4 h-4 mr-2" />
            Sign Up
          </Button>
        </DialogTrigger>
      )}
      <DialogContent className="sm:max-w-md w-full max-h-[90vh] overflow-y-auto p-0">
        <DialogHeader className="p-6 pb-4">
          <DialogTitle className="flex items-center justify-between text-2xl font-bold">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Sign Up
            </span>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => setOpen(false)}
              className="p-1 hover:bg-transparent"
              disabled={isLoading}
            >
              <X className="w-5 h-5" />
            </Button>
          </DialogTitle>
          <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
            Fill out the form to create your account and start learning!
          </p>
        </DialogHeader>
        <Card className="mx-6 mb-6 rounded-t-none border-t-0 shadow-none">
          <CardContent className="p-6 pt-0 space-y-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Full Name */}
              <div className="space-y-2">
                <Label htmlFor="fullName" className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                  <User className="w-4 h-4" />
                  Full Name *
                </Label>
                <Input
                  id="fullName"
                  name="fullName"
                  type="text"
                  placeholder="Enter your full name"
                  value={formData.fullName}
                  onChange={handleChange}
                  className={`w-full ${errors.fullName ? 'border-red-500 dark:border-red-400 focus:ring-red-500' : ''}`}
                  disabled={isLoading}
                />
                {errors.fullName && <p className="text-sm text-red-500 dark:text-red-400">{errors.fullName}</p>}
              </div>

              {/* Email Address */}
              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                  <Mail className="w-4 h-4" />
                  Email Address *
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email address"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full ${errors.email ? 'border-red-500 dark:border-red-400 focus:ring-red-500' : ''}`}
                  disabled={isLoading}
                />
                {errors.email && <p className="text-sm text-red-500 dark:text-red-400">{errors.email}</p>}
              </div>

              {/* Mobile Number */}
              <div className="space-y-2">
                <Label htmlFor="contactNumber" className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                  <Phone className="w-4 h-4" />
                  Mobile Number *
                </Label>
                <Input
                  id="contactNumber"
                  name="contactNumber"
                  type="tel"
                  placeholder="Enter your mobile number"
                  value={formData.contactNumber}
                  onChange={handleChange}
                  className={`w-full ${errors.contactNumber ? 'border-red-500 dark:border-red-400 focus:ring-red-500' : ''}`}
                  disabled={isLoading}
                />
                {errors.contactNumber && <p className="text-sm text-red-500 dark:text-red-400">{errors.contactNumber}</p>}
              </div>

              {/* Password */}
              <div className="space-y-2">
                <Label htmlFor="password" className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                  Password *
                </Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Enter your password (min 6 characters)"
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full ${errors.password ? 'border-red-500 dark:border-red-400 focus:ring-red-500' : ''}`}
                  disabled={isLoading}
                />
                {errors.password && <p className="text-sm text-red-500 dark:text-red-400">{errors.password}</p>}
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setOpen(false)}
                  className="flex-1"
                  disabled={isLoading}
                >
                  <X className="w-4 h-4 mr-2" />
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 text-lg group"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform animate-spin" />
                      Creating...
                    </>
                  ) : (
                    <>
                      Create Account
                      <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  );
};

export default SignupModal;