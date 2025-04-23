import { Tabs } from 'expo-router';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { ThemeProvider } from './theme-context'; // adjust path as needed

export default function Layout() {
  const unreadNotifications = 2;

  return (
    <ThemeProvider>
      <Tabs
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size, focused }) => {
            let iconName: string = '';

            switch (route.name) {
              case 'home':
                iconName = 'home-outline';
                break;
              case 'notification':
                iconName = 'notifications-outline';
                break;
              case 'setting':
                iconName = 'settings-outline';
                break;
              case 'history':
                iconName = focused ? 'history' : 'history-toggle-off';
                return (
                  <MaterialIcons name={iconName as any} size={size} color={color} />
                );
              default:
                iconName = 'ellipse-outline';
            }

            return <Ionicons name={iconName as any} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
          tabBarLabelStyle: {
            fontSize: 12,
          },
          tabBarStyle: {
            backgroundColor: '#fff',
            paddingBottom: 5,
            height: 60,
            borderTopColor: '#e5e5e5',
            borderTopWidth: 1,
          },
          headerShown: false,
        })}
      >
        <Tabs.Screen name="home" options={{ title: 'Accueil' }} />
        <Tabs.Screen
          name="notification"
          options={{
            title: 'Notifications',
            tabBarBadge: unreadNotifications > 0 ? unreadNotifications : undefined,
            tabBarBadgeStyle: {
              backgroundColor: 'red',
              color: 'white',
            },
          }}
        />
        <Tabs.Screen name="history" options={{ title: 'Historique' }} />
        <Tabs.Screen name="setting" options={{ title: 'Paramètres' }} />
      </Tabs>
    </ThemeProvider>
  );
}
