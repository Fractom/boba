'use client'

import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

function NewsCard({
  image,
  title,
  description,
  date,
  link,
}: {
  image: string
  title: string
  description: string
  date: string
  link: string
}) {
  return (
    <Card className="h-full flex flex-col transition-all hover:shadow-md">
      <div className="relative h-48">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover rounded-t-lg"
        />
      </div>
      <CardHeader>
        <CardTitle className="text-xl">{title}</CardTitle>
        <CardDescription>{date}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600">{description}</p>
      </CardContent>
      <CardFooter className="mt-auto pt-0">
        <Button asChild variant="ghost" className="gap-2 p-0 h-auto">
          <Link href={link}>
            Read More <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}

export function NewsSection() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Latest News</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">Stay updated with the latest developments in education recognition and accreditation</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <NewsCard
            image="/images/news-1.jpg"
            title="New Recognition Agreements"
            description="Recent developments in international recognition agreements and their impact on educational mobility."
            date="2024-03-15"
            link="/news/1"
          />
          <NewsCard
            image="/images/news-2.jpg"
            title="Accreditation Updates"
            description="Important updates to our accreditation processes and standards for educational institutions."
            date="2024-03-10"
            link="/news/2"
          />
          <NewsCard
            image="/images/news-3.jpg"
            title="Bologna Process Developments"
            description="Latest updates and changes in the Bologna Process affecting European higher education."
            date="2024-03-05"
            link="/news/3"
          />
        </div>
      </div>
    </section>
  )
} 