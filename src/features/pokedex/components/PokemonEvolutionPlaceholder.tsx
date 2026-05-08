export function PokemonEvolutionPlaceholder() {
  return (
    <div className="col-span-1 lg:col-span-2 bg-surface-card border border-border border-dashed rounded-[var(--radius-card)] p-5 flex flex-col items-center justify-center min-h-[300px] gap-3">
      <div className="w-12 h-12 rounded-full bg-border/50 flex items-center justify-center mb-2">
        <span className="text-2xl opacity-50">?</span>
      </div>
      <h3 className="text-lg font-bold text-on-surface">Evolution Chain</h3>
      <p className="text-sm text-on-surface-muted text-center max-w-xs">
        Evolutions and forms will be added here in future updates.
      </p>
    </div>
  );
}
