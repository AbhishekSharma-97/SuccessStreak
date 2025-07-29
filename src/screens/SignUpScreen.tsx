import React, {useState} from 'react';
import {View, Text, StyleSheet, ScrollView, Alert, KeyboardAvoidingView, Platform, TouchableOpacity, ActivityIndicator} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {colors, shadows} from '../theme/theme';
import AuthInput from '../components/AuthInput';
import AuthButton from '../components/AuthButton';
import {useAuth} from '../context/AuthContext';
import Icon from 'react-native-vector-icons/FontAwesome';

type AuthStackParamList = {
  Login: undefined;
  SignUp: undefined;
};

type SignUpScreenNavigationProp = StackNavigationProp<AuthStackParamList, 'SignUp'>;

const SignUpScreen: React.FC = () => {
  const navigation = useNavigation<SignUpScreenNavigationProp>();
  const {signUp, signInWithGoogle} = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
    confirmPassword?: string;
    general?: string;
  }>({});

  const validateForm = () => {
    const newErrors: typeof errors = {};

    // Email validation
    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Please enter a valid email';
    }

    // Password validation
    if (!password.trim()) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    } else if (!/(?=.*[a-z])/.test(password)) {
      newErrors.password = 'Password must contain at least one lowercase letter';
    } else if (!/(?=.*[A-Z])/.test(password)) {
      newErrors.password = 'Password must contain at least one uppercase letter';
    } else if (!/(?=.*\d)/.test(password)) {
      newErrors.password = 'Password must contain at least one number';
    }

    // Confirm password validation
    if (!confirmPassword.trim()) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignUp = async () => {
    if (!validateForm()) return;

    setLoading(true);
    setErrors({});

    try {
      const {error} = await signUp(email.trim(), password);

      if (error) {
        setErrors({general: error.message});
      } else {
        Alert.alert('Success!', 'Please check your email to verify your account before signing in.', [
          {
            text: 'OK',
            onPress: () => navigation.navigate('Login'),
          },
        ]);
      }
    } catch (error) {
      setErrors({general: 'An unexpected error occurred'});
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = () => {
    navigation.navigate('Login');
  };

  const handleGoogleSignUp = async () => {
    setGoogleLoading(true);
    setErrors({});
    try {
      const result = await signInWithGoogle();
      if (result && result.error) {
        setErrors({general: result.error.message});
      }
      // No need to handle authUrl or open WebView
    } catch (error) {
      setErrors({general: 'An unexpected error occurred'});
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.keyboardAvoidingView}>
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
          <View style={styles.header}>
            <Text style={styles.title}>Create Account</Text>
            <Text style={styles.subtitle}>Start your success streak journey today</Text>
          </View>

          <View style={styles.form}>
            <AuthInput
              label="Email"
              placeholder="Enter your email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              error={errors.email}
            />

            <AuthInput
              label="Password"
              placeholder="Create a password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              error={errors.password}
            />

            <AuthInput
              label="Confirm Password"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
              error={errors.confirmPassword}
            />

            {errors.general && (
              <View style={styles.errorContainer}>
                <Text style={styles.errorText}>{errors.general}</Text>
              </View>
            )}

            <AuthButton title="Create Account" onPress={handleSignUp} loading={loading} style={styles.signUpButton} />

            <TouchableOpacity style={[styles.googleButton, googleLoading && {opacity: 0.7}]} onPress={handleGoogleSignUp} disabled={googleLoading}>
              <View style={styles.googleButtonContent}>
                <Icon name="google" size={20} color="#DB4437" style={{marginRight: 8}} />
                <Text style={styles.googleButtonText}>Sign up with Google</Text>
                {googleLoading && <ActivityIndicator size="small" color="#DB4437" style={{marginLeft: 8}} />}
              </View>
            </TouchableOpacity>

            <View style={styles.passwordRequirements}>
              <Text style={styles.requirementsTitle}>Password Requirements:</Text>
              <Text style={styles.requirement}>• At least 6 characters</Text>
              <Text style={styles.requirement}>• One lowercase letter</Text>
              <Text style={styles.requirement}>• One uppercase letter</Text>
              <Text style={styles.requirement}>• One number</Text>
            </View>
          </View>

          <View style={styles.footer}>
            <Text style={styles.footerText}>Already have an account? </Text>
            <TouchableOpacity onPress={handleLogin}>
              <Text style={styles.loginText}>Sign In</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingVertical: 32,
  },
  header: {
    alignItems: 'center',
    marginBottom: 48,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
  },
  form: {
    marginBottom: 32,
  },
  errorContainer: {
    backgroundColor: colors.error + '10',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
    borderLeftWidth: 4,
    borderLeftColor: colors.error,
  },
  errorText: {
    color: colors.error,
    fontSize: 14,
  },
  signUpButton: {
    marginTop: 8,
  },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#DB4437',
    borderRadius: 8,
    paddingVertical: 12,
    marginTop: 12,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  googleButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  googleButtonText: {
    color: '#DB4437',
    fontSize: 16,
    fontWeight: '600',
  },
  passwordRequirements: {
    backgroundColor: colors.surfaceLight,
    padding: 16,
    borderRadius: 12,
    marginTop: 16,
    borderWidth: 1,
    borderColor: colors.borderLight,
  },
  requirementsTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: 8,
  },
  requirement: {
    fontSize: 12,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 'auto',
    paddingTop: 32,
  },
  footerText: {
    color: colors.textSecondary,
    fontSize: 14,
  },
  loginText: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: '600',
  },
});

export default SignUpScreen;
