import { LucideIcon } from "lucide-react";

interface SectionHeaderProps {
  title: string;
  icon: LucideIcon;
}

export function SectionHeader({ title, icon: Icon }: SectionHeaderProps) {
  return (
    <div className="flex items-center gap-2.5 mb-4">
      <Icon className="h-5 w-5 text-muted-foreground" />
      <h2 className="text-lg font-semibold tracking-wide uppercase text-foreground/90">{title}</h2>
    </div>
  );
}
