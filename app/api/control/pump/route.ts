import { NextResponse } from "next/server";
import { getCurrentPumpStates, updatePumpState } from "../../../../lib/dbMock";

export async function GET() {
  return NextResponse.json(getCurrentPumpStates());
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);

  if (
    !body ||
    typeof body.pumpId !== "number" ||
    ![1, 2].includes(body.pumpId) ||
    !["on", "off"].includes(body.state)
  ) {
    return NextResponse.json(
      { error: "Invalid request body. Expect { pumpId: 1|2, state: 'on'|'off' }." },
      { status: 400 }
    );
  }

  const updated = updatePumpState(body.pumpId, body.state);
  return NextResponse.json(updated);
}
