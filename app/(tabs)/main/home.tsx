import { View, Text } from 'react-native';
import React from 'react';
import { useTheme } from './theme-context';

export default function Home() {
  const { isDarkMode } = useTheme();
  const backgroundColor = isDarkMode ? '#000' : '#fff';

  return (
    <View style={{ flex: 1, backgroundColor }}>
      <Text style={{ color: isDarkMode ? '#fff' : '#000' }}>home</Text>
    </View>
  );
}
