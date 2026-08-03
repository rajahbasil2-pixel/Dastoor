import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function AdminProductsPage() {
  const products = await prisma.product.findMany({
    include: { category: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Products</h1>
          <p className="text-xs text-[#737373] uppercase tracking-widest mt-1">{products.length} total</p>
        </div>
        <Link href="/admin/products/new" className="bg-[#0A0A0A] text-[#FAFAFA] px-6 py-3 text-xs uppercase tracking-widest hover:bg-[#404040] transition-colors">
          + Add Product
        </Link>
      </div>

      <div className="bg-white border border-[#D4D4D4] overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[#D4D4D4]">
              {["Image", "Name", "Category", "Price", "Status", "Featured", "Actions"].map((h) => (
                <th key={h} className="text-left text-xs uppercase tracking-widest text-[#737373] px-4 py-3">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#F5F5F5]">
            {products.map((p) => (
              <tr key={p.id} className="hover:bg-[#F5F5F5]">
                <td className="px-4 py-3">
                  <div className="w-12 h-14 bg-[#F5F5F5] overflow-hidden">
                    <img
                      src={p.images[0] || "/placeholder.jpg"}
                      alt={p.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </td>
                <td className="px-4 py-3 font-medium">{p.name}</td>
                <td className="px-4 py-3 text-[#737373]">{p.category.name}</td>
                <td className="px-4 py-3">
                  <span>Rs. {(p.salePrice ?? p.price).toLocaleString("en-PK")}</span>
                  {p.salePrice && <span className="block text-xs text-[#737373] line-through">Rs. {p.price.toLocaleString("en-PK")}</span>}
                </td>
                <td className="px-4 py-3">
                  <span className={`text-[10px] uppercase tracking-widest px-2 py-1 ${p.inStock ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                    {p.inStock ? "In Stock" : "Out of Stock"}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span className={`text-[10px] ${p.featured ? "text-[#C8A96E]" : "text-[#D4D4D4]"}`}>
                    {p.featured ? "✦ Featured" : "—"}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-4">
                    <Link href={`/admin/products/${p.id}`} className="text-xs uppercase tracking-widest underline decoration-[#C8A96E] underline-offset-4 text-[#737373]">Edit</Link>
                    <Link href={`/product/${p.slug}`} target="_blank" className="text-xs text-[#737373] hover:text-[#0A0A0A]">View</Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {products.length === 0 && (
          <div className="text-center py-10">
            <p className="text-xs text-[#737373] mb-4">No products yet.</p>
            <Link href="/admin/products/new" className="text-xs uppercase tracking-widest underline decoration-[#C8A96E] underline-offset-4">Add your first product</Link>
          </div>
        )}
      </div>
    </div>
  );
}
