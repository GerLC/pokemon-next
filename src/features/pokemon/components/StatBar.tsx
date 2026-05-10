import type { StatBarProps } from "../types";

export function StatBar({ name, value, percentage, color }: StatBarProps) {
  return (
    <div className="flex items-center gap-4">
      <span className="w-24 text-xs font-bold uppercase text-on-surface-muted">
        {name}
      </span>
      <div className="flex-1 h-2 bg-border rounded-full overflow-hidden">
        <div
          className="h-full transition-all duration-500"
          style={{ width: `${percentage}%`, backgroundColor: color }}
        />
      </div>
      <span className="w-8 text-sm font-bold text-on-surface">{value}</span>
    </div>
  );
}
