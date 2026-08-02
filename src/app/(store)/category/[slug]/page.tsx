import { prisma } from "@/lib/prisma";
import ProductCard from "@/components/store/ProductCard";
import { notFound } from "next/navigation";

export default async function CategoryPage({ params }: { params: { slug: string } }) {
  const category = await prisma.category.findUnique({ where: { slug: params.slug } });
  if (!category) notFound();

  const products = await prisma.product.findMany({
    where: { categoryId: category.id },
    include: { category: true, sizes: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-2">
          <div className="w-6 h-px bg-[#C8A96E]" />
          <p className="text-[10px] uppercase tracking-[0.3em] text-[#737373]">Browse</p>
        </div>
        <h1 className="font-playfair text-3xl font-bold">{category.name}</h1>
        <p className="text-xs text-[#737373] mt-1">{products.length} products</p>
      </div>

      {products.length === 0 ? (
        <div className="text-center py-20 text-sm text-[#737373]">No products yet. Check back soon!</div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product as any} />
          ))}
        </div>
      )}
    </div>
  );
}
