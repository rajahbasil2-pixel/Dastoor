import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  // Create categories
  const shirts = await prisma.category.upsert({
    where: { slug: "shirts" },
    update: {},
    create: { name: "Shirts", slug: "shirts", sortOrder: 1, description: "Formal and casual shirts for every occasion" },
  });
  const pants = await prisma.category.upsert({
    where: { slug: "pants" },
    update: {},
    create: { name: "Pants", slug: "pants", sortOrder: 2, description: "Chinos, trousers and more" },
  });
  const shorts = await prisma.category.upsert({
    where: { slug: "shorts" },
    update: {},
    create: { name: "Shorts", slug: "shorts", sortOrder: 3, description: "Casual shorts for every day" },
  });
  const belts = await prisma.category.upsert({
    where: { slug: "belts" },
    update: {},
    create: { name: "Belts", slug: "belts", sortOrder: 4, description: "Leather and canvas belts" },
  });
  const underwear = await prisma.category.upsert({
    where: { slug: "underwear" },
    update: {},
    create: { name: "Underwear", slug: "underwear", sortOrder: 5, description: "Daily essentials" },
  });

  // Create sample products
  await prisma.product.upsert({
    where: { slug: "classic-oxford-shirt" },
    update: {},
    create: {
      name: "Classic Oxford Shirt",
      slug: "classic-oxford-shirt",
      description: "A timeless Oxford shirt crafted from premium 100% cotton. Perfect for formal and smart-casual occasions. Breathable fabric, tailored fit.",
      price: 2499,
      featured: true,
      inStock: true,
      categoryId: shirts.id,
      images: [],
      sizes: { create: ["S", "M", "L", "XL", "XXL"].map((size) => ({ size, inStock: true })) },
    },
  });

  await prisma.product.upsert({
    where: { slug: "slim-fit-chinos" },
    update: {},
    create: {
      name: "Slim Fit Chinos",
      slug: "slim-fit-chinos",
      description: "Modern slim-fit chinos with a subtle stretch for comfort. Versatile enough for the office or a weekend outing.",
      price: 3999,
      salePrice: 3200,
      featured: true,
      inStock: true,
      categoryId: pants.id,
      images: [],
      sizes: { create: ["28", "30", "32", "34", "36"].map((size) => ({ size, inStock: true })) },
    },
  });

  await prisma.product.upsert({
    where: { slug: "cargo-shorts" },
    update: {},
    create: {
      name: "Cargo Shorts",
      slug: "cargo-shorts",
      description: "Practical cargo shorts with multiple pockets. Made from durable cotton canvas for everyday wear.",
      price: 1899,
      featured: false,
      inStock: true,
      categoryId: shorts.id,
      images: [],
      sizes: { create: ["S", "M", "L", "XL"].map((size) => ({ size, inStock: true })) },
    },
  });

  await prisma.product.upsert({
    where: { slug: "premium-leather-belt" },
    update: {},
    create: {
      name: "Premium Leather Belt",
      slug: "premium-leather-belt",
      description: "Full-grain leather belt with a brushed silver buckle. Built to last for years.",
      price: 1799,
      salePrice: 1299,
      featured: true,
      inStock: true,
      categoryId: belts.id,
      images: [],
      sizes: { create: [{ size: "Free Size", inStock: true }] },
    },
  });

  await prisma.product.upsert({
    where: { slug: "performance-underwear" },
    update: {},
    create: {
      name: "Performance Underwear",
      slug: "performance-underwear",
      description: "Moisture-wicking stretch cotton underwear for all-day comfort. Anti-chafe design for active wear.",
      price: 699,
      featured: false,
      inStock: true,
      categoryId: underwear.id,
      images: [],
      sizes: { create: ["S", "M", "L", "XL"].map((size) => ({ size, inStock: true })) },
    },
  });

  console.log("✓ Seeded 5 categories and 5 products");
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
