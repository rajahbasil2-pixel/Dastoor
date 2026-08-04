"use client";
import { useState, useEffect, use } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

const STATUSES = ["PENDING", "CONFIRMED", "SHIPPED", "DELIVERED", "CANCELLED"];

export default function OrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const [order, setOrder] = useState<any>(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch(`/api/orders/${id}`).then(r => r.json()).then(setOrder);
  }, [id]);

  async function updateStatus(status: string) {
    setSaving(true);
    setSaved(false);
    const res = await fetch(`/api/orders/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    if (res.ok) {
      setOrder({ ...order, status });
      setSaved(true);
      router.refresh();
      setTimeout(() => setSaved(false), 2000);
    }
    setSaving(false);
  }

  if (!order) return <div className="text-sm text-[#737373]">Loading...</div>;

  return (
    <div className="max-w-2xl space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/orders" className="text-xs uppercase tracking-widest text-[#737373] hover:text-[#0A0A0A]">← Orders</Link>
      </div>
      <div>
        <h1 className="text-2xl font-bold">Order {order.orderNumber}</h1>
        <p className="text-xs text-[#737373] uppercase tracking-widest mt-1">{new Date(order.createdAt).toLocaleString("en-PK")}</p>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white border border-[#D4D4D4] p-5 space-y-3">
          <p className="text-xs uppercase tracking-widest text-[#737373]">Customer</p>
          <div className="space-y-1.5 text-sm">
            <p className="font-medium">{order.fullName}</p>
            <p className="text-[#737373]">{order.phone}</p>
            <p className="text-[#737373]">{order.city}</p>
            <p className="text-[#737373]">{order.address}</p>
            {order.notes && <p className="text-xs italic text-[#737373]">Note: {order.notes}</p>}
          </div>
        </div>
        <div className="bg-white border border-[#D4D4D4] p-5 space-y-3">
          <p className="text-xs uppercase tracking-widest text-[#737373]">Order Status</p>
          <select value={order.status} onChange={(e) => updateStatus(e.target.value)} disabled={saving}
            className="w-full border border-[#D4D4D4] px-3 py-2 text-sm bg-[#FAFAFA] outline-none focus:border-[#0A0A0A]">
            {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
          {saving && <p className="text-xs text-[#737373]">Updating...</p>}
          {saved && <p className="text-xs text-green-600">✓ Status updated</p>}
        </div>
      </div>
      <div className="bg-white border border-[#D4D4D4] divide-y divide-[#F5F5F5]">
        <div className="px-5 py-3"><p className="text-xs uppercase tracking-widest text-[#737373]">Order Items</p></div>
        {order.items.map((item: any) => (
          <div key={item.id} className="flex items-center gap-4 px-5 py-4">
            <div className="relative w-14 h-16 bg-[#F5F5F5] flex-shrink-0">
              {item.image && <Image src={item.image} alt={item.name} fill unoptimized className="object-cover" sizes="56px" />}
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium">{item.name}</p>
              <p className="text-xs text-[#737373]">Size: {item.size} · Qty: {item.quantity}</p>
            </div>
            <p className="text-sm font-medium">Rs. {(item.price * item.quantity).toLocaleString("en-PK")}</p>
          </div>
        ))}
        <div className="px-5 py-4 space-y-2">
          <div className="flex justify-between text-xs text-[#737373]"><span>Subtotal</span><span>Rs. {order.subtotal?.toLocaleString("en-PK")}</span></div>
          <div className="flex justify-between text-xs text-[#737373]"><span>Shipping</span><span>{order.shipping === 0 ? "Free" : `Rs. ${order.shipping}`}</span></div>
          <div className="flex justify-between text-sm font-bold border-t border-[#D4D4D4] pt-2"><span>Total</span><span>Rs. {order.total?.toLocaleString("en-PK")}</span></div>
        </div>
      </div>
    </div>
  );
}