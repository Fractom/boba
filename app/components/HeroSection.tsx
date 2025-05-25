'use client'

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    <section className="relative hero-section text-white py-16 md:py-24 overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <Image src="/placeholder.svg?height=800&width=1600" alt="Background pattern" fill className="object-cover" />
      </div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">Welcome to the Education Center</h1>
          <p className="text-lg mb-8 text-blue-100">Your trusted partner in educational recognition and accreditation services</p>
          <div className="flex flex-wrap gap-4">
            <Button asChild size="lg" className="bg-white hover:bg-gray-100 text-blue-700">
              <Link href="/recognition">Recognition Services</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="bg-transparent hover:bg-white/20 text-white border-white"
            >
              <Link href="/accreditation">Accreditation Process</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
} 