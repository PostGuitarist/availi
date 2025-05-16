# Availi - Meeting Scheduler

## Overview

Availi is a meeting scheduling application that allows users to create meetings, add participants, and check availability. It uses a PostgreSQL database hosted on Neon and provides a RESTful API for interaction.

**This project was made in part to test the UI design capabilities of Vercel's v0, for initial design testing for small components in [SwiftSeg](https://github.com/swiftseg). Only ~15% of the UI design was made by v0.**

## Tech Stack
- Next.js 15 - React 19
- PostgreSQL (Neon) - DB
- Tailwind CSS - Styling 
- Shadcn UI - Components
- Framer Motion - Animations

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

```
DATABASE_URL=your_neon_database_connection_string
```
<br />
<br />
<br />
<br />

## Feature Overview
- **Create Meetings**: Users can create meetings and add participants.
- **Check Availability**: Users can check the availability of participants for a specific time slot.
- **Rate Limiting**: The application implements rate limiting to prevent abuse and ensure fair usage.
- **Error Handling**: The application handles errors gracefully and provides meaningful error messages to users.
- **Responsive Design**: The application is designed to be responsive and works well on both desktop and mobile devices.
- **User-Friendly UI**: The application uses Tailwind CSS and Shadcn UI for a modern and user-friendly interface.
- **Animations**: The application uses Framer Motion for smooth animations and transitions.
- **PostgreSQL Database**: The application uses a PostgreSQL database hosted on Neon for data storage.

<br />
<br />

### TODO / Future Improvement Ideas

- Implement IP-based blocking for repeat offenders
- Set up monitoring and alerts for unusual traffic patterns
- Consider using a third-party service for advanced rate limiting and security features
- Implement logging for rate-limited requests
- Add a dashboard to monitor rate-limited requests and user behavior
- Consider implementing a CAPTCHA for certain endpoints to prevent automated abuse
- Implement user authentication and authorization to restrict access to certain endpoints

