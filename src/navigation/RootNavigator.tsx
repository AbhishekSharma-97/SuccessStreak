import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {ActivityIndicator, View, StyleSheet} from 'react-native';
import AppStack from './AppStack';
import AuthStack from './AuthStack';
import {useAuth} from '../context/AuthContext';
import {colors} from '../theme/theme';

const Stack = createNativeStackNavigator();

const RootNavigator = () => {
  const {user, loading} = useAuth();

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return <NavigationContainer>{user ? <AppStack /> : <AuthStack />}</NavigationContainer>;
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
});

export default RootNavigator;
