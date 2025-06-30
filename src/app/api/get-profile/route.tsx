import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const token = req.headers.get("x-access-token");

  try {
    const res = await fetch("https://techtest.youapp.ai/api/getProfile", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token || "",
      },
    });

    const data = await res.json();
    console.log("data:",data)
    return NextResponse.json(data, { status: res.status });
  } catch (error) {
    console.error("Get profile failed:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
