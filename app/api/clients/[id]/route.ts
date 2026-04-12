import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";

//GET un client par id
export async function GET(
  _: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const client = await prisma.client.findUnique({
      where: { id },
      include: { invoices: true },
    });

    if (!client) {
      return NextResponse.json({ error: "Client not found" }, { status: 404 });
    }

    return NextResponse.json(client, { status: 200 });
  } catch (e) {
    console.error("[GET api/clients/:id]", e);
    return NextResponse.json({ error: "Client not found" }, { status: 400 });
  }
}

//PUT modifier un client
export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const { name, email } = await req.json();

    if (!name || !email) {
      return NextResponse.json(
        { error: "name and email are required!" },
        { status: 400 },
      );
    }

    const client = await prisma.client.update({
      where: { id },
      data: { name, email },
    });

    return NextResponse.json(client, { status: 200 });
  } catch (e) {
    console.error("[PUT api/clients/:id]", e);

    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === "P2025") {
        return NextResponse.json(
          { error: "Client not found" },
          { status: 404 },
        );
      }
      if (e.code === "P2002") {
        return NextResponse.json(
          { error: "Failed to update client" },
          { status: 409 },
        );
      }
    }

    return NextResponse.json({ error: "" }, { status: 500 });
  }
}

//DELETE un client avec un ID
export async function DELETE(
  _: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    await prisma.client.delete({
      where: { id },
    });
    return NextResponse.json(
      { message: "Client delete successfully!" },
      { status: 200 },
    );
  } catch (e) {
    console.error("DELETE api/clients/:id", e);
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      //Enregistrement Introuvable
      if (e.code === "P2025") {
        return NextResponse.json(
          { error: "Client not found" },
          { status: 404 },
        );
      }
      //Violation de clé étrangère
      if (e.code === "P2003") {
        return NextResponse.json(
          { error: "Cannot delete client with an existing invoices" },
          { status: 409 },
        );
      }
    }
  }
}
