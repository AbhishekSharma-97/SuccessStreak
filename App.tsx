import React, {useEffect} from 'react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Linking} from 'react-native';
import RootNavigator from './src/navigation/RootNavigator';
import {AuthProvider} from './src/context/AuthContext';
import {supabase} from './src/supabaseClient';

function App(): React.JSX.Element {
  useEffect(() => {
    const handleDeepLink = async (event: {url: string}) => {
      // Check if the URL is an OAuth callback
      console.log('Deep link received:', event.url);
      if (
        event.url.startsWith('https://rdbdsawmufeqyytxuvvv.supabase.co/auth/v1/callback') ||
        event.url.startsWith('successstreak://oauth/callback')
      ) {
        try {
          // Parse the URL to get the authorization code
          const url = new URL(event.url);
          const code = url.searchParams.get('code');

          if (code) {
            // Exchange the authorization code for a session
            const {error} = await supabase.auth.exchangeCodeForSession(code);

            if (error) {
              console.error('Error exchanging code for session:', error);
            }
          }
        } catch (error) {
          console.error('Error handling OAuth callback:', error);
        }
      }
    };

    const subscription = Linking.addEventListener('url', handleDeepLink);

    // Handle the case where the app is opened from a cold start with a deep link
    Linking.getInitialURL().then(url => {
      if (url) {
        handleDeepLink({url});
      }
    });

    return () => {
      subscription.remove();
    };
  }, []);

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <SafeAreaProvider>
        <AuthProvider>
          <RootNavigator />
        </AuthProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

export default App;
