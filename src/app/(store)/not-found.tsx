import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
      <div className="w-12 h-px bg-[#C8A96E] mx-auto mb-6" />
      <p className="text-xs uppercase tracking-widest text-[#737373] mb-4">404</p>
      <h1 className="font-playfair text-4xl font-bold mb-4">Page not found</h1>
      <p className="text-sm text-[#737373] mb-8">The page you're looking for doesn't exist.</p>
      <Link href="/" className="bg-[#0A0A0A] text-[#FAFAFA] px-8 py-4 text-xs uppercase tracking-widest hover:bg-[#404040] transition-colors">
        Back to Home
      </Link>
    </div>
  );
}
