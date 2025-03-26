"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { format, eachDayOfInterval } from "date-fns"
import { Clock } from "lucide-react"
import type { DateRange } from "react-day-picker"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { createMeeting } from "@/app/actions"
import { DateRangePicker } from "@/components/date-range-picker"
import Layout from "@/components/layout"
import { toast } from "@/lib/toast"

export default function CreateMeetingPage() {
  const router = useRouter()
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [dateRange, setDateRange] = useState<DateRange | undefined>()
  const [startTime, setStartTime] = useState("09:00")
  const [endTime, setEndTime] = useState("17:00")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!title || !dateRange?.from || !dateRange?.to) {
      return
    }

    setIsSubmitting(true)

    try {
      // Generate date range
      const days = eachDayOfInterval({
        start: dateRange.from,
        end: dateRange.to,
      })

      // Format dates as YYYY-MM-DD strings
      const formattedDates = days.map((day) => format(day, "yyyy-MM-dd"))

      const result = await createMeeting({
        title,
        description,
        dateRange: formattedDates,
        timeRange: {
          start: startTime,
          end: endTime,
        },
      })

      if (result.success) {
        router.push(`/meeting/${result.meetingId}`)
      }
    } catch (error) {
      console.error("Failed to create meeting:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  // Convert 24-hour format to 12-hour format
  const formatTime12h = (time24h: string) => {
    const [hours] = time24h.split(":")
    const hour = Number.parseInt(hours, 10)
    if (hour === 0) return "12:00 AM"
    if (hour === 12) return "12:00 PM"
    return hour < 12 ? `${hour}:00 AM` : `${hour - 12}:00 PM`
  }

  return (
    <Layout>
      <div className="container py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <Card className="w-full">
            <CardHeader>
              <CardTitle className="text-2xl">Create a New Meeting</CardTitle>
              <CardDescription>
                Set up your meeting details and select a date range for participants to mark their availability.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="title">Meeting Title</Label>
                      <Input
                        id="title"
                        placeholder="Team Weekly Sync"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="description">Description (Optional)</Label>
                      <Textarea
                        id="description"
                        placeholder="Discuss project updates and next steps..."
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="min-h-[100px]"
                      />
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-lg font-medium">Select Date Range</h3>
                        <p className="text-sm text-muted-foreground">
                          Choose the start and end dates for your meeting (maximum 7 days).
                        </p>
                      </div>
                      <DateRangePicker dateRange={dateRange} onDateRangeChange={setDateRange} maxDays={7} />
                    </div>

                    <div className="space-y-4">
                      <div>
                        <h3 className="text-lg font-medium">Select Time Range</h3>
                        <p className="text-sm text-muted-foreground">Choose the daily time range to display.</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span>From</span>
                        <Select
                          value={startTime}
                          onValueChange={(value) => {
                            const newStartHour = Number.parseInt(value.split(":")[0], 10)
                            const endHour = Number.parseInt(endTime.split(":")[0], 10)

                            setStartTime(value)

                            if (endHour < newStartHour) {
                              // If the new start time is later than the current end time, adjust end time
                              setEndTime(value)
                              toast.warning("Time range adjusted", {
                                description: "End time has been adjusted to match the new start time.",
                              })
                            }
                          }}
                        >
                          <SelectTrigger className="w-[120px]">
                            <SelectValue placeholder="Start Time">{formatTime12h(startTime)}</SelectValue>
                          </SelectTrigger>
                          <SelectContent>
                            {Array.from({ length: 24 }).map((_, i) => (
                              <SelectItem key={i} value={`${String(i).padStart(2, "0")}:00`}>
                                {formatTime12h(`${String(i).padStart(2, "0")}:00`)}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <span>to</span>
                        <Select
                          value={endTime}
                          onValueChange={(value) => {
                            const startHour = Number.parseInt(startTime.split(":")[0], 10)
                            const endHour = Number.parseInt(value.split(":")[0], 10)

                            if (endHour < startHour) {
                              // If end time is earlier than start time, set end time to start time
                              setEndTime(startTime)
                              toast.warning("Invalid time range", {
                                description: "End time cannot be earlier than start time. End time has been adjusted.",
                              })
                            } else {
                              setEndTime(value)
                            }
                          }}
                        >
                          <SelectTrigger className="w-[120px]">
                            <SelectValue placeholder="End Time">{formatTime12h(endTime)}</SelectValue>
                          </SelectTrigger>
                          <SelectContent>
                            {Array.from({ length: 24 }).map((_, i) => (
                              <SelectItem key={i} value={`${String(i).padStart(2, "0")}:00`}>
                                {formatTime12h(`${String(i).padStart(2, "0")}:00`)}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                </div>

                <CardFooter className="flex justify-between px-0">
                  <Button variant="outline" type="button" onClick={() => router.push("/")}>
                    Cancel
                  </Button>
                  <Button type="submit" disabled={isSubmitting || title === "" || !dateRange?.from || !dateRange?.to}>
                    {isSubmitting ? "Creating..." : "Create Meeting"}
                  </Button>
                </CardFooter>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </Layout>
  )
}

