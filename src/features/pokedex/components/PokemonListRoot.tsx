"use client";

import { Search } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState, useTransition } from "react";
import { useInView } from "react-intersection-observer";
import { usePokedex } from "@/features/pokedex/hooks/use-pokedex";
import { useDebounce } from "@/lib/hooks/use-debounce";
import { PokemonCard } from "./PokemonCard";

export function PokemonListRoot() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const currentSearchTerm = searchParams.get("query") ?? "";
  const [inputValue, setInputValue] = useState(currentSearchTerm);

  const {
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    allLoaded,
    filtered,
    totalCount,
    isSearching,
    isSearchingGlobal,
  } = usePokedex(currentSearchTerm);

  const { ref } = useInView({
    onChange: (inView) => {
      if (inView && hasNextPage && !isFetchingNextPage && !isSearching) {
        fetchNextPage();
      }
    },
  });

  const debouncedUpdate = useDebounce((term: string) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }
    startTransition(() => {
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    });
  }, 400);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    debouncedUpdate(value);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-6 py-10">
      <div className="relative mb-12 max-w-xl mx-auto">
        <div className="relative flex items-center">
          <Search className="absolute left-5 w-5 h-5 text-on-surface-subtle" />
          <input
            type="text"
            placeholder="Search Pokémon..."
            value={inputValue}
            onChange={handleSearchChange}
            className="w-full bg-surface-card border border-border rounded-[var(--radius-button)] py-4 pl-14 pr-6 text-on-surface placeholder:text-on-surface-subtle focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/10 transition-all text-sm"
          />
          {(isPending || (isSearching && isSearchingGlobal)) && (
            <div className="absolute right-5">
              <div className="w-4 h-4 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
            </div>
          )}
        </div>
        <div className="mt-3 flex justify-between px-1 items-center">
          {isSearchingGlobal ? (
            <span className="text-[10px] uppercase tracking-widest font-bold text-primary animate-pulse">
              Searching global database...
            </span>
          ) : (
            <div />
          )}
          <span className="text-xs text-on-surface-subtle font-medium">
            {isSearching ? (
              <>{filtered.length} matches found</>
            ) : (
              <>
                {allLoaded.length} of {totalCount} Pokémon
              </>
            )}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filtered.map((pokemon) => (
          <PokemonCard
            key={pokemon.name}
            name={pokemon.name}
            id={pokemon.id}
            imageUrl={pokemon.imageUrl}
          />
        ))}
      </div>

      {hasNextPage && !isSearching && (
        <div
          ref={ref}
          className="flex flex-col items-center justify-center mt-16 gap-3"
        >
          {isFetchingNextPage ? (
            <LoadingBounce />
          ) : (
            <div className="w-px h-10 bg-gradient-to-b from-transparent via-border to-transparent" />
          )}
        </div>
      )}
    </div>
  );
}

function LoadingBounce() {
  return (
    <div className="flex items-center gap-3">
      <div className="flex gap-1.5">
        {["b1", "b2", "b3"].map((id, i) => (
          <div
            key={id}
            className="w-2.5 h-2.5 rounded-full bg-primary"
            style={{
              animation: `bounce 0.6s ease-in-out ${i * 0.15}s infinite`,
            }}
          />
        ))}
      </div>
      <span className="text-xs text-on-surface-subtle">
        Finding more Pokémon...
      </span>
    </div>
  );
}
