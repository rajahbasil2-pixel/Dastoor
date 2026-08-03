"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/store/cartStore";
import { formatPrice } from "@/lib/utils";

const CITIES = ["Karachi", "Lahore", "Islamabad", "Rawalpindi", "Faisalabad", "Multan", "Peshawar", "Quetta", "Sialkot", "Gujranwala", "Hyderabad", "Other"];

export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCartStore();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [form, setForm] = useState({ fullName: "", phone: "", city: "", address: "", notes: "" });

  const subtotal = totalPrice();
  const shipping = subtotal >= 3000 ? 0 : 200;
  const total = subtotal + shipping;

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit() {
    if (!form.fullName || !form.phone || !form.city || !form.address) {
      alert("Please fill all required fields.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, items, subtotal, shipping, total }),
      });
      const data = await res.json();
      if (res.ok) {
        clearCart();
        setSuccess(data.orderNumber);
      }
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  }

  if (success) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center">
        <div className="w-12 h-12 bg-[#0A0A0A] flex items-center justify-center mx-auto mb-6">
          <span className="text-[#C8A96E] text-xl">✓</span>
        </div>
        <h1 className="font-playfair text-2xl font-bold mb-2">Order Placed!</h1>
        <p className="text-xs text-[#737373] mb-6">Order number: <span className="font-mono font-medium text-[#0A0A0A]">{success}</span></p>
        <p className="text-sm text-[#737373] mb-8">We will contact you shortly to confirm your order. Thank you for shopping with Dastoor!</p>
        <button onClick={() => router.push("/")} className="bg-[#0A0A0A] text-[#FAFAFA] px-8 py-4 text-xs uppercase tracking-widest hover:bg-[#404040] transition-colors">
          Continue Shopping
        </button>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center">
        <p className="text-sm text-[#737373] mb-6">Your cart is empty.</p>
        <button onClick={() => router.push("/shop")} className="text-xs uppercase tracking-widest underline decoration-[#C8A96E] underline-offset-4">Shop Now</button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="font-playfair text-3xl font-bold mb-10">Checkout</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="space-y-6">
          <p className="text-xs uppercase tracking-widest text-[#737373]">Delivery Information</p>
          <div>
            <label className="block text-xs uppercase tracking-widest text-[#737373] mb-2">Full Name *</label>
            <input name="fullName" value={form.fullName} onChange={handleChange} placeholder="Muhammad Ali" className="w-full border border-[#D4D4D4] px-4 py-3 text-sm bg-[#FAFAFA] outline-none focus:border-[#0A0A0A]" />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-widest text-[#737373] mb-2">Phone Number *</label>
            <input name="phone" value={form.phone} onChange={handleChange} placeholder="0300 1234567" className="w-full border border-[#D4D4D4] px-4 py-3 text-sm bg-[#FAFAFA] outline-none focus:border-[#0A0A0A]" />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-widest text-[#737373] mb-2">City *</label>
            <select name="city" value={form.city} onChange={handleChange} className="w-full border border-[#D4D4D4] px-4 py-3 text-sm bg-[#FAFAFA] outline-none focus:border-[#0A0A0A]">
              <option value="">Select city</option>
              {CITIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs uppercase tracking-widest text-[#737373] mb-2">Delivery Address *</label>
            <textarea name="address" value={form.address} onChange={handleChange} rows={3} placeholder="House/Flat #, Street, Area" className="w-full border border-[#D4D4D4] px-4 py-3 text-sm bg-[#FAFAFA] outline-none focus:border-[#0A0A0A] resize-none" />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-widest text-[#737373] mb-2">Order Notes (Optional)</label>
            <textarea name="notes" value={form.notes} onChange={handleChange} rows={2} placeholder="Any special instructions..." className="w-full border border-[#D4D4D4] px-4 py-3 text-sm bg-[#FAFAFA] outline-none focus:border-[#0A0A0A] resize-none" />
          </div>
          <button onClick={handleSubmit} disabled={loading} className="w-full bg-[#0A0A0A] text-[#FAFAFA] py-4 text-xs uppercase tracking-widest hover:bg-[#404040] transition-colors disabled:opacity-50">
            {loading ? "Placing Order..." : "Place Order — Cash on Delivery"}
          </button>
        </div>

        <div>
          <p className="text-xs uppercase tracking-widest text-[#737373] mb-6">Order Summary</p>
          <div className="space-y-4 mb-6">
            {items.map((item) => (
              <div key={`${item.productId}-${item.size}`} className="flex gap-3">
                <div className="w-14 h-16 bg-[#F5F5F5] flex-shrink-0 overflow-hidden">
                  <img
                    src={item.image || "/placeholder.jpg"}
                    alt={item.name}
                    className="w-full h-full object-cover"
                    onError={(e) => { (e.target as HTMLImageElement).src = "/placeholder.jpg"; }}
                  />
                </div>
                <div>
                  <p className="text-xs font-medium text-[#0A0A0A]">{item.name}</p>
                  <p className="text-[10px] text-[#737373]">Size: {item.size} · Qty: {item.quantity}</p>
                  <p className="text-xs font-medium text-[#C8A96E] mt-0.5">{formatPrice((item.salePrice ?? item.price) * item.quantity)}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="border-t border-[#D4D4D4] pt-4 space-y-2">
            <div className="flex justify-between text-xs text-[#737373]"><span>Subtotal</span><span>{formatPrice(subtotal)}</span></div>
            <div className="flex justify-between text-xs text-[#737373]"><span>Shipping</span><span>{shipping === 0 ? "Free" : formatPrice(shipping)}</span></div>
            <div className="flex justify-between text-sm font-bold pt-2 border-t border-[#D4D4D4]"><span>Total</span><span>{formatPrice(total)}</span></div>
          </div>
        </div>
      </div>
    </div>
  );
}
