"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ROUTES } from "@/lib/routes";
import ButtonWithLink from "@/components/shared/button-link";
import { Ban } from "lucide-react";
import FormInput from "@/components/shared/form/form-input";
import SubmitButton from "@/components/shared/submit-button";
import { type UserFormValues, createUserSchema } from "./user-schema";
import FormLayout from "@/components/shared/form/form-layout";
import FormSection from "@/components/shared/form/form-section";
import FormActions from "@/components/shared/form/form-actions";

type Props = {
  onSubmit: (data: UserFormValues) => Promise<void> | void; // support async | sync:
};
export default function UserForm({ onSubmit }: Props) {
  const methods = useForm<UserFormValues>({
    resolver: zodResolver(createUserSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const {
    formState: { isSubmitting },
  } = methods;

  return (
    <div className="w-full max-w-4xl">
      <FormLayout title="Create User" methods={methods} onSubmit={onSubmit}>
        <FormSection>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <FormInput name="email" label="Email" />
            <FormInput name="name" label="Username" />
          </div>

          <FormInput name="password" label="Password" type="password" />
        </FormSection>

        <FormActions align="start">
          <SubmitButton isLoading={isSubmitting}>Save</SubmitButton>

          <ButtonWithLink
            text="Cancel"
            variant="outline"
            href={ROUTES.admin.users.root.path}
            icon={Ban}
            asChild
          />
        </FormActions>
      </FormLayout>
    </div>
  );
}
