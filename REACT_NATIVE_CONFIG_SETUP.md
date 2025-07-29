# React Native Config Setup Guide

## Current Setup

The app is now configured to use `react-native-config` for environment variables. Here's what's been set up:

### 1. Dependencies

- ✅ `react-native-config` installed
- ❌ `react-native-dotenv` removed

### 2. Configuration Files

- ✅ `babel.config.js` - Configured to use `react-native-config`
- ✅ `src/supabaseClient.ts` - Uses `react-native-config` with fallback to hardcoded values

### 3. How it works

The app will:

1. Try to load environment variables from `react-native-config`
2. If not found, fall back to hardcoded values
3. Log the values being used

## To add environment variables:

### Option 1: Create a .env file (Recommended)

Create a `.env` file in the root directory:

```
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-anon-key-here
```

### Option 2: Use hardcoded values (Current setup)

The app currently uses hardcoded values as fallback, so it will work immediately.

## Testing the setup:

1. **Check console logs** - You should see:

   ```
   SUPABASE_URL: https://rdbdsawmufeqyytxuvvv.supabase.co
   SUPABASE_ANON_KEY: ***
   ```

2. **Test authentication** - Try signing up or signing in to verify Supabase connection works

## Benefits of this setup:

- ✅ Simple and reliable
- ✅ No complex babel configurations
- ✅ Works immediately with fallback values
- ✅ Easy to add environment variables later
- ✅ No conflicts between different environment loading methods

## Next steps:

1. Test the app to ensure authentication works
2. If you want to use environment variables, create a `.env` file
3. The app will automatically pick up the `.env` file when you restart the development server
