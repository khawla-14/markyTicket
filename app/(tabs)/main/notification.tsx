import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useTheme } from './theme-context'; // Adjust path if needed

type Notification = {
  id: number;
  title: string;
  message: string;
  isRead: boolean;
  timestamp: string;
  type: 'departure' | 'confirmation' | 'promotion';
  details?: {
    destination?: string;
    date?: string;
    discount?: string;
    departureTime?: string;
  };
};

const notificationData: Notification[] = [
  {
    id: 1,
    title: 'Départ bientôt',
    message: 'Votre bus pour ighezer ozarif part dans 1 heure',
    isRead: false,
    timestamp: 'Il y a 30 minutes',
    type: 'departure',
    details: {
      destination: 'ighezer ozarif',
      departureTime: '14:30',
      date: '21 Avril 2025',
    },
  },
  {
    id: 2,
    title: 'Réservation confirmée',
    message: 'Votre réservation pour sidi ahmed a été confirmée',
    isRead: true,
    timestamp: 'Il y a 2 heures',
    type: 'confirmation',
    details: {
      destination: 'sidi ahmed',
      date: '25 Avril 2025',
      departureTime: '09:15',
    },
  },
  {
    id: 3,
    title: 'Promotion spéciale',
    message: '20% de réduction sur les trajets vers stad cette semaine',
    isRead: true,
    timestamp: 'Il y a 1 jour',
    type: 'promotion',
    details: {
      destination: 'stad',
      discount: '20%',
      date: "Valable jusqu'au 28 Avril 2025",
    },
  },
];

const Notifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>(notificationData);
  const { isDarkMode } = useTheme();

  const markAsRead = (id: number) => {
    setNotifications(prev =>
      prev.map(notif => notif.id === id ? { ...notif, isRead: true } : notif)
    );
  };

  const deleteNotification = (id: number) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  const clearAllNotifications = () => {
    setNotifications([]);
  };

  return (
    <View style={[styles.container, isDarkMode && styles.darkContainer]}>
      <View style={styles.header}>
        <Text style={[styles.headerText, isDarkMode && styles.darkHeaderText]}>
          Notifications
        </Text>
        {notifications.length > 0 && (
          <TouchableOpacity onPress={clearAllNotifications} style={styles.clearAllButton}>
            <Text style={styles.clearAllText}>Effacer tout</Text>
          </TouchableOpacity>
        )}
      </View>

      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View
            style={[
              styles.card,
              !item.isRead && styles.unreadCard,
              isDarkMode && styles.darkCard,
            ]}
          >
            <Text
              style={[
                styles.title,
                !item.isRead && styles.unreadTitle,
                isDarkMode && styles.darkTitle,
              ]}
            >
              {item.title}
            </Text>
            <Text style={[styles.message, isDarkMode && styles.darkText]}>
              {item.message}
            </Text>
            <Text style={[styles.timestamp, isDarkMode && styles.darkSubText]}>
              {item.timestamp}
            </Text>
            {item.details && (
              <View style={[styles.detailsBox, isDarkMode && styles.darkDetailsBox]}>
                {item.details.destination && <Text style={isDarkMode && styles.darkText}>🚍 Destination: {item.details.destination}</Text>}
                {item.details.date && <Text style={isDarkMode && styles.darkText}>📅 Date: {item.details.date}</Text>}
                {item.details.departureTime && <Text style={isDarkMode && styles.darkText}>🕒 Départ: {item.details.departureTime}</Text>}
                {item.details.discount && <Text style={isDarkMode && styles.darkText}>🎉 Réduction: {item.details.discount}</Text>}
              </View>
            )}
            <View style={styles.buttonRow}>
              {!item.isRead && (
                <TouchableOpacity onPress={() => markAsRead(item.id)} style={styles.button}>
                  <Text style={styles.buttonText}>Marquer comme lu</Text>
                </TouchableOpacity>
              )}
              <TouchableOpacity onPress={() => deleteNotification(item.id)} style={styles.deleteButton}>
                <Text style={styles.deleteText}>Supprimer</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
};

export default Notifications;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#f7f7f7',
    flex: 1,
  },
  darkContainer: {
    backgroundColor: '#111827',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    marginBottom: 16,
  },
  headerText: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#4b5563',
  },
  darkHeaderText: {
    color: '#f9fafb',
  },
  clearAllButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: '#2563eb',
    borderRadius: 8,
    elevation: 5,
  },
  clearAllText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  card: {
    backgroundColor: '#ffffff',
    padding: 18,
    borderRadius: 12,
    marginBottom: 16,
    elevation: 6,
  },
  darkCard: {
    backgroundColor: '#1f2937',
  },
  unreadCard: {
    borderWidth: 1,
    borderColor: '#2563eb',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
  },
  darkTitle: {
    color: '#f3f4f6',
  },
  unreadTitle: {
    color: '#2563eb',
  },
  message: {
    fontSize: 16,
    marginTop: 8,
    color: '#374151',
  },
  timestamp: {
    fontSize: 14,
    color: '#9ca3af',
    marginTop: 4,
  },
  darkText: {
    color: '#d1d5db',
  },
  darkSubText: {
    color: '#9ca3af',
  },
  detailsBox: {
    marginTop: 10,
    padding: 12,
    backgroundColor: '#f3f4f6',
    borderRadius: 10,
  },
  darkDetailsBox: {
    backgroundColor: '#374151',
  },
  buttonRow: {
    flexDirection: 'row',
    marginTop: 12,
    gap: 12,
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: '#e0e7ff',
    borderRadius: 8,
    elevation: 4,
  },
  buttonText: {
    color: '#1e40af',
    fontSize: 16,
    fontWeight: '600',
  },
  deleteButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: '#fee2e2',
    borderRadius: 8,
    elevation: 4,
  },
  deleteText: {
    color: '#b91c1c',
    fontSize: 16,
    fontWeight: '600',
  },
});
