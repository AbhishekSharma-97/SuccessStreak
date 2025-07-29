import React from 'react';
import {TouchableOpacity, Text, StyleSheet, ActivityIndicator, ViewStyle, TextStyle} from 'react-native';
import {colors, shadows} from '../theme/theme';

interface AuthButtonProps {
  title: string;
  onPress: () => void;
  loading?: boolean;
  disabled?: boolean;
  variant?: 'primary' | 'secondary' | 'outline';
  style?: ViewStyle;
  textStyle?: TextStyle;
}

const AuthButton: React.FC<AuthButtonProps> = ({title, onPress, loading = false, disabled = false, variant = 'primary', style, textStyle}) => {
  const getButtonStyle = () => {
    const baseStyle: any[] = [styles.button, styles[variant]];
    if (disabled || loading) {
      baseStyle.push(styles.disabled);
    }
    return baseStyle;
  };

  const getTextStyle = () => {
    const baseTextStyle: any[] = [styles.text, styles[`${variant}Text`]];
    if (disabled || loading) {
      baseTextStyle.push(styles.disabledText);
    }
    return baseTextStyle;
  };

  return (
    <TouchableOpacity style={[getButtonStyle(), style]} onPress={onPress} disabled={disabled || loading} activeOpacity={0.8}>
      {loading ? (
        <ActivityIndicator color={variant === 'outline' ? colors.primary : colors.textWhite} size="small" />
      ) : (
        <Text style={[getTextStyle(), textStyle]}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 56,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
    ...shadows.md,
  },
  primary: {
    backgroundColor: colors.primary,
  },
  secondary: {
    backgroundColor: colors.secondary,
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: colors.primary,
  },
  disabled: {
    opacity: 0.6,
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
  },
  primaryText: {
    color: colors.textWhite,
  },
  secondaryText: {
    color: colors.textWhite,
  },
  outlineText: {
    color: colors.primary,
  },
  disabledText: {
    opacity: 0.6,
  },
});

export default AuthButton;
