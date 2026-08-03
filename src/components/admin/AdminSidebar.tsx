"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { LayoutDashboard, Package, ShoppingBag, Tag, LogOut } from "lucide-react";

const NAV = [
  { label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { label: "Products", href: "/admin/products", icon: Package },
  { label: "Orders", href: "/admin/orders", icon: ShoppingBag },
  { label: "Categories", href: "/admin/categories", icon: Tag },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  return (
    <aside className="w-56 bg-[#0A0A0A] text-[#FAFAFA] flex flex-col flex-shrink-0">
      <div className="p-6 border-b border-[#404040]">
        {/* White logo on black background */}
        <img src="/logo.png" alt="Dastoor" className="h-8 w-auto object-contain brightness-0 invert mb-1" />
        <p className="text-[10px] text-[#737373] mt-1 uppercase tracking-widest">Admin Panel</p>
      </div>
      <nav className="flex-1 p-4 space-y-1">
        {NAV.map(({ label, href, icon: Icon }) => (
          <Link key={href} href={href}
            className={`flex items-center gap-3 px-3 py-2.5 text-xs uppercase tracking-widest transition-colors ${
              pathname.startsWith(href)
                ? "bg-[#C8A96E] text-[#0A0A0A] font-medium"
                : "text-[#D4D4D4] hover:text-[#FAFAFA] hover:bg-[#404040]"
            }`}>
            <Icon size={14} />
            {label}
          </Link>
        ))}
      </nav>
      <div className="p-4 border-t border-[#404040]">
        <button onClick={() => signOut({ callbackUrl: "/admin/login" })}
          className="flex items-center gap-3 w-full px-3 py-2.5 text-xs uppercase tracking-widest text-[#737373] hover:text-[#EF4444] transition-colors">
          <LogOut size={14} />
          Sign Out
        </button>
      </div>
    </aside>
  );
}
