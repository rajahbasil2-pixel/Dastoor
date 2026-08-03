"use client";
import Link from "next/link";
import { X, Trash2, Plus, Minus } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { formatPrice } from "@/lib/utils";

export default function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, totalPrice } = useCartStore();
  const subtotal = totalPrice();
  const shipping = subtotal >= 4000 ? 0 : 200;
  const total = subtotal + shipping;

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm" onClick={closeCart} />
      )}
      <div className={`fixed top-0 right-0 bottom-0 z-50 w-full max-w-md bg-[#FAFAFA] flex flex-col transition-transform duration-400 ease-out ${isOpen ? "translate-x-0" : "translate-x-full"}`}>
        <div className="flex items-center justify-between p-6 border-b border-[#D4D4D4]">
          <div>
            <p className="text-xs uppercase tracking-widest text-[#737373]">Your Cart</p>
            <p className="font-playfair text-xl font-bold mt-0.5">{items.length} {items.length === 1 ? "item" : "items"}</p>
          </div>
          <button onClick={closeCart} className="p-2 hover:text-[#C8A96E] transition-colors">
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {items.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-sm text-[#737373] mb-6">Your cart is empty.</p>
              <button onClick={closeCart} className="text-xs uppercase tracking-widest underline decoration-[#C8A96E] underline-offset-4">
                Continue Shopping
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div key={`${item.productId}-${item.size}`} className="flex gap-4">
                <div className="w-20 h-24 bg-[#F5F5F5] flex-shrink-0 overflow-hidden">
                  <img src={item.image || "/placeholder.jpg"} alt={item.name}
                    className="w-full h-full object-cover"
                    onError={(e) => { (e.target as HTMLImageElement).src = "/placeholder.jpg"; }} />
                </div>
                <div className="flex-1 min-w-0">
                  <Link href={`/product/${item.slug}`} onClick={closeCart} className="text-sm font-medium text-[#0A0A0A] hover:text-[#C8A96E] transition-colors block truncate">
                    {item.name}
                  </Link>
                  <p className="text-xs text-[#737373] mt-0.5">Size: {item.size}</p>
                  <p className="text-sm font-medium mt-1 text-[#C8A96E]">{formatPrice((item.salePrice ?? item.price) * item.quantity)}</p>
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center border border-[#D4D4D4]">
                      <button onClick={() => updateQuantity(item.productId, item.size, item.quantity - 1)} className="p-1.5 hover:bg-[#F5F5F5] transition-colors">
                        <Minus size={10} />
                      </button>
                      <span className="text-xs font-medium px-3">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.productId, item.size, item.quantity + 1)} className="p-1.5 hover:bg-[#F5F5F5] transition-colors">
                        <Plus size={10} />
                      </button>
                    </div>
                    <button onClick={() => removeItem(item.productId, item.size)} className="text-[#737373] hover:text-[#EF4444] transition-colors">
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className="p-6 border-t border-[#D4D4D4] space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-xs text-[#737373]">
                <span>Subtotal</span><span>{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between text-xs text-[#737373]">
                <span>Shipping</span>
                <span>{shipping === 0 ? "Free" : formatPrice(shipping)}</span>
              </div>
              {subtotal < 4000 && (
                <p className="text-[10px] text-[#C8A96E]">Add Rs. {(4000 - subtotal).toLocaleString("en-PK")} more for free delivery</p>
              )}
              <div className="flex justify-between text-sm font-bold pt-2 border-t border-[#D4D4D4]">
                <span>Total</span><span>{formatPrice(total)}</span>
              </div>
            </div>
            <Link href="/checkout" onClick={closeCart}
              className="block w-full bg-[#0A0A0A] text-[#FAFAFA] py-4 text-center text-xs uppercase tracking-widest hover:bg-[#404040] transition-colors duration-200">
              Checkout — COD
            </Link>
            <p className="text-center text-[10px] text-[#737373] uppercase tracking-widest">Cash on Delivery · Free Returns</p>
          </div>
        )}
      </div>
    </>
  );
}