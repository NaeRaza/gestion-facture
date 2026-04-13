import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import Link from "next/link";
import { prisma } from "@/lib/prisma";

// const clients = [
//   {
//     id: "1",
//     name: "Jean Dupont",
//     email: "jean@example.com",
//     createdAt: "2024-01-15",
//     invoices: [{ status: "PAID" }, { status: "PENDING" }],
//   },
//   {
//     id: "2",
//     name: "Marie Martin",
//     email: "marie@example.com",
//     createdAt: "2024-02-20",
//     invoices: [{ status: "PENDING" }],
//   },
//   {
//     id: "3",
//     name: "Paul Bernard",
//     email: "paul@example.com",
//     createdAt: "2024-03-10",
//     invoices: [],
//   },
// ];

export default async function ClientsPage() {
  const clients = await prisma.client.findMany({
    include: { invoices: true },
  });

  const allClients = clients.length;

  const clientsWithInvoices = clients.filter(
    (client) => client.invoices.length > 0,
  ).length;

  const clientsWithoutInvoices = clients.filter(
    (client) => client.invoices.length === 0,
  ).length;

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header — prend toute la largeur sans max-w */}
      <div className="bg-emerald-700 px-10 py-8 mb-8 w-full">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">Clients</h1>
            <p className="text-emerald-200 mt-1">
              Gérez votre liste de clients
            </p>
          </div>
          <Link href="/clients/create">
            <Button className="bg-white text-emerald-700 hover:bg-emerald-50 shadow-sm font-semibold">
              + Nouveau client
            </Button>
          </Link>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-10 space-y-8 pb-10">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-6">
          <Card className="bg-blue-50 border-blue-100 shadow-sm rounded-2xl">
            <CardHeader className="pb-2 px-6 pt-6">
              <CardDescription className="text-slate-500 text-sm">
                Total clients
              </CardDescription>
              <CardTitle className="text-4xl font-bold text-slate-800 mt-1">
                {allClients}
              </CardTitle>
            </CardHeader>
          </Card>
          <Card className="bg-blue-50 border-blue-100 shadow-sm rounded-2xl">
            <CardHeader className="pb-2 px-6 pt-6">
              <CardDescription className="text-slate-500 text-sm">
                Avec factures
              </CardDescription>
              <CardTitle className="text-4xl font-bold text-emerald-600 mt-1">
                {clientsWithInvoices}
              </CardTitle>
            </CardHeader>
          </Card>
          <Card className="bg-blue-50 border-blue-100 shadow-sm rounded-2xl">
            <CardHeader className="pb-2 px-6 pt-6">
              <CardDescription className="text-slate-500 text-sm">
                Sans factures
              </CardDescription>
              <CardTitle className="text-4xl font-bold text-slate-400 mt-1">
                {clientsWithoutInvoices}
              </CardTitle>
            </CardHeader>
          </Card>
        </div>

        {/* Table */}
        <div className="bg-white border-slate-200 shadow-sm rounded-2xl overflow-hidden">
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                {/* ✅ hover:bg-emerald-700 pour garder la couleur au survol */}
                <TableRow className="border-b-2 border-emerald-600 bg-emerald-700 hover:bg-emerald-700">
                  <TableHead className="font-semibold px-6 py-4 text-white">
                    Nom
                  </TableHead>
                  <TableHead className="font-semibold px-6 py-4 text-white">
                    Email
                  </TableHead>
                  <TableHead className="font-semibold px-6 py-4 text-white">
                    Factures
                  </TableHead>
                  <TableHead className="font-semibold px-6 py-4 text-white">
                    Créé le
                  </TableHead>
                  <TableHead className="font-semibold px-6 py-4 text-right text-white">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {clients.map((client) => (
                  <TableRow
                    key={client.id}
                    className="border-b-2 border-slate-100 hover:bg-slate-50 transition-colors"
                  >
                    <TableCell className="text-slate-800 font-medium px-6 py-4">
                      {client.name}
                    </TableCell>
                    <TableCell className="text-slate-500 px-6 py-4">
                      {client.email}
                    </TableCell>
                    <TableCell className="px-6 py-4">
                      <Badge
                        className={
                          client.invoices.length > 0
                            ? "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-50"
                            : "bg-slate-100 text-slate-500 border-slate-200 hover:bg-slate-100"
                        }
                      >
                        {client.invoices.length} facture(s)
                      </Badge>
                    </TableCell>
                    <TableCell className="text-slate-500 px-6 py-4">
                      {new Date(client.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-right px-6 py-4 space-x-2">
                      <Link href={`/clients/${client.id}`}>
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-800"
                        >
                          Voir
                        </Button>
                      </Link>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-red-200 text-red-500 hover:bg-red-50 hover:text-red-600"
                      >
                        Supprimer
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </div>
      </div>
    </div>
  );
}
