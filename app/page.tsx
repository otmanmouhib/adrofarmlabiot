import Link from "next/link";

const features = [
  {
    title: "Real-time Sensors",
    description: "Temperature, humidity, soil moisture, water level and light intensity data updated every few seconds.",
  },
  {
    title: "Pump Control",
    description: "Enable and disable irrigation relays from the dashboard with clear status feedback.",
  },
  {
    title: "Remote Access",
    description: "Secure admin login so you can manage your farm from any device.",
  },
  {
    title: "Data Logs",
    description: "Track sensor history and grow smarter with reliable metrics.",
  },
];

export default function HomePage() {
  return (
    <section className="relative overflow-hidden py-16 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="rounded-3xl border border-white/10 bg-slate-900/90 p-8 shadow-2xl shadow-black/30 backdrop-blur-sm sm:p-12">
          <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
            <div>
              <span className="inline-flex rounded-full bg-farm-500/10 px-3 py-1 text-sm font-semibold uppercase tracking-[0.24em] text-farm-200">
                Smart Farm Monitoring
              </span>
              <h1 className="mt-6 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
                Adro FarmLab IoT
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
                Smart Farm Monitoring & Control for growers who want simple, modern telemetry and relay control in one responsive dashboard.
              </p>
              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <Link
                  href="/login"
                  className="inline-flex items-center justify-center rounded-2xl bg-farm-500 px-6 py-4 text-base font-semibold text-slate-950 transition hover:bg-farm-400 focus:outline-none focus:ring-2 focus:ring-farm-300"
                >
                  Admin Login
                </Link>
                <a
                  href="#dashboard"
                  className="inline-flex items-center justify-center rounded-2xl border border-slate-700 px-6 py-4 text-base font-semibold text-slate-200 transition hover:bg-slate-800/80"
                >
                  Explore Dashboard
                </a>
              </div>
            </div>
            <div className="rounded-3xl bg-slate-950/80 p-6 shadow-xl shadow-farm-900/20 ring-1 ring-white/10 sm:p-8">
              <div className="space-y-4">
                {features.map((feature) => (
                  <div key={feature.title} className="rounded-3xl border border-white/10 bg-slate-900/70 p-6">
                    <h2 className="text-xl font-semibold text-white">{feature.title}</h2>
                    <p className="mt-3 text-slate-300">{feature.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div id="dashboard" className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-6 shadow-lg shadow-black/20">
            <h3 className="text-lg font-semibold text-white">Mobile-first design</h3>
            <p className="mt-3 text-slate-300">Touch-friendly buttons, responsive grids, and layouts built for farm teams on the move.</p>
          </div>
          <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-6 shadow-lg shadow-black/20">
            <h3 className="text-lg font-semibold text-white">Secure admin access</h3>
            <p className="mt-3 text-slate-300">Credentials-based auth with env-driven admin user and server-side route protection.</p>
          </div>
          <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-6 shadow-lg shadow-black/20">
            <h3 className="text-lg font-semibold text-white">IoT friendly API</h3>
            <p className="mt-3 text-slate-300">Mock sensor and pump control endpoints make it easy to connect real hardware later.</p>
          </div>
          <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-6 shadow-lg shadow-black/20">
            <h3 className="text-lg font-semibold text-white">Vercel-ready</h3>
            <p className="mt-3 text-slate-300">Deploy on Vercel with the same environment variables and live it instantly.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
