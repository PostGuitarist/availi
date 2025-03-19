import Layout from "@/components/layout"

export default function PrivacyPage() {
  return (
    <Layout>
      <div className="container py-12">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
          <div className="prose prose-blue max-w-none">
            <p className="text-muted-foreground mb-6">Last updated: March 7, 2025</p>

            <h2 className="text-xl font-semibold mt-8 mb-4">1. Introduction</h2>
            <p>
              At Availi, we respect your privacy and are committed to protecting your personal data. This Privacy Policy
              explains how we collect, use, and safeguard your information when you use our service.
            </p>
            <p>By using Availi, you agree to the collection and use of information in accordance with this policy.</p>

            <h2 className="text-xl font-semibold mt-8 mb-4">2. Information We Collect</h2>
            <p>
              We collect several different types of information for various purposes to provide and improve our Service
              to you:
            </p>
            <ul className="list-disc pl-6 my-4 space-y-2">
              <li>
                Personal Information: When you use our service, we may collect your name and email address when you
                submit availability for meetings.
              </li>
              <li>
                Usage Data: We collect information on how you interact with our service, including the pages you visit,
                the time spent on those pages, and other diagnostic data.
              </li>
              <li>Availability Data: We collect the time slots you mark as available for meetings.</li>
            </ul>

            <h2 className="text-xl font-semibold mt-8 mb-4">3. How We Use Your Information</h2>
            <p>We use the collected data for various purposes:</p>
            <ul className="list-disc pl-6 my-4 space-y-2">
              <li>To provide and maintain our Service</li>
              <li>To notify you about changes to our Service</li>
              <li>To allow you to participate in interactive features of our Service</li>
              <li>To provide customer support</li>
              <li>To gather analysis or valuable information so that we can improve our Service</li>
              <li>To monitor the usage of our Service</li>
              <li>To detect, prevent and address technical issues</li>
            </ul>

            <h2 className="text-xl font-semibold mt-8 mb-4">4. Data Security</h2>
            <p>
              The security of your data is important to us, but remember that no method of transmission over the
              Internet or method of electronic storage is 100% secure. While we strive to use commercially acceptable
              means to protect your personal data, we cannot guarantee its absolute security.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-4">5. Data Retention</h2>
            <p>
              We will retain your personal data only for as long as is necessary for the purposes set out in this
              Privacy Policy. We will retain and use your personal data to the extent necessary to comply with our legal
              obligations, resolve disputes, and enforce our legal agreements and policies.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-4">6. Your Data Protection Rights</h2>
            <p>
              You have certain data protection rights. If you wish to be informed about what personal data we hold about
              you and if you want it to be removed from our systems, please contact us.
            </p>
            <p>In certain circumstances, you have the following data protection rights:</p>
            <ul className="list-disc pl-6 my-4 space-y-2">
              <li>The right to access, update, or delete the information we have on you</li>
              <li>The right of rectification</li>
              <li>The right to object</li>
              <li>The right of restriction</li>
              <li>The right to data portability</li>
              <li>The right to withdraw consent</li>
            </ul>

            <h2 className="text-xl font-semibold mt-8 mb-4">7. Analytics</h2>
            <p>We may use third-party Service Providers to monitor and analyze the use of our Service.</p>

            <h2 className="text-xl font-semibold mt-8 mb-4">8. Children's Privacy</h2>
            <p>
              Our Service does not address anyone under the age of 13. We do not knowingly collect personally
              identifiable information from anyone under the age of 13. If you are a parent or guardian and you are
              aware that your child has provided us with personal data, please contact us.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-4">9. Changes to This Privacy Policy</h2>
            <p>
              We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new
              Privacy Policy on this page. You are advised to review this Privacy Policy periodically for any changes.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-4">10. Contact Us</h2>
            <p>If you have any questions about this Privacy Policy, please contact us at me@zadenconnell.com.</p>
          </div>
        </div>
      </div>
    </Layout>
  )
}

