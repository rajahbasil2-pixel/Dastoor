"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import SizeSelector from "./SizeSelector";
import QuantitySelector from "./QuantitySelector";
import WhatsAppButton from "./WhatsAppButton";
import { useCartStore } from "@/store/cartStore";
import { formatPrice } from "@/lib/utils";

export default function ProductDetailClient({ product }: { product: any }) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [sizeError, setSizeError] = useState(false);
  const { addItem } = useCartStore();

  const displayPrice = product.salePrice ?? product.price;
  const isOnSale = product.salePrice != null;

  function handleAddToCart() {
    if (!selectedSize) { setSizeError(true); return; }
    setSizeError(false);
    addItem({
      productId: product.id,
      name: product.name,
      image: product.images[0],
      price: product.price,
      salePrice: product.salePrice,
      size: selectedSize,
      quantity,
      slug: product.slug,
    });
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-16">
      <div className="flex items-center gap-2 text-xs text-[#737373] uppercase tracking-widest mb-8">
        <Link href="/" className="hover:text-[#0A0A0A]">Home</Link>
        <span>/</span>
        <Link href={`/category/${product.category.slug}`} className="hover:text-[#0A0A0A]">{product.category.name}</Link>
        <span>/</span>
        <span className="text-[#0A0A0A]">{product.name}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
        <div className="space-y-3">
          <div className="relative aspect-[4/5] bg-[#F5F5F5] overflow-hidden">
            <Image
              src={product.images[selectedImage] || "/hero.jpg"}
              alt={product.name}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
            {isOnSale && (
              <div className="absolute top-4 left-4 bg-[#0A0A0A] text-[#FAFAFA] text-[9px] uppercase tracking-widest px-2 py-1">Sale</div>
            )}
          </div>
          {product.images.length > 1 && (
            <div className="flex gap-2 overflow-x-auto">
              {product.images.map((img: string, i: number) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={`relative w-20 h-24 flex-shrink-0 bg-[#F5F5F5] overflow-hidden border-2 transition-all ${selectedImage === i ? "border-[#0A0A0A]" : "border-transparent"}`}
                >
                  <Image src={img} alt={`View ${i + 1}`} fill className="object-cover" sizes="80px" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="space-y-6">
          <div>
            <p className="text-xs uppercase tracking-widest text-[#737373] mb-2">{product.category.name}</p>
            <h1 className="font-playfair text-3xl lg:text-4xl font-bold text-[#0A0A0A] leading-tight">{product.name}</h1>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-2xl font-medium text-[#0A0A0A]">{formatPrice(displayPrice)}</span>
            {isOnSale && (
              <>
                <span className="text-lg text-[#737373] line-through">{formatPrice(product.price)}</span>
                <span className="text-xs bg-[#0A0A0A] text-[#FAFAFA] px-2 py-0.5 uppercase tracking-widest">
                  Save {formatPrice(product.price - product.salePrice)}
                </span>
              </>
            )}
          </div>

          <div className="w-full h-px bg-[#D4D4D4]" />

          <div>
            <SizeSelector sizes={product.sizes} selected={selectedSize} onChange={(s) => { setSelectedSize(s); setSizeError(false); }} />
            {sizeError && <p className="text-xs text-[#EF4444] mt-2">Please select a size before adding to cart.</p>}
          </div>

          <div>
            <p className="text-xs uppercase tracking-widest text-[#737373] mb-3">Quantity</p>
            <QuantitySelector value={quantity} onChange={setQuantity} />
          </div>

          <div className="space-y-3 pt-2">
            <button
              onClick={handleAddToCart}
              className="w-full bg-[#0A0A0A] text-[#FAFAFA] py-4 flex items-center justify-center gap-2 text-xs uppercase tracking-widest hover:bg-[#404040] active:scale-[0.98] transition-all duration-200"
            >
              <ShoppingBag size={14} />
              Add to Cart
            </button>
            <WhatsAppButton
              productName={product.name}
              size={selectedSize}
              quantity={quantity}
              price={product.price}
              salePrice={product.salePrice}
              onNoSize={() => setSizeError(true)}
            />
          </div>

          <div className="w-full h-px bg-[#D4D4D4]" />

          <div>
            <p className="text-xs uppercase tracking-widest text-[#737373] mb-3">Description</p>
            <p className="text-sm text-[#404040] leading-relaxed">{product.description}</p>
          </div>

          <div className="bg-[#F5F5F5] p-4 space-y-2">
            {["Cash on delivery available", "Delivery in 3–5 working days", "Returns accepted within 3 days"].map((policy) => (
              <div key={policy} className="flex items-center gap-2">
                <div className="w-1 h-1 bg-[#C8A96E] rounded-full" />
                <p className="text-xs text-[#737373]">{policy}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
