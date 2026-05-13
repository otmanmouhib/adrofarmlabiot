export type PumpState = "on" | "off";

const baseSensorData = {
  temperature: 22.5,
  humidity: 65,
  soilMoisture: 42,
  waterLevel: 78,
  light: 12300,
};

const pumpStateMap = new Map<number, PumpState>([
  [1, "off"],
  [2, "off"],
]);

function randomize(value: number, variance: number, precision = 1) {
  const change = (Math.random() * 2 - 1) * variance;
  return Number((value + change).toFixed(precision));
}

export function getMockSensorData() {
  return {
    temperature: randomize(baseSensorData.temperature, 1.2),
    humidity: Math.max(10, Math.min(100, randomize(baseSensorData.humidity, 5, 0))),
    soilMoisture: Math.max(0, Math.min(100, randomize(baseSensorData.soilMoisture, 4, 0))),
    waterLevel: Math.max(0, Math.min(100, randomize(baseSensorData.waterLevel, 5, 0))),
    light: Math.max(0, randomize(baseSensorData.light, 800, 0)),
  };
}

export function getCurrentPumpStates() {
  return {
    pump1: pumpStateMap.get(1) ?? "off",
    pump2: pumpStateMap.get(2) ?? "off",
  };
}

export function updatePumpState(pumpId: number, state: PumpState) {
  pumpStateMap.set(pumpId, state);
  return getCurrentPumpStates();
}
