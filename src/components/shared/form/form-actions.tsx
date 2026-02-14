import { Field } from "@/components/ui/field";

type Props = {
  children: React.ReactNode;
  align?: "start" | "end" | "between";
};

export default function FormActions({ children, align = "start" }: Props) {
  const alignment = {
    start: "justify-start",
    end: "justify-end",
    between: "justify-between",
  }[align];

  return (
    <Field orientation="horizontal" className={`gap-2 ${alignment}`}>
      {children}
    </Field>
  );
}
