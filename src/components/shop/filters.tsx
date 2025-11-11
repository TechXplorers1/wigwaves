'use client';

import { Input } from "@/components/ui/input";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import { Slider } from "../ui/slider";
import { useState, useEffect, useMemo } from "react";
import { Button } from "../ui/button";

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


export default function Filters({ onFilterChange }: { onFilterChange: (filters: typeof initialFilters) => void }) {
  const [filters, setFilters] = useState(initialFilters);
  const [localPriceRange, setLocalPriceRange] = useState(initialFilters.priceRange);

  const handleCheckboxChange = (category: keyof typeof initialFilters, value: string) => {
    setFilters(prev => {
      const list = prev[category] as string[];
      const newList = list.includes(value)
        ? list.filter(item => item !== value)
        : [...list, value];
      return { ...prev, [category]: newList };
    });
  };

  const handleApplyFilters = () => {
    onFilterChange({ ...filters, priceRange: localPriceRange });
  };
  
  const handleClearFilters = () => {
    setFilters(initialFilters);
    setLocalPriceRange(initialFilters.priceRange);
    onFilterChange(initialFilters);
  };
  
  useEffect(() => {
    handleApplyFilters();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);


  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-semibold mb-2">Search</h3>
        <Input 
          placeholder="Search for a wig..." 
          value={filters.search}
          onChange={(e) => setFilters(prev => ({...prev, search: e.target.value}))}
        />
      </div>
      <Accordion type="multiple" defaultValue={['price', 'style']} className="w-full">
        <AccordionItem value="price">
          <AccordionTrigger className="font-semibold">Price Range</AccordionTrigger>
          <AccordionContent className="pt-2">
            <div className="space-y-4">
              <Slider
                value={localPriceRange}
                max={500}
                step={10}
                onValueChange={(value) => setLocalPriceRange(value as [number, number])}
              />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>${localPriceRange[0]}</span>
                <span>${localPriceRange[1]}</span>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="style">
          <AccordionTrigger className="font-semibold">Style</AccordionTrigger>
          <AccordionContent>
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
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="color">
          <AccordionTrigger className="font-semibold">Color</AccordionTrigger>
          <AccordionContent>
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
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="length">
          <AccordionTrigger className="font-semibold">Length</AccordionTrigger>
          <AccordionContent>
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
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="material">
          <AccordionTrigger className="font-semibold">Material</AccordionTrigger>
          <AccordionContent>
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
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <div className="grid grid-cols-2 gap-4">
        <Button variant="outline" onClick={handleClearFilters}>Clear Filters</Button>
        <Button onClick={handleApplyFilters}>Apply Filters</Button>
      </div>
    </div>
  );
}
