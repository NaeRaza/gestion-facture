import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "./lib/jwt";

const protectedRoutes = ["/api/clients", "/api/invoices"];

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Vérifier si la route est protégée
  const isProtected = protectedRoutes.some((route) =>
    pathname.startsWith(route),
  );

  // Si la route n'est pas protégée, on laisse passer
  if (!isProtected) return NextResponse.next();

  const token = req.cookies.get("token")?.value;

  // Pas de token → accès refusé
  if (!token) {
    return NextResponse.json(
      { error: "Unauthorized, please login" },
      { status: 401 },
    );
  }

  // Vérifier le token
  try {
    await verifyToken(token);
    // Si token valide, on laisse passer
    return NextResponse.next();
  } catch {
    return NextResponse.json(
      { error: "Invalid or expired token, please login" },
      { status: 400 },
    );
  }
}
export const config = {
  matcher: ["/api/clients/:path*", "/api/invoices/:path*"],
};
