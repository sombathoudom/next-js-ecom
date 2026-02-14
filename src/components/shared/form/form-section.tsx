import { FieldGroup } from "@/components/ui/field";

type Props = {
  children: React.ReactNode;
  className?: string;
};

export default function FormSection({ children, className }: Props) {
  return <FieldGroup className={className}>{children}</FieldGroup>;
}
