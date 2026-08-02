import ProductCard from "./ProductCard";
import Link from "next/link";
import { ProductWithCategory } from "@/types";

interface ProductGridProps {
  products: ProductWithCategory[];
  title: string;
  subtitle?: string;
  showViewAll?: boolean;
  viewAllHref?: string;
}

export default function ProductGrid({
  products, title, subtitle, showViewAll = true, viewAllHref = "/shop"
}: ProductGridProps) {
  if (products.length === 0) return null;
  return (
    <section className="py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-10">
          <div>
            <div className="flex items-center gap-4 mb-3">
              <div className="w-6 h-px bg-[#C8A96E]" />
              <p className="text-[10px] uppercase tracking-[0.3em] text-[#737373]">{subtitle}</p>
            </div>
            <h2 className="font-playfair text-3xl font-bold text-[#0A0A0A]">{title}</h2>
          </div>
          {showViewAll && (
            <Link href={viewAllHref} className="hidden sm:block text-xs uppercase tracking-widest underline decoration-[#C8A96E] underline-offset-4 text-[#737373] hover:text-[#0A0A0A]">
              View All
            </Link>
          )}
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
