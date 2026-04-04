import { Badge } from "@/components/ui/badge";

const statusConfig = {
  "Em Aberto": "border-accent/30 bg-accent/10 text-accent hover:bg-accent/10",
  "Vencido": "border-destructive/30 bg-destructive/10 text-destructive hover:bg-destructive/10",
  "Parcial": "border-warning/30 bg-warning/10 text-warning hover:bg-warning/10",
};

export function StatusBadge({ status }: { status: "Em Aberto" | "Vencido" | "Parcial" }) {
  return (
    <Badge variant="outline" className={statusConfig[status]}>
      {status}
    </Badge>
  );
}
