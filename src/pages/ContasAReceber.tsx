import { useNavigate } from "react-router-dom";
import { ArrowLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { StatusBadge } from "@/components/dashboard/StatusBadge";
import { contasAReceber, formatCurrency, formatDate } from "@/data/mockData";

const ContasAReceber = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background px-4 py-8 lg:px-8 xl:px-16">
      <div className="mx-auto max-w-7xl">
        {/* Breadcrumb */}
        <div className="mb-6 flex items-center gap-2 text-sm text-muted-foreground">
          <button onClick={() => navigate("/")} className="hover:text-foreground transition-colors">Dashboard</button>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="text-foreground">Contas a Receber</span>
        </div>

        <div className="mb-8 flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate("/")} className="text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold tracking-tight lg:text-3xl">Documentos em Aberto</h1>
            <p className="text-sm text-muted-foreground mt-1">Contas a Receber · Fevereiro 2024</p>
          </div>
        </div>

        <div className="rounded-lg border border-border/60 bg-card overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="border-border/40 hover:bg-transparent">
                <TableHead className="text-xs uppercase tracking-wider text-muted-foreground">Documento</TableHead>
                <TableHead className="text-xs uppercase tracking-wider text-muted-foreground">Cliente</TableHead>
                <TableHead className="text-xs uppercase tracking-wider text-muted-foreground">Vencimento</TableHead>
                <TableHead className="text-xs uppercase tracking-wider text-muted-foreground text-right">Valor</TableHead>
                <TableHead className="text-xs uppercase tracking-wider text-muted-foreground text-center">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {contasAReceber.map((c) => (
                <TableRow key={c.id} className="border-border/30 hover:bg-secondary/30 transition-colors">
                  <TableCell className="font-medium">{c.documento}</TableCell>
                  <TableCell>{c.cliente}</TableCell>
                  <TableCell>{formatDate(c.vencimento)}</TableCell>
                  <TableCell className="text-right font-medium text-primary">{formatCurrency(c.valor)}</TableCell>
                  <TableCell className="text-center"><StatusBadge status={c.status} /></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="mt-4 flex justify-end text-xs text-muted-foreground">
          Exibindo {contasAReceber.length} de {contasAReceber.length} registros
        </div>
      </div>
    </div>
  );
};

export default ContasAReceber;
