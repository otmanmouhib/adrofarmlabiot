"use client";

import { useEffect, useMemo, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import SensorCard from "./SensorCard";
import PumpControl from "./PumpControl";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend, Filler);

type SensorData = {
  temperature: number;
  humidity: number;
  soilMoisture: number;
  waterLevel: number;
  light: number;
};

type PumpStates = {
  pump1: "on" | "off";
  pump2: "on" | "off";
};

const initialPumpState: PumpStates = {
  pump1: "off",
  pump2: "off",
};

export default function DashboardClient() {
  const [sensors, setSensors] = useState<SensorData | null>(null);
  const [temperatureHistory, setTemperatureHistory] = useState<number[]>([]);
  const [pumpStates, setPumpStates] = useState<PumpStates>(initialPumpState);
  const [loading, setLoading] = useState(true);
  const [pumpLoading, setPumpLoading] = useState({ 1: false, 2: false });
  const [error, setError] = useState<string | null>(null);

  const sensorCards = useMemo(
    () => [
      {
        label: "Temperature",
        value: sensors ? sensors.temperature.toFixed(1) : "--",
        unit: "°C",
        description: "Air temperature around the sensor.",
      },
      {
        label: "Humidity",
        value: sensors ? sensors.humidity : "--",
        unit: "%",
        description: "Relative humidity level in the environment.",
      },
      {
        label: "Soil Moisture",
        value: sensors ? sensors.soilMoisture : "--",
        unit: "%",
        description: "Estimated soil moisture percentage.",
      },
      {
        label: "Water Tank Level",
        value: sensors ? sensors.waterLevel : "--",
        unit: "%",
        description: "Available water in the supply tank.",
      },
      {
        label: "Light Intensity",
        value: sensors ? sensors.light : "--",
        unit: "lux",
        description: "Ambient light reading from the sensor.",
      },
    ],
    [sensors]
  );

  useEffect(() => {
    let mounted = true;

    const fetchData = async () => {
      setError(null);

      try {
        const [sensorResponse, pumpResponse] = await Promise.all([
          fetch("/api/sensors"),
          fetch("/api/control/pump"),
        ]);

        if (!sensorResponse.ok || !pumpResponse.ok) {
          throw new Error("Failed to load data from the server.");
        }

        const sensorData = (await sensorResponse.json()) as SensorData;
        const pumpData = (await pumpResponse.json()) as PumpStates;

        if (!mounted) return;

        setSensors(sensorData);
        setPumpStates(pumpData);
        setTemperatureHistory((current) => [...current, sensorData.temperature].slice(-10));
        setLoading(false);
      } catch (caught) {
        if (!mounted) return;
        setError("Unable to load sensor or pump data. Please try again soon.");
        setLoading(false);
      }
    };

    fetchData();
    const interval = window.setInterval(fetchData, 5000);
    return () => {
      mounted = false;
      window.clearInterval(interval);
    };
  }, []);

  const handlePumpToggle = async (pumpId: number, nextState: "on" | "off") => {
    setPumpLoading((current) => ({ ...current, [pumpId]: true }));
    setError(null);

    try {
      const response = await fetch("/api/control/pump", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pumpId, state: nextState }),
      });

      if (!response.ok) {
        throw new Error("Pump control request failed.");
      }

      const updated = (await response.json()) as PumpStates;
      setPumpStates(updated);
    } catch (caught) {
      setError("Unable to update pump state. Please try again.");
    } finally {
      setPumpLoading((current) => ({ ...current, [pumpId]: false }));
    }
  };

  const chartData = {
    labels: temperatureHistory.map((_, index) => `T-${temperatureHistory.length - index}`),
    datasets: [
      {
        label: "Temperature (°C)",
        data: temperatureHistory,
        borderColor: "rgba(90, 204, 116, 0.95)",
        backgroundColor: "rgba(90, 204, 116, 0.25)",
        fill: true,
        tension: 0.3,
        pointRadius: 4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          color: "#E2E8F0",
        },
      },
    },
    scales: {
      x: {
        ticks: { color: "#94A3B8" },
        grid: { color: "rgba(148, 163, 184, 0.15)" },
      },
      y: {
        ticks: { color: "#94A3B8" },
        grid: { color: "rgba(148, 163, 184, 0.15)" },
      },
    },
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-[1.7fr_1.3fr]">
        <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-6 shadow-lg shadow-black/20">
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-white">Sensor overview</h2>
              <p className="mt-2 text-slate-400">Live mock values with automatic refresh every 5 seconds.</p>
            </div>
            <div className="rounded-3xl bg-slate-950/80 px-4 py-3 text-sm text-slate-300">
              {loading ? "Loading sensors..." : "Updated automatically"}
            </div>
          </div>
          {error ? <div className="rounded-3xl bg-rose-500/10 p-4 text-sm text-rose-200">{error}</div> : null}
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {sensorCards.map((card) => (
              <SensorCard key={card.label} label={card.label} value={card.value} unit={card.unit} description={card.description} />
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-6 shadow-lg shadow-black/20">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-white">Pump relays</h2>
            <p className="mt-2 text-slate-400">Control individual pump relays from the dashboard.</p>
          </div>
          <div className="space-y-4">
            <PumpControl pumpId={1} state={pumpStates.pump1} loading={pumpLoading[1]} onToggle={handlePumpToggle} />
            <PumpControl pumpId={2} state={pumpStates.pump2} loading={pumpLoading[2]} onToggle={handlePumpToggle} />
          </div>
        </div>
      </div>

      <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-6 shadow-lg shadow-black/20">
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-white">Temperature history</h2>
            <p className="mt-2 text-slate-400">Last 10 readings from the mock sensor feed.</p>
          </div>
          <div className="rounded-3xl bg-slate-950/80 px-4 py-3 text-sm text-slate-300">
            {temperatureHistory.length} readings
          </div>
        </div>
        <div className="rounded-3xl bg-slate-950/80 p-4">
          <Line data={chartData} options={chartOptions} />
        </div>
      </div>
    </div>
  );
}
