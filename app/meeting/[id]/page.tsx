import { notFound } from "next/navigation"
import { getMeeting } from "@/app/actions"
import MeetingDetails from "@/components/meeting-details"
import ParticipantForm from "@/components/participant-form"
import Layout from "@/components/layout"

interface MeetingPageProps {
  params: {
    id: string
  }
}

export default async function MeetingPage({ params }: MeetingPageProps) {
  try {
    const { id } = await params;
    const meeting = await getMeeting(id)

    if (!meeting) {
      return notFound()
    }

    return (
      <Layout>
        <div className="container py-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8">
              <ParticipantForm meetingId={meeting.id} dateRange={meeting.dateRange} timeRange={meeting.timeRange} />
            </div>
            <div className="lg:col-span-4">
              <MeetingDetails meeting={meeting} />
            </div>
          </div>
        </div>
      </Layout>
    )
  } catch (error) {
    console.error("Error loading meeting:", error)
    return notFound()
  }
}

