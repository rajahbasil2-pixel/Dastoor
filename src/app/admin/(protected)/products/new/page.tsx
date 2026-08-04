"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

const SIZE_OPTIONS = ["XS", "S", "M", "L", "XL", "XXL", "XXXL", "28", "30", "32", "34", "36", "38", "40", "Free Size"];

export default function NewProductPage() {
  const router = useRouter();
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [images, setImages] = useState<string[]>([]);
  const imagesRef = useRef<string[]>([]);
  const [uploadError, setUploadError] = useState("");
  const [form, setForm] = useState({
    name: "", description: "", price: "", salePrice: "",
    categoryId: "", sizes: [] as string[],
    featured: false, inStock: true,
  });

  useEffect(() => {
    imagesRef.current = images;
  }, [images]);

  useEffect(() => {
    fetch("/api/categories").then(r => r.json()).then(setCategories);
  }, []);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    const target = e.target as HTMLInputElement;
    setForm({ ...form, [target.name]: target.type === "checkbox" ? target.checked : target.value });
  }

  function toggleSize(size: string) {
    setForm({ ...form, sizes: form.sizes.includes(size) ? form.sizes.filter(s => s !== size) : [...form.sizes, size] });
  }

  function removeImage(index: number) {
    const updated = imagesRef.current.filter((_, j) => j !== index);
    imagesRef.current = updated;
    setImages([...updated]);
  }

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (!files) return;
    setUploading(true);
    setUploadError("");
    for (const file of Array.from(files)) {
      const reader = new FileReader();
      await new Promise<void>((resolve) => {
        reader.onloadend = async () => {
          const base64 = reader.result as string;
          try {
            const res = await fetch("/api/upload", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ image: base64 }),
            });
            const data = await res.json();
            if (data.url) {
              imagesRef.current = [...imagesRef.current, data.url];
              setImages([...imagesRef.current]);
            } else {
              setUploadError("Upload failed: " + (data.error || "Unknown error"));
            }
          } catch {
            setUploadError("Upload failed. Check Cloudinary settings.");
          }
          resolve();
        };
        reader.readAsDataURL(file);
      });
    }
    setUploading(false);
  }

  async function handleSubmit() {
    if (!form.name || !form.categoryId || !form.price) {
      alert("Please fill in Name, Category and Price");
      return;
    }
    setLoading(true);
    const currentImages = imagesRef.current;
    const res = await fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, images: currentImages }),
    });
    if (res.ok) {
      router.push("/admin/products");
      router.refresh();
    } else {
      const data = await res.json();
      alert("Error: " + data.error);
    }
    setLoading(false);
  }

  return (
    <div className="max-w-2xl space-y-6">
      <div className="flex items-center gap-4">
        <button onClick={() => router.back()} className="text-xs uppercase tracking-widest text-[#737373] hover:text-[#0A0A0A]">← Back</button>
        <h1 className="text-2xl font-bold">Add Product</h1>
      </div>

      <div className="bg-white border border-[#D4D4D4] p-6 space-y-5">
        <div>
          <label className="block text-xs uppercase tracking-widest text-[#737373] mb-2">Product Name *</label>
          <input name="name" value={form.name} onChange={handleChange} placeholder="Classic Oxford Shirt" className="w-full border border-[#D4D4D4] px-4 py-3 text-sm outline-none focus:border-[#0A0A0A]" />
        </div>
        <div>
          <label className="block text-xs uppercase tracking-widest text-[#737373] mb-2">Description</label>
          <textarea name="description" value={form.description} onChange={handleChange} rows={3} placeholder="Product description..." className="w-full border border-[#D4D4D4] px-4 py-3 text-sm outline-none focus:border-[#0A0A0A] resize-none" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs uppercase tracking-widest text-[#737373] mb-2">Price (Rs.) *</label>
            <input name="price" value={form.price} onChange={handleChange} type="number" placeholder="1500" className="w-full border border-[#D4D4D4] px-4 py-3 text-sm outline-none focus:border-[#0A0A0A]" />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-widest text-[#737373] mb-2">Sale Price (Rs.)</label>
            <input name="salePrice" value={form.salePrice} onChange={handleChange} type="number" placeholder="Optional" className="w-full border border-[#D4D4D4] px-4 py-3 text-sm outline-none focus:border-[#0A0A0A]" />
          </div>
        </div>
        <div>
          <label className="block text-xs uppercase tracking-widest text-[#737373] mb-2">Category *</label>
          <select name="categoryId" value={form.categoryId} onChange={handleChange} className="w-full border border-[#D4D4D4] px-4 py-3 text-sm outline-none focus:border-[#0A0A0A] bg-white">
            <option value="">Select category</option>
            {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-xs uppercase tracking-widest text-[#737373] mb-3">Sizes</label>
          <div className="flex flex-wrap gap-2">
            {SIZE_OPTIONS.map(s => (
              <button key={s} type="button" onClick={() => toggleSize(s)}
                className={`min-w-[40px] h-9 px-3 text-xs border transition-all ${form.sizes.includes(s) ? "bg-[#0A0A0A] text-[#FAFAFA] border-[#0A0A0A]" : "border-[#D4D4D4] hover:border-[#0A0A0A]"}`}>
                {s}
              </button>
            ))}
          </div>
        </div>
        <div>
          <label className="block text-xs uppercase tracking-widest text-[#737373] mb-2">
            Product Images {uploading && <span className="text-[#C8A96E] ml-2">Uploading...</span>}
          </label>
          <input type="file" accept="image/*" multiple onChange={handleImageUpload} disabled={uploading} className="text-xs text-[#737373]" />
          {uploadError && <p className="text-xs text-[#EF4444] mt-2">{uploadError}</p>}
          {images.length > 0 && (
            <div className="flex gap-2 mt-3 flex-wrap">
              {images.map((img, i) => (
                <div key={i} className="relative w-20 h-24 bg-[#F5F5F5] group">
                  <img src={img} alt={`Image ${i + 1}`} className="w-full h-full object-cover" />
                  <button onClick={() => removeImage(i)}
                    className="absolute top-1 right-1 bg-[#EF4444] text-white text-xs w-5 h-5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}
          <p className="text-xs text-[#737373] mt-2">{images.length} image(s) uploaded</p>
        </div>
        <div className="flex items-center gap-6">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" name="featured" checked={form.featured} onChange={handleChange} className="w-4 h-4" />
            <span className="text-xs uppercase tracking-widest text-[#737373]">Featured</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" name="inStock" checked={form.inStock} onChange={handleChange} className="w-4 h-4" />
            <span className="text-xs uppercase tracking-widest text-[#737373]">In Stock</span>
          </label>
        </div>
        <button onClick={handleSubmit} disabled={loading || uploading}
          className="w-full bg-[#0A0A0A] text-[#FAFAFA] py-4 text-xs uppercase tracking-widest hover:bg-[#404040] transition-colors disabled:opacity-50">
          {loading ? "Saving..." : uploading ? "Wait for upload to finish..." : "Add Product"}
        </button>
      </div>
    </div>
  );
}