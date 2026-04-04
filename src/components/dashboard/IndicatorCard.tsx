interface IndicatorCardProps {
  nome: string;
  percentual: number;
  cor: "primary" | "accent" | "warning" | "destructive";
}

const colorMap = {
  primary: { stroke: "hsl(var(--primary))", text: "text-primary" },
  accent: { stroke: "hsl(var(--accent))", text: "text-accent" },
  warning: { stroke: "hsl(var(--warning))", text: "text-warning" },
  destructive: { stroke: "hsl(var(--destructive))", text: "text-destructive" },
};

export function IndicatorCard({ nome, percentual, cor }: IndicatorCardProps) {
  const { stroke, text } = colorMap[cor];
  const circumference = 2 * Math.PI * 36;
  const offset = circumference - (percentual / 100) * circumference;

  return (
    <div className="flex flex-col items-center gap-3 rounded-lg border border-border/50 bg-card p-5 transition-all duration-200 hover:border-border hover:bg-card-elevated">
      <svg width="88" height="88" viewBox="0 0 88 88" className="-rotate-90">
        <circle cx="44" cy="44" r="36" fill="none" stroke="hsl(var(--border))" strokeWidth="6" />
        <circle
          cx="44" cy="44" r="36" fill="none"
          stroke={stroke} strokeWidth="6"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-700"
        />
      </svg>
      <span className={`text-2xl font-bold ${text}`}>{percentual.toFixed(1)}%</span>
      <span className="text-xs font-medium text-muted-foreground text-center leading-tight">{nome}</span>
    </div>
  );
}
