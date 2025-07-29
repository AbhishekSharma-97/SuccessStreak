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
      if (
        event.url.startsWith('https://rdbdsawmufeqyytxuvvv.supabase.co/auth/v1/callback') ||
        event.url.startsWith('successstreak://oauth/callback')
      ) {
        // Refresh the session from Supabase
        await supabase.auth.getSession();
        // Optionally, you can trigger a UI update or navigation here
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
