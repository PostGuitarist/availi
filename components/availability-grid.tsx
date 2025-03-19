"use client"

import { useMemo } from "react"
import { motion } from "framer-motion"
import { format, parseISO } from "date-fns"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface AvailabilityGridProps {
  meeting: {
    id: string
    title: string
    dateRange: string[]
    timeRange: {
      start: string
      end: string
    }
    participants: {
      id: string
      name: string
      availability: Record<string, boolean>
    }[]
  }
}

export default function AvailabilityGrid({ meeting }: AvailabilityGridProps) {
  const { dateRange, timeRange, participants } = meeting

  // Generate hours array from timeRange
  const hours = generateHoursArray(timeRange.start, timeRange.end)

  // Create a map of availability counts for each cell
  const availabilityMap = useMemo(() => {
    const map: Record<string, { available: number; total: number; names: string[] }> = {}

    // Initialize all cells with zero availability
    dateRange.forEach((date) => {
      hours.forEach((hour) => {
        const cellKey = `${date}|${hour}`
        map[cellKey] = { available: 0, total: participants.length, names: [] }
      })
    })

    // Count availability for each cell
    participants.forEach((participant) => {
      dateRange.forEach((date) => {
        hours.forEach((hour) => {
          const cellKey = `${date}|${hour}`
          const isAvailable = participant.availability[cellKey] === true

          if (isAvailable) {
            map[cellKey].available += 1
            map[cellKey].names.push(participant.name)
          }
        })
      })
    })

    return map
  }, [dateRange, hours, participants])

  // Find the best time slots
  const bestTimeSlots = useMemo(() => {
    // Create an array of all cells with their availability
    const cells = Object.entries(availabilityMap).map(([key, data]) => {
      const [date, hour] = key.split("|")
      return {
        date,
        hour,
        available: data.available,
        total: data.total,
        percentage: data.total > 0 ? (data.available / data.total) * 100 : 0,
      }
    })

    // Sort by availability percentage (highest first), then by absolute count
    return cells
      .filter((cell) => cell.available > 0) // Only include slots where at least one person is available
      .sort((a, b) => {
        // First sort by percentage
        const percentageDiff = b.percentage - a.percentage
        if (percentageDiff !== 0) return percentageDiff

        // If percentage is the same, sort by absolute count
        return b.available - a.available
      })
      .slice(0, 5) // Get top 5
  }, [availabilityMap])

  // Calculate cell width based on number of days
  const cellWidth = dateRange.length <= 3 ? "w-20" : dateRange.length <= 5 ? "w-16" : "w-14"

  if (participants.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>No Participants Yet</CardTitle>
          <CardDescription>Share the meeting link to collect availability from participants.</CardDescription>
        </CardHeader>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Best Times to Meet</CardTitle>
          <CardDescription>
            Based on {participants.length} participant{participants.length !== 1 ? "s" : ""}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {bestTimeSlots.length > 0 ? (
            <div className="space-y-2">
              {bestTimeSlots.map((slot, index) => {
                const cellKey = `${slot.date}|${slot.hour}`
                const { available, total, names } = availabilityMap[cellKey] || { available: 0, total: 0, names: [] }
                const percentage = total > 0 ? Math.round((available / total) * 100) : 0

                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="flex items-center space-x-4 rounded-md border p-3"
                  >
                    <div
                      className={`h-10 w-10 flex items-center justify-center rounded-full bg-blue-500 text-white font-bold`}
                    >
                      {available}/{total}
                    </div>
                    <div>
                      <p className="font-medium">{format(parseISO(slot.date), "EEEE, MM/dd/yyyy")}</p>
                      <p className="text-sm text-muted-foreground">{formatHour(slot.hour)}</p>
                      <p className="text-xs text-muted-foreground">{percentage}% available</p>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          ) : (
            <p className="text-muted-foreground">No availability data yet</p>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Availability Heatmap</CardTitle>
          <CardDescription>View availability for all time slots</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative overflow-x-auto rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 p-8">
            <div className="min-w-max">
              <div className="grid grid-flow-col auto-cols-fr pl-16">
                {dateRange.map((date, i) => (
                  <div key={i} className="px-2 pb-4 text-center">
                    <div className="text-xs text-gray-500 mb-1">{format(parseISO(date), "MM/dd")}</div>
                    <div className="text-sm font-medium text-gray-600">{format(parseISO(date), "EEE")}</div>
                  </div>
                ))}
              </div>

              <div className="space-y-4">
                {hours.map((hour, hourIndex) => (
                  <div key={hourIndex} className="grid grid-flow-col auto-cols-fr gap-2 pl-16">
                    {dateRange.map((date, dateIndex) => {
                      const cellKey = `${date}|${hour}`
                      const { available, total, names } = availabilityMap[cellKey] || {
                        available: 0,
                        total: 0,
                        names: [],
                      }

                      // Calculate opacity based on percentage of availability
                      const percentage = total > 0 ? available / total : 0

                      // Determine the background color based on availability
                      let bgColor = "bg-blue-100 dark:bg-blue-900/20"
                      let opacity = 0.2

                      if (available > 0) {
                        // For cells with availability, use a blue color with opacity based on percentage
                        bgColor = "bg-blue-500 dark:bg-blue-600"

                        // Scale opacity from 0.3 to 1 based on percentage
                        opacity = 0.3 + percentage * 0.7
                      }

                      return (
                        <TooltipProvider key={dateIndex}>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <motion.div
                                className={`h-12 ${cellWidth} rounded-lg transition-colors ${bgColor}`}
                                initial={false}
                                animate={{
                                  opacity: opacity,
                                  scale: available > 0 ? 1 : 0.95,
                                }}
                                transition={{ duration: 0.1 }}
                                style={{ opacity }}
                              />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="font-medium">
                                {format(parseISO(date), "MM/dd/yyyy")} at {formatHour(hour)}
                              </p>
                              <p>
                                {available} of {total} available ({total > 0 ? Math.round(percentage * 100) : 0}%)
                              </p>
                              {names.length > 0 && (
                                <div className="mt-1 text-xs">
                                  <p className="font-medium">Available:</p>
                                  <ul>
                                    {names.map((name, i) => (
                                      <li key={i}>{name}</li>
                                    ))}
                                  </ul>
                                </div>
                              )}
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      )
                    })}
                  </div>
                ))}
              </div>
            </div>

            <div className="absolute left-6 top-16 space-y-4">
              {hours.map((hour, index) => (
                <div key={index} className="h-12 flex items-center">
                  <span className="text-sm text-gray-500 whitespace-nowrap">{formatHour(hour)}</span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function generateHoursArray(start: string, end: string): string[] {
  const startHour = Number.parseInt(start.split(":")[0])
  const endHour = Number.parseInt(end.split(":")[0])

  const hours: string[] = []
  for (let i = startHour; i <= endHour; i++) {
    hours.push(`${String(i).padStart(2, "0")}:00`)
  }

  return hours
}

function formatHour(hour: string): string {
  const hourNum = Number.parseInt(hour.split(":")[0])
  if (hourNum === 0) return "12 AM"
  if (hourNum === 12) return "12 PM"
  if (hourNum < 12) return `${hourNum} AM`
  return `${hourNum - 12} PM`
}

