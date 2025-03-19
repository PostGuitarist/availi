"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { format, parseISO } from "date-fns"
import { Copy, RefreshCw } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "@/lib/toast"
import AvailabilityGrid from "@/components/availability-grid"
import { ShareMenu } from "@/components/share-menu"
import { getMeeting } from "@/app/actions"

interface MeetingDetailsProps {
  meeting: {
    id: string
    title: string
    description: string
    dateRange: string[]
    timeRange: {
      start: string
      end: string
    }
    participants: {
      id: string
      name: string
      availability: {
        date: string
        hour: string
        available: boolean
      }[]
    }[]
  }
}

export default function MeetingDetails({ meeting: initialMeeting }: MeetingDetailsProps) {
  const [activeTab, setActiveTab] = useState("details")
  const [meeting, setMeeting] = useState(initialMeeting)
  const [isRefreshing, setIsRefreshing] = useState(false)

  // Function to refresh meeting data
  const refreshMeeting = async () => {
    setIsRefreshing(true)
    try {
      const updatedMeeting = await getMeeting(meeting.id)
      if (updatedMeeting) {
        setMeeting(updatedMeeting)
        toast.success("Data refreshed", {
          description: "Meeting data has been updated with the latest information.",
        })
      }
    } catch (error) {
      console.error("Failed to refresh meeting data:", error)
      toast.error("Refresh failed", {
        description: "Could not refresh meeting data. Please try again.",
      })
    } finally {
      setIsRefreshing(false)
    }
  }

  // Set up auto-refresh every 30 seconds when on availability tab
  useEffect(() => {
    let intervalId: NodeJS.Timeout | null = null

    if (activeTab === "availability") {
      intervalId = setInterval(() => {
        refreshMeeting()
      }, 30000) // 30 seconds
    }

    return () => {
      if (intervalId) clearInterval(intervalId)
    }
  }, [activeTab])

  const copyMeetingLink = () => {
    const url = `https://availi.zadenconnell.com/meeting/${meeting.id}`
    navigator.clipboard.writeText(url)
    toast.success("Link copied!", {
      description: "The meeting link has been copied to your clipboard.",
    })
  }

  const getMeetingUrl = () => {
    return `https://availi.zadenconnell.com/meeting/${meeting.id}`
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="h-full"
    >
      <Card className="h-full">
        <CardHeader className="space-y-2">
          <CardTitle className="text-xl">{meeting.title}</CardTitle>
          <CardDescription className="line-clamp-2">{meeting.description || "No description provided"}</CardDescription>

          <div className="flex flex-wrap gap-2 pt-2">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button variant="outline" size="sm" onClick={copyMeetingLink} className="group">
                <Copy className="mr-2 h-4 w-4 text-blue-500 transition-transform group-hover:scale-110" />
                Copy Link
              </Button>
            </motion.div>
            <ShareMenu title={meeting.title} url={getMeetingUrl()} />
          </div>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="details">Meeting Details</TabsTrigger>
              <TabsTrigger value="availability">Availability</TabsTrigger>
            </TabsList>
            <TabsContent value="details" className="space-y-4 pt-4">
              <div>
                <h3 className="text-lg font-medium">Date Range</h3>
                <div className="mt-2">
                  {meeting.dateRange.length > 0 && (
                    <div className="rounded-md border p-3">
                      <p className="font-medium">
                        {format(parseISO(meeting.dateRange[0]), "MM/dd/yyyy")} -{" "}
                        {format(parseISO(meeting.dateRange[meeting.dateRange.length - 1]), "MM/dd/yyyy")}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Daily from {formatHour(meeting.timeRange.start)} to {formatHour(meeting.timeRange.end)}
                      </p>
                    </div>
                  )}
                </div>
              </div>
              <div>
                <h3 className="text-lg font-medium">Participants ({meeting.participants.length})</h3>
                {meeting.participants.length === 0 ? (
                  <p className="mt-2 text-sm text-muted-foreground">No participants yet</p>
                ) : (
                  <div className="mt-2 space-y-2 max-h-[200px] overflow-y-auto">
                    {meeting.participants.map((participant) => (
                      <div key={participant.id} className="rounded-md border p-3">
                        <p className="font-medium">{participant.name}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </TabsContent>
            <TabsContent value="availability" className="pt-4">
              <div className="flex justify-end mb-4">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={refreshMeeting}
                    disabled={isRefreshing}
                    className="flex items-center group"
                  >
                    <RefreshCw
                      className={`mr-2 h-4 w-4 ${isRefreshing ? "animate-spin" : "group-hover:rotate-180 transition-transform duration-500"}`}
                    />
                    {isRefreshing ? "Refreshing..." : "Refresh Data"}
                  </Button>
                </motion.div>
              </div>
              <AvailabilityGrid meeting={meeting} />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </motion.div>
  )
}

function formatHour(hour: string): string {
  const hourNum = Number.parseInt(hour.split(":")[0])
  if (hourNum === 0) return "12 AM"
  if (hourNum === 12) return "12 PM"
  if (hourNum < 12) return `${hourNum} AM`
  return `${hourNum - 12} PM`
}

