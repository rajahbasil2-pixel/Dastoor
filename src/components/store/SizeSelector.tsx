"use client";

interface Size {
  id: string;
  size: string;
  inStock: boolean;
}

interface SizeSelectorProps {
  sizes: Size[];
  selected: string | null;
  onChange: (size: string) => void;
}

export default function SizeSelector({ sizes, selected, onChange }: SizeSelectorProps) {
  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <p className="text-xs uppercase tracking-widest text-[#737373]">Size</p>
      </div>
      <div className="flex flex-wrap gap-2">
        {sizes.map((s) => (
          <button
            key={s.id}
            onClick={() => s.inStock && onChange(s.size)}
            disabled={!s.inStock}
            className={`min-w-[44px] h-10 px-3 text-xs uppercase tracking-widest border transition-all duration-150 ${
              selected === s.size
                ? "bg-[#0A0A0A] text-[#FAFAFA] border-[#0A0A0A]"
                : s.inStock
                ? "bg-transparent text-[#0A0A0A] border-[#D4D4D4] hover:border-[#0A0A0A]"
                : "bg-transparent text-[#D4D4D4] border-[#F5F5F5] cursor-not-allowed line-through"
            }`}
          >
            {s.size}
          </button>
        ))}
      </div>
    </div>
  );
}
