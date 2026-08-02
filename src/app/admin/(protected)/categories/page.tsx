"use client";
import { useState, useEffect } from "react";

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<any[]>([]);
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch("/api/categories").then(r => r.json()).then(setCategories);
  }, []);

  async function handleAdd() {
    if (!name || !slug) return;
    setLoading(true);
    const res = await fetch("/api/categories", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, slug, sortOrder: categories.length + 1 }),
    });
    const cat = await res.json();
    setCategories([...categories, cat]);
    setName(""); setSlug("");
    setLoading(false);
  }

  return (
    <div className="max-w-lg space-y-6">
      <h1 className="text-2xl font-bold">Categories</h1>

      <div className="bg-white border border-[#D4D4D4] p-6 space-y-4">
        <p className="text-xs uppercase tracking-widest text-[#737373]">Add Category</p>
        <div>
          <label className="block text-xs uppercase tracking-widest text-[#737373] mb-2">Name</label>
          <input value={name} onChange={(e) => { setName(e.target.value); setSlug(e.target.value.toLowerCase().replace(/\s+/g, "-")); }}
            placeholder="Shirts" className="w-full border border-[#D4D4D4] px-4 py-3 text-sm outline-none focus:border-[#0A0A0A]" />
        </div>
        <div>
          <label className="block text-xs uppercase tracking-widest text-[#737373] mb-2">Slug</label>
          <input value={slug} onChange={(e) => setSlug(e.target.value)}
            placeholder="shirts" className="w-full border border-[#D4D4D4] px-4 py-3 text-sm outline-none focus:border-[#0A0A0A]" />
        </div>
        <button onClick={handleAdd} disabled={loading}
          className="w-full bg-[#0A0A0A] text-[#FAFAFA] py-3 text-xs uppercase tracking-widest hover:bg-[#404040] transition-colors disabled:opacity-50">
          {loading ? "Adding..." : "Add Category"}
        </button>
      </div>

      <div className="bg-white border border-[#D4D4D4] divide-y divide-[#F5F5F5]">
        {categories.map((c) => (
          <div key={c.id} className="flex items-center justify-between px-5 py-4">
            <div>
              <p className="text-sm font-medium">{c.name}</p>
              <p className="text-xs text-[#737373]">/{c.slug}</p>
            </div>
          </div>
        ))}
        {categories.length === 0 && <div className="text-center py-8 text-xs text-[#737373]">No categories yet.</div>}
      </div>
    </div>
  );
}
