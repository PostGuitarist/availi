import { NextResponse } from "next/server"
import { runMigrations } from "@/lib/migrations"

export async function GET() {
  try {
    const result = await runMigrations()

    if (result.success) {
      return NextResponse.json({
        success: true,
        message: "Database setup completed successfully",
      })
    } else {
      return NextResponse.json(
        {
          success: false,
          error: "Failed to set up database",
          details: result.error,
        },
        { status: 500 },
      )
    }
  } catch (error) {
    console.error("Database setup error:", error)
    return NextResponse.json(
      {
        success: false,
        error: "An unexpected error occurred",
        details: error,
      },
      { status: 500 },
    )
  }
}

