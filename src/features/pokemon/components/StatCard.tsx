"use client";

import type { StatCardProps } from "../types";

export function StatCard({ icon, label, value, unit, color }: StatCardProps) {
  return (
    <div className="bg-surface-card border border-border rounded-[var(--radius-card)] p-5 flex flex-col gap-2">
      <div className="flex items-center gap-2 text-xs font-semibold text-on-surface-muted uppercase tracking-wider">
        {icon}
        <span>{label}</span>
      </div>
      <p className="text-3xl font-bold text-on-surface">
        {value}
        <span className="text-base ml-1 font-medium" style={{ color }}>
          {unit}
        </span>
      </p>
    </div>
  );
}
