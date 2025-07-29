import {View, StyleSheet, Text, TextInput, Dimensions, TouchableOpacity, ScrollView, Switch, Alert} from 'react-native';
import React, {useState} from 'react';
import CurvedHeader from '../components/CurvedHeader';
import {colors} from '../theme/theme';
import WeightLift from '../icons/WeightLift';
import Cycling from '../icons/Cycling';
import Running from '../icons/Running';
import Coding from '../icons/Coding';
import WaterDrinking from '../icons/WaterDrinking';
import Studying from '../icons/Studying';
import Meditation from '../icons/Meditation';
import NoPhone from '../icons/NoPhone';
import Instrument from '../icons/Instrument';
import {DatePickerModal, registerTranslation, enGB} from 'react-native-paper-dates';
import {supabase} from '../supabaseClient';
registerTranslation('en-GB', enGB);

const NewHabitScreen = () => {
  const [habitTitle, setHabitTitle] = useState('');
  const [selectedActivity, setSelectedActivity] = useState<number | null>(null);
  const [frequency, setFrequency] = useState<'daily' | 'weekly' | 'monthly'>('daily');
  const [selectedDays, setSelectedDays] = useState<boolean[]>([false, false, false, false, false, false, false]); // M-S
  const [range, setRange] = useState<{startDate: Date | undefined; endDate: Date | undefined}>({startDate: undefined, endDate: undefined});
  const [open, setOpen] = useState(false);

  const dayLabels = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

  const toggleDay = (index: number) => {
    setSelectedDays(prev => {
      const updated = [...prev];
      updated[index] = !updated[index];
      return updated;
    });
  };

  const activities = [
    {id: 0, name: 'Weightlifting', icon: <WeightLift size={35} />},
    {id: 1, name: 'Cycling', icon: <Cycling size={35} />},
    {id: 2, name: 'Running', icon: <Running size={35} />},
    {id: 3, name: 'Coding', icon: <Coding size={35} />},
    {id: 4, name: 'WaterDrinking', icon: <WaterDrinking size={35} />},
    {id: 5, name: 'Studying', icon: <Studying size={35} />},
    {id: 6, name: 'Meditation', icon: <Meditation size={35} />},
    {id: 7, name: 'NoPhone', icon: <NoPhone size={35} />},
    {id: 8, name: 'Instrument', icon: <Instrument size={35} />},
    {id: 9, name: 'More', icon: <Text style={styles.moreText}>More</Text>},
  ];

  return (
    <View style={{flex: 1}}>
      <CurvedHeader title="Add Habit" />
      <ScrollView style={styles.container} contentContainerStyle={{paddingBottom: 30, flexGrow: 1}}>
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
              {activities.map(activity => (
                <TouchableOpacity
                  key={activity.id}
                  style={[styles.activityCircle, {borderColor: colors.secondary}, selectedActivity === activity.id && styles.selectedActivityCircle]}
                  onPress={() => setSelectedActivity(activity.id)}>
                  <View style={[styles.iconContainer, selectedActivity === activity.id && styles.selectedIconContainer]}>{activity.icon}</View>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
        <View style={styles.contentContainer}>
          <View style={styles.habitBox}>
            <Text style={styles.habitLabel}>Frequency</Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text>Daily</Text>
              <Switch
                value={frequency === 'daily'}
                onValueChange={() => setFrequency('daily')}
                trackColor={{
                  true: colors.secondaryLight,
                  false: colors.borderLight,
                }}
                thumbColor={frequency === 'daily' ? colors.secondary : colors.borderLight}
              />
              <Text>Weekly</Text>
              <Switch
                value={frequency === 'weekly'}
                onValueChange={() => setFrequency('weekly')}
                trackColor={{
                  true: colors.secondaryLight,
                  false: colors.borderLight,
                }}
                thumbColor={frequency === 'weekly' ? colors.secondary : colors.borderLight}
              />
              <Text>Monthly</Text>
              <Switch
                value={frequency === 'monthly'}
                onValueChange={() => setFrequency('monthly')}
                trackColor={{
                  true: colors.secondaryLight,
                  false: colors.borderLight,
                }}
                thumbColor={frequency === 'monthly' ? colors.secondary : colors.borderLight}
              />
            </View>
            {frequency === 'weekly' && (
              <View style={styles.weekDaysRow}>
                {dayLabels.map((label, idx) => (
                  <TouchableOpacity
                    key={label}
                    style={[styles.dayCheckbox, selectedDays[idx] && styles.dayCheckboxSelected]}
                    onPress={() => toggleDay(idx)}>
                    <Text style={[styles.dayLabel, selectedDays[idx] && styles.dayLabelSelected]}>{label}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
            {frequency === 'monthly' && (
              <View style={{marginTop: 15, marginBottom: 10}}>
                <TouchableOpacity style={styles.dateRangeButton} onPress={() => setOpen(true)}>
                  <Text style={styles.dateRangeButtonText}>
                    {range.startDate && range.endDate
                      ? `${range.startDate.toLocaleDateString()} - ${range.endDate.toLocaleDateString()}`
                      : 'Select Date Range'}
                  </Text>
                </TouchableOpacity>
                <DatePickerModal
                  locale="en-GB"
                  mode="range"
                  visible={open}
                  onDismiss={() => setOpen(false)}
                  startDate={range.startDate}
                  endDate={range.endDate}
                  onConfirm={({startDate, endDate}: {startDate: Date | undefined; endDate: Date | undefined}) => {
                    setOpen(false);
                    setRange({startDate, endDate});
                  }}
                  saveLabel="Save"
                  label="Select date range"
                  startLabel="From"
                  endLabel="To"
                  animationType="slide"
                />
              </View>
            )}
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 10,
                marginTop: 20,
                flex: 1,
              }}>
              <View
                style={{
                  gap: 10,
                  flex: 1,
                }}>
                <Text style={styles.repeatEveryText}>Repeat Every</Text>
                <View
                  style={[
                    styles.inputContainer,
                    {
                      height: 40,
                      flex: 1,
                      paddingHorizontal: 10,
                      paddingVertical: 0,
                    },
                  ]}>
                  <TextInput
                    style={[styles.input, {flex: 1, minWidth: 0}]}
                    placeholder="Enter frequency"
                    placeholderTextColor={colors.placeholder}
                    // value and onChangeText for frequency input
                  />
                </View>
              </View>
              <View
                style={{
                  gap: 10,
                  flex: 1,
                }}>
                <Text style={styles.repeatEveryText}>Reminder</Text>
                <View
                  style={[
                    styles.inputContainer,
                    {
                      height: 40,
                      flex: 1,
                      paddingHorizontal: 10,
                      paddingVertical: 0,
                    },
                  ]}>
                  <TextInput
                    style={[styles.input, {flex: 1, minWidth: 0}]}
                    placeholder="Fri,Sat 12:30 PM"
                    placeholderTextColor={colors.placeholder}
                    // value and onChangeText for frequency input
                  />
                </View>
              </View>
            </View>
          </View>
        </View>
        <TouchableOpacity
          style={styles.createButton}
          onPress={async () => {
            // Get current user
            console.log('getting user');
            const {
              data: {user},
              error: authError,
            } = await supabase.auth.getUser();

            console.log('the user', user);

            if (authError || !user) {
              Alert.alert('Error', 'Please sign in to create habits');
              return;
            }

            // Prepare habit data with user ID
            const habitData = {
              user_id: user.id,
              title: habitTitle,
              activity: selectedActivity,
              frequency,
              selectedDays: frequency === 'weekly' ? selectedDays : null,
              startDate: range.startDate ? range.startDate.toISOString() : null,
              endDate: range.endDate ? range.endDate.toISOString() : null,
            };

            console.log('the habit data', habitData);

            // Insert into Supabase
            const {error} = await supabase.from('habits').insert([habitData]);
            if (error) {
              Alert.alert('Error', error.message);
            } else {
              Alert.alert('Success', 'Habit created!');
            }
          }}
          activeOpacity={0.8}>
          <Text style={styles.createButtonText}>Create</Text>
        </TouchableOpacity>
      </ScrollView>
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
    paddingBottom: 20,
  },
  habitLabel: {
    fontSize: 18,
    color: colors.textDark,
    fontFamily: 'cursive',
    fontWeight: 'bold',
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
  repeatEveryText: {
    fontSize: 14,
    color: colors.textLight,
    marginTop: 10,
    textAlignVertical: 'center',
  },
  weekDaysRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
    marginBottom: 10,
    gap: 6,
  },
  dayCheckbox: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.borderInput,
    backgroundColor: colors.input,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dayCheckboxSelected: {
    backgroundColor: colors.secondary,
    borderColor: colors.secondary,
  },
  dayLabel: {
    color: colors.textLight,
    fontWeight: 'bold',
    fontSize: 14,
  },
  dayLabelSelected: {
    color: colors.surface,
  },
  dateRangeButton: {
    backgroundColor: colors.input,
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: colors.borderInput,
    alignItems: 'center',
    marginBottom: 10,
  },
  dateRangeButtonText: {
    color: colors.textDark,
    fontSize: 16,
  },
  createButton: {
    marginHorizontal: 20,
    marginTop: 30,
    marginBottom: 30,
    backgroundColor: colors.secondary,
    borderRadius: 10,
    paddingVertical: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  createButtonText: {
    color: colors.surface,
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
});

export default NewHabitScreen;
