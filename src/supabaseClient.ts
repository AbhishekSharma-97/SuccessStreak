import { createClient } from '@supabase/supabase-js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import 'react-native-url-polyfill/auto';
import Config from 'react-native-config';

// Hardcoded Supabase credentials
const SUPABASE_URL = Config.SUPABASE_URL as string;

const SUPABASE_ANON_KEY = Config.SUPABASE_ANON_KEY as string;

export const supabase = createClient(
  SUPABASE_URL,
  SUPABASE_ANON_KEY,
  {
    auth: {
      storage: AsyncStorage,
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true,
      flowType: 'pkce',
    },
  },
); 