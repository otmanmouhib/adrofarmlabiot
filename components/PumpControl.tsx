interface PumpControlProps {
  pumpId: number;
  state: "on" | "off";
  loading: boolean;
  onToggle: (pumpId: number, nextState: "on" | "off") => void;
}

export default function PumpControl({ pumpId, state, loading, onToggle }: PumpControlProps) {
  const nextState = state === "on" ? "off" : "on";

  return (
    <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-6 shadow-lg shadow-black/20">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.24em] text-farm-300">Pump {pumpId}</p>
          <p className="mt-4 text-3xl font-semibold text-white">{state.toUpperCase()}</p>
        </div>
        <div className={`inline-flex items-center rounded-full px-3 py-2 text-sm font-semibold ${state === "on" ? "bg-emerald-500/20 text-emerald-200" : "bg-rose-500/10 text-rose-200"}`}>
          {state === "on" ? "Active" : "Offline"}
        </div>
      </div>
      <button
        type="button"
        onClick={() => onToggle(pumpId, nextState)}
        disabled={loading}
        className="mt-6 inline-flex w-full items-center justify-center rounded-2xl bg-farm-500 px-4 py-3 font-semibold text-slate-950 transition hover:bg-farm-400 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? "Updating..." : `${nextState === "on" ? "Turn On" : "Turn Off"}`}
      </button>
    </div>
  );
}
