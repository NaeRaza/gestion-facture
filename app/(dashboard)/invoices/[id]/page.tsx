import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import Link from "next/link";

// Données fictives pour le design
const invoice = {
  id: "inv-1",
  description:
    "Développement site web complet avec intégration API et dashboard admin.",
  amount: 1500,
  status: "PAID",
  createdAt: "2024-01-20",
  client: {
    id: "1",
    name: "Jean Dupont",
    email: "jean@example.com",
  },
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

export default function InvoiceDetailPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-emerald-700 px-10 py-8 mb-8 w-full">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">
              Facture #{invoice.id}
            </h1>
            <p className="text-emerald-200 mt-1">
              Créée le {invoice.createdAt}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/invoices">
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

      <div className="max-w-3xl mx-auto px-10 pb-10 space-y-6">
        {/* Status + Montant */}
        <div className="grid grid-cols-2 gap-6">
          <Card className="bg-blue-50 border-blue-100 shadow-sm rounded-2xl">
            <CardHeader className="pb-2 px-6 pt-6">
              <CardDescription className="text-slate-500 text-sm">
                Montant
              </CardDescription>
              <CardTitle className="text-4xl font-bold text-slate-800 mt-1">
                {invoice.amount}€
              </CardTitle>
            </CardHeader>
          </Card>
          <Card className="bg-blue-50 border-blue-100 shadow-sm rounded-2xl">
            <CardHeader className="pb-2 px-6 pt-6">
              <CardDescription className="text-slate-500 text-sm">
                Status
              </CardDescription>
              <div className="mt-2">
                <Badge
                  className={`text-base px-4 py-1 ${statusConfig[invoice.status as keyof typeof statusConfig].className}`}
                >
                  {
                    statusConfig[invoice.status as keyof typeof statusConfig]
                      .label
                  }
                </Badge>
              </div>
            </CardHeader>
          </Card>
        </div>

        {/* Informations client */}
        <Card className="bg-white border-slate-200 shadow-sm rounded-2xl">
          <CardHeader className="px-8 pt-6 pb-4 border-b border-slate-100">
            <CardTitle className="text-lg font-semibold text-slate-800">
              Client
            </CardTitle>
          </CardHeader>
          <CardContent className="px-8 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                  <span className="text-emerald-700 font-bold text-lg">
                    {invoice.client.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="text-slate-800 font-semibold text-lg">
                    {invoice.client.name}
                  </p>
                  <p className="text-slate-500 text-sm">
                    {invoice.client.email}
                  </p>
                </div>
              </div>
              <Link href={`/clients/${invoice.client.id}`}>
                <Button
                  variant="outline"
                  className="border-slate-200 text-slate-600 hover:bg-slate-50"
                >
                  Voir le client
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Description */}
        <Card className="bg-white border-slate-200 shadow-sm rounded-2xl">
          <CardHeader className="px-8 pt-6 pb-4 border-b border-slate-100">
            <CardTitle className="text-lg font-semibold text-slate-800">
              Description
            </CardTitle>
          </CardHeader>
          <CardContent className="px-8 py-6">
            <p className="text-slate-600 leading-relaxed">
              {invoice.description}
            </p>
          </CardContent>
        </Card>

        {/* Changer le status */}
        <Card className="bg-white border-slate-200 shadow-sm rounded-2xl">
          <CardHeader className="px-8 pt-6 pb-4 border-b border-slate-100">
            <CardTitle className="text-lg font-semibold text-slate-800">
              Changer le status
            </CardTitle>
            <CardDescription className="text-slate-500">
              Mettez à jour le status de cette facture
            </CardDescription>
          </CardHeader>
          <CardContent className="px-8 py-6">
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                className="bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100"
              >
                En attente
              </Button>
              <Button
                variant="outline"
                className="bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100"
              >
                Marquer payée
              </Button>
              <Button
                variant="outline"
                className="bg-red-50 text-red-700 border-red-200 hover:bg-red-100"
              >
                Annuler
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
