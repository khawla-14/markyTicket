import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { useLocalSearchParams, Stack } from 'expo-router';
import { useTheme } from './(tabs)/main/theme-context';
import { MapPin } from "lucide-react-native";
import { CalendarDays } from "lucide-react-native";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';


const MOCK_RESULTS = [
  {
    id: '1',
    fromCity: "Gare routière",
    toCity: "Center ville",
    price: "10 DA",
    image: "https://th.bing.com/th/id/R.2dcbaded3f73043ae7050e06ed382f45?rik=qRVuosGXEkfZuA&pid=ImgRaw&r=0&sres=1&sresct=1",
    departureTime: "08:00",
  },
  {
    id: '2',
    fromCity: "Gare routière",
    toCity: "Center ville",
    price: "10 DA",
    image: "https://th.bing.com/th/id/R.2dcbaded3f73043ae7050e06ed382f45?rik=qRVuosGXEkfZuA&pid=ImgRaw&r=0&sres=1&sresct=1",
    departureTime: "09:30",
  },
];

const SearchResultsScreen = () => {
  const { isDarkMode } = useTheme(); 
  const params = useLocalSearchParams<{ from: string; to: string; date: string }>();

  const [isLoading, setIsLoading] = React.useState(false);
  const [results, setResults] = React.useState<typeof MOCK_RESULTS>([]);

  React.useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      const filteredResults = MOCK_RESULTS.filter(
        (item) => item.toCity.toLowerCase().includes(params.to?.toLowerCase() ?? '')
      );
      setResults(filteredResults);
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, [params.from, params.to, params.date]);


  return (
    <ScrollView
      style={[styles.container, isDarkMode && styles.containerDark]}
      contentContainerStyle={styles.scrollContentContainer}
    >
      <Stack.Screen options={{ title: 'Résultats de recherche' }} />

      <View style={[styles.searchInfo, isDarkMode && styles.searchInfoDark]}>
        <View style={styles.infoRow}>
            <MapPin size={18} color={isDarkMode ? '#9ca3af' : '#6b7280'} />
            <Text style={[styles.infoText, isDarkMode && styles.textDark]}>
                <Text style={styles.infoLabel}>De:</Text> {params.from || 'N/A'}
            </Text>
        </View>
         <View style={styles.infoRow}>
             <MapPin size={18} color={isDarkMode ? '#9ca3af' : '#6b7280'} />
            <Text style={[styles.infoText, isDarkMode && styles.textDark]}>
                <Text style={styles.infoLabel}>À:</Text> {params.to || 'N/A'}
            </Text>
        </View>
        <View style={styles.infoRow}>
            <CalendarDays size={18} color={isDarkMode ? '#9ca3af' : '#6b7280'} />
            <Text style={[styles.infoText, isDarkMode && styles.textDark]}>
                <Text style={styles.infoLabel}>Date:</Text> {params.date || 'N/A'}
            </Text>
        </View>
      </View>

      {isLoading ? (
        <ActivityIndicator size="large" color={isDarkMode ? '#60a5fa' : '#2563eb'} style={styles.loader} />
      ) : results.length > 0 ? (
        <View style={styles.grid}>
          {results.map((result) => (
            <TouchableOpacity
              key={result.id}
              style={styles.touchable}
              onPress={() => console.log("Navigate to details for:", result.id)}
            >
              <View style={[styles.card, isDarkMode && styles.cardDark]}>
                <ImageBackground
                  source={{ uri: result.image }}
                  style={styles.image}
                />
                <View style={styles.cardContent}>
                  <View style={styles.cardHeader}>
                    <MapPin size={20} color={isDarkMode ? '#d1d5db' : '#4b5563'} />
                    <Text style={[styles.cityText, isDarkMode && styles.cityTextDark]}>
                      {result.fromCity} ⇆ {result.toCity}
                    </Text>
                  </View>
                  <View style={styles.cardDetails}>
                     <Text style={isDarkMode ? styles.textDark : styles.textLight}>
                        Prix: <Text style={[styles.highlight, isDarkMode && styles.highlightDark]}>{result.price}</Text>
                     </Text>
                     <Text style={[styles.dateText, isDarkMode && styles.dateTextDark]}>
                        {params.date}
                     </Text>
                  </View>
                   {result.departureTime && (
                       <Text style={[styles.departureTime, isDarkMode && styles.textDark]}>
                           Départ: {result.departureTime}
                       </Text>
                   )}
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      ) : (
        <Text style={[styles.noResultsText, isDarkMode && styles.textDark]}>
          Aucun résultat trouvé pour votre recherche.
        </Text>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9ff',
  },
  containerDark: {
    backgroundColor: '#111827',
  },
  scrollContentContainer: {
    paddingBottom: 20,
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  searchInfo: {
    marginBottom: 24,
    padding: 16,
    backgroundColor: '#e0e7ff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#c7d2fe',
  },
  searchInfoDark: {
    backgroundColor: '#1e293b',
    borderColor: '#334155',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 16,
    color: '#374151',
    marginLeft: 8,
  },
  infoLabel: {
      fontWeight: '600',
  },
  loader: {
      marginTop: 50,
  },
  noResultsText: {
      textAlign: 'center',
      marginTop: 40,
      fontSize: 16,
      color: '#4b5563',
  },
  grid: {
    gap: 16,
  },
  touchable: {
    width: '100%',
  },
  card: {
    borderWidth: 1,
    borderColor: '#c7d2fe',
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#fff',
  },
  cardDark: {
    borderColor: '#374151',
    backgroundColor: '#1f2937',
  },
  image: {
    height: 150,
    width: '100%',
  },
  cardContent: {
    padding: 16,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  cityText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
    flexShrink: 1,
  },
  cityTextDark: {
    color: '#f9fafb',
  },
  cardDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 4,
  },
  highlight: {
    color: '#3b82f6',
    fontWeight: 'bold',
  },
  highlightDark: {
    color: '#60a5fa',
  },
  textLight: {
    color: '#374151',
  },
  textDark: {
    color: '#d1d5db',
  },
  dateText: {
    fontSize: 14,
    color: '#6b7280',
  },
  dateTextDark: {
    color: '#9ca3af',
  },
  departureTime: {
      fontSize: 14,
      color: '#6b7280',
      marginTop: 4,
  }
});

export default SearchResultsScreen;
