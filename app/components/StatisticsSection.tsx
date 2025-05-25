'use client'

import { Users, Award, Building2, Globe } from "lucide-react"

function StatCard({
  icon,
  value,
  label,
}: {
  icon: React.ReactNode
  value: string
  label: string
}) {
  return (
    <div className="text-center">
      <div className="flex justify-center mb-4">{icon}</div>
      <div className="text-4xl font-bold text-blue-600 mb-2">{value}</div>
      <div className="text-gray-600">{label}</div>
    </div>
  )
}

export function StatisticsSection() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <StatCard
            icon={<Users className="h-8 w-8 text-blue-600" />}
            value="10,000+"
            label="Students Served"
          />
          <StatCard
            icon={<Award className="h-8 w-8 text-blue-600" />}
            value="500+"
            label="Accredited Institutions"
          />
          <StatCard
            icon={<Building2 className="h-8 w-8 text-blue-600" />}
            value="50+"
            label="Partner Countries"
          />
          <StatCard
            icon={<Globe className="h-8 w-8 text-blue-600" />}
            value="100%"
            label="Satisfaction Rate"
          />
        </div>
      </div>
    </section>
  )
} 