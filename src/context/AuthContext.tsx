import React, {createContext, useContext, useEffect, useState} from 'react';
import {Session, User} from '@supabase/supabase-js';
import {supabase} from '../supabaseClient';
import {Linking} from 'react-native';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signUp: (email: string, password: string) => Promise<{error: any}>;
  signIn: (email: string, password: string) => Promise<{error: any}>;
  signInWithGoogle: () => Promise<{error: any}>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<{error: any}>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({children}) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if supabase is properly initialized
    if (!supabase) {
      console.error('Supabase client is not initialized');
      setLoading(false);
      return;
    }

    // Get initial session
    const getInitialSession = async () => {
      try {
        const {
          data: {session},
        } = await supabase.auth.getSession();
        setSession(session);
        setUser(session?.user ?? null);
      } catch (error) {
        console.error('Error getting initial session:', error);
      } finally {
        setLoading(false);
      }
    };

    getInitialSession();

    // Listen for auth changes
    try {
      const {
        data: {subscription},
      } = supabase.auth.onAuthStateChange(async (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
      });

      return () => subscription.unsubscribe();
    } catch (error) {
      console.error('Error setting up auth state listener:', error);
      setLoading(false);
    }
  }, []);

  const signUp = async (email: string, password: string) => {
    try {
      const {error} = await supabase.auth.signUp({
        email,
        password,
      });
      return {error};
    } catch (error) {
      return {error};
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const {error} = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      return {error};
    } catch (error) {
      return {error};
    }
  };

  const signInWithGoogle = async () => {
    try {
      const {data, error} = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: 'successstreak://oauth/callback',
        },
      });

      if (error) {
        return {error};
      }

      if (data?.url) {
        await Linking.openURL(data.url);
      }

      return {error: null};
    } catch (error) {
      return {error};
    }
  };

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const resetPassword = async (email: string) => {
    try {
      const {error} = await supabase.auth.resetPasswordForEmail(email);
      return {error};
    } catch (error) {
      return {error};
    }
  };

  const value = {
    user,
    session,
    loading,
    signUp,
    signIn,
    signInWithGoogle,
    signOut,
    resetPassword,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
