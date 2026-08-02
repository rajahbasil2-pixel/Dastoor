"use client";
import { MessageCircle } from "lucide-react";
import { buildWhatsAppOrderMessage, getWhatsAppLink } from "@/lib/whatsapp";
import { formatPrice } from "@/lib/utils";

interface WhatsAppButtonProps {
  productName: string;
  size: string | null;
  quantity: number;
  price: number;
  salePrice?: number | null;
  onNoSize?: () => void;
}

export default function WhatsAppButton({ productName, size, quantity, price, salePrice, onNoSize }: WhatsAppButtonProps) {
  function handleClick() {
    if (!size) {
      onNoSize?.();
      return;
    }
    const displayPrice = formatPrice((salePrice ?? price) * quantity);
    const message = buildWhatsAppOrderMessage({ productName, size, quantity, price: displayPrice });
    window.open(getWhatsAppLink(message), "_blank");
  }

  return (
    <button
      onClick={handleClick}
      className="w-full bg-[#25D366] text-white py-4 flex items-center justify-center gap-2 text-xs uppercase tracking-widest hover:bg-[#20bb5a] transition-colors duration-200"
    >
      <MessageCircle size={14} />
      Order via WhatsApp
    </button>
  );
}
