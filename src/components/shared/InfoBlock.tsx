import type { ReactNode } from "react";
import { Card } from "./Card";

export function InfoBlock({ title, children }: { title: string; children: ReactNode }) {
  return (
    <Card>
      <h2 className="border-b border-[var(--line)] pb-[15px] text-lg">{title}</h2>
      {children}
    </Card>
  );
}