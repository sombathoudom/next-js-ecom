"use client";

import {
  FormProvider,
  type UseFormReturn,
  type FieldValues,
} from "react-hook-form";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

type Props<T extends FieldValues> = {
  title: string;
  methods: UseFormReturn<T>;
  onSubmit: (data: T) => Promise<void> | void;
  children: React.ReactNode;
  className?: string;
};

export default function FormLayout<T extends FieldValues>({
  title,
  methods,
  onSubmit,
  children,
  className,
}: Props<T>) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>

      <CardContent>
        <FormProvider {...methods}>
          <form
            onSubmit={methods.handleSubmit(onSubmit)}
            className={`space-y-6 ${className ?? ""}`}
          >
            {children}
          </form>
        </FormProvider>
      </CardContent>
    </Card>
  );
}
