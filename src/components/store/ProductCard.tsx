"use client";
import Image from "next/image";
import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import { ProductWithCategory } from "@/types";
import { useCartStore } from "@/store/cartStore";

interface ProductCardProps {
  product: ProductWithCategory;
}

export default function ProductCard({ product }: ProductCardProps) {
  const displayPrice = product.salePrice ?? product.price;
  const isOnSale = product.salePrice !== null && product.salePrice !== undefined;
  const { addItem } = useCartStore();

  function handleQuickAdd(e: React.MouseEvent) {
    e.preventDefault();
    const firstInStockSize = product.sizes.find((s) => s.inStock);
    if (!firstInStockSize) return;
    addItem({
      productId: product.id,
      name: product.name,
      image: product.images[0] || "",
      price: product.price,
      salePrice: product.salePrice ?? undefined,
      size: firstInStockSize.size,
      quantity: 1,
      slug: product.slug,
    });
  }

  return (
    <Link href={`/product/${product.slug}`} className="group block">
      <div className="relative aspect-[3/4] overflow-hidden bg-[#F5F5F5]">
        {product.images[0] && (
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover product-image-primary"
            sizes="(max-width: 768px) 50vw, 25vw"
          />
        )}
        {product.images[1] && (
          <Image
            src={product.images[1]}
            alt={product.name}
            fill
            className="object-cover product-image-secondary"
            sizes="(max-width: 768px) 50vw, 25vw"
          />
        )}
        {isOnSale && (
          <div className="absolute top-3 left-3 bg-[#0A0A0A] text-[#FAFAFA] text-[9px] uppercase tracking-widest px-2 py-1 z-10">
            Sale
          </div>
        )}
        {!product.inStock && (
          <div className="absolute inset-0 bg-[#FAFAFA]/60 flex items-center justify-center z-10">
            <p className="text-xs uppercase tracking-widest text-[#737373]">Out of Stock</p>
          </div>
        )}
        {product.inStock && (
          <button
            onClick={handleQuickAdd}
            className="absolute bottom-0 left-0 right-0 bg-[#0A0A0A] text-[#FAFAFA] py-3 flex items-center justify-center gap-2 text-xs uppercase tracking-widest opacity-0 group-hover:opacity-100 translate-y-full group-hover:translate-y-0 transition-all duration-300 z-10"
          >
            <ShoppingBag size={12} />
            Quick Add
          </button>
        )}
      </div>
      <div className="mt-3 space-y-1">
        <p className="text-[10px] uppercase tracking-widest text-[#737373]">{product.category.name}</p>
        <p className="text-sm font-medium text-[#0A0A0A] leading-tight">{product.name}</p>
        <div className="flex items-center gap-2">
          <span className={`text-sm ${isOnSale ? "text-[#0A0A0A] font-medium" : "text-[#404040]"}`}>
            {formatPrice(displayPrice)}
          </span>
          {isOnSale && (
            <span className="text-xs text-[#737373] line-through">{formatPrice(product.price)}</span>
          )}
        </div>
      </div>
    </Link>
  );
}
