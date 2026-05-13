import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../lib/auth";
import dynamic from "next/dynamic";

const DashboardClient = dynamic(() => import("../../components/DashboardClient"), {
  ssr: false,
});

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login");
  }

  return (
    <section className="py-10 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 rounded-3xl border border-white/10 bg-slate-900/90 p-8 shadow-2xl shadow-black/30 backdrop-blur-sm">
          <div className="space-y-3 text-center">
            <p className="text-sm uppercase tracking-[0.28em] text-farm-300">Admin Dashboard</p>
            <h1 className="text-4xl font-semibold text-white sm:text-5xl">Monitor sensors and control pumps</h1>
            <p className="mx-auto max-w-2xl text-base leading-7 text-slate-300">
              This protected dashboard shows live mock telemetry and relay controls that are ready to point at a real IoT backend.
            </p>
          </div>
        </div>
        <DashboardClient />
      </div>
    </section>
  );
}
