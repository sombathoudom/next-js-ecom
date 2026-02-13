"use client";
import React from "react";
import UserForm, { type UserFormValues } from "../_components/user-form";

export default function page() {
  const handleSubmit = (data: UserFormValues) => {
    console.log(data);
  };
  return <UserForm onSubmit={handleSubmit} />;
}
