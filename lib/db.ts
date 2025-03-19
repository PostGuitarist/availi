import { neon } from "@neondatabase/serverless"

// Check if the DATABASE_URL environment variable is defined
if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL environment variable is not defined")
}

// Create a SQL query executor using the Neon serverless driver
export const sql = neon(process.env.DATABASE_URL)

