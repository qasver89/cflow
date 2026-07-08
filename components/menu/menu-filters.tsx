"use client";

import { Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { Category } from "@/lib/types";

export function MenuSearch({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="relative w-full max-w-sm">
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-espresso/40" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search the menu..."
        className="w-full rounded-full border border-espresso/15 bg-paper pl-11 pr-4 py-3 text-sm focus-visible:border-brass"
      />
    </div>
  );
}

export function CategoryFilter({
  categories,
  active,
  onChange,
}: {
  categories: Category[];
  active: Category | "All";
  onChange: (c: Category | "All") => void;
}) {
  const all: (Category | "All")[] = ["All", ...categories];
  return (
    <div className="flex flex-wrap gap-2">
      {all.map((c) => (
        <button
          key={c}
          onClick={() => onChange(c)}
          className={cn(
            "rounded-full px-5 py-2.5 text-sm font-medium transition-colors border",
            active === c
              ? "bg-evergreen text-paper border-evergreen"
              : "bg-transparent text-espresso/70 border-espresso/15 hover:border-espresso/40"
          )}
        >
          {c}
        </button>
      ))}
    </div>
  );
}
