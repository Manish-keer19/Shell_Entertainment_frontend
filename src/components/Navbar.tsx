import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, Sun, Moon, User, LogOut, BookOpen, Settings, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useTheme } from "@/contexts/ThemeContext";
import { useAppSelector, useAppDispatch } from "@/hooks/redux";
import { logout } from "@/store/authSlice";
import { useToast } from "@/hooks/use-toast";
import Logo from "../assets/logo.jpg";


const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const { user, token } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const { toast } = useToast();

  const navItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/#about" },
    { name: "Services", path: "/#services" },
    { name: "Facilities", path: "/#facilities" },
    { name: "Certification", path: "/courses" },
    { name: "Shell Music", path: "/#music" },
    { name: "Contact", path: "/#contact" },
  ];

  const isActive = (path: string) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path) || location.hash === path.split("#")[1];
  };

  const handleLogout = () => {
    dispatch(logout());
    toast({
      title: "Logged out successfully",
      description: "See you soon!",
    });
    navigate("/");
  };

  const AuthButtons = () => {
    if (!token) {
      return (
        <Link to="/auth">
          <Button variant="default" size="sm" className="ml-2 bg-gradient-to-r from-primary to-accent hover:shadow-blue">
            Login
          </Button>
        </Link>
      );
    }

    return (
      <div className="flex items-center space-x-2">
        {user?.accountType === 'Admin' && (
          <>
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate('/create-course')}
              className="hidden md:flex"
            >
              <Plus className="w-4 h-4 mr-1" />
              Create Course
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate('/manage-courses')}
              className="hidden md:flex"
            >
              <Settings className="w-4 h-4 mr-1" />
              Manage
            </Button>
          </>
        )}
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
              <Avatar className="h-8 w-8">
                <AvatarImage src={user?.image} alt={user?.firstName} />
                <AvatarFallback>
                  {user?.firstName?.[0]}{user?.lastName?.[0]}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <div className="flex items-center justify-start gap-2 p-2">
              <div className="flex flex-col space-y-1 leading-none">
                <p className="font-medium">{user?.firstName} {user?.lastName}</p>
                <p className="w-[200px] truncate text-sm text-muted-foreground">
                  {user?.email}
                </p>
                <p className="text-xs text-muted-foreground">
                  {user?.accountType}
                </p>
              </div>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => navigate('/dashboard')}>
              <User className="mr-2 h-4 w-4" />
              Dashboard
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigate('/profile')}>
              <User className="mr-2 h-4 w-4" />
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigate('/courses')}>
              <BookOpen className="mr-2 h-4 w-4" />
              All Courses
            </DropdownMenuItem>
            {user?.accountType === 'Admin' && (
              <>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate('/create-course')}>
                  <Plus className="mr-2 h-4 w-4" />
                  Create Course
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/manage-courses')}>
                  <Settings className="mr-2 h-4 w-4" />
                  Manage Courses
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/add-category')}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Category
                </DropdownMenuItem>
              </>
            )}
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    );
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center animate-glow-pulse">
              <img src={Logo} className=" w-full h-full rounded-full"/>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                Shell Entertainment
              </span>
              <span className="text-xs text-muted-foreground">MSME Verified</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  isActive(item.path)
                    ? "text-primary bg-secondary"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                }`}
              >
                {item.name}
              </Link>
            ))}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleTheme}
              className="ml-2"
            >
              {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
            </Button>
            <AuthButtons />
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 text-foreground hover:text-primary transition-colors"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden pb-4 animate-fade-in">
            <div className="flex flex-col space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                    isActive(item.path)
                      ? "text-primary bg-secondary"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              <Button
                variant="ghost"
                onClick={toggleTheme}
                className="w-full justify-start px-4 py-3"
              >
                {theme === 'light' ? <Moon className="w-4 h-4 mr-2" /> : <Sun className="w-4 h-4 mr-2" />}
                {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
              </Button>
              {!token ? (
                <Link to="/auth" onClick={() => setIsOpen(false)}>
                  <Button variant="default" className="w-full bg-gradient-to-r from-primary to-accent hover:shadow-blue">
                    Login
                  </Button>
                </Link>
              ) : (
                <>
                  <Link to="/dashboard" onClick={() => setIsOpen(false)}>
                    <Button variant="outline" className="w-full justify-start px-4 py-3">
                      <User className="w-4 h-4 mr-2" />
                      Dashboard
                    </Button>
                  </Link>
                  <Link to="/profile" onClick={() => setIsOpen(false)}>
                    <Button variant="outline" className="w-full justify-start px-4 py-3">
                      <User className="w-4 h-4 mr-2" />
                      Profile
                    </Button>
                  </Link>
                  {user?.accountType === 'Admin' && (
                    <>
                      <Link to="/create-course" onClick={() => setIsOpen(false)}>
                        <Button variant="outline" className="w-full justify-start px-4 py-3">
                          <Plus className="w-4 h-4 mr-2" />
                          Create Course
                        </Button>
                      </Link>
                      <Link to="/manage-courses" onClick={() => setIsOpen(false)}>
                        <Button variant="outline" className="w-full justify-start px-4 py-3">
                          <Settings className="w-4 h-4 mr-2" />
                          Manage Courses
                        </Button>
                      </Link>
                    </>
                  )}
                  <Button
                    variant="destructive"
                    onClick={() => {
                      handleLogout();
                      setIsOpen(false);
                    }}
                    className="w-full justify-start px-4 py-3"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </Button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
