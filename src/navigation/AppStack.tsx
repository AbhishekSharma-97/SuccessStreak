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

// const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const {width} = Dimensions.get('window');

// Floating Center Button
const CenterButton = ({onPress}) => (
  <TouchableOpacity style={styles.fab} onPress={onPress}>
    <Text style={styles.fabText}>+</Text>
  </TouchableOpacity>
);

// Custom Bottom Tab Bar
const CustomTabBar = ({state, descriptors, navigation}) => {
  return (
    <View style={styles.tabBarContainer}>
      {/* Wavy Background */}
      <Svg height={80} width="100%" viewBox="0 0 1440 320">
        <Path
          fill="#0099ff"
          fillOpacity="1"
          d="M0,96L60,85.3C120,75,240,53,360,53.3C480,53,600,75,720,101.3C840,128,960,160,1080,144C1200,128,1320,64,1380,32L1440,0L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
        />
      </Svg>
    </View>
  );
};

const AppStack = () => {
  return (
    <Tab.Navigator
      screenOptions={{headerShown: false}}
      tabBar={props => <CustomTabBar {...props} />}>
      <Tab.Screen name={'HomeScreen'} component={HomeScreen} />
      <Tab.Screen name={'StatisticsScreen'} component={StatisticsScreen} />
      <Tab.Screen name={'NewHabitScreen'} component={NewHabitScreen} />
      <Tab.Screen name={'NotificationScreen'} component={NotificationScreen} />
      <Tab.Screen name={'SettingsScreen'} component={SettingsScreen} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  screen: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  tabBarContainer: {position: 'absolute', bottom: 0, width: '100%'},
});

export default AppStack;
