'use client'

import Link from "next/link"
import { Button } from "@/components/ui/button"

export function CTASection() {
  return (
    <section className="py-16 bg-blue-600 text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Start?</h2>
        <p className="text-blue-100 max-w-2xl mx-auto mb-8">Get started with our recognition and accreditation services today. Our team is ready to assist you.</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg" variant="secondary">
            <Link href="/contact">Contact Us</Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="bg-transparent text-white border-white hover:bg-white hover:text-blue-600">
            <Link href="/faq">Learn More</Link>
          </Button>
        </div>
      </div>
    </section>
  )
} 