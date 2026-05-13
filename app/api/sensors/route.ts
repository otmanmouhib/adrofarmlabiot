import { NextResponse } from "next/server";
import { getMockSensorData } from "../../../lib/dbMock";

export async function GET() {
  const data = getMockSensorData();
  return NextResponse.json(data);
}
