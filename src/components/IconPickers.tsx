import React, {useMemo, useState} from 'react';
import {View, Text, TextInput, ScrollView, TouchableOpacity, StyleSheet} from 'react-native';
import * as LucideIcons from 'lucide-react-native';
import {ActivityCategory, activityIconCategories, ActivityIconName} from '../constants/IconCategory';

type IconPickerProps = {
  onSelect: (iconName: ActivityIconName) => void;
  iconSize?: number;
  iconColor?: string;
};

export const IconPicker: React.FC<IconPickerProps> = ({onSelect, iconSize = 32, iconColor = '#4A90E2'}) => {
  const [search, setSearch] = useState('');

  const searchQuery = search.toLowerCase();
  const isSearching = searchQuery.length > 0;
  const categorySections = useMemo(() => {
    return Object.entries(activityIconCategories)
      .map(([category, icons]) => {
        const filteredIcons = icons.filter(icon => icon.toLowerCase().includes(searchQuery));

        return {
          category: category as ActivityCategory,
          icons: isSearching ? filteredIcons : icons,
        };
      })
      .filter(s => s.icons.length > 0);
  }, [searchQuery, isSearching]);
  console.log({categorySections});

  return (
    <View style={styles.container}>
      <TextInput value={search} onChangeText={setSearch} placeholder="Search activity icon..." placeholderTextColor="#888" style={styles.search} />
      <ScrollView showsVerticalScrollIndicator={false}>
        {categorySections.length === 0 ? (
          <Text style={styles.noResults}>No icons found</Text>
        ) : (
          categorySections.map(({category, icons}) => (
            <View key={category} style={styles.section}>
              <Text style={styles.sectionTitle}>{category}</Text>

              <View style={styles.iconGrid}>
                {icons.map(iconName => {
                  const IconComp = LucideIcons[iconName as keyof typeof LucideIcons];

                  if (!IconComp) return null;

                  const isValidComponent =
                    typeof IconComp === 'function' || (typeof IconComp === 'object' && IconComp !== null && 'render' in IconComp);

                  if (!isValidComponent) return null;

                  const Icon = IconComp as React.ComponentType<{size?: number; color?: string}>;

                  return (
                    <TouchableOpacity key={iconName} onPress={() => onSelect(iconName)} style={styles.iconCell}>
                      <Icon size={iconSize} color={iconColor} />
                      <Text style={styles.iconLabel}>{iconName}</Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, padding: 16, backgroundColor: '#fff'},
  search: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 16,
    fontSize: 16,
    color: 'black',
  },
  noResults: {
    textAlign: 'center',
    color: '#777',
    marginTop: 24,
    fontSize: 16,
  },
  section: {marginBottom: 24},
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
    textTransform: 'capitalize',
  },
  iconGrid: {flexDirection: 'row', flexWrap: 'wrap'},
  iconCell: {width: 64, margin: 8, alignItems: 'center'},
  iconLabel: {
    fontSize: 10,
    color: '#444',
    marginTop: 4,
    textAlign: 'center',
  },
});
