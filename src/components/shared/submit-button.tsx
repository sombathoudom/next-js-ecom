"use client";

import { Loader2 } from "lucide-react";
import { Button } from "../ui/button";

type Props = React.ComponentProps<typeof Button> & {
  isLoading?: boolean;
  loadingText?: string;
};

export default function SubmitButton({
  isLoading = false,
  loadingText = "Saving...",
  children,
  type = "submit",
  ...props
}: Props) {
  return (
    <Button type={type} {...props} disabled={isLoading || props.disabled}>
      {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {isLoading ? loadingText : children}
    </Button>
  );
}
