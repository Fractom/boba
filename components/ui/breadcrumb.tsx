'use client'

import Link from "next/link"
import { ChevronRight, Home } from "lucide-react"
import { useTranslation } from "@/components/translation-provider"

interface BreadcrumbProps {
  items?: {
    label: string
    href: string
  }[]
}

export function BreadcrumbList({ children }: { children: React.ReactNode }) {
  return (
    <nav className="flex items-center space-x-1 text-sm text-gray-500">
      {children}
    </nav>
  )
}

export function BreadcrumbItem({ children }: { children: React.ReactNode }) {
  return <div className="flex items-center">{children}</div>
}

export function BreadcrumbLink({ href, children, isLast = false }: { href: string; children: React.ReactNode; isLast?: boolean }) {
  return (
    <Link
      href={href}
      className={`hover:text-gray-700 transition-colors ${
        isLast ? "text-gray-900 font-medium" : ""
      }`}
    >
      {children}
    </Link>
  )
}

export function BreadcrumbSeparator() {
  return <ChevronRight className="h-4 w-4 mx-1" />
}

// Legacy support
export function Breadcrumb({ items = [] }: BreadcrumbProps) {
  const t = useTranslation()
  
  return (
    <BreadcrumbList>
      <BreadcrumbItem>
        <BreadcrumbLink href="/">
          <Home className="h-4 w-4" />
        </BreadcrumbLink>
      </BreadcrumbItem>
      {items.map((item, index) => (
        <BreadcrumbItem key={item.href}>
          <BreadcrumbSeparator />
          <BreadcrumbLink href={item.href} isLast={index === items.length - 1}>
            {t(item.label)}
          </BreadcrumbLink>
        </BreadcrumbItem>
      ))}
    </BreadcrumbList>
  )
}
