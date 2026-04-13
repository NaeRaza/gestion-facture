"use client";

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
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateInvoicePage() {
  const [clients, setClients] = useState([]);
  const [clientId, setClientId] = useState("");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [status, setStatus] = useState("PENDING");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const router = useRouter();

  useEffect(() => {
    async function getClients() {
      const response = await fetch("/api/clients", {
        method: "GET",
      });

      const data = await response.json();
      setClients(data);
      setLoading(false);
    }
    getClients();
  }, []);

  const handleSubmit = async (e: React.SyntheticEvent) => {
    try {
      setLoading(true);
      e.preventDefault();
      const response = await fetch("/api/invoices", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          description,
          amount: Number(amount),
          status,
          clientId,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        router.push("/invoices");
      } else {
        setError(data.error);
      }
    } catch (e) {
      console.log(e);
      setError("Cannot create the invoices");
    } finally {
      setLoading(false);
    }
  };

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
              <Select
                onValueChange={(value) => setClientId(value)}
                disabled={loading}
              >
                <SelectTrigger className="border-slate-200 focus:border-emerald-500 focus:ring-emerald-500/20 h-11">
                  <SelectValue
                    placeholder={
                      loading ? "Chargement..." : "Sélectionner un client"
                    }
                  />
                </SelectTrigger>
                <SelectContent>
                  {clients.map((client: { id: string; name: string }) => (
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
                value={description}
                onChange={(e) => setDescription(e.target.value)}
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
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0.00"
                  className="border-slate-200 focus:border-emerald-500 focus:ring-emerald-500/20 h-11"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="status" className="text-slate-700 font-medium">
                  Status
                </Label>
                <Select onValueChange={(value) => setStatus(value)}>
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
              <Button
                onClick={handleSubmit}
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold h-11 px-8"
              >
                {loading ? "Création en cours..." : "Créer la facture →"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
