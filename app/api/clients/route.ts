import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";

//Get all clients
export async function GET() {
  try {
    const clients = await prisma.client.findMany({
      include: { invoices: true },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(clients, { status: 200 });
  } catch (e) {
    console.error("[GET api/clients]", e);
    return NextResponse.json(
      { error: "Failed to Fetch clients" },
      { status: 500 },
    );
  }
}

// POST créer un client
export async function POST(req: Request) {
  try {
    const { name, email } = await req.json();

    if (!name || !email) {
      return NextResponse.json(
        { error: "name, email and password are required!" },
        { status: 400 },
      );
    }
    const client = await prisma.client.create({
      data: {
        name,
        email,
      },
    });

    return NextResponse.json(client, { status: 201 });
  } catch (e) {
    console.error("[POST api/clients]", e);
    // P2002 = violation de contrainte @unique
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      //
      if (e.code === "P2002") {
        return NextResponse.json(
          { error: "Email already used" },
          { status: 409 },
        );
      }
    }

    return NextResponse.json(
      { error: "Failed to create client" },
      { status: 500 },
    );
  }
}
