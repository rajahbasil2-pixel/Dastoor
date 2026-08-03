"use client";
import { Minus, Plus } from "lucide-react";

interface QuantitySelectorProps {
  value: number;
  onChange: (val: number) => void;
  min?: number;
  max?: number;
}

export default function QuantitySelector({ value, onChange, min = 1, max = 10 }: QuantitySelectorProps) {
  return (
    <div className="flex items-center border border-[#D4D4D4] w-fit">
      <button
        type="button"
        onClick={() => onChange(Math.max(min, value - 1))}
        className="w-10 h-10 flex items-center justify-center hover:bg-[#F5F5F5] transition-colors"
        aria-label="Decrease quantity"
      >
        <Minus size={12} />
      </button>
      <span className="w-12 text-center text-sm font-medium select-none">{value}</span>
      <button
        type="button"
        onClick={() => onChange(Math.min(max, value + 1))}
        className="w-10 h-10 flex items-center justify-center hover:bg-[#F5F5F5] transition-colors"
        aria-label="Increase quantity"
      >
        <Plus size={12} />
      </button>
    </div>
  );
}