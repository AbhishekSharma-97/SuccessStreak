import React from 'react';
import {View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {colors, shadows} from '../theme/theme';
import {useAuth} from '../context/AuthContext';

const SettingsScreen: React.FC = () => {
  const {user, signOut} = useAuth();

  const handleSignOut = () => {
    Alert.alert('Sign Out', 'Are you sure you want to sign out?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Sign Out',
        style: 'destructive',
        onPress: signOut,
      },
    ]);
  };

  const renderSettingItem = (title: string, subtitle?: string, onPress?: () => void) => (
    <TouchableOpacity style={styles.settingItem} onPress={onPress} disabled={!onPress}>
      <View style={styles.settingContent}>
        <Text style={styles.settingTitle}>{title}</Text>
        {subtitle && <Text style={styles.settingSubtitle}>{subtitle}</Text>}
      </View>
      {onPress && <Text style={styles.settingArrow}>›</Text>}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Text style={styles.title}>Settings</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account</Text>
          <View style={styles.sectionContent}>
            {renderSettingItem('Email', user?.email)}
            <View style={styles.divider} />
            {renderSettingItem('User ID', user?.id)}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Preferences</Text>
          <View style={styles.sectionContent}>
            {renderSettingItem('Notifications', 'Manage notification settings')}
            <View style={styles.divider} />
            {renderSettingItem('Theme', 'Light mode')}
            <View style={styles.divider} />
            {renderSettingItem('Language', 'English')}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Support</Text>
          <View style={styles.sectionContent}>
            {renderSettingItem('Help & FAQ')}
            <View style={styles.divider} />
            {renderSettingItem('Contact Support')}
            <View style={styles.divider} />
            {renderSettingItem('Privacy Policy')}
            <View style={styles.divider} />
            {renderSettingItem('Terms of Service')}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>App</Text>
          <View style={styles.sectionContent}>
            {renderSettingItem('Version', '1.0.0')}
            <View style={styles.divider} />
            {renderSettingItem('About SuccessStreak')}
          </View>
        </View>

        <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut}>
          <Text style={styles.signOutText}>Sign Out</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.textPrimary,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textSecondary,
    marginBottom: 8,
    paddingHorizontal: 24,
  },
  sectionContent: {
    backgroundColor: colors.surface,
    marginHorizontal: 24,
    borderRadius: 12,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  settingContent: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    color: colors.textPrimary,
    fontWeight: '500',
  },
  settingSubtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: 2,
  },
  settingArrow: {
    fontSize: 18,
    color: colors.textLight,
    fontWeight: '300',
  },
  divider: {
    height: 1,
    backgroundColor: colors.borderLight,
    marginLeft: 16,
  },
  signOutButton: {
    backgroundColor: colors.error,
    marginHorizontal: 24,
    marginVertical: 32,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  signOutText: {
    color: colors.textWhite,
    fontSize: 16,
    fontWeight: '600',
  },
});

export default SettingsScreen;
