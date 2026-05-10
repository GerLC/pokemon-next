"use client";

import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import type { PokemonMovesProps } from "../types";

export function PokemonMoves({ moves }: PokemonMovesProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const displayMoves = isExpanded ? moves : moves.slice(0, 12);

  if (moves.length === 0) return null;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold uppercase tracking-widest text-on-surface-muted">
          Moves ({moves.length})
        </h3>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
        {displayMoves.map((move) => (
          <div
            key={move}
            className="px-3 py-2 rounded-lg bg-surface/50 border border-border text-center group hover:bg-surface-card transition-colors"
          >
            <span className="text-[11px] font-medium capitalize text-on-surface-subtle group-hover:text-on-surface">
              {move}
            </span>
          </div>
        ))}
      </div>

      {moves.length > 12 && (
        <button
          type="button"
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center justify-center gap-2 py-3 rounded-xl bg-surface-card border border-border hover:bg-surface transition-all text-xs font-bold uppercase tracking-widest text-on-surface-muted hover:text-primary"
        >
          {isExpanded ? (
            <>
              <ChevronUp className="w-4 h-4" />
              Show Less
            </>
          ) : (
            <>
              <ChevronDown className="w-4 h-4" />
              Show All Moves
            </>
          )}
        </button>
      )}
    </div>
  );
}
