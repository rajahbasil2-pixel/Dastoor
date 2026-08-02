import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const product = await prisma.product.findUnique({
    where: { id: params.id },
    include: { category: true, sizes: true },
  });
  if (!product) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(product);
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const body = await req.json();
  const { name, description, price, salePrice, categoryId, images, sizes, featured, inStock } = body;
  await prisma.productSize.deleteMany({ where: { productId: params.id } });
  const product = await prisma.product.update({
    where: { id: params.id },
    data: {
      name, description,
      price: parseFloat(price),
      salePrice: salePrice ? parseFloat(salePrice) : null,
      categoryId, images, featured, inStock,
      sizes: { create: sizes.map((s: string) => ({ size: s, inStock: true })) },
    },
    include: { category: true, sizes: true },
  });
  return NextResponse.json(product);
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  await prisma.product.delete({ where: { id: params.id } });
  return NextResponse.json({ success: true });
}
