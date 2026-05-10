"use client";

import { Search } from "lucide-react";
import { useState } from "react";
import { formatLabel } from "@/lib/utils";
import { useMoveDetail } from "../hooks/use-move";
import type { MoveExplorerProps } from "../types";
import { MoveDetailCard } from "./MoveDetailCard";

export function MoveExplorer({
  moves,
  abilities,
  typeColor,
}: MoveExplorerProps) {
  const [search, setSearch] = useState("");

  const filteredMoves = moves.filter((move) =>
    move.name.toLowerCase().includes(search.toLowerCase()),
  );

  const [selectedMove, setSelectedMove] = useState<string | null>(
    moves[0]?.name ?? null,
  );
  const { data: moveData, isLoading } = useMoveDetail(selectedMove);

  const selectedMoveMetadata = moves.find((m) => m.name === selectedMove);

  return (
    <div className="flex flex-col lg:flex-row gap-16 min-h-[600px]">
      <div className="w-full lg:w-96 flex flex-col gap-10">
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
                <span className="text-sm font-bold capitalize">
                  {ability.name}
                </span>
                {ability.isHidden && (
                  <span className="text-[8px] uppercase font-black tracking-widest text-on-surface-muted opacity-50">
                    Hidden
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

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
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-white/5 border border-white/5 rounded-xl py-2 pl-10 pr-4 text-xs font-medium focus:outline-none focus:border-primary/40 transition-all placeholder:opacity-30"
            />
          </div>

          <div className="h-[550px] overflow-y-auto custom-scrollbar pr-2 space-y-1.5">
            {filteredMoves.map((move) => (
              <button
                key={move.name}
                type="button"
                onClick={() => setSelectedMove(move.name)}
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
      </div>

      <div className="flex-1">
        <div className="lg:sticky lg:top-12">
          <MoveDetailCard
            move={moveData}
            isLoading={isLoading}
            typeColor={typeColor}
            level={selectedMoveMetadata?.level}
            method={selectedMoveMetadata?.method}
          />
        </div>
      </div>
    </div>
  );
}
