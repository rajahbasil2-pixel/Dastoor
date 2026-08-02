import HeroSection from "@/components/store/HeroSection";
import CategoryGrid from "@/components/store/CategoryGrid";
import ProductGrid from "@/components/store/ProductGrid";
import Image from "next/image";
import { prisma } from "@/lib/prisma";

async function getFeaturedProducts() {
  try {
    return await prisma.product.findMany({
      where: { featured: true, inStock: true },
      include: { category: true, sizes: true },
      take: 8,
      orderBy: { createdAt: "desc" },
    });
  } catch { return []; }
}

async function getNewArrivals() {
  try {
    return await prisma.product.findMany({
      where: { inStock: true },
      include: { category: true, sizes: true },
      take: 8,
      orderBy: { createdAt: "desc" },
    });
  } catch { return []; }
}

export default async function HomePage() {
  const [featured, newArrivals] = await Promise.all([getFeaturedProducts(), getNewArrivals()]);

  return (
    <div>
      <HeroSection />
      <CategoryGrid />

      {featured.length > 0 && (
        <ProductGrid products={featured as any} title="Featured Picks" subtitle="Curated just for you" />
      )}

      {/* Quote banner */}
      <div className="relative py-24 my-16 overflow-hidden">
        <div className="absolute inset-0">
          <Image src="/quote-banner.jpg" alt="Dastoor" fill className="object-cover opacity-40" sizes="100vw" />
        </div>
        <div className="absolute inset-0 bg-[#0A0A0A]/80" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
          <div className="w-16 h-px bg-[#C8A96E] mx-auto mb-8" />
          <p className="text-[#C8A96E] text-xs uppercase tracking-[0.3em] mb-4 font-light">Our Promise</p>
          <h2 className="font-playfair text-[#FAFAFA] text-3xl lg:text-5xl italic font-normal leading-relaxed">
            "Quality that speaks<br />before you do."
          </h2>
          <div className="w-16 h-px bg-[#C8A96E] mx-auto mt-8" />
        </div>
      </div>

      <ProductGrid products={newArrivals as any} title="New Arrivals" subtitle="Fresh stock, just landed" />

      {/* Features strip */}
      <div className="bg-[#F5F5F5] py-12">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { title: "Cash on Delivery", sub: "Pay when you receive" },
            { title: "Free Returns", sub: "Within 3 days" },
            { title: "Nationwide", sub: "Delivery across Pakistan" },
            { title: "Premium Quality", sub: "Crafted to last" },
          ].map((f) => (
            <div key={f.title}>
              <div className="w-4 h-px bg-[#C8A96E] mx-auto mb-4" />
              <p className="text-xs uppercase tracking-widest font-medium text-[#0A0A0A]">{f.title}</p>
              <p className="text-xs text-[#737373] mt-1">{f.sub}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
