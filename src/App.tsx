import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store";
import { ThemeProvider } from "./contexts/ThemeContext";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import Course from "./pages/Course";
import Certificate from "./pages/Certificate";
import NotFound from "./pages/NotFound";
import CreateCourse from "./pages/Course/CreateCourse";
import CreateCategory from "./pages/Course/CreateCatagory";
import Profile from "./pages/Profile";
import AuthLoader from "./components/AuthLoader";

const queryClient = new QueryClient();

const App = () => (
  <Provider store={store}>
    <AuthLoader>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/auth" element={<Auth />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/courses" element={<Dashboard />} />
                <Route path="/course/:courseId" element={<Course />} />
                <Route path="/certificate/:courseId" element={<Certificate />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/add-course" element={<CreateCourse/>}/>
                <Route path="/add-catagory" element={<CreateCategory/>}/>
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </AuthLoader>
  </Provider>
);

export default App;
