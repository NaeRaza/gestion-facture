import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";

// Données fictives pour le design
const clients = [
  { id: "1", name: "Jean Dupont" },
  { id: "2", name: "Marie Martin" },
  { id: "3", name: "Paul Bernard" },
];

export default function CreateInvoicePage() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-emerald-700 px-10 py-8 mb-8 w-full">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">Nouvelle facture</h1>
            <p className="text-emerald-200 mt-1">Créez une nouvelle facture</p>
          </div>
          <Link href="/invoices">
            <Button className="bg-white text-emerald-700 hover:bg-emerald-50 shadow-sm font-semibold">
              ← Retour
            </Button>
          </Link>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-10 pb-10">
        <Card className="bg-white border-slate-200 shadow-sm rounded-2xl">
          <CardHeader className="px-8 pt-8 pb-4">
            <CardTitle className="text-xl font-semibold text-slate-800">
              Informations de la facture
            </CardTitle>
            <CardDescription className="text-slate-500">
              Remplissez les informations de la nouvelle facture
            </CardDescription>
          </CardHeader>
          <CardContent className="px-8 pb-8 space-y-6">
            {/* Client */}
            <div className="space-y-2">
              <Label htmlFor="client" className="text-slate-700 font-medium">
                Client
              </Label>
              <Select>
                <SelectTrigger className="border-slate-200 focus:border-emerald-500 focus:ring-emerald-500/20 h-11">
                  <SelectValue placeholder="Sélectionner un client" />
                </SelectTrigger>
                <SelectContent>
                  {clients.map((client) => (
                    <SelectItem key={client.id} value={client.id}>
                      {client.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label
                htmlFor="description"
                className="text-slate-700 font-medium"
              >
                Description
              </Label>
              <Textarea
                id="description"
                placeholder="Décrivez la prestation..."
                className="border-slate-200 focus:border-emerald-500 focus:ring-emerald-500/20 resize-none min-h-[100px]"
              />
            </div>

            {/* Montant + Status sur la même ligne */}
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="amount" className="text-slate-700 font-medium">
                  Montant (€)
                </Label>
                <Input
                  id="amount"
                  type="number"
                  placeholder="0.00"
                  className="border-slate-200 focus:border-emerald-500 focus:ring-emerald-500/20 h-11"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="status" className="text-slate-700 font-medium">
                  Status
                </Label>
                <Select>
                  <SelectTrigger className="border-slate-200 focus:border-emerald-500 focus:ring-emerald-500/20 h-11">
                    <SelectValue placeholder="Sélectionner un status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="PENDING">
                      <span className="text-amber-600 font-medium">
                        En attente
                      </span>
                    </SelectItem>
                    <SelectItem value="PAID">
                      <span className="text-emerald-600 font-medium">
                        Payée
                      </span>
                    </SelectItem>
                    <SelectItem value="CANCELLED">
                      <span className="text-red-600 font-medium">Annulée</span>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Boutons */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
              <Link href="/invoices">
                <Button
                  variant="outline"
                  className="bg-slate-200 text-slate-700 hover:bg-slate-300 border-slate-300 h-11 px-8"
                >
                  ← Annuler
                </Button>
              </Link>
              <Button className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold h-11 px-8">
                Créer la facture →
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
