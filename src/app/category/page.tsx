
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Breadcrumb from "@/components/layout/breadcrumb";

const categories = [
  { name: 'Wigs', image: 'https://www.atozhair.net/wp-content/uploads/2021/03/women-natural-hair-wig-500x500-1.jpg', href: '/shop?category=wigs' },
  { name: 'Hair Extension', image: 'https://frontrow.co.za/cdn/shop/files/brownblackkinkystraightextensionsf.jpg?v=1701087156', href: '/shop?category=extensions' },
  { name: 'Toupees', image: 'https://i.etsystatic.com/22505350/r/il/0d83c3/6352668740/il_fullxfull.6352668740_tdmi.jpg', href: '/shop?category=toupees' },
];

export default function CategoryPage() {
  return (
    <div className="container py-12 md:py-24">
      <Breadcrumb />
      <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-headline tracking-tighter">Category</h1>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {categories.map((category) => (
          <Link key={category.name} href={category.href} className="group">
            <Card className="overflow-hidden text-center h-full">
              <CardHeader className="p-0">
                <div className="aspect-square relative">
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
              </CardHeader>
              <CardContent className="p-4">
                <CardTitle className="text-xl font-bold">{category.name}</CardTitle>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
