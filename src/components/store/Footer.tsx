import Link from "next/link";
import Image from "next/image";

const whatsapp = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "923001234567";

export default function Footer() {
  return (
    <footer className="bg-[#0A0A0A] text-[#FAFAFA] mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
          <div className="col-span-2 md:col-span-1">
            <Image src="/logo.png" alt="Dastoor" width={100} height={36} className="h-9 w-auto object-contain brightness-0 invert mb-4" />
            <p className="text-xs text-[#737373] leading-relaxed max-w-[200px]">
              Premium gents wear. Shirts, pants, belts & more. Delivered across Pakistan.
            </p>
            <a
              href={`https://wa.me/${whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-6 text-[#25D366] text-xs uppercase tracking-widest hover:text-[#FAFAFA] transition-colors"
            >
              WhatsApp Us
            </a>
          </div>

          <div>
            <p className="text-xs uppercase tracking-widest text-[#737373] mb-4">Shop</p>
            <ul className="space-y-3">
              {["Shirts", "Pants", "Shorts", "Belts", "Underwear"].map((cat) => (
                <li key={cat}>
                  <Link href={`/category/${cat.toLowerCase()}`} className="text-xs text-[#D4D4D4] hover:text-[#FAFAFA] transition-colors">
                    {cat}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs uppercase tracking-widest text-[#737373] mb-4">Help</p>
            <ul className="space-y-3 text-xs text-[#D4D4D4]">
              <li>Cash on Delivery</li>
              <li>Returns within 3 days</li>
              <li>Nationwide delivery</li>
              <li>
                <a href={`https://wa.me/${whatsapp}`} target="_blank" rel="noopener noreferrer" className="hover:text-[#FAFAFA]">
                  Contact via WhatsApp
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-xs uppercase tracking-widest text-[#737373] mb-4">Delivery</p>
            <ul className="space-y-3 text-xs text-[#D4D4D4]">
              <li>3–5 working days</li>
              <li>Rs. 200 standard</li>
              <li>Free above Rs. 3,000</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-[#404040] px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between py-6 gap-3">
          <p className="text-[10px] text-[#737373] uppercase tracking-widest">
            © {new Date().getFullYear()} Dastoor. All rights reserved.
          </p>
          <p className="text-[10px] text-[#737373]">Pakistan 🇵🇰</p>
        </div>
      </div>
    </footer>
  );
}
