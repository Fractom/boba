'use client'

import { Breadcrumb } from "@/components/ui/breadcrumb"
import { Home } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function FAQPage() {
  const faqItems = [
    {
      question: "What is recognition?",
      answer: "Recognition is the process of evaluating and acknowledging foreign educational qualifications."
    },
    {
      question: "How to apply?",
      answer: "You can apply through our online application system by submitting required documents."
    },
    {
      question: "What documents are required?",
      answer: "Required documents include original educational documents, translations, and identification."
    },
    {
      question: "How long does it take?",
      answer: "Processing time typically takes 4-6 weeks from submission of complete application."
    },
    {
      question: "What are the fees?",
      answer: "Fees vary depending on the type of recognition and urgency of the request."
    },
    {
      question: "What is the appeal process?",
      answer: "If you disagree with the decision, you can submit an appeal within 30 days."
    }
  ]
  
  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumb items={[
        { label: "FAQ", href: "/faq" }
      ]} />

      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Frequently Asked Questions</h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
          Find answers to frequently asked questions about recognition, accreditation, and our services.
        </p>
      </div>

      <Accordion type="single" collapsible className="w-full mb-8">
        {faqItems.map((item, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger className="text-left">
              {item.question}
            </AccordionTrigger>
            <AccordionContent>
              <p className="text-gray-600">{item.answer}</p>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl">
        <h2 className="text-xl font-bold mb-4">Still Have Questions?</h2>
        <p className="mb-4">
          If you couldn't find the answer to your question, please don't hesitate to contact us. Our team is ready to assist you.
        </p>
        <Button asChild>
          <Link href="/contact">Contact Us</Link>
        </Button>
      </div>
    </div>
  )
}
