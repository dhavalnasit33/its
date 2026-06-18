import { NextResponse } from "next/server";

export function middleware() {
  const underConstruction = true; // 🔥 toggle here

  if (underConstruction) {
    return NextResponse.redirect(
      new URL("/under-construction", "http://localhost:3000")
    );
  }

  return NextResponse.next();
}