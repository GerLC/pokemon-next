import type { PokemonAbilitiesProps } from "../types";

export function PokemonAbilities({
  abilities,
  typeColor,
}: PokemonAbilitiesProps) {
  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-sm font-bold uppercase tracking-widest text-on-surface-muted">
        Abilities
      </h3>
      <div className="flex flex-wrap gap-2">
        {abilities.map((ability) => (
          <div
            key={ability.name}
            className="group relative flex items-center gap-2 px-4 py-2 rounded-xl bg-surface-card border border-border hover:border-primary/30 transition-all cursor-default"
          >
            <div
              className="w-1.5 h-1.5 rounded-full"
              style={{
                backgroundColor: ability.isHidden ? "transparent" : typeColor,
              }}
            />
            <span className="text-xs font-bold capitalize text-on-surface">
              {ability.name}
            </span>
            {ability.isHidden && (
              <span className="text-[9px] uppercase tracking-tighter font-black text-on-surface-subtle border border-border px-1.5 rounded-md">
                Hidden
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
