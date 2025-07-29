import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
        animation: 'slide_from_right',
      }}>
      <Stack.Screen name={'Login'} component={LoginScreen} />
      <Stack.Screen name={'SignUp'} component={SignUpScreen} />
      <Stack.Screen name={'ForgotPassword'} component={ForgotPasswordScreen} />
    </Stack.Navigator>
  );
};

export default AuthStack;
