"use server"

import { revalidatePath } from "next/cache"
import { nanoid } from "nanoid"
import { sql } from "@/lib/db"
import { withActionRateLimit, RATE_LIMIT_CONFIG } from "@/lib/rate-limit"

// Original createMeeting function
async function _createMeeting({
  title,
  description,
  dateRange,
  timeRange,
}: {
  title: string
  description: string
  dateRange: string[]
  timeRange: {
    start: string
    end: string
  }
}) {
  try {
    // Generate a unique ID for the meeting
    const meetingId = nanoid(10)

    // Insert the meeting into the database
    await sql`
      INSERT INTO meetings (id, title, description, date_range, time_range)
      VALUES (${meetingId}, ${title}, ${description}, ${JSON.stringify(dateRange)}, ${JSON.stringify(timeRange)})
    `

    return {
      success: true,
      meetingId,
    }
  } catch (error) {
    console.error("Failed to create meeting:", error)
    return {
      success: false,
      error: "Failed to create meeting",
    }
  }
}

// Original getMeeting function
async function _getMeeting(id: string) {
  try {
    // Get the meeting from the database
    const meeting = await sql`
      SELECT * FROM meetings WHERE id = ${id}
    `

    if (meeting.length === 0) {
      return null
    }

    // Get all participants for this meeting with their availability
    const participants = await sql`
      SELECT * FROM participants WHERE meeting_id = ${id}
    `

    // Format the meeting data
    const formattedMeeting = {
      id: meeting[0].id,
      title: meeting[0].title,
      description: meeting[0].description || "",
      dateRange: meeting[0].date_range,
      timeRange: meeting[0].time_range,
      createdAt: meeting[0].created_at,
      participants: participants.map((participant) => ({
        id: participant.id,
        name: participant.name,
        availability: participant.availability || {},
      })),
    }

    return formattedMeeting
  } catch (error) {
    console.error("Failed to get meeting:", error)
    return null
  }
}

// Original addParticipant function
async function _addParticipant({
  meetingId,
  name,
  availability,
}: {
  meetingId: string
  name: string
  availability: Record<string, boolean>
}) {
  try {
    // Check if the meeting exists
    const meeting = await sql`SELECT id FROM meetings WHERE id = ${meetingId}`

    if (meeting.length === 0) {
      return {
        success: false,
        error: "Meeting not found",
      }
    }

    // Generate a unique ID for the participant
    const participantId = nanoid(8)

    // Insert the participant with availability as JSONB
    await sql`
      INSERT INTO participants (id, meeting_id, name, availability)
      VALUES (${participantId}, ${meetingId}, ${name}, ${JSON.stringify(availability)})
    `

    revalidatePath(`/meeting/${meetingId}`)

    return {
      success: true,
      participantId,
    }
  } catch (error) {
    console.error("Failed to add participant:", error)
    return {
      success: false,
      error: `Failed to add participant: ${error instanceof Error ? error.message : String(error)}`,
    }
  }
}

// Original updateAvailability function
async function _updateAvailability({
  meetingId,
  participantId,
  availability,
}: {
  meetingId: string
  participantId: string
  availability: Record<string, boolean>
}) {
  try {
    // Check if the participant exists and belongs to the meeting
    const participant = await sql`
      SELECT p.id 
      FROM participants p
      JOIN meetings m ON p.meeting_id = m.id
      WHERE p.id = ${participantId} AND m.id = ${meetingId}
    `

    if (participant.length === 0) {
      return {
        success: false,
        error: "Participant not found or does not belong to the meeting",
      }
    }

    // Update the participant's availability
    await sql`
      UPDATE participants
      SET availability = ${JSON.stringify(availability)}
      WHERE id = ${participantId}
    `

    revalidatePath(`/meeting/${meetingId}`)

    return {
      success: true,
    }
  } catch (error) {
    console.error("Failed to update availability:", error)
    return {
      success: false,
      error: `Failed to update availability: ${error instanceof Error ? error.message : String(error)}`,
    }
  }
}

// Apply rate limits to the server actions
export const createMeeting = withActionRateLimit(_createMeeting, {
  limit: RATE_LIMIT_CONFIG.SERVER_ACTIONS.CREATE.LIMIT,
  windowInSeconds: RATE_LIMIT_CONFIG.SERVER_ACTIONS.CREATE.WINDOW_SECONDS,
})

export const getMeeting = withActionRateLimit(_getMeeting, {
  limit: RATE_LIMIT_CONFIG.SERVER_ACTIONS.READ.LIMIT,
  windowInSeconds: RATE_LIMIT_CONFIG.SERVER_ACTIONS.READ.WINDOW_SECONDS,
})

export const addParticipant = withActionRateLimit(_addParticipant, {
  limit: RATE_LIMIT_CONFIG.SERVER_ACTIONS.CREATE.LIMIT,
  windowInSeconds: RATE_LIMIT_CONFIG.SERVER_ACTIONS.CREATE.WINDOW_SECONDS,
})

export const updateAvailability = withActionRateLimit(_updateAvailability, {
  limit: RATE_LIMIT_CONFIG.SERVER_ACTIONS.UPDATE.LIMIT,
  windowInSeconds: RATE_LIMIT_CONFIG.SERVER_ACTIONS.UPDATE.WINDOW_SECONDS,
})

