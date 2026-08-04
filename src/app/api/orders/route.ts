import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { generateOrderNumber } from "@/lib/utils";

export const dynamic = "force-dynamic";

export async function GET() {
  const orders = await prisma.order.findMany({
    include: { items: true },
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(orders);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { fullName, phone, city, address, notes, items, subtotal, shipping, total } = body;
    const orderNumber = generateOrderNumber();
    const order = await prisma.order.create({
      data: {
        orderNumber, fullName, phone, city, address, notes,
        subtotal, shipping, total,
        items: {
          create: items.map((item: any) => ({
            productId: item.productId,
            name: item.name,
            image: item.image,
            price: item.salePrice ?? item.price,
            size: item.size,
            quantity: item.quantity,
          })),
        },
      },
    });
    return NextResponse.json({ orderNumber: order.orderNumber, id: order.id }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}