export interface CartItem {
  productId: string;
  name: string;
  image: string;
  price: number;
  salePrice?: number;
  size: string;
  quantity: number;
  slug: string;
}

export interface ProductWithCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  salePrice?: number | null;
  images: string[];
  featured: boolean;
  inStock: boolean;
  category: { id: string; name: string; slug: string };
  sizes: { id: string; size: string; inStock: boolean }[];
}
