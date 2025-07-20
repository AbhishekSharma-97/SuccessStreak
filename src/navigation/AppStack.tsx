import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Svg, {Path} from 'react-native-svg';
import HomeScreen from '../screens/HomeScreen';
import NewHabitScreen from '../screens/NewHabitScreen';
import NotificationScreen from '../screens/NotificationScreen';
import SettingsScreen from '../screens/SettingsScreen';
import StatisticsScreen from '../screens/StatisticsScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {colors} from '../theme/theme';
const Tab = createBottomTabNavigator();

const AppStack = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarIcon: ({focused, color, size}) => {
          const icons = {
            HomeScreen: focused ? 'home' : 'home-outline',
            StatisticsScreen: focused ? 'stats-chart' : 'stats-chart-outline',
            NewHabitScreen: focused ? 'add-circle' : 'add-circle-outline',
            NotificationScreen: focused
              ? 'notifications'
              : 'notifications-outline',
            SettingsScreen: focused ? 'settings' : 'settings-outline',
          };
          return (
            <Ionicons
              name={icons[route.name as keyof typeof icons]}
              size={size}
              color={color}
            />
          );
        },
        tabBarActiveTintColor: colors.tabBarActive,
        tabBarInactiveTintColor: colors.textLight,
      })}>
      <Tab.Screen name={'HomeScreen'} component={HomeScreen} />
      <Tab.Screen name={'StatisticsScreen'} component={StatisticsScreen} />
      <Tab.Screen name={'NewHabitScreen'} component={NewHabitScreen} />
      <Tab.Screen name={'NotificationScreen'} component={NotificationScreen} />
      <Tab.Screen name={'SettingsScreen'} component={SettingsScreen} />
    </Tab.Navigator>
  );
};

export default AppStack;
