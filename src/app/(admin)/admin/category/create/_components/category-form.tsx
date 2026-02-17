import FormLayout from '@/components/shared/form/form-layout'
import React from 'react'
import { useForm } from "react-hook-form";

type Props = {
  onSubmit: (data: UserFormValues) => Promise<void> | void; // support async | sync:
};
export default function CategoryForm({onSubmit}:Props) {
   const methods = useForm();
  return (
    <FormLayout title='Category' methods={methods} onSubmit={onSubmit}> </FormLayout>
  )
}
