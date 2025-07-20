import React from 'react';
import {View, StyleSheet} from 'react-native';
import {colors, shadows} from '../theme/theme';

interface CircularIconProps {
  children: React.ReactNode;
  size?: number;
  backgroundColor?: string;
  shadow?: boolean;
  shadowSize?: 'sm' | 'md' | 'lg';
}

const CircularIcon: React.FC<CircularIconProps> = ({
  children,
  size = 80,
  backgroundColor = colors.surface,
  shadow = true,
  shadowSize = 'md',
}) => {
  const containerStyle = {
    width: size,
    height: size,
    borderRadius: size / 2,
    backgroundColor,
    ...(shadow && shadows[shadowSize]),
  };

  return (
    <View style={[styles.container, containerStyle]}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
});

export default CircularIcon; 