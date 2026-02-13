import React from "react";
import { Button, buttonVariants } from "../ui/button";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import type { VariantProps } from "class-variance-authority";
type Props = {
  text: string;
  href: string;
  icon?: LucideIcon;
  variant?: VariantProps<typeof buttonVariants>["variant"];
};
export default function ButtonWithLink({ text, href, icon, variant }: Props) {
  const Icon = icon;
  return (
    <Button asChild variant={variant} type="button">
      <Link href={href}>
        {Icon && <Icon className="h-4 w-4" />}
        {text}
      </Link>
    </Button>
  );
}
