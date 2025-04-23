import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Switch,
  StyleSheet,
  Alert,
} from 'react-native';
import { Appearance } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useTheme } from './theme-context'; // Make sure the path is correct

interface SettingItem {
  id: string;
  icon: keyof typeof Feather.glyphMap;
  title: string;
  description: string;
}

const Settings = () => {
  const { isDarkMode, toggleDarkMode } = useTheme();

  const handleSignOut = () => {
    Alert.alert('Signed Out', 'You have been signed out successfully');
    router.push('../signin');
  };

  const settings: SettingItem[] = [
    {
      id: 'Profile',
      icon: 'user',
      title: 'Profile',
      description: 'Manage your profile ',
    },
    {
      id: 'notifications',
      icon: 'bell',
      title: 'Notifications',
      description: 'Manage your notification preferences',
    },
    {
      id: 'appearance',
      icon: isDarkMode ? 'moon' : 'sun',
      title: 'Appearance',
      description: 'Dark mode and theme settings',
    },
    {
      id: 'payment',
      icon: 'credit-card',
      title: 'Payment Methods',
      description: 'Manage your payment options',
    },
    {
      id: 'privacy',
      icon: 'shield',
      title: 'Privacy & Security',
      description: 'Configure your privacy settings',
    },
    {
      id: 'language',
      icon: 'globe',
      title: 'Language',
      description: 'Change your preferred language',
    },
    {
      id: 'help',
      icon: 'help-circle',
      title: 'Help & Support',
      description: 'Get help with your account',
    },
  ];

  return (
    <View style={[styles.container, isDarkMode && styles.darkContainer]}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={[styles.header, isDarkMode && styles.darkText]}>
          <Feather name="settings" size={22} /> Settings
        </Text>

        {settings.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={[styles.card, isDarkMode && styles.darkCard]}
            onPress={() => {
              if (item.id === 'appearance') {
                toggleDarkMode();
                Alert.alert(
                  isDarkMode ? 'Light Mode' : 'Dark Mode',
                  `Switched to ${isDarkMode ? 'light' : 'dark'} mode.`
                );
              } else {
                Alert.alert(item.title, item.description);
              }
            }}
          >
            <View style={styles.row}>
              <Feather
                name={item.icon}
                size={22}
                color={isDarkMode ? '#ddd' : '#333'}
              />
              <View style={styles.info}>
                <Text style={[styles.title, isDarkMode && styles.darkText]}>
                  {item.title}
                </Text>
                <Text
                  style={[styles.description, isDarkMode && styles.darkSubText]}
                >
                  {item.description}
                </Text>
              </View>
              {item.id === 'appearance' && (
                <Switch value={isDarkMode} onValueChange={toggleDarkMode} />
              )}
            </View>
          </TouchableOpacity>
        ))}

        <TouchableOpacity style={styles.signOut} onPress={handleSignOut}>
          <View style={styles.row}>
            <Feather
              name="log-out"
              size={20}
              color="#fff"
              style={{ marginRight: 8 }}
            />
            <Text style={styles.signOutText}>Sign Out</Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default Settings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  darkContainer: {
    backgroundColor: '#111827',
  },
  content: {
    padding: 20,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#111827',
  },
  darkText: {
    color: '#fff',
  },
  darkSubText: {
    color: '#aaa',
  },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  darkCard: {
    backgroundColor: '#1f2937',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  info: {
    flex: 1,
    marginLeft: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  description: {
    fontSize: 13,
    color: '#6b7280',
    marginTop: 2,
  },
  signOut: {
    marginTop: 24,
    backgroundColor: '#ef4444',
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
  },
  signOutText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
