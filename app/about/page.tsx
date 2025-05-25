import type { Metadata } from "next"
import { Breadcrumb } from "@/components/ui/breadcrumb"

export const metadata: Metadata = {
  title: "About Us | Education Center",
  description: "Learn about the Education Center, our mission, vision, and team.",
}

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "About Us", href: "/about", active: true },
        ]}
      />

      <AboutContent />
    </div>
  )
}

function AboutContent() {
  return (
    <div className="max-w-4xl mx-auto mt-8">
      <h1 className="text-3xl font-bold mb-6">About Us</h1>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
        <p className="text-lg mb-4">We are dedicated to facilitating educational recognition and accreditation processes, ensuring quality standards in education across borders.</p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Our Vision</h2>
        <p className="text-lg mb-4">To be the leading center for educational recognition and accreditation, fostering global academic mobility and excellence.</p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Our Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {[
            { name: "John Smith", position: "Director", bio: "20+ years in international education" },
            { name: "Sarah Johnson", position: "Head of Recognition", bio: "Expert in qualification frameworks" },
            { name: "Michael Brown", position: "Head of Accreditation", bio: "Leading quality assurance specialist" },
            { name: "Emily Davis", position: "International Relations", bio: "Experienced in cross-border education" },
            { name: "David Wilson", position: "Technical Advisor", bio: "Specialist in educational systems" },
            { name: "Lisa Anderson", position: "Quality Manager", bio: "Dedicated to maintaining standards" }
          ].map((member, index) => (
            <div key={index} className="bg-card rounded-lg p-6 shadow-md">
              <div className="w-24 h-24 rounded-full bg-muted mx-auto mb-4"></div>
              <h3 className="text-xl font-medium text-center">{member.name}</h3>
              <p className="text-center text-muted-foreground">{member.position}</p>
              <p className="mt-4 text-center">{member.bio}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Our History</h2>
        <p className="text-lg mb-4">Since our establishment, we have been at the forefront of educational recognition and accreditation services.</p>

        <div className="mt-6 space-y-6">
          {[
            { year: 2023, text: "Expanded services to cover 50+ countries" },
            { year: 2022, text: "Launched digital verification platform" },
            { year: 2021, text: "Established new international partnerships" },
            { year: 2020, text: "Implemented advanced recognition system" },
            { year: 2019, text: "Achieved ISO certification" },
            { year: 2018, text: "Founded the Education Center" }
          ].map(({ year, text }) => (
            <div key={year} className="flex">
              <div className="flex-shrink-0 w-16 font-bold">{year}</div>
              <div className="flex-grow">
                <p>{text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
