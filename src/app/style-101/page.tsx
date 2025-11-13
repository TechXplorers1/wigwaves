

import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { placeholderImages } from '@/lib/placeholder-images';
import Breadcrumb from '@/components/layout/breadcrumb';

const styleArticles = [
    {
        id: 'style-101-1',
        title: 'Fiber Hair vs Human Hair',
        excerpt: 'To all the hair lovers, are you tired of feeling stuck when it comes to choosing between fiber ha...',
        date: 'Apr 23, 2025',
        image: 'https://ng.10by10styles.com/cdn/shop/articles/DRFUHBJK_800x.png?v=1745416235',
        imageHint: 'woman comparison',
        href: '#'
    },
    {
        id: 'style-101-2',
        title: 'Active Braid: The Perfect Braiding Extension for Active Lifestyles',
        excerpt: 'For women on the go, finding the perfect hair solution that matches both style and convenience is...',
        date: 'Feb 24, 2025',
        image: 'https://ng.10by10styles.com/cdn/shop/articles/blog_800x.png?v=1740403919',
        imageHint: 'woman braids active',
        href: '#'
    },
    {
        id: 'style-101-3',
        title: 'Complete Braid: The One-Pack Braiding Solution',
        excerpt: 'We\'re excited to introduce our newest product—Complete Braid—the perfect solution for all your b...',
        date: 'Dec 12, 2024',
        image: 'https://ng.10by10styles.com/cdn/shop/articles/blog_520x500_7548ccff-b188-41f3-848b-aa7307bdf997_400x.png?v=1734541435',
        imageHint: 'woman with braids',
        href: '#'
    },
    {
        id: 'style-101-4',
        title: 'The Ultimate Hair Revolution: What Really is KANEKALON CLEAN FIBER?',
        excerpt: 'Ever seen the word "Kanekalon Clean" on your pack of 10x10 Pre-stretched Braid and wondered what...',
        date: 'Oct 19, 2024',
        image: 'https://ng.10by10styles.com/cdn/shop/articles/thumb_800x.png?v=1729369011',
        imageHint: 'hair style',
        href: '#'
    },
    {
        id: 'style-101-5',
        title: 'Finding the Perfect Wig Cap Shade',
        excerpt: 'When it comes to achieving a natural and flawless look with wigs, the color of your wig cap can m...',
        date: 'Sep 28, 2024',
        image: 'https://ng.10by10styles.com/cdn/shop/articles/cov_800x.png?v=1727514108',
        imageHint: 'wig cap shades',
        href: '#'
    },
    {
        id: 'style-101-6',
        title: 'The Ultimate Guide to Removing Wig Glue from Your Hair: Tips, Tricks, and DIY Solutions',
        excerpt: 'Wearing wigs can be a fantastic way to switch up your look, but removing wig glue can sometimes f...',
        date: 'Aug 16, 2024',
        image: 'https://ng.10by10styles.com/cdn/shop/articles/bgyj_800x.png?v=1723804519',
        imageHint: 'wig glue removal',
        href: '#'
    },
    {
        id: 'style-101-7',
        title: 'Effortlessly Rocking Fiber Wigs in 2024',
        excerpt: 'Fiber Wigs are so 2024! Whether you\'re a seasoned wig wearer or considering your first purchase, ...',
        date: 'Jul 17, 2024',
        image: 'https://ng.10by10styles.com/cdn/shop/articles/gbm_800x.png?v=1721206959',
        imageHint: 'woman fiber wig',
        href: '#'
    },
    {
        id: 'style-101-8',
        title: '5 Ponytail Styles for Every Occasion',
        excerpt: 'Hello, ponytail lovers! Today, we\'re exploring five versatile styles that will take your mane fro...',
        date: 'Jul 04, 2024',
        image: 'https://ng.10by10styles.com/cdn/shop/articles/Beige_Aesthetic_Fashion_Blog_Banner_520x500_e4dcf609-7e3d-4621-821e-8e19c5962589_400x.png?v=1734541464',
        imageHint: 'ponytail style',
        href: '#'
    },
    {
        id: 'style-101-9',
        title: 'Boho Braids vs Box Braids: Choosing the Perfect Braided Style',
        excerpt: 'In the ever-changing reality of trends, picking a hairstyling could be almost impossible. Most ti...',
        date: 'May 29, 2024',
        image: 'https://ng.10by10styles.com/cdn/shop/articles/vs_800x.png?v=1716976660',
        imageHint: 'boho box braids',
        href: '#'
    }
];

export default function Style101Page() {
    return (
        <div className="container py-12 md:py-24">
            <div className="text-left mb-4">
                <Breadcrumb />
            </div>
            <div className="text-center mb-12">
                <h1 className="text-4xl sm:text-6xl font-headline tracking-tight">STYLE 101</h1>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
                {styleArticles.map((article) => (
                    <Link href={article.href} key={article.id} className="group">
                        <Card className="overflow-hidden flex flex-col h-full">
                             <div className="relative bg-muted aspect-square w-full h-64">
                                <Image
                                    src={article.image}
                                    alt={article.title}
                                    fill
                                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                                    data-ai-hint={article.imageHint}
                                />
                            </div>
                            <CardContent className="p-6 flex flex-col flex-grow">
                                <h2 className="text-xl font-headline font-bold mb-2 group-hover:text-primary transition-colors">{article.title}</h2>
                                <p className="text-muted-foreground text-base mb-4 flex-grow">{article.excerpt}</p>
                                <p className="text-sm text-muted-foreground mt-auto">{article.date}</p>
                            </CardContent>
                        </Card>
                    </Link>
                ))}
            </div>
        </div>
    );
}
