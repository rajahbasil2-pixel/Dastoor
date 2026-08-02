import { prisma } from "@/lib/prisma";
import Link from "next/link";

const STATUS_COLORS: Record<string, string> = {
  PENDING: "bg-yellow-100 text-yellow-800",
  CONFIRMED: "bg-blue-100 text-blue-800",
  SHIPPED: "bg-purple-100 text-purple-800",
  DELIVERED: "bg-green-100 text-green-800",
  CANCELLED: "bg-red-100 text-red-800",
};

export default async function AdminOrdersPage() {
  const orders = await prisma.order.findMany({
    include: { items: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Orders</h1>
        <p className="text-xs text-[#737373] uppercase tracking-widest mt-1">{orders.length} total</p>
      </div>

      <div className="bg-white border border-[#D4D4D4] overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[#D4D4D4]">
              {["Order #", "Customer", "Phone", "City", "Items", "Total", "Status", "Date", ""].map((h) => (
                <th key={h} className="text-left text-xs uppercase tracking-widest text-[#737373] px-4 py-3">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#F5F5F5]">
            {orders.map((order) => (
              <tr key={order.id} className="hover:bg-[#F5F5F5]">
                <td className="px-4 py-3 font-mono text-xs">{order.orderNumber}</td>
                <td className="px-4 py-3 font-medium">{order.fullName}</td>
                <td className="px-4 py-3 text-[#737373]">{order.phone}</td>
                <td className="px-4 py-3 text-[#737373]">{order.city}</td>
                <td className="px-4 py-3 text-center">{order.items.length}</td>
                <td className="px-4 py-3">Rs. {order.total.toLocaleString("en-PK")}</td>
                <td className="px-4 py-3">
                  <span className={`text-[10px] uppercase tracking-widest px-2 py-1 ${STATUS_COLORS[order.status]}`}>{order.status}</span>
                </td>
                <td className="px-4 py-3 text-xs text-[#737373]">{new Date(order.createdAt).toLocaleDateString("en-PK")}</td>
                <td className="px-4 py-3">
                  <Link href={`/admin/orders/${order.id}`} className="text-xs uppercase tracking-widest underline decoration-[#C8A96E] underline-offset-4 text-[#737373]">View</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {orders.length === 0 && <div className="text-center py-10 text-xs text-[#737373]">No orders yet.</div>}
      </div>
    </div>
  );
}
