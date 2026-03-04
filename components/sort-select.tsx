"use client";

import { useRouter, useSearchParams } from "next/navigation";

interface SortOption {
  value: string;
  label: string;
}

interface SortSelectProps {
  options: SortOption[];
  defaultValue: string;
  paramName?: string;
  label?: string;
}

export function SortSelect({
  options,
  defaultValue,
  paramName = "sort",
  label = "Sort by",
}: SortSelectProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const current = searchParams.get(paramName) ?? defaultValue;

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const params = new URLSearchParams(searchParams.toString());
    const value = e.target.value;
    if (value === defaultValue) {
      params.delete(paramName);
    } else {
      params.set(paramName, value);
    }
    router.push(`?${params.toString()}`);
  }

  return (
    <div className="flex items-center gap-2">
      <label htmlFor="sort-select" className="text-sm text-muted">
        {label}
      </label>
      <select
        id="sort-select"
        value={current}
        onChange={handleChange}
        className="rounded border border-border bg-panel px-3 py-1.5 text-sm text-text focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}
