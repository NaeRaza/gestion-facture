import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";

//GET une facture par id
export async function GET(
  _: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const invoice = await prisma.invoice.findUnique({
      where: { id },
    });
    if (!invoice) {
      return NextResponse.json({ error: "Invoice not found" }, { status: 400 });
    }
    return NextResponse.json(invoice, { status: 200 });
  } catch (e) {
    console.error("[GET api/invoices/:id]");
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === "P2025") {
        return NextResponse.json(
          { error: "Client not found" },
          { status: 404 },
        );
      }
      if (e.code === "P2002") {
        return NextResponse.json(
          { error: "Failed to update invoice" },
          { status: 409 },
        );
      }
    }

    return NextResponse.json(
      { error: "Failed to update Client" },
      { status: 500 },
    );
  }
}

//PUT modifier une facture
export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const { amount, description, status } = await req.json();

    const invoice = await prisma.invoice.update({
      where: { id },
      data: { amount, description, status },
      include: { client: true },
    });

    return NextResponse.json(invoice, { status: 200 });
  } catch (e) {
    console.error("[PUT api/invoices/:id]", e);
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === "P2025") {
        return NextResponse.json(
          { error: "Invoice not found" },
          { status: 404 },
        );
      }
    }
    return NextResponse.json(
      { error: "Failed to update invoice" },
      { status: 409 },
    );
  }
}

//DELETE supprimer une facture
export async function DELETE(
  _: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    await prisma.invoice.delete({
      where: { id },
    });
    return NextResponse.json(
      { message: "Invoice deleted successfully!" },
      { status: 200 },
    );
  } catch (e) {
    console.error("[DELETE api/invoice/[id]]", e);

    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === "2025") {
        return NextResponse.json(
          { error: "Invoice not found" },
          { status: 404 },
        );
      }
    }

    return NextResponse.json(
      { error: "Failed to delete invoice" },
      { status: 500 },
    );
  }
}
