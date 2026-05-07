export function DetailSkeleton() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-8">
      <div className="h-5 w-32 bg-border rounded mb-10 animate-pulse" />
      <div className="grid lg:grid-cols-12 gap-10">
        <div className="lg:col-span-5">
          <div className="aspect-square bg-surface-card border border-border rounded-[2rem] animate-pulse" />
        </div>
        <div className="lg:col-span-7 flex flex-col gap-6">
          <div className="flex gap-2">
            <div className="h-6 w-16 bg-border rounded-full animate-pulse" />
            <div className="h-6 w-16 bg-border rounded-full animate-pulse" />
          </div>
          <div className="h-14 w-64 bg-border rounded animate-pulse" />
          <div className="grid grid-cols-2 gap-4">
            <div className="h-24 bg-surface-card border border-border rounded-[var(--radius-card)] animate-pulse" />
            <div className="h-24 bg-surface-card border border-border rounded-[var(--radius-card)] animate-pulse" />
          </div>
          <div className="h-24 bg-surface-card border border-border rounded-[var(--radius-card)] animate-pulse" />
          <div className="h-14 bg-border rounded-[var(--radius-button)] animate-pulse" />
        </div>
      </div>
    </div>
  );
}
