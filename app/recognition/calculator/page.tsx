import { Breadcrumb } from "@/components/ui/breadcrumb"
import RecognitionCalculator from "@/components/recognition/recognition-calculator"

export default function RecognitionCalculatorPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumb items={[
        { label: "Recognition", href: "/recognition" },
        { label: "Recognition Calculator", href: "/recognition/calculator" }
      ]} />

      <h1 className="text-3xl font-bold mb-6">Recognition Calculator</h1>
      
      <div className="mb-8">
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
          Use our calculator to estimate the cost and processing time for your recognition application based on the type of document, country of origin, and urgency of your request.
        </p>
      </div>

      <RecognitionCalculator />
    </div>
  )
}
