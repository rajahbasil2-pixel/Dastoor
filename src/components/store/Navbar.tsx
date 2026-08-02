"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { ShoppingBag, Menu, X } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import CartDrawer from "./CartDrawer";

const NAV_LINKS = [
  { label: "New Arrivals", href: "/shop?sort=newest" },
  { label: "Shirts", href: "/category/shirts" },
  { label: "Pants", href: "/category/pants" },
  { label: "Shorts", href: "/category/shorts" },
  { label: "Belts", href: "/category/belts" },
  { label: "Underwear", href: "/category/underwear" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { totalItems, openCart } = useCartStore();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <>
      <nav
        className={`sticky top-0 z-50 bg-[#FAFAFA] transition-shadow duration-300 ${
          scrolled ? "shadow-sm" : ""
        } border-b border-[#D4D4D4]`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <button
              className="lg:hidden p-1"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>

            <Link href="/" className="absolute left-1/2 -translate-x-1/2 lg:static lg:translate-x-0">
              <Image src="/logo.png" alt="Dastoor" width={120} height={40} className="h-10 w-auto object-contain" />
            </Link>

            <div className="hidden lg:flex items-center gap-8">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-xs uppercase tracking-widest text-[#404040] hover:text-[#0A0A0A] transition-colors duration-200 hover:underline decoration-[#C8A96E] underline-offset-4"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="flex items-center gap-4">
              <button
                className="p-1 text-[#404040] hover:text-[#0A0A0A] relative"
                onClick={openCart}
                aria-label="Cart"
              >
                <ShoppingBag size={20} />
                {totalItems() > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#0A0A0A] text-[#FAFAFA] text-[9px] font-bold w-4 h-4 flex items-center justify-center">
                    {totalItems()}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        {mobileOpen && (
          <div className="lg:hidden border-t border-[#D4D4D4] bg-[#FAFAFA]">
            <div className="px-4 py-4 flex flex-col gap-1">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-xs uppercase tracking-widest py-3 border-b border-[#F5F5F5] text-[#404040] hover:text-[#0A0A0A]"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>

      <CartDrawer />
    </>
  );
}
