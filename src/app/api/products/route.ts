import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { createSlug } from "@/lib/utils";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");
  const featured = searchParams.get("featured");

  const products = await prisma.product.findMany({
    where: {
      ...(category ? { category: { slug: category } } : {}),
      ...(featured === "true" ? { featured: true } : {}),
    },
    include: { category: true, sizes: true },
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(products);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, description, price, salePrice, categoryId, images, sizes, featured, inStock } = body;
    const slug = createSlug(name) + "-" + Date.now().toString().slice(-4);

    const product = await prisma.product.create({
      data: {
        name, slug, description,
        price: parseFloat(price),
        salePrice: salePrice ? parseFloat(salePrice) : null,
        categoryId, images: images || [],
        featured: featured ?? false,
        inStock: inStock ?? true,
        sizes: { create: (sizes || []).map((s: string) => ({ size: s, inStock: true })) },
      },
      include: { category: true, sizes: true },
    });

    return NextResponse.json(product, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
