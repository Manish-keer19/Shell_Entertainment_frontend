import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { loginStart, loginSuccess, loginFailure } from "@/store/authSlice";
import { authService } from "@/service/auth.service";
import { fromTheme } from "tailwind-merge";

const Auth = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector((state) => state.auth);
  const [otpSent, setOtpSent] = useState(false);
  const [signupData, setSignupData] = useState(null);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(loginStart());
    
    try {
      const formData = new FormData(e.currentTarget);
      const res = await authService.login(formData);
      
      if (res.success) {
        dispatch(loginSuccess({ user: res.user, token: res.token }));
        toast({
          title: "Login successful",
          description: res.message,
        });
        
        // Navigate based on user role
        if (res.user.accountType === 'Admin') {
          navigate('/profile');
        } else {
          navigate('/profile');
        }
      }
    } catch (error: any) {
      dispatch(loginFailure());
      toast({
        title: "Login failed",
        description: error.response?.data?.message || "Invalid credentials. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleSendOTP = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(loginStart());

    try {
      const formData = new FormData(e.currentTarget);
      const data = {
        fullNamme: formData.get('fullNamme'),
        email: formData.get('email'),
        password: formData.get('password'),
        contactNumber: formData.get('contactNumber'),
        accountType: formData.get('accountType') || 'Student'
      };
      
      setSignupData(data);
      const res = await authService.sendOTP({ email: data.email });
      
      if (res.success) {
        setOtpSent(true);
        toast({
          title: "OTP sent",
          description: "Please check your email for the OTP",
        });
      }
    } catch (error: any) {
      toast({
        title: "Failed to send OTP",
        description: error.response?.data?.message || "Something went wrong. Please try again.",
        variant: "destructive"
      });
    } finally {
      dispatch(loginFailure());
    }
  };

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(loginStart());

    try {
      const formData = new FormData(e.currentTarget);
      const otpData = {
        ...signupData,
        otp: formData.get('otp')
      };

     console.log("otpdata is ",otpData)
      
      const res = await authService.signup(otpData);
      
      
      if (res.success) {
        dispatch(loginSuccess({ user: res.user, token: res.token }));
        toast({
          title: "Signup successful",
          description: res.message,
        });
        navigate('/profile');
      }
    } catch (error: any) {
      dispatch(loginFailure());
      toast({
        title: "Signup failed",
        description: error.response?.data?.message || "Something went wrong. Please try again.",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-shell-light via-shell-lighter to-background p-4">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-glow-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-glow-pulse" />
      </div>

      <Card className="w-full max-w-md relative z-10 bg-card/80 backdrop-blur-lg border-border animate-scale-in">
        <CardHeader className="text-center">
          <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
            <span className="text-4xl font-bold text-white">S</span>
          </div>
          <CardTitle className="text-3xl font-bold">Shell Entertainment</CardTitle>
          <CardDescription>Access your certification courses</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>

            <TabsContent value="login">
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="login-email">Email</Label>
                  <Input
                    id="login-email"
                    name="email"
                    type="email"
                    placeholder="your@email.com"
                    required
                    className="bg-background border-border"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="login-password">Password</Label>
                  <Input
                    id="login-password"
                    name="password"
                    type="password"
                    placeholder="••••••••"
                    required
                    className="bg-background border-border"
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-primary to-accent hover:shadow-blue"
                  disabled={isLoading}
                >
                  {isLoading ? "Logging in..." : "Login"}
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="signup">
              {!otpSent ? (
                <form onSubmit={handleSendOTP} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullNamme">Full Name</Label>
                    <Input
                      id="fullNamme"
                      name="fullNamme"
                      type="text"
                      placeholder="John Doe"
                      required
                      className="bg-background border-border"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-email">Email</Label>
                    <Input
                      id="signup-email"
                      name="email"
                      type="email"
                      placeholder="your@email.com"
                      required
                      className="bg-background border-border"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contactNumber">Contact Number</Label>
                    <Input
                      id="contactNumber"
                      name="contactNumber"
                      type="tel"
                      placeholder="+91 9876543210"
                      required
                      className="bg-background border-border"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-password">Password</Label>
                    <Input
                      id="signup-password"
                      name="password"
                      type="password"
                      placeholder="••••••••"
                      required
                      className="bg-background border-border"
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-primary to-accent hover:shadow-blue"
                    disabled={isLoading}
                  >
                    {isLoading ? "Sending OTP..." : "Send OTP"}
                  </Button>
                </form>
              ) : (
                <form onSubmit={handleSignup} className="space-y-4">
                  <div className="text-center mb-4">
                    <p className="text-sm text-muted-foreground">
                      Enter the OTP sent to {signupData?.email}
                    </p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="otp">OTP</Label>
                    <Input
                      id="otp"
                      name="otp"
                      type="text"
                      placeholder="Enter 6-digit OTP"
                      maxLength={6}
                      required
                      className="bg-background border-border text-center text-lg tracking-widest"
                    />
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      type="button"
                      variant="outline"
                      className="flex-1"
                      onClick={() => setOtpSent(false)}
                    >
                      Back
                    </Button>
                    <Button
                      type="submit"
                      className="flex-1 bg-gradient-to-r from-primary to-accent hover:shadow-blue"
                      disabled={isLoading}
                    >
                      {isLoading ? "Verifying..." : "Verify & Sign Up"}
                    </Button>
                  </div>
                </form>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default Auth;
