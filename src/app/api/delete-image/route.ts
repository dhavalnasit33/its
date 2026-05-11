import { NextRequest, NextResponse } from "next/server";

const BACKEND_URL = process.env.NEXT_PUBLIC_APP_URL; // e.g. http://localhost:5000

export async function DELETE(req: NextRequest) {
  try {
    const body = await req.json();

    const authHeader = req.headers.get("authorization") || "";
    const cookieHeader = req.headers.get("cookie") || "";

    const response = await fetch(`${BACKEND_URL}/api/delete-image`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        ...(authHeader && { Authorization: authHeader }),
        ...(cookieHeader && { Cookie: cookieHeader }),
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: "Proxy error: " + error.message },
      { status: 500 },
    );
  }
}
