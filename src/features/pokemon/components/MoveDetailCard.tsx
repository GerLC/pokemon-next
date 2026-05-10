import { Activity, Shield, Sparkles, Swords, Target, Zap } from "lucide-react";
import type { MoveDetailCardProps } from "../types";

export function MoveDetailCard({
  move,
  isLoading,
  typeColor,
}: MoveDetailCardProps) {
  const isSpecial = move?.damageClass === "special";
  const isStatus = move?.damageClass === "status";

  return (
    <div
      className={`relative transition-all duration-300 ${isLoading ? "opacity-50" : "opacity-100"}`}
    >
      <div
        className="absolute -left-20 top-0 w-64 h-64 opacity-[0.08] blur-[100px] pointer-events-none"
        style={{ backgroundColor: typeColor }}
      />

      {!move && !isLoading ? (
        <div className="flex flex-col items-center justify-center p-12 text-on-surface-muted/30">
          <Zap className="w-10 h-10 mb-4" />
          <p className="text-sm font-bold uppercase tracking-widest">
            Select a move
          </p>
        </div>
      ) : (
        <div className="space-y-10">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-5xl font-black capitalize tracking-tight text-on-surface">
                {move?.name || "..."}
              </h2>
              <span className="text-4xl font-mono font-bold opacity-5 italic">
                #{String(move?.id ?? 0).padStart(3, "0")}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <span
                className="px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest text-white"
                style={{ backgroundColor: typeColor }}
              >
                {move?.type || "..."}
              </span>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 text-[9px] font-bold uppercase tracking-widest text-on-surface-muted">
                {isSpecial ? (
                  <Target className="w-3 h-3" />
                ) : isStatus ? (
                  <Activity className="w-3 h-3" />
                ) : (
                  <Swords className="w-3 h-3" />
                )}
                {move?.damageClass || "..."}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-12">
            <ProgressBar
              label="Power"
              value={move?.power ?? "-"}
              color={typeColor}
              icon={<Zap className="w-3.5 h-3.5" />}
            />
            <ProgressBar
              label="Accuracy"
              value={move?.accuracy ?? "-"}
              color="#10b981"
              icon={<Shield className="w-3.5 h-3.5" />}
            />
          </div>

          <div className="grid grid-cols-2 gap-8">
            <StatBox
              label="Usage (PP)"
              value={move?.pp ?? "-"}
              icon={<Sparkles className="w-5 h-5" />}
            />
            <StatBox
              label="Priority"
              value={
                move?.priority === 0
                  ? "Normal"
                  : move?.priority && move.priority > 0
                    ? `+${move.priority}`
                    : move?.priority || "-"
              }
              icon={<Activity className="w-5 h-5" />}
            />
          </div>

          <div className="pt-10 border-t border-white/5 space-y-4">
            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-muted">
              How it works
            </h4>
            <p className="text-2xl text-on-surface/90 leading-relaxed font-medium italic">
              "{move?.description || "Scanning move data..."}"
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

function StatBox({
  label,
  value,
  icon,
}: {
  label: string;
  value: string | number;
  icon: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between group">
      <div className="space-y-1">
        <span className="block text-[10px] uppercase font-black tracking-[0.2em] text-on-surface-muted">
          {label}
        </span>
        <span className="text-2xl font-black">{value}</span>
      </div>
      <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-on-surface-muted opacity-40 group-hover:opacity-100 transition-opacity">
        {icon}
      </div>
    </div>
  );
}

function ProgressBar({
  label,
  value,
  color,
  icon,
}: {
  label: string;
  value: string | number;
  color: string;
  icon: React.ReactNode;
}) {
  const numericValue = typeof value === "number" ? value : 0;
  const percentage = Math.min((numericValue / 150) * 100, 100);

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-on-surface-muted">
          {icon}
          <span className="text-[10px] uppercase font-black tracking-widest">
            {label}
          </span>
        </div>
        <span className="text-sm font-bold">
          {value === "-" ? "N/A" : `${value}/150`}
        </span>
      </div>
      <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-1000 ease-out shadow-[0_0_15px_rgba(0,0,0,0.5)]"
          style={{
            width: value === "-" ? "0%" : `${percentage}%`,
            backgroundColor: color,
            boxShadow: `0 0 10px ${color}60`,
          }}
        />
      </div>
    </div>
  );
}
