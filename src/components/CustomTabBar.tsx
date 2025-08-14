import React from 'react';
import {View, TouchableOpacity, StyleSheet, Dimensions} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

interface Tab {
  name: string;
  label: string;
  icon: string;
  focusedIcon: string;
  isFloating?: boolean;
}

interface CustomTabBarProps {
  tabs: Tab[];
  activeTab: string;
  onTabPress: (tabName: string) => void;
}

const {width: screenWidth, height: screenHeight} = Dimensions.get('window');
const isSmallDevice = screenWidth < 375;
const isLargeDevice = screenWidth > 414;

const CustomTabBar: React.FC<CustomTabBarProps> = ({tabs, activeTab, onTabPress}) => {
  return (
    <View style={styles.container}>
      {tabs.map(tab => (
        <TouchableOpacity
          key={tab.name}
          style={[styles.tab, tab.isFloating && styles.floatingTab]}
          onPress={() => onTabPress(tab.name)}
          activeOpacity={0.7}>
          <Icon
            name={activeTab === tab.name ? tab.focusedIcon : tab.icon}
            size={tab.isFloating ? (isSmallDevice ? 24 : isLargeDevice ? 32 : 28) : isSmallDevice ? 20 : isLargeDevice ? 28 : 24}
            color={tab.isFloating ? '#FFFFFF' : activeTab === tab.name ? '#007AFF' : '#8E8E93'}
          />
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E5EA',
    paddingBottom: isSmallDevice ? 16 : isLargeDevice ? 24 : 20,
    paddingTop: isSmallDevice ? 8 : isLargeDevice ? 12 : 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    position: 'relative',
  },
  floatingTab: {
    backgroundColor: '#6366F1',
    borderRadius: isSmallDevice ? 24 : isLargeDevice ? 32 : 28,
    width: isSmallDevice ? 48 : isLargeDevice ? 64 : 56,
    height: isSmallDevice ? 48 : isLargeDevice ? 64 : 56,
    position: 'absolute',
    top: isSmallDevice ? -24 : isLargeDevice ? -32 : -28,
    left: '50%',
    marginLeft: isSmallDevice ? -24 : isLargeDevice ? -32 : -28,
    flex: 0,
    borderWidth: 2,
    borderColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 0,
    paddingBottom: 0,
  },
});

export default CustomTabBar;
