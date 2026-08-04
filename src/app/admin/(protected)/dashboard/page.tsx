import { prisma } from "@/lib/prisma";
import Link from "next/link";

export const revalidate = 0;

export default async function DashboardPage() {
  const [totalOrders, pendingOrders, totalProducts, totalRevenue] = await Promise.all([
    prisma.order.count(),
    prisma.order.count({ where: { status: "PENDING" } }),
    prisma.product.count(),
    prisma.order.aggregate({ _sum: { total: true }, where: { status: { not: "CANCELLED" } } }),
  ]);

  const recentOrders = await prisma.order.findMany({
    take: 5, orderBy: { createdAt: "desc" }, include: { items: true },
  });

  const stats = [
    { label: "Total Orders", value: totalOrders, href: "/admin/orders" },
    { label: "Pending Orders", value: pendingOrders, href: "/admin/orders" },
    { label: "Total Products", value: totalProducts, href: "/admin/products" },
    { label: "Revenue (PKR)", value: `${(totalRevenue._sum.total ?? 0).toLocaleString("en-PK")}`, href: "/admin/orders" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-[#0A0A0A]">Dashboard</h1>
        <p className="text-xs text-[#737373] mt-1 uppercase tracking-widest">Overview</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Link key={stat.label} href={stat.href} className="bg-white border border-[#D4D4D4] p-6 hover:border-[#C8A96E] transition-colors">
            <p className="text-xs text-[#737373] uppercase tracking-widest">{stat.label}</p>
            <p className="text-2xl font-bold text-[#0A0A0A] mt-2">{stat.value}</p>
          </Link>
        ))}
      </div>

      <div className="flex items-center justify-between">
        <h2 className="text-sm uppercase tracking-widest text-[#737373]">Recent Orders</h2>
        <Link href="/admin/orders" className="text-xs uppercase tracking-widest underline decoration-[#C8A96E] underline-offset-4 text-[#737373]">View All</Link>
      </div>

      <div className="bg-white border border-[#D4D4D4] overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[#D4D4D4]">
              {["Order #", "Customer", "City", "Total", "Status", "Date"].map((h) => (
                <th key={h} className="text-left text-xs uppercase tracking-widest text-[#737373] px-4 py-3">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#F5F5F5]">
            {recentOrders.map((order) => (
              <tr key={order.id} className="hover:bg-[#F5F5F5]">
                <td className="px-4 py-3 font-mono text-xs">{order.orderNumber}</td>
                <td className="px-4 py-3">{order.fullName}</td>
                <td className="px-4 py-3 text-[#737373]">{order.city}</td>
                <td className="px-4 py-3">Rs. {order.total.toLocaleString("en-PK")}</td>
                <td className="px-4 py-3">
                  <span className={`text-[10px] uppercase tracking-widest px-2 py-1 ${
                    order.status === "PENDING" ? "bg-yellow-100 text-yellow-800" :
                    order.status === "CONFIRMED" ? "bg-blue-100 text-blue-800" :
                    order.status === "SHIPPED" ? "bg-purple-100 text-purple-800" :
                    order.status === "DELIVERED" ? "bg-green-100 text-green-800" :
                    "bg-red-100 text-red-800"
                  }`}>{order.status}</span>
                </td>
                <td className="px-4 py-3 text-[#737373] text-xs">{new Date(order.createdAt).toLocaleDateString("en-PK")}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {recentOrders.length === 0 && (
          <div className="text-center py-10 text-xs text-[#737373]">No orders yet.</div>
        )}
      </div>
    </div>
  );
}