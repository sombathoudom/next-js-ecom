import React from "react";
import { Button, buttonVariants } from "../ui/button";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import type { VariantProps } from "class-variance-authority";

type Props = React.ComponentProps<typeof Button> & {
  text: string;
  href: string;
  icon?: LucideIcon;
};

export default function ButtonWithLink({ text, href, icon, ...props }: Props) {
  const Icon = icon;
  return (
    <Button {...props}>
      <Link href={href}>
        {Icon && <Icon className="h-4 w-4" />}
        {text}
      </Link>
    </Button>
  );
}
