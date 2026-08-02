import { prisma } from "@/lib/prisma";
import ProductCard from "@/components/store/ProductCard";
import Link from "next/link";

export default async function ShopPage({ searchParams }: { searchParams: { category?: string; sort?: string } }) {
  const { category, sort } = searchParams;
  const orderBy = sort === "price-asc" ? { price: "asc" as const }
    : sort === "price-desc" ? { price: "desc" as const }
    : { createdAt: "desc" as const };

  const [products, categories] = await Promise.all([
    prisma.product.findMany({
      where: { ...(category ? { category: { slug: category } } : {}) },
      include: { category: true, sizes: true },
      orderBy,
    }),
    prisma.category.findMany({ orderBy: { sortOrder: "asc" } }),
  ]);

  const currentCat = categories.find(c => c.slug === category);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-2">
          <div className="w-6 h-px bg-[#C8A96E]" />
          <p className="text-[10px] uppercase tracking-[0.3em] text-[#737373]">Browse</p>
        </div>
        <h1 className="font-playfair text-3xl font-bold">{currentCat?.name ?? "All Products"}</h1>
        <p className="text-xs text-[#737373] mt-1">{products.length} products</p>
      </div>

      <div className="flex gap-10">
        <aside className="hidden lg:block w-52 flex-shrink-0">
          <div className="space-y-6">
            <div>
              <p className="text-[10px] uppercase tracking-widest text-[#737373] mb-3">Categories</p>
              <ul className="space-y-1">
                <li>
                  <Link href="/shop" className={`block py-1.5 text-xs transition-colors ${!category ? "text-[#0A0A0A] font-medium" : "text-[#737373] hover:text-[#0A0A0A]"}`}>
                    All Products
                  </Link>
                </li>
                {categories.map((c) => (
                  <li key={c.slug}>
                    <Link href={`/shop?category=${c.slug}`} className={`block py-1.5 text-xs transition-colors ${category === c.slug ? "text-[#0A0A0A] font-medium" : "text-[#737373] hover:text-[#0A0A0A]"}`}>
                      {c.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="w-full h-px bg-[#D4D4D4]" />
            <div>
              <p className="text-[10px] uppercase tracking-widest text-[#737373] mb-3">Sort By</p>
              <ul className="space-y-1">
                {[
                  { label: "Newest", value: "newest" },
                  { label: "Price: Low to High", value: "price-asc" },
                  { label: "Price: High to Low", value: "price-desc" },
                ].map((s) => (
                  <li key={s.value}>
                    <Link
                      href={`/shop?${category ? `category=${category}&` : ""}sort=${s.value}`}
                      className={`block py-1.5 text-xs transition-colors ${sort === s.value || (!sort && s.value === "newest") ? "text-[#0A0A0A] font-medium" : "text-[#737373] hover:text-[#0A0A0A]"}`}
                    >
                      {s.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </aside>

        <div className="flex-1">
          {products.length === 0 ? (
            <div className="text-center py-20 text-sm text-[#737373]">No products yet. Check back soon!</div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 lg:gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product as any} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
