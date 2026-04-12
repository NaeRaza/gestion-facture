import { prisma } from "@/lib/prisma";
import { InvoiceStatus, Prisma } from "@prisma/client";
import { NextResponse } from "next/server";

// GET toutes les factures
export async function GET() {
  try {
    const invoice = await prisma.invoice.findMany({
      include: { client: true },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(invoice, { status: 200 });
  } catch (e) {
    console.error("[GET api/invoices]", e);
    return NextResponse.json(
      { error: "Failed to fetch all invoices" },
      { status: 500 },
    );
  }
}

// POST créer une facture
export async function POST(req: Request) {
  try {
    const { amount, description, status, clientId } = await req.json();

    if (!amount || !description || !clientId) {
      return NextResponse.json({
        error: "amount, description and clientId are required!",
      });
    }
    // Vérifier que le status est valide si fourni
    if (status && !Object.values(InvoiceStatus).includes(status)) {
      return NextResponse.json(
        { error: "Invalid status, must be PENDING, PAID or CANCELLED" },
        { status: 400 },
      );
    }
    const invoice = await prisma.invoice.create({
      data: {
        amount,
        description,
        status: status ?? InvoiceStatus.PENDING,
        clientId,
      },
      include: { client: true },
    });
    return NextResponse.json(invoice, { status: 201 });
  } catch (e) {
    console.error("[POST api/invoices]", e);

    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === "P2003") {
        return NextResponse.json(
          { error: "Client not found" },
          { status: 404 },
        );
      }
    }

    return NextResponse.json(
      { error: "Failed to create invoice" },
      { status: 500 },
    );
  }
}
