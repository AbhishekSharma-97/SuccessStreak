import {View, StyleSheet, Text, TextInput, Dimensions, TouchableOpacity, ScrollView, Switch, Alert, Modal} from 'react-native';
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
import dayjs from 'dayjs';
import DateTimePicker from 'react-native-modal-datetime-picker';
import {formatTo24, getDeviceTimezone} from '../utils/time';
import {IconPicker} from '../components/IconPickers';
import * as LucideIcons from 'lucide-react-native';
registerTranslation('en-GB', enGB);

const NewHabitScreen = () => {
  const [habitTitle, setHabitTitle] = useState('');
  const [selectedIcon, setSelectedIcon] = useState<string | null>(null);
  const [frequency, setFrequency] = useState<'daily' | 'weekly' | 'monthly'>('daily');
  const [selectedDays, setSelectedDays] = useState<boolean[]>([false, false, false, false, false, false, false]); // M-S
  const [range, setRange] = useState<{startDate: Date | undefined; endDate: Date | undefined}>({startDate: undefined, endDate: undefined});
  const [reminderDate, setReminderDate] = useState<Date>(new Date());
  const [timePickerOpen, setTimePickerOpen] = useState(false);
  console.log(timePickerOpen);
  const [open, setOpen] = useState(false);
  const [iconPickerModalVisible, setIconPickerModalVisible] = useState(false);

  const dayLabels = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

  const toggleDay = (index: number) => {
    setSelectedDays(prev => {
      const updated = [...prev];
      updated[index] = !updated[index];
      return updated;
    });
  };

  const custom_icon = [
    {id: 0, name: 'Weightlifting_Custom', icon: <WeightLift size={35} />},
    {id: 1, name: 'Cycling_Custom', icon: <Cycling size={35} />},
    {id: 2, name: 'Running_Custom', icon: <Running size={35} />},
    {id: 3, name: 'Coding_Custom', icon: <Coding size={35} />},
    {id: 4, name: 'WaterDrinking_Custom', icon: <WaterDrinking size={35} />},
    {id: 5, name: 'Studying_Custom', icon: <Studying size={35} />},
    {id: 6, name: 'Meditation_Custom', icon: <Meditation size={35} />},
    {id: 7, name: 'NoPhone_Custom', icon: <NoPhone size={35} />},
    {id: 8, name: 'Instrument_Custom', icon: <Instrument size={35} />},
    {id: 9, name: 'More_Custom', icon: <Text style={styles.moreText}>More</Text>},
  ];

  const onConfirmTime = (date: Date) => {
    setReminderDate(date);
    setTimePickerOpen(false);
  };

  const isLucideIcon = (iconName: string | null) => {
    if (!iconName) return false;
    return !custom_icon.some(icon => icon.name === iconName);
  };

  const renderLucidIcon = (iconName: string | null, size: number = 35, color = colors.secondary) => {
    const IconComp = LucideIcons[iconName as keyof typeof LucideIcons];
    if (IconComp) {
      const Icon = IconComp as React.ComponentType<{size: number; color?: string}>;
      return <Icon size={size} color={color} />;
    }
    return null;
  };

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
            <Text style={styles.habitLabel}>Select an icon</Text>
            <View style={styles.activitiesGrid}>
              {custom_icon.map(cicon => {
                const isMoreButton = cicon.id === 9;
                const isLucideSelected = isMoreButton && isLucideIcon(selectedIcon);
                const isSelected = selectedIcon === cicon.name || isLucideSelected;

                return (
                  <TouchableOpacity
                    key={cicon.id}
                    style={[
                      styles.activityCircle,
                      {borderColor: colors.secondary},
                      isSelected && styles.selectedActivityCircle,
                      isLucideSelected && styles.lucideIconCircle,
                    ]}
                    onPress={() => {
                      if (cicon.id === 9) {
                        setIconPickerModalVisible(true);
                      } else {
                        setSelectedIcon(cicon.name);
                      }
                    }}>
                    <View style={[styles.iconContainer]}>
                      {isMoreButton && isLucideIcon(selectedIcon) ? (
                        <View style={styles.moreIconWrapper}>
                          {renderLucidIcon(selectedIcon)}
                          <View style={styles.editBadge}>{renderLucidIcon('Pencil', 8, 'white')}</View>
                        </View>
                      ) : (
                        cicon.icon
                      )}
                    </View>
                  </TouchableOpacity>
                );
              })}
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
              <Text style={styles.frequencyLabel}>Daily</Text>
              <Switch
                value={frequency === 'daily'}
                onValueChange={() => setFrequency('daily')}
                trackColor={{
                  true: colors.secondaryLight,
                  false: colors.borderLight,
                }}
                thumbColor={frequency === 'daily' ? colors.secondary : colors.borderLight}
              />
              <Text style={styles.frequencyLabel}>Weekly</Text>
              <Switch
                value={frequency === 'weekly'}
                onValueChange={() => setFrequency('weekly')}
                trackColor={{
                  true: colors.secondaryLight,
                  false: colors.borderLight,
                }}
                thumbColor={frequency === 'weekly' ? colors.secondary : colors.borderLight}
              />
              <Text style={styles.frequencyLabel}>Monthly</Text>
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
                  <TouchableOpacity style={{flex: 1}} onPress={() => setTimePickerOpen(true)}>
                    <TextInput
                      style={[styles.input, {flex: 1, minWidth: 0}]}
                      placeholder={dayjs(reminderDate).format('h:mm A')}
                      placeholderTextColor={colors.placeholder}
                      editable={false}
                      // value and onChangeText for frequency input
                    />
                  </TouchableOpacity>
                </View>
                <DateTimePicker
                  isVisible={timePickerOpen}
                  mode="time"
                  date={reminderDate}
                  onConfirm={onConfirmTime}
                  is24Hour={false}
                  onCancel={() => setTimePickerOpen(false)}
                />
              </View>
            </View>
          </View>
        </View>
        <TouchableOpacity
          style={styles.createButton}
          onPress={async () => {
            // Get current user

            const {
              data: {user},
              error: authError,
            } = await supabase.auth.getUser();

            if (authError || !user) {
              Alert.alert('Error', 'Please sign in to create habits');
              return;
            }

            const usedDate = reminderDate || new Date();
            const formatted = formatTo24(usedDate);
            const timezone = getDeviceTimezone();

            // Prepare habit data with user ID
            const habitData = {
              user_id: user.id,
              title: habitTitle,
              activity: selectedIcon,
              frequency,
              selected_days: frequency === 'weekly' ? selectedDays : null,
              start_date: range.startDate ? range.startDate.toISOString() : null,
              end_date: range.endDate ? range.endDate.toISOString() : null,
              reminder_time: formatted,
              timezone,
            };

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

      <Modal visible={iconPickerModalVisible} animationType="slide" transparent={true} onRequestClose={() => setIconPickerModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select an Icon</Text>
              <TouchableOpacity onPress={() => setIconPickerModalVisible(false)}>
                <Text style={styles.modalCloseButton}>Close</Text>
              </TouchableOpacity>
            </View>
            <IconPicker
              iconColor={colors.secondary}
              onSelect={iconName => {
                setSelectedIcon(iconName);
                setIconPickerModalVisible(false);
              }}
            />
          </View>
        </View>
      </Modal>
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
  frequencyLabel: {
    fontSize: 14,
    color: colors.textLight,
    textAlignVertical: 'center',
  },
  inputContainer: {
    backgroundColor: colors.input,
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
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
    backgroundColor: colors.primaryLight,
    borderColor: colors.secondary,
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
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
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: colors.surface,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: '80%',
    paddingTop: 20,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.textDark,
  },
  modalCloseButton: {
    fontSize: 16,
    color: colors.secondary,
    fontWeight: '600',
  },
  lucideIconCircle: {
    borderStyle: 'dashed',
    borderWidth: 2.5,
  },
  moreIconWrapper: {
    position: 'relative',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  editBadge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: colors.secondary,
    borderRadius: 10,
    width: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.surface,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 3,
  },
  editBadgeIcon: {
    fontSize: 10,
    color: colors.surface,
    fontWeight: 'bold',
  },
});

export default NewHabitScreen;
