import FormLayout from '@/components/shared/form/form-layout'
import CategoryForm from './_components/category-form'

export default function page() {
  const handleSubmit = async () => {

  }
  return (
   <CategoryForm onSubmit={handleSubmit}></CategoryForm>
  )
}
