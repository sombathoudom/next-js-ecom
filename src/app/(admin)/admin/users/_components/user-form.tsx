"use client";
import { useForm, FormProvider } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldGroup } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/lib/routes";
import ButtonWithLink from "@/components/shared/button-link";
import { Ban } from "lucide-react";
import FormInput from "@/components/shared/form/form-input";

const userSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z
    .string()
    .regex(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Email is not correct",
    ),
  password: z.string().min(6, "Password must be at least 6 characters"),
});
export type UserFormValues = z.infer<typeof userSchema>;
type Props = {
  onSubmit: (data: UserFormValues) => void;
};
export default function userForm({ onSubmit }: Props) {
  const methods = useForm<UserFormValues>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });
  return (
    <div className="w-full max-w-4xl">
      <Card>
        <CardHeader>
          <CardTitle>Create User</CardTitle>
        </CardHeader>
        <CardContent>
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)}>
              <FieldGroup>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <FormInput
                    name="email"
                    label="Email"
                    placeholder="text@example.com"
                  />
                  <FormInput
                    name="name"
                    label="Username"
                    placeholder="Enter Username"
                  />
                </div>
                <FormInput
                  name="password"
                  label="Password"
                  type="password"
                  placeholder="Enter a Password"
                />
                <Field orientation="horizontal">
                  <Button type="submit">Submit</Button>
                  <ButtonWithLink
                    text="Cancel"
                    variant="outline"
                    href={ROUTES.admin.users.root.path}
                    icon={Ban}
                  />
                </Field>
              </FieldGroup>
            </form>
          </FormProvider>
        </CardContent>
      </Card>
    </div>
  );
}
