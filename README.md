# Dastoor — Premium Gents Wear E-Commerce Store

> "Dressed by Tradition." — A complete e-commerce solution for Pakistani men's fashion.

## 🗂 Project Overview

**Stack:** Next.js 14 · TypeScript · Tailwind CSS · Prisma · PostgreSQL (Supabase) · NextAuth.js · Zustand · Cloudinary

---

## 🚀 Quick Start (5 Steps)

### Step 1 — Install Dependencies
```bash
npm install --legacy-peer-deps
```

### Step 2 — Set Up Environment Variables
Copy `.env.local` and fill in your credentials:

| Variable | Where to Get It |
|---|---|
| `DATABASE_URL` | Supabase → Settings → Database → URI |
| `DIRECT_URL` | Same place, Direct connection string |
| `CLOUDINARY_*` | cloudinary.com → Dashboard |
| `NEXTAUTH_SECRET` | Run: `openssl rand -base64 32` |
| `ADMIN_EMAIL` | Set to whatever you want |
| `ADMIN_PASSWORD` | Set a strong password |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | Your WhatsApp number with country code (no +) |

### Step 3 — Set Up Database
```bash
npx prisma generate
npx prisma db push
npx prisma db seed
```

### Step 4 — Run Locally
```bash
npm run dev
```
Open http://localhost:3000

### Step 5 — Deploy on Vercel
1. Push to GitHub
2. Import to Vercel
3. Add all environment variables from `.env.local`
4. Change `NEXTAUTH_URL` to your Vercel URL
5. Deploy!

---

## 📁 Project Structure

```
src/
├── app/
│   ├── (store)/          ← Customer-facing pages
│   │   ├── page.tsx      ← Homepage
│   │   ├── shop/         ← All products with filters
│   │   ├── category/     ← Category pages
│   │   ├── product/      ← Product detail pages
│   │   ├── cart/         ← Cart page (mobile)
│   │   └── checkout/     ← COD checkout form
│   ├── admin/            ← Admin panel (password protected)
│   │   ├── login/        ← Admin login
│   │   ├── dashboard/    ← Stats + recent orders
│   │   ├── products/     ← Add / edit / delete products
│   │   ├── orders/       ← View + update order status
│   │   └── categories/   ← Manage categories
│   └── api/              ← REST API routes
├── components/
│   ├── store/            ← Customer-facing components
│   └── admin/            ← Admin panel components
├── lib/                  ← Prisma, auth, utils, whatsapp
├── store/                ← Zustand cart store
└── types/                ← TypeScript interfaces
```

---

## 🎨 Design System

| Token | Value | Use |
|---|---|---|
| `--color-black` | `#0A0A0A` | Backgrounds, CTAs |
| `--color-white` | `#FAFAFA` | Text on dark, cards |
| `--color-accent` | `#C8A96E` | Gold accents, prices, hover |
| `--color-whatsapp` | `#25D366` | WhatsApp button only |

**Fonts:** Playfair Display (headings) + Inter (body)  
**Style:** Sharp edges (no border-radius), uppercase tracking

---

## 🛒 How Orders Work

1. Customer browses → adds to cart → fills COD form
2. Order saved to PostgreSQL with status = `PENDING`
3. Admin logs into `/admin` → sees order in dashboard
4. Admin calls customer to confirm → updates status
5. Ships → updates to `SHIPPED` → `DELIVERED`

---

## 💬 WhatsApp Integration

From any product page, customers can order directly via WhatsApp. Pre-filled message sent to `NEXT_PUBLIC_WHATSAPP_NUMBER` with product, size, quantity, and price.

---

## 🔐 Admin Panel

**URL:** `/admin/login`  
**Default credentials** (change in `.env.local`):
- Email: `admin@dastoor.pk`
- Password: `Dastoor@Admin2025`

**Features:**
- Dashboard with order + revenue stats
- Add / edit / delete products with image upload
- View all orders, update status (Pending → Confirmed → Shipped → Delivered)
- Manage categories

---

## 📸 Cloudinary Setup

1. Create free account at cloudinary.com
2. Dashboard → copy Cloud name, API Key, API Secret
3. Create an upload preset: Settings → Upload → Add upload preset → Set to "Unsigned" → Name it `dastoor_products`
4. Add `CLOUDINARY_UPLOAD_PRESET="dastoor_products"` to your `.env.local`

---

## 🌐 Images Used (from your upload)

| File | Use |
|---|---|
| `Logo (1).png` → `logo.png` | Main logo |
| `Logo (2).png` → `logo2.png` | Alternate logo |
| `Hero Banner (1).jpeg` → `hero.jpg` | Homepage hero |
| `Hero Banner (2).jpeg` → `hero2.jpg` | Product card hover |
| `shirts category.jpeg` → `cat-shirts.jpg` | Shirts category |
| `Pants Category.jpeg` → `cat-pants.jpg` | Pants category |
| `Shorts Category.jpeg` → `cat-shorts.jpg` | Shorts category |
| `Belts Category.jpeg` → `cat-belts.jpg` | Belts category |
| `Underwear Category.jpeg` → `cat-underwear.jpg` | Underwear category |
| `Trousers Category.jpeg` → `cat-trousers.jpg` | Trousers variant |
| `Quote Banner.jpeg` → `quote-banner.jpg` | Homepage quote section |

---

*Built for Dastoor — Dressed by Tradition 🇵🇰*
