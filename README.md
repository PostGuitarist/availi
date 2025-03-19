# Availi - Meeting Scheduler

## Database Setup

This application uses a Neon PostgreSQL database. Follow these steps to set up your database:

### Option 1: Automatic Setup (Recommended)

1. Make sure your Neon database connection string is set as the `DATABASE_URL` environment variable.
2. Visit `/api/setup-db` in your browser or make a GET request to this endpoint to automatically run the migrations.

### Option 2: Manual Setup

If you prefer to set up the database manually, you can use the SQL script in `db/schema.sql`:

1. Connect to your Neon database using the Neon SQL Editor or any PostgreSQL client.
2. Run the SQL commands from the `db/schema.sql` file.

## Environment Variables

Make sure you have the following environment variable set:

