import React, {useState} from 'react';
import {View, Text, StyleSheet, ScrollView, Alert, KeyboardAvoidingView, Platform, TouchableOpacity} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {colors, shadows} from '../theme/theme';
import AuthInput from '../components/AuthInput';
import AuthButton from '../components/AuthButton';
import {useAuth} from '../context/AuthContext';

type AuthStackParamList = {
  Login: undefined;
  ForgotPassword: undefined;
};

type ForgotPasswordScreenNavigationProp = StackNavigationProp<AuthStackParamList, 'ForgotPassword'>;

const ForgotPasswordScreen: React.FC = () => {
  const navigation = useNavigation<ForgotPasswordScreenNavigationProp>();
  const {resetPassword} = useAuth();

  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{
    email?: string;
    general?: string;
  }>({});
  const [success, setSuccess] = useState(false);

  const validateForm = () => {
    const newErrors: typeof errors = {};

    // Email validation
    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Please enter a valid email';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleResetPassword = async () => {
    if (!validateForm()) return;

    setLoading(true);
    setErrors({});

    try {
      const {error} = await resetPassword(email.trim());

      if (error) {
        setErrors({general: error.message});
      } else {
        setSuccess(true);
        Alert.alert('Reset Link Sent!', 'Please check your email for password reset instructions.', [
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

  const handleBackToLogin = () => {
    navigation.navigate('Login');
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.keyboardAvoidingView}>
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
          <View style={styles.header}>
            <Text style={styles.title}>Reset Password</Text>
            <Text style={styles.subtitle}>Enter your email address and we'll send you a link to reset your password</Text>
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

            {errors.general && (
              <View style={styles.errorContainer}>
                <Text style={styles.errorText}>{errors.general}</Text>
              </View>
            )}

            <AuthButton title="Send Reset Link" onPress={handleResetPassword} loading={loading} style={styles.resetButton} />

            <View style={styles.infoContainer}>
              <Text style={styles.infoTitle}>What happens next?</Text>
              <Text style={styles.infoText}>• You'll receive an email with a password reset link</Text>
              <Text style={styles.infoText}>• Click the link to create a new password</Text>
              <Text style={styles.infoText}>• The link will expire in 24 hours for security</Text>
            </View>
          </View>

          <View style={styles.footer}>
            <TouchableOpacity onPress={handleBackToLogin}>
              <Text style={styles.backToLoginText}>Back to Sign In</Text>
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
  resetButton: {
    marginTop: 8,
  },
  infoContainer: {
    backgroundColor: colors.surfaceLight,
    padding: 16,
    borderRadius: 12,
    marginTop: 24,
    borderWidth: 1,
    borderColor: colors.borderLight,
  },
  infoTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: 12,
  },
  infoText: {
    fontSize: 12,
    color: colors.textSecondary,
    marginBottom: 6,
    lineHeight: 18,
  },
  footer: {
    alignItems: 'center',
    marginTop: 'auto',
    paddingTop: 32,
  },
  backToLoginText: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: '600',
  },
});

export default ForgotPasswordScreen;
