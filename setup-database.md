# Database Setup Instructions

## Setup Supabase Database

1. Go to your Supabase project dashboard: https://supabase.com/dashboard/project/wctlewjmfanwhefjiobd

2. Navigate to the SQL Editor

3. Run the SQL schema provided in `supabase-schema.sql` to create the necessary tables and policies.

4. The schema includes:
   - `users` table for user management
   - `applications` table for application tracking
   - `profiles` table for extended user information
   - `notifications` table for user notifications
   - Row Level Security (RLS) policies for data protection
   - Indexes for performance optimization
   - Triggers for automatic timestamp updates

## Alternative Setup

You can also run the schema directly using Supabase CLI:

```bash
npx supabase db reset
```

Or copy the contents of `supabase-schema.sql` and paste it into the Supabase SQL Editor.

## Verification

After running the schema, the database connection test should pass:

```bash
node test-db-connection.js
```

The setup is complete when you see "✅ Database connection successful!"