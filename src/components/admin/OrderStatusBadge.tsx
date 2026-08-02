const STATUS_COLORS: Record<string, string> = {
  PENDING: "bg-yellow-100 text-yellow-800",
  CONFIRMED: "bg-blue-100 text-blue-800",
  SHIPPED: "bg-purple-100 text-purple-800",
  DELIVERED: "bg-green-100 text-green-800",
  CANCELLED: "bg-red-100 text-red-800",
};

export default function OrderStatusBadge({ status }: { status: string }) {
  return (
    <span className={`text-[10px] uppercase tracking-widest px-2 py-1 ${STATUS_COLORS[status] || "bg-gray-100 text-gray-800"}`}>
      {status}
    </span>
  );
}
