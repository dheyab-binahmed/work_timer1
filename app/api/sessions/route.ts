// app/api/sessions/route.ts
import { NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { checkUser } from "@/lib/CheckUser";

function toUtcMidnight(dateStr: string) {
  // Convert YYYY-MM-DD string to midnight UTC
  const d = new Date(`${dateStr}T00:00:00`);
  return new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
}

export async function GET() {
  const user = await currentUser();
  if (!user)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const appUser = await checkUser();
  if (!appUser)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const sessions = await db.workSession.findMany({
    where: { userId: appUser.id },
    orderBy: { sessionDate: "desc" },
  });

  return NextResponse.json(sessions);
}

export async function POST(req: Request) {
  try {
    const user = await currentUser();
    if (!user)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const appUser = await checkUser();
    if (!appUser)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { date, hours } = await req.json();

    if (!date || hours === undefined || hours === null) {
      return NextResponse.json(
        { error: "Missing fields (date, hours)" },
        { status: 400 }
      );
    }
    if (typeof hours !== "number" || isNaN(hours) || hours <= 0) {
      return NextResponse.json(
        { error: "Hours must be a positive number" },
        { status: 400 }
      );
    }

    const sessionDate = toUtcMidnight(date);
    const durationMinutes = Math.round(hours * 60);

    const saved = await db.workSession.create({
      data: {
        userId: appUser.id,
        sessionDate,
        durationMinutes,
      },
    });

    return NextResponse.json(saved, { status: 201 });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
