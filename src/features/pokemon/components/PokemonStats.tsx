import type { PokemonStatsProps } from "../types";
import { StatBar } from "./StatBar";

export function PokemonStats({ stats, typeColor }: PokemonStatsProps) {
  return (
    <div className="bg-surface-card border border-border rounded-[var(--radius-card)] p-5 flex flex-col gap-4">
      <h2 className="text-xl font-bold text-on-surface mb-2">Base Stats</h2>
      <div className="flex flex-col gap-3">
        {stats.map((stat) => (
          <StatBar
            key={stat.name}
            name={stat.name}
            value={stat.value}
            percentage={stat.percentage}
            color={typeColor}
          />
        ))}
      </div>
    </div>
  );
}
