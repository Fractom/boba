import type { Metadata } from "next"
import { Breadcrumb } from "@/components/ui/breadcrumb"

export const metadata: Metadata = {
  title: "Privacy Policy | Education Center",
  description: "Our privacy policy explains how we collect, use, and protect your personal information.",
}

export default function PrivacyPolicyPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Privacy Policy", href: "/privacy-policy", active: true },
        ]}
      />

      <PrivacyPolicyContent />
    </div>
  )
}

function PrivacyPolicyContent() {
  return (
    <div className="max-w-4xl mx-auto mt-8 prose dark:prose-invert">
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>

      <p className="text-lg mb-6">Last Updated: May 15, 2023</p>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Introduction</h2>
        <p>This privacy policy explains how we collect, use, and protect your personal information when you use our services.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Data Collection</h2>
        <p>We collect various types of information to provide and improve our services to you.</p>
        <ul className="list-disc pl-6 mt-4">
          <li className="mb-2">Personal Information: Name, email, contact details, and educational records</li>
          <li className="mb-2">Usage Data: How you interact with our services and website</li>
          <li className="mb-2">Technical Data: IP address, browser type, and device information</li>
          <li className="mb-2">Cookies: Information stored through browser cookies and similar technologies</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">How We Use Your Data</h2>
        <p>We use your information for the following purposes:</p>
        <ul className="list-disc pl-6 mt-4">
          <li className="mb-2">To provide and maintain our services</li>
          <li className="mb-2">To communicate with you about our services</li>
          <li className="mb-2">To improve our services and user experience</li>
          <li className="mb-2">To comply with legal obligations</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Data Sharing</h2>
        <p>We do not sell your personal information. We may share your data with trusted partners and service providers who assist us in operating our services, subject to strict confidentiality agreements.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Data Security</h2>
        <p>We implement appropriate security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Your Rights</h2>
        <p>You have certain rights regarding your personal information:</p>
        <ul className="list-disc pl-6 mt-4">
          <li className="mb-2">Right to access your personal data</li>
          <li className="mb-2">Right to correct inaccurate data</li>
          <li className="mb-2">Right to request deletion of your data</li>
          <li className="mb-2">Right to restrict processing of your data</li>
          <li className="mb-2">Right to object to processing</li>
          <li className="mb-2">Right to data portability</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
        <p>If you have any questions about this privacy policy or our practices, please contact us:</p>
        <p className="mt-4">
          <strong>Email:</strong> privacy@educationcenter.org
          <br />
          <strong>Address:</strong> 123 Education Street, Astana, Kazakhstan
        </p>
      </section>
    </div>
  )
}
