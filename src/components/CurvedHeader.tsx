import {View, Text, StyleSheet, Dimensions, TouchableOpacity} from 'react-native';
import React from 'react';
import Svg, {Path, Defs, LinearGradient, Stop} from 'react-native-svg';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {colors} from '../theme/theme';

interface CurvedHeaderProps {
  title: string;
  onBackPress?: () => void;
}

const CurvedHeader: React.FC<CurvedHeaderProps> = ({title, onBackPress}) => {
  return (
    <View style={styles.header}>
      <Svg style={styles.svg} height="100%" width="100%" viewBox={`0 0 400 ${Dimensions.get('window').height * 0.15}`} preserveAspectRatio="none">
        <Defs>
          <LinearGradient id="headerGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <Stop offset="0%" stopColor={colors.gradientStart} />
            <Stop offset="100%" stopColor={colors.gradientEnd} />
          </LinearGradient>
        </Defs>
        <Path fill="url(#headerGradient)" d="M0,0 L400,0 L400,120 Q300,80 200,120 Q100,160 0,120 Z" />
      </Svg>
      <View style={styles.topBar}>
        <TouchableOpacity style={styles.backButton} onPress={onBackPress}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{title}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    height: Dimensions.get('window').height * 0.15,
    position: 'relative',
  },
  svg: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 75,
    paddingHorizontal: 20,
    zIndex: 1,
  },
  backButton: {
    marginRight: 15,
  },
  headerTitle: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    flex: 1,
  },
});

export default CurvedHeader;
