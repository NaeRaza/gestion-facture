import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-950">
      {/* Cercles décoratifs en arrière plan */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />
      </div>

      <Card className="w-full max-w-md bg-zinc-900 border border-zinc-800 shadow-2xl relative">
        <CardHeader className="space-y-2 pb-6">
          {/* Logo / Icône */}
          <div className="w-12 h-12 bg-emerald-600 rounded-xl flex items-center justify-center mx-auto mb-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
              />
            </svg>
          </div>
          <CardTitle className="text-2xl font-bold text-center text-white">
            Connexion
          </CardTitle>
          <CardDescription className="text-center text-zinc-400">
            Entrez vos identifiants pour accéder à votre espace
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-5">
          <div className="space-y-2">
            <Label
              htmlFor="email"
              className="text-zinc-300 text-sm font-medium"
            >
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="john@example.com"
              className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500 focus:border-emerald-500 focus:ring-emerald-500/20 h-11"
            />
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="password"
              className="text-zinc-300 text-sm font-medium"
            >
              Mot de passe
            </Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500 focus:border-emerald-500 focus:ring-emerald-500/20 h-11"
            />
          </div>

          <Button className="w-full h-11 bg-emerald-600 hover:bg-emerald-700 text-white font-medium transition-colors">
            Se connecter
          </Button>

          <p className="text-center text-sm text-zinc-500">
            Accès réservé aux administrateurs
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
