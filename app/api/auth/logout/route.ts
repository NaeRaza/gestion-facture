import { NextResponse } from "next/server";

export async function POST() {
  try {
    const response = NextResponse.json(
      { message: "Logged out successfully!" },
      { status: 200 },
    );

    response.cookies.delete("token");

    return response;
  } catch (e) {
    console.error("POST api/auth/logout", e);
    return NextResponse.json({ error: "Failed to logout" }, { status: 500 });
  }
}
