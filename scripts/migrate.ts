import { runMigrations } from "../lib/migrations"

async function main() {
  try {
    const result = await runMigrations()
    if (result.success) {
      console.log("✅ Database migrations completed successfully")
    } else {
      console.error("❌ Database migrations failed:", result.error)
      process.exit(1)
    }
  } catch (error) {
    console.error("❌ Unexpected error during migrations:", error)
    process.exit(1)
  }
}

main()

