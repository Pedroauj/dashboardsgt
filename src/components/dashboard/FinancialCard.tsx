import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { formatCurrency } from "@/data/mockData";

interface FinancialCardProps {
  title: string;
  value: number;
  variant: "receita" | "despesa" | "saldo-receita" | "saldo-despesa";
  linkTo?: string;
}

const variantStyles = {
  receita: "border-primary/20",
  despesa: "border-warning/20",
  "saldo-receita": "border-accent/30 cursor-pointer group hover:border-accent/60 hover:shadow-[0_0_30px_-8px_hsl(var(--accent)/0.15)]",
  "saldo-despesa": "border-accent/30 cursor-pointer group hover:border-accent/60 hover:shadow-[0_0_30px_-8px_hsl(var(--accent)/0.15)]",
};

const valueStyles = {
  receita: "text-primary",
  despesa: "text-warning",
  "saldo-receita": "text-accent",
  "saldo-despesa": "text-accent",
};

export function FinancialCard({ title, value, variant, linkTo }: FinancialCardProps) {
  const navigate = useNavigate();
  const isClickable = !!linkTo;

  return (
    <div
      onClick={isClickable ? () => navigate(linkTo!) : undefined}
      className={`relative rounded-lg border bg-card p-6 transition-all duration-200 ${variantStyles[variant]}`}
    >
      <p className="text-sm font-medium text-muted-foreground tracking-wide uppercase">{title}</p>
      <p className={`mt-2 text-2xl font-bold tracking-tight lg:text-3xl ${valueStyles[variant]}`}>
        {formatCurrency(value)}
      </p>
      {isClickable && (
        <div className="absolute right-5 top-1/2 -translate-y-1/2 text-muted-foreground transition-all duration-200 group-hover:text-accent group-hover:translate-x-1">
          <ArrowRight className="h-5 w-5" />
        </div>
      )}
    </div>
  );
}
