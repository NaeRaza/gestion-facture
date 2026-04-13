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
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateClientPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e: React.SyntheticEvent) => {
    try {
      e.preventDefault();
      setLoading(true);
      setError("");

      const response = await fetch("/api/clients", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ name, email }),
      });
      const data = await response.json();

      if (response.ok) {
        router.push("/clients");
      } else {
        setError(data.error);
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-emerald-700 px-10 py-8 mb-8 w-full">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">Nouveau client</h1>
            <p className="text-emerald-200 mt-1">Créez un nouveau client</p>
          </div>
          <Link href="/clients">
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
              Informations du client
            </CardTitle>
            <CardDescription className="text-slate-500">
              Remplissez les informations du nouveau client
            </CardDescription>
          </CardHeader>
          <CardContent className="px-8 pb-8 space-y-6">
            {/* Nom */}
            <div className="space-y-2">
              <Label htmlFor="name" className="text-slate-700 font-medium">
                Nom complet
              </Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                placeholder="Jean Dupont"
                className="border-slate-200 focus:border-emerald-500 focus:ring-emerald-500/20 h-11"
              />
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-slate-700 font-medium">
                Email
              </Label>
              <Input
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="jean@example.com"
                className="border-slate-200 focus:border-emerald-500 focus:ring-emerald-500/20 h-11"
              />
            </div>

            {/* Boutons */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
              <Link href="/clients">
                <Button
                  variant="outline"
                  className="bg-slate-200 text-slate-700 hover:bg-slate-300 border-slate-300 h-11 px-8"
                >
                  ← Annuler
                </Button>
              </Link>
              <Button
                onClick={handleSubmit}
                type="submit"
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold h-11 px-8"
              >
                Créer le client →
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
