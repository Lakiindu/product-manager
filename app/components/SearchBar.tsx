"use client";
import { Search } from "lucide-react";

export default function SearchBar({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <div className="relative">
      <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
      <input type="text" placeholder="Search products..." value={value} onChange={(e) => onChange(e.target.value)} className="pl-10 p-2 border rounded w-full dark:bg-gray-800" />
    </div>
  );
}