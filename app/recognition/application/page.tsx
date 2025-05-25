import { Breadcrumb } from "@/components/ui/breadcrumb"
import RecognitionForm from "@/components/recognition/recognition-form"

export default function RecognitionApplicationPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumb items={[
        { label: "Recognition", href: "/recognition" },
        { label: "Recognition Application", href: "/recognition/application" }
      ]} />

      <h1 className="text-3xl font-bold mb-6">Recognition Application</h1>
      
      <div className="mb-8">
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
          To apply for recognition of your foreign education documents, please complete the online application form below. Make sure to provide all required information and upload the necessary documents.
        </p>
      </div>

      <RecognitionForm />
    </div>
  )
}
