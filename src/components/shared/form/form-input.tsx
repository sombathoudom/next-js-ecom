import { Field, FieldLabel, FieldError } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Controller, useFormContext } from "react-hook-form";

type Props = {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  autoComplete?: string;
};
export default function FormInput({
  name,
  label,
  type = "text",
  placeholder,
  autoComplete = "off",
}: Props) {
  const { control } = useFormContext();
  const id = `field-${name}`;
  const errorId = `${id}-error`;
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel htmlFor={id}>{label}</FieldLabel>
          <Input
            {...field}
            id={id}
            type={type}
            aria-invalid={fieldState.invalid}
            placeholder={placeholder}
            autoComplete={autoComplete}
            value={field.value ?? ""}
          />
          {fieldState.invalid && (
            <FieldError id={errorId} errors={[fieldState.error]} />
          )}
        </Field>
      )}
    />
  );
}
