# Authentication Setup Guide

This guide will help you set up Supabase authentication for your SuccessStreak app.

## Prerequisites

1. A Supabase account and project
2. React Native development environment set up

## Step 1: Create a Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign up/login
2. Create a new project
3. Wait for the project to be set up (this may take a few minutes)

## Step 2: Get Your Supabase Credentials

1. In your Supabase dashboard, go to **Settings** > **API**
2. Copy the following values:
   - **Project URL** (looks like: `https://your-project-id.supabase.co`)
   - **anon public** key (starts with `eyJ...`)

## Step 3: Configure Environment Variables

1. Create a `.env` file in your project root (same level as `package.json`)
2. Add the following content to your `.env` file:

```env
SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_ANON_KEY=your-anon-key-here
```

3. Replace the placeholder values with your actual Supabase credentials
4. Make sure `.env` is in your `.gitignore` file to keep your credentials secure

## Step 4: Enable Email Authentication

1. In your Supabase dashboard, go to **Authentication** > **Providers**
2. Make sure **Email** provider is enabled
3. Configure email templates if desired (optional)

## Step 5: Set Up Google Sign-In

### 5.1 Google Cloud Console Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google+ API:
   - Go to **APIs & Services** > **Library**
   - Search for "Google+ API" and enable it
4. Create OAuth 2.0 credentials:
   - Go to **APIs & Services** > **Credentials**
   - Click **Create Credentials** > **OAuth 2.0 Client IDs**
   - Choose **Web application** for Supabase
   - Add authorized redirect URIs:
     - `https://your-project-id.supabase.co/auth/v1/callback`
     - `https://your-project-id.supabase.co/auth/v1/callback/google`
5. Copy the **Client ID** and **Client Secret**

### 5.2 Configure Supabase Google Provider

1. In your Supabase dashboard, go to **Authentication** > **Providers**
2. Find **Google** and click **Enable**
3. Enter your Google OAuth credentials:
   - **Client ID**: Your Google OAuth Client ID
   - **Client Secret**: Your Google OAuth Client Secret
4. Save the configuration

### 5.3 Install React Native Google Sign-In

```bash
npm install @react-native-google-signin/google-signin
```

### 5.4 Android Configuration

1. Add your Google OAuth Client ID to `android/app/src/main/res/values/strings.xml`:

```xml
<resources>
    <string name="app_name">SuccessStreak</string>
    <string name="google_client_id">your-google-client-id.apps.googleusercontent.com</string>
</resources>
```

2. Update `android/app/build.gradle`:

```gradle
android {
    defaultConfig {
        // ... other config
        resValue "string", "google_client_id", "your-google-client-id.apps.googleusercontent.com"
    }
}
```

3. Update `android/app/src/main/AndroidManifest.xml`:

```xml
<manifest>
    <application>
        <!-- ... other config -->
        <meta-data
            android:name="com.google.android.gms.version"
            android:value="@integer/google_play_services_version" />
    </application>
</manifest>
```

### 5.5 iOS Configuration

1. Add your Google OAuth Client ID to `ios/SuccessStreak/Info.plist`:

```xml
<key>CFBundleURLTypes</key>
<array>
    <dict>
        <key>CFBundleURLName</key>
        <string>google</string>
        <key>CFBundleURLSchemes</key>
        <array>
            <string>com.googleusercontent.apps.your-client-id</string>
        </array>
    </dict>
</array>
```

2. Install pods:

```bash
cd ios && pod install && cd ..
```

### 5.6 Update AuthContext for Google Sign-In

The current implementation uses Supabase's OAuth flow. For a better user experience, you can also implement native Google Sign-In:

```typescript
// In AuthContext.tsx, add this import:
import {GoogleSignin} from '@react-native-google-signin/google-signin';

// Initialize Google Sign-In in useEffect:
useEffect(() => {
  GoogleSignin.configure({
    webClientId: 'your-google-client-id.apps.googleusercontent.com',
    offlineAccess: true,
  });
  // ... rest of your useEffect
}, []);

// Update signInWithGoogle function:
const signInWithGoogle = async () => {
  try {
    await GoogleSignin.hasPlayServices();
    const userInfo = await GoogleSignin.signIn();
    const {idToken} = userInfo;

    const {error} = await supabase.auth.signInWithIdToken({
      provider: 'google',
      token: idToken,
    });

    return {error};
  } catch (error) {
    return {error};
  }
};
```

## Step 6: Test the Authentication

1. Run your app: `npm run android` or `npm run ios`
2. Try creating a new account with email/password
3. Try signing in with Google
4. Check that both authentication methods work properly

## Features Included

### Authentication Screens

- **Login Screen**: Email and password authentication
- **Sign Up Screen**: Account creation with password validation and Google Sign-In
- **Forgot Password Screen**: Password reset via email

### Authentication Features

- Email/password authentication
- Google Sign-In authentication
- Email verification
- Password reset functionality
- Form validation
- Error handling
- Loading states
- Secure session management

### UI Components

- Custom input components with validation
- Custom button components with loading states
- Google Sign-In button with proper styling
- Consistent styling with your app theme
- Responsive design for different screen sizes

## Security Features

- Password requirements (minimum 6 characters, uppercase, lowercase, number)
- Email validation
- Secure session storage using AsyncStorage
- Automatic token refresh
- Session persistence across app restarts
- OAuth 2.0 security for Google Sign-In

## Troubleshooting

### Common Issues

1. **"Please set your Supabase URL and ANON KEY" error**

   - Make sure your `.env` file exists and has the correct values
   - Restart your development server after adding the `.env` file

2. **Authentication not working**

   - Check that email authentication is enabled in Supabase
   - Verify your credentials are correct
   - Check the console for any error messages

3. **Google Sign-In not working**

   - Verify Google OAuth credentials are correct in Supabase
   - Check that Google+ API is enabled in Google Cloud Console
   - Ensure redirect URIs are properly configured
   - Verify platform-specific configuration (Android/iOS)

4. **Email verification not working**
   - Check your spam folder
   - Verify email templates are configured in Supabase
   - Make sure your email provider allows emails from Supabase

### Getting Help

If you encounter issues:

1. Check the Supabase documentation
2. Look at the console logs for error messages
3. Verify your environment variables are set correctly
4. Make sure your Supabase project is active and not paused
5. Check Google Cloud Console for any OAuth errors

## Next Steps

After setting up authentication, you can:

1. Add additional authentication providers (Apple, Facebook, etc.)
2. Implement user profile management
3. Add role-based access control
4. Set up database policies for user data
5. Add social authentication options
6. Implement biometric authentication
