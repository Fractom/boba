import { Breadcrumb } from "@/components/ui/breadcrumb"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Home } from "lucide-react"
import AccreditationRegistry from "@/components/accreditation/accreditation-registry"
import AccreditationCriteria from "@/components/accreditation/accreditation-criteria"
import AccreditationProcess from "@/components/accreditation/accreditation-process"
import AccreditationReports from "@/components/accreditation/accreditation-reports"

export default function AccreditationPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumb items={[
        { label: "Accreditation", href: "/accreditation" }
      ]} />

      <h1 className="text-3xl font-bold mb-6">Accreditation Services</h1>
      
      <div className="mb-12">
        <p className="text-lg text-gray-600">
          Our center provides accreditation services for educational institutions to ensure they meet quality standards.
          Accreditation is a process of external quality review used to scrutinize colleges, universities, and
          educational programs for quality assurance and quality improvement.
        </p>
      </div>

      <Tabs defaultValue="registry" className="mb-12">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="registry">Accredited Organizations</TabsTrigger>
          <TabsTrigger value="criteria">Accreditation Criteria</TabsTrigger>
          <TabsTrigger value="process">Accreditation Process</TabsTrigger>
          <TabsTrigger value="reports">Reports & Analytics</TabsTrigger>
        </TabsList>
        <TabsContent value="registry" className="p-4 border rounded-md mt-2">
          <AccreditationRegistry />
        </TabsContent>
        <TabsContent value="criteria" className="p-4 border rounded-md mt-2">
          <AccreditationCriteria />
        </TabsContent>
        <TabsContent value="process" className="p-4 border rounded-md mt-2">
          <AccreditationProcess />
        </TabsContent>
        <TabsContent value="reports" className="p-4 border rounded-md mt-2">
          <AccreditationReports />
        </TabsContent>
      </Tabs>
    </div>
  )
}
