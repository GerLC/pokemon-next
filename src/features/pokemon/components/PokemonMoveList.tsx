import { Search } from "lucide-react";
import { formatLabel } from "@/lib/utils";
import { PokemonMoveListProps } from "../types/component.types";

export function PokemonMoveList({
  onSelectMove,
  selectedMove,
  search,
  onSearchChange,
  filteredMoves,
}: PokemonMoveListProps) {
  return (
    <div className="flex-1 flex flex-col min-h-0 space-y-4">
      <div className="flex items-center justify-between px-1">
        <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-on-surface-muted">
          Move Set
        </h3>
        <span className="text-[10px] font-bold text-on-surface-muted opacity-30">
          {filteredMoves.length}
        </span>
      </div>

      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-on-surface-muted opacity-30" />
        <input
          type="text"
          placeholder="Search moves..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full bg-white/5 border border-white/5 rounded-xl py-2 pl-10 pr-4 text-xs font-medium focus:outline-none focus:border-primary/40 transition-all placeholder:opacity-30"
        />
      </div>

      <div className="h-[550px] overflow-y-auto custom-scrollbar pr-2 space-y-1.5">
        {filteredMoves.map((move) => (
          <button
            key={move.name}
            type="button"
            onClick={() => onSelectMove(move.name)}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all border-2 capitalize text-sm font-bold ${
              selectedMove === move.name
                ? "border-primary bg-primary/5 text-on-surface shadow-lg shadow-primary/5"
                : "border-transparent text-on-surface-muted hover:bg-white/5 hover:border-white/5"
            }`}
          >
            <span className="capitalize">{move.name}</span>
            <div
              className={`px-2 py-1 rounded-lg text-[10px] font-black uppercase tracking-tighter transition-colors ${
                selectedMove === move.name
                  ? "bg-primary text-white"
                  : "bg-white/5 text-on-surface-muted opacity-50"
              }`}
            >
              {move.method === "level-up"
                ? `Lv.${move.level}`
                : formatLabel(move.method)}
            </div>
          </button>
        ))}
        {filteredMoves.length === 0 && (
          <div className="text-center py-10 opacity-20 italic text-xs text-on-surface">
            No moves found
          </div>
        )}
      </div>
    </div>
  );
}
