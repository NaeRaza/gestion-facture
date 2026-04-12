import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

// POST créer un utilisateur
export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "email and password are required" },
        { status: 400 },
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });

    const { password: _, ...UserWithoutPassword } = user;

    return NextResponse.json(UserWithoutPassword, { status: 201 });
  } catch (e) {
    console.error("[POST api/auth/register]", e);
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === "P2002") {
        return NextResponse.json(
          { error: "Email already used" },
          { status: 409 },
        );
      }
    }
    return NextResponse.json(
      { error: "Failed to create account" },
      { status: 500 },
    );
  }
}
