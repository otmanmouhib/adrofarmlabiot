interface SensorCardProps {
  label: string;
  value: string | number;
  unit: string;
  description: string;
}

export default function SensorCard({ label, value, unit, description }: SensorCardProps) {
  return (
    <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-6 shadow-lg shadow-black/20">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.24em] text-farm-300">{label}</p>
          <p className="mt-4 text-4xl font-semibold text-white">{value}<span className="text-xl text-slate-400">{unit}</span></p>
        </div>
      </div>
      <p className="mt-4 text-sm leading-6 text-slate-400">{description}</p>
    </div>
  );
}
