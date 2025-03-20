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

```
DATABASE_URL=your_neon_database_connection_string
```

## Security Features

### Rate Limiting

The application includes rate limiting to protect against abuse:

- API endpoints: Limited to 60 requests per minute
- Database setup endpoint: Limited to 5 requests per minute
- Creating meetings: Limited to 10 meetings per minute
- Adding participants: Limited to 20 participants per minute
- Updating availability: Limited to 30 updates per minute

Rate limiting helps protect your application from excessive usage and potential denial of service attacks.

### Production Considerations

For production environments, consider replacing the in-memory rate limiter with a distributed solution:

1. Add Redis for distributed rate limiting across multiple server instances
2. Implement IP-based blocking for repeat offenders
3. Set up monitoring and alerts for unusual traffic patterns

