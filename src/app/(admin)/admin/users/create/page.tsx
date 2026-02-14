"use client";
import UserForm from "../_components/user-form";
import { type UserFormValues } from "../_components/user-schema";
import { api } from "@/trpc/react";

export default function Page() {
  const createUser = api.user.createUser.useMutation();

  const handleSubmit = async (data: UserFormValues) => {
    await createUser.mutateAsync(data);
  };

  return <UserForm onSubmit={handleSubmit} />;
}
