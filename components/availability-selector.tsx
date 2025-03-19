"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { format, parseISO } from "date-fns"

interface AvailabilitySelectorProps {
  dateRange: string[]
  timeRange: {
    start: string
    end: string
  }
  onAvailabilityChange: (availability: Record<string, boolean>) => void
}

export default function AvailabilitySelector({
  dateRange,
  timeRange,
  onAvailabilityChange,
}: AvailabilitySelectorProps) {
  const hours = generateHoursArray(timeRange.start, timeRange.end)
  const [selectedCells, setSelectedCells] = useState<Record<string, boolean>>({})
  const [isSelecting, setIsSelecting] = useState(false)
  const [selectionMode, setSelectionMode] = useState<"select" | "deselect">("select")

  const handleMouseDown = (date: string, hour: string) => {
    const cellKey = `${date}|${hour}`
    const newValue = !selectedCells[cellKey]

    setIsSelecting(true)
    setSelectionMode(newValue ? "select" : "deselect")

    setSelectedCells((prev) => ({
      ...prev,
      [cellKey]: newValue,
    }))
  }

  const handleMouseEnter = (date: string, hour: string) => {
    if (!isSelecting) return

    const cellKey = `${date}|${hour}`

    setSelectedCells((prev) => ({
      ...prev,
      [cellKey]: selectionMode === "select",
    }))
  }

  const handleMouseUp = () => {
    setIsSelecting(false)
  }

  useEffect(() => {
    // Send the availability object to the parent component
    onAvailabilityChange(selectedCells)
  }, [selectedCells, onAvailabilityChange])

  useEffect(() => {
    window.addEventListener("mouseup", handleMouseUp)
    return () => {
      window.removeEventListener("mouseup", handleMouseUp)
    }
  }, [])

  const containerWidth = dateRange.length <= 3 ? "max-w-2xl mx-auto" : "w-full"

  return (
    <div
      className={`relative overflow-x-auto rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 p-6 ${containerWidth}`}
    >
      <div className="min-w-max">
        <div className="grid grid-flow-col auto-cols-fr pl-16">
          {dateRange.map((date, i) => (
            <div key={i} className="px-2 pb-4 text-center">
              <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">{format(parseISO(date), "MM/dd")}</div>
              <div className="text-sm font-medium text-gray-600 dark:text-gray-300">
                {format(parseISO(date), "EEE")}
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-4">
          {hours.map((hour, hourIndex) => (
            <div key={hourIndex} className="grid grid-flow-col auto-cols-fr gap-2 pl-16">
              {dateRange.map((date, dateIndex) => {
                const cellKey = `${date}|${hour}`
                const isSelected = selectedCells[cellKey] || false

                return (
                  <motion.div
                    key={dateIndex}
                    className={`h-12 w-full rounded-lg transition-colors cursor-pointer ${
                      isSelected
                        ? "bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700"
                        : "bg-blue-200/50 hover:bg-blue-200 dark:bg-blue-800/30 dark:hover:bg-blue-800/50"
                    }`}
                    initial={false}
                    animate={{
                      scale: isSelected ? 1 : 0.95,
                      opacity: isSelected ? 1 : 0.7,
                    }}
                    transition={{ duration: 0.1 }}
                    onMouseDown={() => handleMouseDown(date, hour)}
                    onMouseEnter={() => handleMouseEnter(date, hour)}
                  />
                )
              })}
            </div>
          ))}
        </div>
      </div>

      <div className="absolute left-6 top-16 space-y-4">
        {hours.map((hour, index) => (
          <div key={index} className="h-12 flex items-center">
            <span className="text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap">{formatHour(hour)}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function generateHoursArray(start: string, end: string): string[] {
  const startHour = Number.parseInt(start.split(":")[0], 10)
  const endHour = Number.parseInt(end.split(":")[0], 10)

  const hours: string[] = []
  for (let i = startHour; i <= endHour; i++) {
    const hourString = `${String(i).padStart(2, "0")}:00`
    hours.push(hourString)
  }

  return hours
}

function formatHour(hour: string): string {
  const hourNum = Number.parseInt(hour.split(":")[0], 10)
  if (hourNum === 0) return "12 AM"
  if (hourNum === 12) return "12 PM"
  if (hourNum < 12) return `${hourNum} AM`
  return `${hourNum - 12} PM`
}

