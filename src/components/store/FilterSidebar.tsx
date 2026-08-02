"use client";
import Link from "next/link";

interface Category {
  id: string;
  name: string;
  slug: string;
}

interface FilterSidebarProps {
  categories: Category[];
  currentCategory?: string;
  currentSort?: string;
}

export default function FilterSidebar({ categories, currentCategory, currentSort }: FilterSidebarProps) {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-[10px] uppercase tracking-widest text-[#737373] mb-3">Categories</p>
        <ul className="space-y-1">
          <li>
            <Link href="/shop" className={`block py-1.5 text-xs transition-colors ${!currentCategory ? "text-[#0A0A0A] font-medium" : "text-[#737373] hover:text-[#0A0A0A]"}`}>
              All Products
            </Link>
          </li>
          {categories.map((c) => (
            <li key={c.slug}>
              <Link href={`/shop?category=${c.slug}`} className={`block py-1.5 text-xs transition-colors ${currentCategory === c.slug ? "text-[#0A0A0A] font-medium" : "text-[#737373] hover:text-[#0A0A0A]"}`}>
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
                href={`/shop?${currentCategory ? `category=${currentCategory}&` : ""}sort=${s.value}`}
                className={`block py-1.5 text-xs transition-colors ${currentSort === s.value || (!currentSort && s.value === "newest") ? "text-[#0A0A0A] font-medium" : "text-[#737373] hover:text-[#0A0A0A]"}`}
              >
                {s.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
