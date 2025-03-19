"use client"
import { format, differenceInDays, addDays } from "date-fns"
import { CalendarIcon } from "lucide-react"
import type { DateRange } from "react-day-picker"
import { useState } from "react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { toast } from "@/lib/toast"

interface DateRangePickerProps {
  dateRange: DateRange | undefined
  onDateRangeChange: (dateRange: DateRange | undefined) => void
  className?: string
  maxDays?: number
}

export function DateRangePicker({ dateRange, onDateRangeChange, className, maxDays = 7 }: DateRangePickerProps) {
  const [isOpen, setIsOpen] = useState(false)

  // Handle date selection with max days limit
  const handleSelect = (range: DateRange | undefined) => {
    if (!range?.from) {
      onDateRangeChange(range)
      return
    }

    if (range.to) {
      const daysDiff = differenceInDays(range.to, range.from)

      if (daysDiff > maxDays - 1) {
        // If selection exceeds max days, limit it
        const limitedRange = {
          from: range.from,
          to: addDays(range.from, maxDays - 1),
        }
        onDateRangeChange(limitedRange)

        toast.info("Date range limited", {
          description: `Maximum ${maxDays} days allowed for better display.`,
        })
        return
      }
    }

    onDateRangeChange(range)
  }

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn("w-full justify-start text-left font-normal", !dateRange && "text-muted-foreground")}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {dateRange?.from ? (
              dateRange.to ? (
                <>
                  {format(dateRange.from, "LLL dd, y")} - {format(dateRange.to, "LLL dd, y")}
                </>
              ) : (
                format(dateRange.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date range (max {maxDays} days)</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={dateRange?.from}
            selected={dateRange}
            onSelect={(range) => {
              handleSelect(range)
              // Removed auto-closing behavior to keep calendar open until manually closed
            }}
            numberOfMonths={2}
            footer={
              <p className="text-xs text-center text-muted-foreground pt-2 pb-1">
                Select a maximum of {maxDays} days
              </p>
            }
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}

