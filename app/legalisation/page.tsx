import type { Metadata } from "next"
import { Breadcrumb } from "@/components/ui/breadcrumb"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Legalisation | Education Center",
  description: "Information about document legalisation process, requirements, and services.",
}

export default function LegalisationPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Legalisation", href: "/legalisation", active: true },
        ]}
      />

      <LegalisationContent />
    </div>
  )
}

function LegalisationContent() {
  return (
    <div className="max-w-4xl mx-auto mt-8">
      <h1 className="text-3xl font-bold mb-6">Document Legalisation</h1>
      <p className="text-lg mb-8">Our document legalisation service ensures your educational documents are properly authenticated for use in other countries.</p>

      <Tabs defaultValue="process">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="process">Process</TabsTrigger>
          <TabsTrigger value="requirements">Requirements</TabsTrigger>
          <TabsTrigger value="services">Services</TabsTrigger>
        </TabsList>

        <TabsContent value="process" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Legalisation Process</CardTitle>
              <CardDescription>Learn about our step-by-step document legalisation process</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {[
                  { title: "Document Submission", description: "Submit your original documents along with required supporting materials" },
                  { title: "Initial Review", description: "Our experts review your documents for completeness and authenticity" },
                  { title: "Authentication", description: "Documents are authenticated by relevant authorities" },
                  { title: "Verification", description: "Final verification and quality check of all stamps and signatures" },
                  { title: "Collection", description: "Collect your legalised documents or receive them via secure courier" }
                ].map((step, index) => (
                  <div key={index} className="flex">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold mr-4">
                      {index + 1}
                    </div>
                    <div>
                      <h3 className="text-lg font-medium">{step.title}</h3>
                      <p className="mt-1">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8">
                <h3 className="text-lg font-medium mb-4">Processing Timeframes</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Standard Processing: 5-7 working days</li>
                  <li>Express Service: 2-3 working days</li>
                  <li>Urgent Service: 24 hours (subject to availability)</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="requirements" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Document Requirements</CardTitle>
              <CardDescription>Essential requirements for document legalisation</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-3">Required Documents</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Original educational documents</li>
                    <li>Certified copies of all documents</li>
                    <li>Certified translations (if applicable)</li>
                    <li>Completed application form</li>
                    <li>Valid identification document</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-3">Service Fees</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Standard Service: $100 per document</li>
                    <li>Express Service: Additional $50 per document</li>
                    <li>Urgent Service: Additional $100 per document</li>
                    <li>Translation Services: Priced per page</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-3">Important Notes</h3>
                  <p>Documents must be in good condition and free from any alterations or damages. We cannot process incomplete or damaged documents.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="services" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Our Services</CardTitle>
              <CardDescription>Comprehensive document legalisation services</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  {
                    title: "Standard Legalisation",
                    description: "Complete document legalisation with standard processing time",
                    timeframe: "5-7 working days",
                    fee: "$100"
                  },
                  {
                    title: "Express Legalisation",
                    description: "Faster processing for urgent requirements",
                    timeframe: "2-3 working days",
                    fee: "$150"
                  },
                  {
                    title: "Urgent Legalisation",
                    description: "Same-day or next-day processing",
                    timeframe: "24 hours",
                    fee: "$200"
                  },
                  {
                    title: "Complete Package",
                    description: "Includes translation and courier services",
                    timeframe: "7-10 working days",
                    fee: "From $250"
                  }
                ].map((service, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <h3 className="text-lg font-medium mb-2">{service.title}</h3>
                    <p className="mb-4">{service.description}</p>
                    <div className="text-sm text-muted-foreground mb-4">
                      <div className="flex justify-between mb-1">
                        <span>Timeframe:</span>
                        <span>{service.timeframe}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Fee:</span>
                        <span>{service.fee}</span>
                      </div>
                    </div>
                    <Button asChild className="w-full">
                      <Link href="/contact">Request Service</Link>
                    </Button>
                  </div>
                ))}
              </div>

              <div className="mt-8">
                <h3 className="text-lg font-medium mb-4">Additional Services</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Document translation services</li>
                  <li>Notarization services</li>
                  <li>International courier delivery</li>
                  <li>Expert consultation</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="mt-12 bg-muted p-6 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">Need Assistance?</h2>
        <p className="mb-6">Contact our team for personalized support with your document legalisation needs.</p>
        <Button asChild size="lg">
          <Link href="/contact">Contact Us</Link>
        </Button>
      </div>
    </div>
  )
}
