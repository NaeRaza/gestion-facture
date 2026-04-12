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

// Données fictives pour le design
const client = {
  id: "1",
  name: "Jean Dupont",
  email: "jean@example.com",
  createdAt: "2024-01-15",
  invoices: [
    {
      id: "inv-1",
      description: "Développement site web",
      amount: 1500,
      status: "PAID",
      createdAt: "2024-01-20",
    },
    {
      id: "inv-2",
      description: "Maintenance mensuelle",
      amount: 300,
      status: "PENDING",
      createdAt: "2024-02-01",
    },
    {
      id: "inv-3",
      description: "Refonte logo",
      amount: 500,
      status: "CANCELLED",
      createdAt: "2024-02-15",
    },
  ],
};

const statusConfig = {
  PAID: {
    label: "Payée",
    className:
      "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-50",
  },
  PENDING: {
    label: "En attente",
    className: "bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-50",
  },
  CANCELLED: {
    label: "Annulée",
    className: "bg-red-50 text-red-700 border-red-200 hover:bg-red-50",
  },
};

export default function ClientDetailPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-emerald-700 px-10 py-8 mb-8 w-full">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">{client.name}</h1>
            <p className="text-emerald-200 mt-1">{client.email}</p>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/clients">
              <Button className="bg-white text-emerald-700 hover:bg-emerald-50 shadow-sm font-semibold">
                ← Retour
              </Button>
            </Link>
            <Button className="bg-emerald-500 hover:bg-emerald-600 text-white shadow-sm font-semibold">
              Modifier
            </Button>
            <Button className="bg-red-500 hover:bg-red-600 text-white shadow-sm font-semibold">
              Supprimer
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-10 space-y-8 pb-10">
        {/* Infos client */}
        <div className="grid grid-cols-3 gap-6">
          <Card className="bg-blue-50 border-blue-100 shadow-sm rounded-2xl">
            <CardHeader className="pb-2 px-6 pt-6">
              <CardDescription className="text-slate-500 text-sm">
                Membre depuis
              </CardDescription>
              <CardTitle className="text-2xl font-bold text-slate-800 mt-1">
                {client.createdAt}
              </CardTitle>
            </CardHeader>
          </Card>
          <Card className="bg-blue-50 border-blue-100 shadow-sm rounded-2xl">
            <CardHeader className="pb-2 px-6 pt-6">
              <CardDescription className="text-slate-500 text-sm">
                Total factures
              </CardDescription>
              <CardTitle className="text-4xl font-bold text-emerald-600 mt-1">
                {client.invoices.length}
              </CardTitle>
            </CardHeader>
          </Card>
          <Card className="bg-blue-50 border-blue-100 shadow-sm rounded-2xl">
            <CardHeader className="pb-2 px-6 pt-6">
              <CardDescription className="text-slate-500 text-sm">
                Total montant
              </CardDescription>
              <CardTitle className="text-4xl font-bold text-slate-800 mt-1">
                {client.invoices.reduce((acc, inv) => acc + inv.amount, 0)}€
              </CardTitle>
            </CardHeader>
          </Card>
        </div>

        {/* Factures du client */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-slate-800">Factures</h2>
            <Link href="/invoices/create">
              <Button className="bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm">
                + Nouvelle facture
              </Button>
            </Link>
          </div>

          <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-sm">
            <Table>
              <TableHeader>
                <TableRow className="border-b-2 border-emerald-600 bg-emerald-700 hover:bg-emerald-700">
                  <TableHead className="font-semibold px-6 py-4 text-white">
                    Description
                  </TableHead>
                  <TableHead className="font-semibold px-6 py-4 text-white">
                    Montant
                  </TableHead>
                  <TableHead className="font-semibold px-6 py-4 text-white">
                    Status
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
                {client.invoices.map((invoice) => (
                  <TableRow
                    key={invoice.id}
                    className="border-b-2 border-slate-100 hover:bg-slate-50 transition-colors bg-white"
                  >
                    <TableCell className="text-slate-800 font-medium px-6 py-4">
                      {invoice.description}
                    </TableCell>
                    <TableCell className="text-slate-800 font-semibold px-6 py-4">
                      {invoice.amount}€
                    </TableCell>
                    <TableCell className="px-6 py-4">
                      <Badge
                        className={
                          statusConfig[
                            invoice.status as keyof typeof statusConfig
                          ].className
                        }
                      >
                        {
                          statusConfig[
                            invoice.status as keyof typeof statusConfig
                          ].label
                        }
                      </Badge>
                    </TableCell>
                    <TableCell className="text-slate-500 px-6 py-4">
                      {invoice.createdAt}
                    </TableCell>
                    <TableCell className="text-right px-6 py-4 space-x-2">
                      <Link href={`/invoices/${invoice.id}`}>
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
          </div>
        </div>
      </div>
    </div>
  );
}
