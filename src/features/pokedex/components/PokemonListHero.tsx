export function PokemonListHero() {
  return (
    <div className="relative border-b border-border bg-surface-card/50 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 pt-16 pb-12 relative z-10">
        <div className="flex flex-col gap-4 max-w-lg">
          <div className="flex items-center gap-3">
            <span className="text-2xl">📖</span>
            <span className="text-xs font-bold tracking-widest uppercase text-primary">
              Pokédex
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-on-surface leading-tight">
            Discover Every <span className="text-primary">Pokémon</span>
          </h1>

          <p className="text-sm text-on-surface-muted leading-relaxed max-w-md">
            Browse through all the Pokémon you know and love! Click on any buddy
            to learn more about them.
          </p>
        </div>
      </div>
    </div>
  );
}
