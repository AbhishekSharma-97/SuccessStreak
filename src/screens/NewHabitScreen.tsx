import { View, StyleSheet, Text, TextInput, Dimensions, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import CurvedHeader from '../components/CurvedHeader';
import { colors } from '../theme/theme';
import WeightLift from '../icons/WeightLift';
import Cycling from '../icons/cycling';
import Running from '../icons/Running';
import Coding from '../icons/Coding';
import WaterDrinking from '../icons/WaterDrinking';
import Studying from '../icons/Studying';
import Meditation from '../icons/Meditation';
import NoPhone from '../icons/NoPhone';
import Instrument from '../icons/Instrument';

const NewHabitScreen = () => {
  const [habitTitle, setHabitTitle] = useState('');
  const [selectedActivity, setSelectedActivity] = useState<number | null>(null);

  const activities = [
    { id: 0, name: 'Weightlifting', icon: <WeightLift size={35} /> },
    { id: 1, name: 'Cycling', icon: <Cycling size={35} /> },
    { id: 2, name: 'Running', icon: <Running size={35} /> },
    { id: 3, name: 'Coding', icon: <Coding size={35} /> },
    { id: 4, name: 'WaterDrinking', icon: <WaterDrinking size={35} /> },
    { id: 5, name: 'Studying', icon: <Studying size={35} /> },
    { id: 6, name: 'Meditation', icon: <Meditation size={35} /> },
    { id: 7, name: 'NoPhone', icon: <NoPhone size={35} /> },
    { id: 8, name: 'Instrument', icon: <Instrument size={35} /> },
    { id: 9, name: 'More', icon: <Text style={styles.moreText}>More</Text> },
  ];

  return (
    <View style={styles.container}>
      <CurvedHeader title="Add Habit" />

      <View style={styles.contentContainer}>
        <View style={styles.habitBox}>
          <Text style={styles.habitLabel}>Habit Title</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Enter habit title..."
              placeholderTextColor={colors.placeholder}
              value={habitTitle}
              onChangeText={setHabitTitle}
            />
          </View>
        </View>
      </View>

      <View style={styles.contentContainer}>
        <View style={styles.habitBox}>
          <Text style={styles.habitLabel}>Choose an activity</Text>
          <View style={styles.activitiesGrid}>
            {activities.map((activity) => (
              <TouchableOpacity
                key={activity.id}
                style={[
                  styles.activityCircle,
                  selectedActivity === activity.id && styles.selectedActivityCircle
                ]}
                onPress={() => setSelectedActivity(activity.id)}
              >
                <View style={[
                  styles.iconContainer,
                  selectedActivity === activity.id && styles.selectedIconContainer
                ]}>
                  {activity.icon}
                </View>
              </TouchableOpacity>
            ))}
          </View>
          <Text style={styles.selectGoalText}>Select a goal</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  habitBox: {
    backgroundColor: colors.surface,
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    alignSelf: 'stretch',
  },
  habitLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.textDark,
    marginBottom: 15,
  },
  inputContainer: {
    backgroundColor: colors.input,
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: colors.borderInput,
  },
  input: {
    fontSize: 16,
    color: colors.textDark,
    minHeight: 20,
  },
  activitiesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  activityCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.surface,
    borderWidth: 2,
    borderColor: colors.borderLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  selectedActivityCircle: {
    backgroundColor: colors.secondary,
    borderColor: colors.secondary,
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedIconContainer: {
    // For selected icons, we might want to change the color
  },
  moreText: {
    fontSize: 12,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  selectGoalText: {
    fontSize: 14,
    color: colors.textLight,
    textAlign: 'center',
    marginTop: 10,
  },
});

export default NewHabitScreen;
