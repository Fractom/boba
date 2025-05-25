'use client'

import Link from "next/link"
import { GraduationCap, Award, BookOpen, ArrowRight } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

function ServiceCard({
  icon,
  title,
  description,
  link,
}: {
  icon: React.ReactNode
  title: string
  description: string
  link: string
}) {
  return (
    <Card className="h-full flex flex-col transition-all hover:shadow-md">
      <CardHeader>
        <div className="mb-4">{icon}</div>
        <CardTitle className="text-xl">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardFooter className="mt-auto pt-0">
        <Button asChild variant="ghost" className="gap-2 p-0 h-auto">
          <Link href={link}>
            Learn More <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}

export function ServicesSection() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Our Key Services</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">We provide comprehensive services for educational recognition and accreditation</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <ServiceCard
            icon={<GraduationCap className="h-10 w-10 text-blue-600" />}
            title="Recognition of Foreign Education"
            description="Evaluation and recognition of foreign educational qualifications for academic and professional purposes"
            link="/recognition"
          />
          <ServiceCard
            icon={<Award className="h-10 w-10 text-blue-600" />}
            title="Accreditation Services"
            description="Quality assurance and accreditation services for educational institutions and programs"
            link="/accreditation"
          />
          <ServiceCard
            icon={<BookOpen className="h-10 w-10 text-blue-600" />}
            title="Bologna Process"
            description="Information and guidance on the Bologna Process and European Higher Education Area"
            link="/bologna"
          />
        </div>
      </div>
    </section>
  )
} 