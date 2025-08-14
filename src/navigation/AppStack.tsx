import React from 'react';
import {View, StyleSheet} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import NewHabitScreen from '../screens/NewHabitScreen';
import SettingsScreen from '../screens/SettingsScreen';
import CustomTabBar from '../components/CustomTabBar';

const Tab = createBottomTabNavigator();

const AppStack = () => {
  const tabs = [
    {
      name: 'HomeScreen',
      label: 'Home',
      icon: 'home-outline',
      focusedIcon: 'home',
    },
    {
      name: 'NewHabitScreen',
      label: 'Add Habit',
      icon: 'add',
      focusedIcon: 'add',
      isFloating: true,
    },
    {
      name: 'SettingsScreen',
      label: 'Settings',
      icon: 'settings-outline',
      focusedIcon: 'settings',
    },
  ];

  return (
    <View style={styles.container}>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
        }}
        tabBar={props => (
          <CustomTabBar
            tabs={tabs}
            activeTab={props.state.routes[props.state.index].name}
            onTabPress={(tabName: string) => {
              const targetIndex = props.state.routes.findIndex(route => route.name === tabName);
              if (targetIndex !== -1) {
                props.navigation.navigate(tabName);
              }
            }}
          />
        )}>
        <Tab.Screen name="HomeScreen" component={HomeScreen} />
        <Tab.Screen name="NewHabitScreen" component={NewHabitScreen} />
        <Tab.Screen name="SettingsScreen" component={SettingsScreen} />
      </Tab.Navigator>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default AppStack;
