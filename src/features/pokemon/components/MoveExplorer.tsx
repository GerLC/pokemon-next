"use client";

import { useState } from "react";
import { useMoveDetail } from "../hooks/use-move";
import type { MoveExplorerProps } from "../types";
import { MoveDetailCard } from "./MoveDetailCard";
import { PokemonAbilities } from "./PokemonAbilities";
import { PokemonMoveList } from "./PokemonMoveList";

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
        <PokemonAbilities abilities={abilities} />
        <PokemonMoveList
          moves={moves}
          filteredMoves={filteredMoves}
          selectedMove={selectedMove}
          onSelectMove={setSelectedMove}
          search={search}
          onSearchChange={setSearch}
        />
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
