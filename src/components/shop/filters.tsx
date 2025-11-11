'use client';

import { Input } from "@/components/ui/input";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import { Slider } from "../ui/slider";
import { useState, useEffect, memo } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

const styles = ['Straight', 'Wavy', 'Curly', 'Pixie', 'Bob'];
const colors = ['Blonde', 'Brunette', 'Black', 'Red', 'Grey', 'Pastel'];
const lengths = ['Short', 'Medium', 'Long'];
const materials = ['Human Hair', 'Synthetic'];

const initialFilters = {
  search: '',
  priceRange: [0, 500] as [number, number],
  styles: [] as string[],
  colors: [] as string[],
  lengths: [] as string[],
  materials: [] as string[],
};

const Filters = memo(function Filters({ 
  onFilterChange,
  initialSearch = ''
}: { 
  onFilterChange: (filters: typeof initialFilters) => void,
  initialSearch?: string;
}) {
  const [filters, setFilters] = useState({...initialFilters, search: initialSearch});

  useEffect(() => {
    onFilterChange(filters);
  }, [filters, onFilterChange]);

  const handleCheckboxChange = (category: 'styles' | 'colors' | 'lengths' | 'materials', value: string) => {
    setFilters(prev => {
      const list = prev[category] as string[];
      const newList = list.includes(value)
        ? list.filter(item => item !== value)
        : [...list, value];
      return { ...prev, [category]: newList };
    });
  };

  const handlePriceChange = (value: [number, number]) => {
    setFilters(prev => ({...prev, priceRange: value}));
  }

  const handleClearFilters = () => {
    setFilters(initialFilters);
    onFilterChange(initialFilters);
  };
  

  const FilterGroup = ({ title, children }: { title: string, children: React.ReactNode }) => (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        {children}
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      <FilterGroup title="Search">
        <Input 
          placeholder="Search for a wig..." 
          value={filters.search}
          onChange={(e) => setFilters(prev => ({...prev, search: e.target.value}))}
        />
      </FilterGroup>

      <FilterGroup title="Price Range">
        <div className="space-y-4">
          <Slider
            value={filters.priceRange}
            max={500}
            step={10}
            onValueChange={(value) => handlePriceChange(value as [number, number])}
          />
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>${filters.priceRange[0]}</span>
            <span>${filters.priceRange[1]}</span>
          </div>
        </div>
      </FilterGroup>

      <FilterGroup title="Style">
        <div className="grid gap-2">
          {styles.map(style => (
            <div key={style} className="flex items-center space-x-2">
              <Checkbox 
                id={`style-${style}`} 
                checked={filters.styles.includes(style)}
                onCheckedChange={() => handleCheckboxChange('styles', style)}
              />
              <Label htmlFor={`style-${style}`} className="font-normal">{style}</Label>
            </div>
          ))}
        </div>
      </FilterGroup>
      
      <FilterGroup title="Color">
        <div className="grid gap-2">
          {colors.map(color => (
            <div key={color} className="flex items-center space-x-2">
              <Checkbox 
                id={`color-${color}`}
                checked={filters.colors.includes(color)}
                onCheckedChange={() => handleCheckboxChange('colors', color)}
              />
              <Label htmlFor={`color-${color}`} className="font-normal">{color}</Label>
            </div>
          ))}
        </div>
      </FilterGroup>

      <FilterGroup title="Length">
        <div className="grid gap-2">
          {lengths.map(length => (
            <div key={length} className="flex items-center space-x-2">
              <Checkbox 
                id={`length-${length}`} 
                checked={filters.lengths.includes(length)}
                onCheckedChange={() => handleCheckboxChange('lengths', length)}
              />
              <Label htmlFor={`length-${length}`} className="font-normal">{length}</Label>
            </div>
          ))}
        </div>
      </FilterGroup>

      <FilterGroup title="Material">
         <div className="grid gap-2">
          {materials.map(material => (
            <div key={material} className="flex items-center space-x-2">
              <Checkbox 
                id={`material-${material}`} 
                checked={filters.materials.includes(material)}
                onCheckedChange={() => handleCheckboxChange('materials', material)}
              />
              <Label htmlFor={`material-${material}`} className="font-normal">{material}</Label>
            </div>
          ))}
        </div>
      </FilterGroup>

      <div className="grid grid-cols-1 gap-4">
        <Button variant="outline" onClick={handleClearFilters}>Clear Filters</Button>
      </div>
    </div>
  );
});

export default Filters;
