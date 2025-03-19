"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "@/lib/toast"
import { addParticipant } from "@/app/actions"
import AvailabilitySelector from "./availability-selector"

interface ParticipantFormProps {
  meetingId: string
  dateRange: string[]
  timeRange: {
    start: string
    end: string
  }
}

export default function ParticipantForm({ meetingId, dateRange, timeRange }: ParticipantFormProps) {
  const [name, setName] = useState("")
  const [availability, setAvailability] = useState<Record<string, boolean>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!name) {
      toast.error("Please enter your name to continue.", {
        description: "Name is required to submit your availability.",
      })
      return
    }

    // Check if any availability is selected
    const hasAvailability = Object.values(availability).some((value) => value === true)

    if (!hasAvailability) {
      toast.error("No availability selected", {
        description: "Please select at least one time slot when you're available.",
      })
      return
    }

    setIsSubmitting(true)

    try {
      const result = await addParticipant({
        meetingId,
        name,
        availability,
      })

      if (result.success) {
        setIsSubmitted(true)
        toast.success("Availability submitted!", {
          description: "Your availability has been recorded successfully.",
        })

        // Force a refresh of the page to update the heatmap
        window.location.reload()
      } else {
        toast.error("Submission failed", {
          description: result.error || "An error occurred while submitting your availability.",
        })
      }
    } catch (error) {
      console.error("Failed to submit availability:", error)
      toast.error("Submission failed", {
        description: "An error occurred while submitting your availability.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <Card className="h-full">
          <CardHeader>
            <CardTitle>Thank You!</CardTitle>
            <CardDescription>Your availability has been recorded. You can close this page now.</CardDescription>
          </CardHeader>
        </Card>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="h-full"
    >
      <Card className="h-full">
        <CardHeader>
          <CardTitle>Mark Your Availability</CardTitle>
          <CardDescription>Click and drag to select the times when you're available.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Your Name</Label>
              <Input
                id="name"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="space-y-4">
              <Label>Availability</Label>
              <div className="border rounded-md overflow-x-auto">
                <AvailabilitySelector
                  dateRange={dateRange}
                  timeRange={timeRange}
                  onAvailabilityChange={setAvailability}
                />
              </div>
              <p className="text-sm text-muted-foreground">
                Click and drag to select multiple time slots. Click again to deselect.
              </p>
            </div>

            <CardFooter className="flex justify-end px-0 pt-4">
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="w-full">
                <Button type="submit" disabled={isSubmitting} className="w-full">
                  {isSubmitting ? "Submitting..." : "Submit Availability"}
                </Button>
              </motion.div>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  )
}

