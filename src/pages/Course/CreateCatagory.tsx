import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tag, Send, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Navbar from '@/components/Navbar';
import { adminService } from '@/service/admin.service';
import { useAppSelector } from '@/hooks/redux';

const CreateCategory = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { token } = useAppSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    name: '',
    description: ''
  });
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingCategories, setIsLoadingCategories] = useState(true);

  // Handler for basic text inputs
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Fetch all categories
  const fetchCategories = async () => {
    if (!token) return;
    try {
      setIsLoadingCategories(true);
      const res = await adminService.getAllCatagory(token);
      setCategories(res.data || []);
    } catch (error: any) {
      console.error('Error fetching categories:', error);
    } finally {
      setIsLoadingCategories(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, [token]);



  // Submit handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      toast({ title: "Incomplete form", description: "Please fill required fields.", variant: "destructive" });
      return;
    }
    if (!token) {
      toast({ title: "Authentication Error", description: "Please login again", variant: "destructive" });
      return;
    }

    try {
      setIsLoading(true);
      const res = await adminService.createCatagory(formData, token);
      
      toast({
        title: "Success",
        description: res.message || "Category created successfully!"
      });
      setFormData({ name: '', description: '' });
      fetchCategories();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to create category",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-shell-darker via-shell-dark to-shell-dark">
      {/* Header */}
      <Navbar />
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
        <div className="max-w-2xl mx-auto">
          <Card className="bg-card/80 backdrop-blur-lg border-border animate-fade-in">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl font-bold mb-2">
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  Create New Category
                </span>
              </CardTitle>
              <p className="text-muted-foreground">Organize your courses with custom categories</p>
            </CardHeader>
            <CardContent className="space-y-8 p-6 md:p-8">
              <form onSubmit={handleSubmit}>
                {/* Basic Info Section */}
                <Card className="bg-card/50 border-border">
                  <CardHeader className="flex flex-row items-center space-x-2">
                    <Tag className="w-5 h-5 text-primary" />
                    <CardTitle className="text-lg">Category Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Category Name *</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Enter category name (e.g., Web Development)"
                        className="w-full"
                        disabled={isLoading}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        placeholder="Brief description of the category..."
                        rows={3}
                        disabled={isLoading}
                      />
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
                  {isLoading ? 'Creating...' : 'Create Category'}
                </Button>

                {/* Existing Categories */}
                <Card className="bg-card/50 border-border mt-8">
                  <CardHeader>
                    <CardTitle className="text-lg">Existing Categories</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {isLoadingCategories ? (
                      <div className="flex items-center justify-center py-4">
                        <Loader2 className="w-6 h-6 animate-spin" />
                        <span className="ml-2">Loading categories...</span>
                      </div>
                    ) : categories.length > 0 ? (
                      <div className="flex flex-wrap gap-2">
                        {categories.map((category: any) => (
                          <Badge key={category._id} variant="secondary">
                            {category.name}
                          </Badge>
                        ))}
                      </div>
                    ) : (
                      <p className="text-muted-foreground">No categories created yet.</p>
                    )}
                  </CardContent>
                </Card>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CreateCategory;