'use client';

import { Input } from "@/components/ui/input";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import { Slider } from "../ui/slider";
import { useState } from "react";
import { Button } from "../ui/button";

const styles = ['Straight', 'Wavy', 'Curly', 'Pixie', 'Bob'];
const colors = ['Blonde', 'Brunette', 'Black', 'Red', 'Grey', 'Pastel'];
const lengths = ['Short', 'Medium', 'Long'];
const materials = ['Human Hair', 'Synthetic'];

export default function Filters() {
  const [priceRange, setPriceRange] = useState([0, 500]);

  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-semibold mb-2">Search</h3>
        <Input placeholder="Search for a wig..." />
      </div>
      <Accordion type="multiple" defaultValue={['style', 'price']} className="w-full">
        <AccordionItem value="price">
          <AccordionTrigger className="font-semibold">Price Range</AccordionTrigger>
          <AccordionContent className="pt-2">
            <div className="space-y-4">
              <Slider
                defaultValue={[0, 500]}
                max={500}
                step={10}
                onValueChange={setPriceRange}
              />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>${priceRange[0]}</span>
                <span>${priceRange[1]}</span>
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
                  <Checkbox id={`style-${style}`} />
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
                  <Checkbox id={`color-${color}`} />
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
                  <Checkbox id={`length-${length}`} />
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
                  <Checkbox id={`material-${material}`} />
                  <Label htmlFor={`material-${material}`} className="font-normal">{material}</Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <div className="grid grid-cols-2 gap-4">
        <Button variant="outline">Clear Filters</Button>
        <Button>Apply Filters</Button>
      </div>
    </div>
  );
}
