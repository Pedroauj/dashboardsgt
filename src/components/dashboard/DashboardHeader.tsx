import { CalendarDays, Building2, Filter } from "lucide-react";

export function DashboardHeader() {
  return (
    <div className="mb-10">
      <h1 className="text-3xl font-bold tracking-tight lg:text-4xl">DETALHAMENTO — FEVEREIRO</h1>
      <p className="mt-2 text-muted-foreground text-sm lg:text-base">
        Visão consolidada financeira do período · Contas a Receber, Contas a Pagar e Indicadores
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        {[
          { icon: CalendarDays, label: "Fevereiro 2024" },
          { icon: Building2, label: "Todas as Empresas" },
          { icon: Filter, label: "Todos os Centros de Custo" },
        ].map(({ icon: Icon, label }) => (
          <div key={label} className="flex items-center gap-1.5 rounded-md border border-border/60 bg-secondary/50 px-3 py-1.5 text-xs text-muted-foreground">
            <Icon className="h-3.5 w-3.5" />
            {label}
          </div>
        ))}
      </div>
    </div>
  );
}
