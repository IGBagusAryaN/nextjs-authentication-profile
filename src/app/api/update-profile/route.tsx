import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const token = req.headers.get("x-access-token");

  try {
    const res = await fetch("http://techtest.youapp.ai/api/createProfile", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token || "",
      },
      body: JSON.stringify(body),
    });

    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch (error) {
    console.error("Create profile failed:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
