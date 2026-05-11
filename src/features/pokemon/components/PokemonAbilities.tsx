import { PokemonAbilitiesProps } from "../types/component.types";

export function PokemonAbilities({ abilities }: PokemonAbilitiesProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-on-surface-muted px-1">
        Abilities
      </h3>
      <div className="grid grid-cols-1 gap-2">
        {abilities.map((ability) => (
          <div
            key={ability.name}
            className="group px-4 py-3 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between transition-colors hover:bg-white/10"
          >
            <span className="text-sm font-bold capitalize">{ability.name}</span>
            {ability.isHidden && (
              <span className="text-[8px] uppercase font-black tracking-widest text-on-surface-muted opacity-50">
                Hidden
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
