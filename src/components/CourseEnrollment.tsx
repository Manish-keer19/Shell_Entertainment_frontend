import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  CheckCircle, 
  CreditCard, 
  Shield, 
  Clock,
  Users,
  Award,
  Loader2
} from "lucide-react";
import { useCustomToast } from "@/components/ui/custom-toast";
import { useAppSelector } from '@/hooks/redux';
import { useNavigate } from 'react-router-dom';
import { paymentService } from '@/service/payment.service';

interface CourseEnrollmentProps {
  course: any;
  isEnrolled: boolean;
  onEnrollmentSuccess: () => void;
}

declare global {
  interface Window {
    Razorpay: any;
  }
}

const CourseEnrollment: React.FC<CourseEnrollmentProps> = ({ 
  course, 
  isEnrolled, 
  onEnrollmentSuccess 
}) => {
  const { showToast } = useCustomToast();
  const { token, user } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();
  const [enrolling, setEnrolling] = useState(false);

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    if (!token) {
      navigate('/auth');
      return;
    }

    try {
      setEnrolling(true);

      // Load Razorpay script
      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded) {
        console.error("Failed to load Razorpay script");
        showToast('error', 'Payment Gateway Error', 'Failed to load payment gateway. Please try again.');
        return;
      }
      
      console.log("Razorpay script loaded successfully");

      // Create order
      console.log("Creating order for course:", course._id);
      const orderData = await paymentService.capturePayment([course._id], token);
      console.log("Order creation response:", orderData);

      if (!orderData.success) {
        console.error("Order creation failed:", orderData);
        showToast('error', 'Order Creation Failed', orderData.message || 'Failed to create order. Please try again.');
        return;
      }

      // Razorpay options
      const razorpayKey = import.meta.env.VITE_RAZORPAY_KEY || "rzp_test_yQNkACsEOX8zkO";
      console.log("Razorpay Key:", razorpayKey);
      console.log("Order Data:", orderData);
      
      const options = {
        key: razorpayKey,
        amount: orderData.amount,
        currency: orderData.currency,
        name: "Shell Entertainment",
        description: `Enrollment for ${course.courseName}`,
        order_id: orderData.orderId,
        handler: async (response: any) => {
          console.log("Razorpay response: in courseenrollment", response);
          try {
            // Verify payment
            const verifyData = await paymentService.verifyPayment({
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
              courses: [course._id]
            }, token);

            if (verifyData.success) {
              // Send success email
              await paymentService.sendPaymentSuccessEmail({
                amount: orderData.amount,
                paymentId: response.razorpay_payment_id,
                orderId: response.razorpay_order_id
              }, token);

              showToast('success', 'Payment Successful! 🎉', `You have been enrolled in ${course.courseName} successfully! Welcome aboard!`);
              onEnrollmentSuccess();
            } else {
              showToast('error', 'Payment Verification Failed', 'Payment could not be verified. Please contact support for assistance.');
            }
          } catch (error) {
            showToast('error', 'Payment Verification Error', 'Payment verification failed. Please contact support if amount was deducted.');
          }
        },
        prefill: {
          name: `${user?.firstName} ${user?.lastName}`,
          email: user?.email,
          contact: user?.additionalDetails?.contactNumber || ""
        },
        theme: {
          color: "#3B82F6"
        },
        modal: {
          ondismiss: () => {
            showToast('warning', 'Payment Cancelled', 'Payment was cancelled. You can try enrolling again anytime.');
          }
        }
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();

    } catch (error) {
      console.error("Payment initialization error:", error);
      showToast('error', 'Payment Initialization Failed', 'Unable to start payment process. Please check your connection and try again.');
    } finally {
      setEnrolling(false);
    }
  };

  if (isEnrolled) {
    return (
      <Card className="bg-card/80 backdrop-blur-lg border-border sticky top-4">
        <CardContent className="p-6">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-green-600 mb-2">
              You're Enrolled!
            </h3>
            <p className="text-sm text-muted-foreground">
              Continue your learning journey
            </p>
          </div>
          
          <Button 
            className="w-full bg-green-600 hover:bg-green-700 mb-4"
            onClick={() => navigate(`/course-learning/${course._id}`)}
          >
            <CheckCircle className="w-4 h-4 mr-2" />
            Continue Learning
          </Button>
          
          <div className="text-center text-sm text-muted-foreground">
            Access all course materials and track your progress
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-card/80 backdrop-blur-lg border-border sticky top-4">
      <CardContent className="p-6">
        <div className="text-center mb-6">
          <div className="text-3xl font-bold text-primary mb-2">
            ₹{course.price}
          </div>
          <p className="text-sm text-muted-foreground">One-time payment</p>
        </div>
        
        <Button 
          className="w-full bg-gradient-to-r from-primary to-accent mb-4"
          onClick={handlePayment}
          disabled={enrolling}
        >
          {enrolling ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Processing...
            </>
          ) : (
            <>
              <CreditCard className="w-4 h-4 mr-2" />
              Enroll Now
            </>
          )}
        </Button>
        
        <div className="text-center text-sm text-muted-foreground mb-6">
          <Shield className="w-4 h-4 inline mr-1" />
          30-day money-back guarantee
        </div>
        
        <Separator className="my-6" />
        
        <div className="space-y-4">
          <h4 className="font-semibold">This course includes:</h4>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center space-x-2">
                <Users className="w-4 h-4 text-muted-foreground" />
                <span>Students enrolled</span>
              </div>
              <span className="font-medium">{course.studentsEnrolled?.length || 0}</span>
            </div>
            
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-muted-foreground" />
                <span>Full lifetime access</span>
              </div>
              <CheckCircle className="w-4 h-4 text-green-500" />
            </div>
            
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center space-x-2">
                <Award className="w-4 h-4 text-muted-foreground" />
                <span>Certificate of completion</span>
              </div>
              <CheckCircle className="w-4 h-4 text-green-500" />
            </div>
            
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center space-x-2">
                <Shield className="w-4 h-4 text-muted-foreground" />
                <span>Money-back guarantee</span>
              </div>
              <CheckCircle className="w-4 h-4 text-green-500" />
            </div>
          </div>
        </div>
        
        <Separator className="my-6" />
        
        <div className="text-center">
          <p className="text-xs text-muted-foreground mb-2">
            Secure payment powered by Razorpay
          </p>
          <div className="flex justify-center space-x-2">
            <Badge variant="outline" className="text-xs">UPI</Badge>
            <Badge variant="outline" className="text-xs">Cards</Badge>
            <Badge variant="outline" className="text-xs">Net Banking</Badge>
            <Badge variant="outline" className="text-xs">Wallets</Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CourseEnrollment;