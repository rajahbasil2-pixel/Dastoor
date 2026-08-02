import Link from "next/link";
import Image from "next/image";

const CATEGORIES = [
  { name: "Shirts", slug: "shirts", image: "/cat-shirts.jpg", count: "Formal & Casual" },
  { name: "Pants", slug: "pants", image: "/cat-pants.jpg", count: "Chinos & Trousers" },
  { name: "Shorts", slug: "shorts", image: "/cat-shorts.jpg", count: "Casual Comfort" },
  { name: "Belts", slug: "belts", image: "/cat-belts.jpg", count: "Leather & Canvas" },
  { name: "Underwear", slug: "underwear", image: "/cat-underwear.jpg", count: "Daily Essentials" },
];

export default function CategoryGrid() {
  return (
    <section className="py-16 lg:py-24 bg-[#FAFAFA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-6 mb-12">
          <div className="w-8 h-px bg-[#C8A96E]" />
          <p className="text-xs uppercase tracking-[0.3em] text-[#737373]">Shop by category</p>
        </div>
        <h2 className="font-playfair text-3xl lg:text-4xl font-bold text-[#0A0A0A] mb-12">
          Everything a man needs.
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
          {CATEGORIES.map((cat) => (
            <Link key={cat.slug} href={`/category/${cat.slug}`} className="group block">
              <div className="aspect-[3/4] relative overflow-hidden bg-[#F5F5F5]">
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 50vw, 20vw"
                />
                <div className="absolute inset-0 bg-[#0A0A0A] opacity-0 group-hover:opacity-30 transition-opacity duration-300" />
              </div>
              <div className="mt-3">
                <p className="text-sm font-medium text-[#0A0A0A] uppercase tracking-widest">{cat.name}</p>
                <p className="text-xs text-[#737373] mt-0.5">{cat.count}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
