import { signToken } from "@/lib/jwt";
import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

//POST se connecter
export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "email and password are required" },
        { status: 400 },
      );
    }

    // 1. Vérifier si l'user existe
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 400 });
    }

    // 2. Vérifier le mot de passe
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 400 },
      );
    }

    // 3. Générer le token JWT
    const token = await signToken({ id: user.id, email: user.email });

    // 4. Stocker le token dans un cookie httpOnly
    const response = NextResponse.json({
      id: user.id,
      email: user.email,
    });

    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // 7 jours
      path: "/",
    });

    return response;
  } catch (e) {
    console.error("[POST api/auth/login]", e);

    return NextResponse.json({ error: "Failed to login" }, { status: 500 });
  }
}
