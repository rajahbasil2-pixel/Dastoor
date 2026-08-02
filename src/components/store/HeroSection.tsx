import Link from "next/link";
import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="relative h-[90vh] min-h-[600px] max-h-[900px] bg-[#0A0A0A] flex items-end overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="/hero.jpg"
          alt="Dastoor — Premium Gents Wear"
          fill
          priority
          className="object-cover object-center opacity-60"
          sizes="100vw"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/30 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 lg:pb-24 w-full">
        <div className="w-16 h-px bg-[#C8A96E] mb-6" />
        <p className="text-[#C8A96E] text-xs uppercase tracking-[0.3em] mb-4 font-light">
          New Collection 2025
        </p>
        <h1 className="font-playfair text-[#FAFAFA] text-5xl sm:text-6xl lg:text-7xl font-bold leading-none mb-6">
          Dressed by
          <br />
          <span className="italic font-normal">Tradition.</span>
        </h1>
        <p className="text-[#D4D4D4] text-sm font-light mb-8 max-w-sm">
          Premium gents wear crafted for the modern Pakistani man.
          Shirts, pants, belts and more — delivered to your door.
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            href="/shop"
            className="inline-flex items-center justify-center bg-[#FAFAFA] text-[#0A0A0A] px-8 py-4 text-xs uppercase tracking-widest font-medium hover:bg-[#C8A96E] hover:text-[#FAFAFA] transition-colors duration-300"
          >
            Shop Now
          </Link>
          <Link
            href="/category/shirts"
            className="inline-flex items-center justify-center border border-[#FAFAFA]/40 text-[#FAFAFA] px-8 py-4 text-xs uppercase tracking-widest font-light hover:border-[#FAFAFA] transition-colors duration-300"
          >
            New Arrivals
          </Link>
        </div>
      </div>
    </section>
  );
}
