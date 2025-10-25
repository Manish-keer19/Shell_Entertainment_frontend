import React from 'react';
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Filter, SortAsc, SortDesc, X } from "lucide-react";

interface CourseFiltersProps {
  categories: any[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  sortBy: string;
  onSortChange: (sort: string) => void;
  priceRange: string;
  onPriceRangeChange: (range: string) => void;
  onClearFilters: () => void;
}

const CourseFilters: React.FC<CourseFiltersProps> = ({
  categories,
  selectedCategory,
  onCategoryChange,
  sortBy,
  onSortChange,
  priceRange,
  onPriceRangeChange,
  onClearFilters
}) => {
  const hasActiveFilters = selectedCategory !== 'all' || sortBy !== 'newest' || priceRange !== 'all';

  return (
    <div className="bg-card/80 backdrop-blur-lg border border-border rounded-lg p-4 mb-6">
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center space-x-2">
          <Filter className="w-4 h-4 text-muted-foreground" />
          <span className="text-sm font-medium">Filters:</span>
        </div>

        {/* Category Filter */}
        <div className="flex items-center space-x-2">
          <span className="text-sm text-muted-foreground">Category:</span>
          <Select value={selectedCategory} onValueChange={onCategoryChange}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category._id} value={category._id}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Price Range Filter */}
        <div className="flex items-center space-x-2">
          <span className="text-sm text-muted-foreground">Price:</span>
          <Select value={priceRange} onValueChange={onPriceRangeChange}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Prices</SelectItem>
              <SelectItem value="free">Free</SelectItem>
              <SelectItem value="0-50">$0 - $50</SelectItem>
              <SelectItem value="50-100">$50 - $100</SelectItem>
              <SelectItem value="100-200">$100 - $200</SelectItem>
              <SelectItem value="200+">$200+</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Sort Options */}
        <div className="flex items-center space-x-2">
          <span className="text-sm text-muted-foreground">Sort by:</span>
          <Select value={sortBy} onValueChange={onSortChange}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">
                <div className="flex items-center">
                  <SortDesc className="w-4 h-4 mr-2" />
                  Newest First
                </div>
              </SelectItem>
              <SelectItem value="oldest">
                <div className="flex items-center">
                  <SortAsc className="w-4 h-4 mr-2" />
                  Oldest First
                </div>
              </SelectItem>
              <SelectItem value="price-low">
                <div className="flex items-center">
                  <SortAsc className="w-4 h-4 mr-2" />
                  Price: Low to High
                </div>
              </SelectItem>
              <SelectItem value="price-high">
                <div className="flex items-center">
                  <SortDesc className="w-4 h-4 mr-2" />
                  Price: High to Low
                </div>
              </SelectItem>
              <SelectItem value="popular">Most Popular</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Clear Filters */}
        {hasActiveFilters && (
          <Button
            variant="outline"
            size="sm"
            onClick={onClearFilters}
            className="ml-auto"
          >
            <X className="w-4 h-4 mr-1" />
            Clear Filters
          </Button>
        )}
      </div>

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="flex flex-wrap items-center gap-2 mt-3 pt-3 border-t border-border">
          <span className="text-xs text-muted-foreground">Active filters:</span>
          {selectedCategory !== 'all' && (
            <Badge variant="secondary" className="text-xs">
              Category: {categories.find(c => c._id === selectedCategory)?.name}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onCategoryChange('all')}
                className="h-4 w-4 p-0 ml-1"
              >
                <X className="w-3 h-3" />
              </Button>
            </Badge>
          )}
          {priceRange !== 'all' && (
            <Badge variant="secondary" className="text-xs">
              Price: {priceRange === 'free' ? 'Free' : `$${priceRange}`}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onPriceRangeChange('all')}
                className="h-4 w-4 p-0 ml-1"
              >
                <X className="w-3 h-3" />
              </Button>
            </Badge>
          )}
          {sortBy !== 'newest' && (
            <Badge variant="secondary" className="text-xs">
              Sort: {sortBy.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onSortChange('newest')}
                className="h-4 w-4 p-0 ml-1"
              >
                <X className="w-3 h-3" />
              </Button>
            </Badge>
          )}
        </div>
      )}
    </div>
  );
};

export default CourseFilters;