'use client'

import { Breadcrumb } from "@/components/ui/breadcrumb"

export default function RecognitionDatabasePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumb items={[
        { label: "Recognition", href: "/recognition" },
        { label: "Recognition Database", href: "/recognition/database" }
      ]} />

      <h1 className="text-3xl font-bold mb-6">Recognition Database</h1>
      
      {/* Остальной контент страницы */}
    </div>
  )
}
