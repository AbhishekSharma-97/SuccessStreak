import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import {View, StyleSheet} from 'react-native';
import HomeScreen from '../screens/HomeScreen';
import NewHabitScreen from '../screens/NewHabitScreen';
import SettingsScreen from '../screens/SettingsScreen';
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
            NewHabitScreen: focused ? 'add' : 'add',
            SettingsScreen: focused ? 'settings' : 'settings-outline',
          };

          // Special styling for the Add Habit tab
          if (route.name === 'NewHabitScreen') {
            return (
              <View style={styles.floatingButton}>
                <Ionicons name={icons[route.name as keyof typeof icons]} size={24} color={colors.textWhite} />
              </View>
            );
          }

          return <Ionicons name={icons[route.name as keyof typeof icons]} size={size} color={color} />;
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textLight,
        tabBarStyle: styles.tabBar,
        tabBarLabelStyle: styles.tabBarLabel,
      })}>
      <Tab.Screen
        name={'HomeScreen'}
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
        }}
      />
      <Tab.Screen
        name={'NewHabitScreen'}
        component={NewHabitScreen}
        options={{
          tabBarLabel: 'Add Habit',
        }}
      />
      <Tab.Screen
        name={'SettingsScreen'}
        component={SettingsScreen}
        options={{
          tabBarLabel: 'Settings',
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: colors.surface,
    borderTopWidth: 1,
    borderTopColor: colors.borderLight,
    paddingTop: 8,
    paddingBottom: 8,
    height: 80,
  },
  tabBarLabel: {
    fontSize: 12,
    fontWeight: '500',
    marginTop: 4,
  },
  floatingButton: {
    width: 35,
    height: 35,
    borderRadius: 17.5,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AppStack;
