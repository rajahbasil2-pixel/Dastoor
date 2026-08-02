"use client";
import Link from "next/link";
import Image from "next/image";
import { useCartStore } from "@/store/cartStore";
import { formatPrice } from "@/lib/utils";
import { Trash2, Plus, Minus } from "lucide-react";

export default function CartPage() {
  const { items, removeItem, updateQuantity, totalPrice } = useCartStore();
  const subtotal = totalPrice();
  const shipping = subtotal >= 3000 ? 0 : 200;
  const total = subtotal + shipping;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="font-playfair text-3xl font-bold mb-8">Your Cart</h1>

      {items.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-sm text-[#737373] mb-6">Your cart is empty.</p>
          <Link href="/shop" className="text-xs uppercase tracking-widest underline decoration-[#C8A96E] underline-offset-4">
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-6">
            {items.map((item) => (
              <div key={`${item.productId}-${item.size}`} className="flex gap-4 pb-6 border-b border-[#D4D4D4]">
                <div className="relative w-24 h-28 bg-[#F5F5F5] flex-shrink-0">
                  {item.image && <Image src={item.image} alt={item.name} fill className="object-cover" sizes="96px" />}
                </div>
                <div className="flex-1">
                  <Link href={`/product/${item.slug}`} className="text-sm font-medium hover:text-[#C8A96E] transition-colors">{item.name}</Link>
                  <p className="text-xs text-[#737373] mt-1">Size: {item.size}</p>
                  <p className="text-sm font-medium text-[#C8A96E] mt-1">{formatPrice((item.salePrice ?? item.price) * item.quantity)}</p>
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center border border-[#D4D4D4]">
                      <button onClick={() => updateQuantity(item.productId, item.size, item.quantity - 1)} className="p-2 hover:bg-[#F5F5F5]"><Minus size={10} /></button>
                      <span className="text-xs font-medium px-3">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.productId, item.size, item.quantity + 1)} className="p-2 hover:bg-[#F5F5F5]"><Plus size={10} /></button>
                    </div>
                    <button onClick={() => removeItem(item.productId, item.size)} className="text-[#737373] hover:text-[#EF4444] transition-colors">
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-[#F5F5F5] p-6 h-fit space-y-4">
            <p className="text-xs uppercase tracking-widest text-[#737373]">Order Summary</p>
            <div className="space-y-2">
              <div className="flex justify-between text-xs text-[#737373]">
                <span>Subtotal</span><span>{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between text-xs text-[#737373]">
                <span>Shipping</span><span>{shipping === 0 ? "Free" : formatPrice(shipping)}</span>
              </div>
              <div className="flex justify-between text-sm font-bold pt-2 border-t border-[#D4D4D4]">
                <span>Total</span><span>{formatPrice(total)}</span>
              </div>
            </div>
            <Link href="/checkout" className="block w-full bg-[#0A0A0A] text-[#FAFAFA] py-4 text-center text-xs uppercase tracking-widest hover:bg-[#404040] transition-colors">
              Checkout — COD
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
