import Layout from "@/components/layout"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle2, Clock, Share2, Users, Calendar, ArrowRight } from "lucide-react"

export default function HowItWorksPage() {
  return (
    <Layout>
      <div className="container py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold tracking-tight mb-4">How Availi Works</h1>
            <p className="text-xl text-muted-foreground">
              Availi makes scheduling meetings with multiple participants simple and efficient.
            </p>
          </div>

          <div className="space-y-12">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-sm font-semibold mb-2">
                  <span className="text-primary mr-1">Step 1</span>
                </div>
                <h2 className="text-2xl font-bold mb-4">Create a Meeting</h2>
                <p className="text-muted-foreground mb-4">
                  Start by creating a new meeting. Give it a title, description, and select a date range of up to 7
                  days. Choose the time range that works best for your potential meeting.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-primary mr-2 mt-0.5" />
                    <span>Set a descriptive title and optional description</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-primary mr-2 mt-0.5" />
                    <span>Select up to 7 days</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-primary mr-2 mt-0.5" />
                    <span>Define the daily time range (e.g., 9 AM to 5 PM)</span>
                  </li>
                </ul>
              </div>
              <Card className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="bg-primary/10 p-8 flex justify-center items-center">
                    <Calendar className="h-24 w-24 text-primary" />
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid md:grid-cols-2 gap-8 items-center md:grid-flow-dense">
              <Card className="overflow-hidden md:order-1">
                <CardContent className="p-0">
                  <div className="bg-primary/10 p-8 flex justify-center items-center">
                    <Share2 className="h-24 w-24 text-primary" />
                  </div>
                </CardContent>
              </Card>
              <div>
                <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-sm font-semibold mb-2">
                  <span className="text-primary mr-1">Step 2</span>
                </div>
                <h2 className="text-2xl font-bold mb-4">Share with Participants</h2>
                <p className="text-muted-foreground mb-4">
                  After creating your meeting, you'll get a unique link to share with all participants. They can access
                  this link to mark their availability without needing to create an account.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-primary mr-2 mt-0.5" />
                    <span>Copy the secure link with one click</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-primary mr-2 mt-0.5" />
                    <span>Share via email, messaging apps, or calendar invites</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-primary mr-2 mt-0.5" />
                    <span>No account required for participants</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-sm font-semibold mb-2">
                  <span className="text-primary mr-1">Step 3</span>
                </div>
                <h2 className="text-2xl font-bold mb-4">Mark Availability</h2>
                <p className="text-muted-foreground mb-4">
                  Participants visit the shared link and mark their availability by clicking and dragging on the
                  interactive calendar grid. They can select multiple time slots across different days.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-primary mr-2 mt-0.5" />
                    <span>Simple click and drag interface</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-primary mr-2 mt-0.5" />
                    <span>Select multiple time slots at once</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-primary mr-2 mt-0.5" />
                    <span>Easy to update if availability changes</span>
                  </li>
                </ul>
              </div>
              <Card className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="bg-primary/10 p-8 flex justify-center items-center">
                    <Users className="h-24 w-24 text-primary" />
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid md:grid-cols-2 gap-8 items-center md:grid-flow-dense">
              <Card className="overflow-hidden md:order-1">
                <CardContent className="p-0">
                  <div className="bg-primary/10 p-8 flex justify-center items-center">
                    <Clock className="h-24 w-24 text-primary" />
                  </div>
                </CardContent>
              </Card>
              <div>
                <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-sm font-semibold mb-2">
                  <span className="text-primary mr-1">Step 4</span>
                </div>
                <h2 className="text-2xl font-bold mb-4">Find the Best Time</h2>
                <p className="text-muted-foreground mb-4">
                  As participants submit their availability, Availi automatically calculates and displays the best
                  meeting times based on everyone's schedules. The heatmap visualization makes it easy to identify
                  optimal slots.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-primary mr-2 mt-0.5" />
                    <span>Real-time updates as participants respond</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-primary mr-2 mt-0.5" />
                    <span>Visual heatmap shows optimal meeting times</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-primary mr-2 mt-0.5" />
                    <span>Top 5 best times automatically highlighted</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="text-center pt-8">
              <h2 className="text-2xl font-bold mb-4">Ready to schedule your next meeting?</h2>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Availi makes finding the perfect meeting time simple. No more back-and-forth emails or complicated
                scheduling conflicts.
              </p>
              <a
                href="/create"
                className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-lg font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90"
              >
                Create a Meeting
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

