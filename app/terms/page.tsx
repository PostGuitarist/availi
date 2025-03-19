import Layout from "@/components/layout"

export default function TermsPage() {
  return (
    <Layout>
      <div className="container py-12">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>
          <div className="prose prose-blue max-w-none">
            <p className="text-muted-foreground mb-6">Last updated: March 7, 2025</p>

            <h2 className="text-xl font-semibold mt-8 mb-4">1. Introduction</h2>
            <p>
              Welcome to Availi ("we," "our," or "us"). These Terms of Service ("Terms") govern your access to and use
              of the Availi website, services, and applications (collectively, the "Service"). By accessing or using the
              Service, you agree to be bound by these Terms.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-4">2. Using Our Service</h2>
            <p>
              You may use our Service only if you agree to form a binding contract with Availi and are not a person
              barred from receiving services under the laws of the applicable jurisdiction.
            </p>
            <p>
              To use certain features of our Service, you may need to provide certain personal information. You are
              responsible for maintaining the confidentiality of your account information and for all activities that
              occur under your account.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-4">3. Content and Conduct</h2>
            <p>
              You are responsible for your use of the Service and for any content you provide, including compliance with
              applicable laws, rules, and regulations. You should only provide content that you are comfortable sharing
              with others.
            </p>
            <p>You may not use our Service to:</p>
            <ul className="list-disc pl-6 my-4 space-y-2">
              <li>Violate any applicable law or regulation</li>
              <li>Infringe the intellectual property rights of others</li>
              <li>Send spam or unsolicited communications</li>
              <li>Distribute malware or other harmful code</li>
              <li>Interfere with or disrupt the Service</li>
            </ul>

            <h2 className="text-xl font-semibold mt-8 mb-4">4. Privacy</h2>
            <p>
              Our Privacy Policy describes how we handle the information you provide to us when you use our Service. By
              using our Service, you agree that we can use such information in accordance with our Privacy Policy.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-4">5. Intellectual Property</h2>
            <p>
              Availi and its licensors exclusively own all right, title, and interest in and to the Service, including
              all associated intellectual property rights. You may not remove, alter, or obscure any copyright,
              trademark, service mark, or other proprietary rights notices incorporated in or accompanying the Service.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-4">6. Termination</h2>
            <p>
              We may suspend or terminate your access to the Service at any time for any reason without notice or
              liability. Upon termination, your right to use the Service will immediately cease.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-4">7. Disclaimer of Warranties</h2>
            <p>
              THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR
              IMPLIED, INCLUDING, BUT NOT LIMITED TO, IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR
              PURPOSE, TITLE, AND NON-INFRINGEMENT.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-4">8. Limitation of Liability</h2>
            <p>
              TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, AVAILI SHALL NOT BE LIABLE FOR ANY INDIRECT,
              INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS OR REVENUES, WHETHER
              INCURRED DIRECTLY OR INDIRECTLY, OR ANY LOSS OF DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-4">9. Changes to These Terms</h2>
            <p>
              We may revise these Terms from time to time. The most current version will always be on this page. If the
              revision, in our sole discretion, is material, we will notify you via email or through the Service. By
              continuing to access or use the Service after those revisions become effective, you agree to be bound by
              the revised Terms.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-4">10. Contact Us</h2>
            <p>If you have any questions about these Terms, please contact us at me@zadenconnell.com.</p>
          </div>
        </div>
      </div>
    </Layout>
  )
}

