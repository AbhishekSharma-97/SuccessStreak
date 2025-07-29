# Supabase Setup Guide

## Prerequisites

1. A Supabase account and project
2. Your Supabase project URL and anon key

## Setup Steps

### 1. Create Environment File

Create a `.env` file in the root directory of your project with the following content:

```
SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_ANON_KEY=your-anon-key-here
```

### 2. Get Your Supabase Credentials

1. Go to your Supabase project dashboard
2. Navigate to Settings > API
3. Copy your Project URL and anon/public key
4. Replace the placeholder values in your `.env` file

### 3. Example .env file

```
SUPABASE_URL=https://abcdefghijklmnop.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFiY2RlZmdoaWprbG1ub3AiLCJyb2xlIjoiYW5vbiIsImlhdCI6MTYzNjQ0NjQwMCwiZXhwIjoxOTUyMDIyNDAwfQ.example
```

### 4. Restart Your Development Server

After creating the `.env` file, restart your React Native development server:

```bash
# Stop the current server (Ctrl+C)
# Then restart
npx react-native start --reset-cache
```

### 5. Verify Setup

The app should now work without the "Cannot read property supabase of undefined" error.

## Troubleshooting

### Error: "Cannot read property supabase of undefined"

This error occurs when the Supabase client cannot be initialized due to missing or invalid environment variables.

**Solutions:**

1. Ensure your `.env` file exists in the root directory
2. Verify your Supabase URL and anon key are correct
3. Restart your development server with cache reset
4. Check that the `.env` file is not being ignored by git

### Error: "SUPABASE_URL is not configured"

This means the environment variables are not being loaded properly.

**Solutions:**

1. Check your babel.config.js has the react-native-dotenv plugin
2. Ensure the `.env` file is in the correct location (project root)
3. Verify the variable names match exactly: `SUPABASE_URL` and `SUPABASE_ANON_KEY`

## Security Notes

- Never commit your `.env` file to version control
- The `.env` file should be in your `.gitignore`
- The anon key is safe to use in client-side code as it has limited permissions
