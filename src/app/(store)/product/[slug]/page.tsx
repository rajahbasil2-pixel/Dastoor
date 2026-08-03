import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import ProductDetailClient from "@/components/store/ProductDetailClient";

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  const product = await prisma.product.findUnique({
    where: { slug },
    include: { category: true, sizes: true },
  });
  if (!product) notFound();
  return <ProductDetailClient product={product} />;
}