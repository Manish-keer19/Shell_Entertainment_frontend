import React from 'react';
import { Button } from "@/components/ui/button";
import { Plus, BookOpen, Settings, Users } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '@/hooks/redux';

interface FloatingActionButtonProps {
  actions?: Array<{
    icon: React.ElementType;
    label: string;
    action: () => void;
    color?: string;
  }>;
}

const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({ actions }) => {
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.auth);
  const [isOpen, setIsOpen] = React.useState(false);

  // Default actions for admin
  const defaultActions = [
    {
      icon: Plus,
      label: "Create Course",
      action: () => navigate('/create-course'),
      color: "from-primary to-accent"
    },
    {
      icon: Settings,
      label: "Manage Courses",
      action: () => navigate('/manage-courses'),
      color: "from-green-500 to-green-600"
    },
    {
      icon: BookOpen,
      label: "All Courses",
      action: () => navigate('/courses'),
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: Users,
      label: "Add Category",
      action: () => navigate('/add-category'),
      color: "from-purple-500 to-purple-600"
    }
  ];

  const finalActions = actions || defaultActions;

  // Only show for admin users
  if (user?.accountType !== 'Admin') {
    return null;
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Action buttons */}
      {isOpen && (
        <div className="flex flex-col space-y-3 mb-3">
          {finalActions.map((action, index) => (
            <div
              key={index}
              className="flex items-center space-x-3 animate-fade-in"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <span className="bg-card/90 backdrop-blur-lg text-sm px-3 py-1 rounded-lg border border-border shadow-lg whitespace-nowrap">
                {action.label}
              </span>
              <Button
                size="sm"
                onClick={() => {
                  action.action();
                  setIsOpen(false);
                }}
                className={`h-12 w-12 rounded-full bg-gradient-to-r ${action.color || 'from-primary to-accent'} shadow-lg hover:shadow-xl transition-all duration-200`}
              >
                <action.icon className="w-5 h-5" />
              </Button>
            </div>
          ))}
        </div>
      )}

      {/* Main FAB */}
      <Button
        size="lg"
        onClick={() => setIsOpen(!isOpen)}
        className={`h-14 w-14 rounded-full bg-gradient-to-r from-primary to-accent shadow-lg hover:shadow-xl transition-all duration-200 ${
          isOpen ? 'rotate-45' : 'rotate-0'
        }`}
      >
        <Plus className="w-6 h-6" />
      </Button>
    </div>
  );
};

export default FloatingActionButton;