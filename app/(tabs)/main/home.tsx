// home.tsx
import { useTheme } from './theme-context';
import { MapPin } from "lucide-react";
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  ImageBackground,
  ScrollView,
  TextInput,
  // Button, // Button import might not be needed if using TouchableOpacity
  Alert, // Import Alert for basic validation feedback
} from "react-native";
import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router'; // Make sure router is imported
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import React, { useState } from 'react';

// ... (destinations array remains the same)
const destinations = [
  // ... your destinations data
  {
    city: "Center ville",
    price: "10 DA",
    image: "https://th.bing.com/th/id/R.2dcbaded3f73043ae7050e06ed382f45?rik=qRVuosGXEkfZuA&pid=ImgRaw&r=0&sres=1&sresct=1",
  },
  {
    city: "Sidi ahmed",
    price: "10 DA",
    image: "https://th.bing.com/th/id/OIP.pxtLtZ1cJnAmf0KuwOdxRwHaFj?w=1024&h=768&rs=1&pid=ImgDetMain",
  },
  {
    city: "Stad",
    price: "10 DA",
    image: "https://th.bing.com/th/id/R.386d18ddb7f1711ea3c8918b2f4e52db?rik=l6ir%2b7dJsXsV%2fw&riu=http%3a%2f%2fstadiumdb.com%2fpictures%2fstadiums%2falg%2fstade_unite_meghrebine_bejaia%2fstade_unite_meghrebine_bejaia02.jpg&ehk=Y%2bsg15pHj6%2feA3HpY8pUyIqyL8LJGPHekcdQXKfmHOw%3d&risl=&pid=ImgRaw&r=0",
  },
  {
    city: "Ighezer ouzarif",
    price: "25 DA",
    image: "https://th.bing.com/th/id/R.7fd41195897fc3aa6a39ffbd68da9845?rik=9EX094FUkz5zCw&pid=ImgRaw&r=0",
  }
];


const Index = () => {
  const { isDarkMode } = useTheme();
  const [fromLocation, setFromLocation] = useState('');
  const [toLocation, setToLocation] = useState('');
  const [searchDate, setSearchDate] = useState('');

  const handleSearch = () => {
    // Basic validation (optional but recommended)
    if (!fromLocation || !toLocation || !searchDate) {
      Alert.alert("Champs manquants", "Veuillez remplir tous les champs de recherche.");
      return;
    }

    console.log("Navigating to results with:", { from: fromLocation, to: toLocation, date: searchDate });

    // Navigate to the search results screen, passing parameters
    router.push({
      pathname: "/search-results", // The route name for your results screen
      params: {
        from: fromLocation,
        to: toLocation,
        date: searchDate,
      },
    });
  };

  return (
    <ScrollView
      style={[styles.container, isDarkMode && styles.containerDark]}
      contentContainerStyle={styles.scrollContentContainer}
      keyboardShouldPersistTaps="handled"
    >
      {/* --- Header --- */}
      <View style={styles.headerRow}>
        <Text style={[styles.header, isDarkMode && styles.darkText]}>
          <Feather name="home" size={22} /> Home
        </Text>
        <TouchableOpacity
          onPress={() => console.log("scan")}
          style={styles.scan}
        >
          <MaterialIcons name="qr-code-scanner" size={20} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* --- Search Form --- */}
      <View style={[styles.searchForm, isDarkMode && styles.searchFormDark]}>
        <Text style={[styles.formLabel, isDarkMode && styles.textDark]}>De</Text>
        <TextInput
          style={[styles.input, isDarkMode && styles.inputDark]}
          placeholder="Lieu de départ"
          placeholderTextColor={isDarkMode ? '#9ca3af' : '#6b7280'}
          value={fromLocation}
          onChangeText={setFromLocation}
        />

        <Text style={[styles.formLabel, isDarkMode && styles.textDark]}>À</Text>
        <TextInput
          style={[styles.input, isDarkMode && styles.inputDark]}
          placeholder="Destination"
          placeholderTextColor={isDarkMode ? '#9ca3af' : '#6b7280'}
          value={toLocation}
          onChangeText={setToLocation}
        />

        <Text style={[styles.formLabel, isDarkMode && styles.textDark]}>Date</Text>
        <TextInput
          style={[styles.input, isDarkMode && styles.inputDark]}
          placeholder="JJ/MM/AAAA" // Simplified placeholder
          placeholderTextColor={isDarkMode ? '#9ca3af' : '#6b7280'}
          value={searchDate}
          onChangeText={setSearchDate}
          // Consider using a DatePicker component here for better UX
        />

        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
            <Text style={styles.searchButtonText}>Rechercher</Text>
        </TouchableOpacity>
      </View>
      {/* --- End Search Form --- */}


      {/* --- Recommended Destinations --- */}
      <Text style={[styles.sectionTitle, isDarkMode && styles.darkText]}>Destinations Recommandées</Text>
      <View style={styles.grid}>
        {destinations.map((destination) => (
          <TouchableOpacity
            key={destination.city}
            style={styles.touchable}
            onPress={() => console.log("Navigating to preview for", destination.city)} // Example action
          >
            <View style={[styles.card, isDarkMode && styles.cardDark]}>
              <ImageBackground
                source={{ uri: destination.image }}
                style={styles.image}
              />
              <View style={styles.cardContent}>
                <View style={styles.cardHeader}>
                  <MapPin size={20} color={isDarkMode ? '#d1d5db' : '#4b5563'} />
                  <Text style={[styles.cityText, isDarkMode && styles.cityTextDark]}>
                    Gare routière ⇆ {destination.city} {/* Corrected typo */}
                  </Text>
                </View>
                <View style={styles.cardDetails}>
                  <Text style={isDarkMode ? styles.textDark : styles.textLight}>
                    Prix à partir de: <Text style={[styles.highlight, isDarkMode && styles.highlightDark]}>{destination.price}</Text>
                  </Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>
      {/* --- End Recommended Destinations --- */}

    </ScrollView>
  );
};

// --- Styles ---
// Keep your existing styles, but add/modify these:
const styles = StyleSheet.create({
  // ... (Keep all your existing styles: container, containerDark, scrollContentContainer, headerRow, header, darkText, scan, searchForm, searchFormDark, formLabel, input, inputDark, searchButton, searchButtonText, grid, touchable, card, cardDark, image, cardContent, cardHeader, cityText, cityTextDark, cardDetails, highlight, highlightDark, textLight, textDark)
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
    paddingTop: 40, // Adjust as needed, consider safe area
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#111827',
    // Add icon alignment if needed
    display: 'flex',
    alignItems: 'center',
  },
  darkText: {
    color: '#fff',
  },
  scan: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#2563eb',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  searchForm: {
    marginBottom: 24,
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  searchFormDark: {
    backgroundColor: '#1f2937',
    borderColor: '#374151',
  },
  formLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
    marginBottom: 4,
    marginTop: 8,
  },
  input: {
    height: 45,
    borderColor: '#d1d5db',
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 12,
    marginBottom: 12,
    backgroundColor: '#fff',
    color: '#111827',
    fontSize: 16,
  },
  inputDark: {
    borderColor: '#4b5563',
    backgroundColor: '#374151',
    color: '#f9fafb',
  },
  searchButton: {
      backgroundColor: '#2563eb',
      paddingVertical: 12,
      paddingHorizontal: 20,
      borderRadius: 6,
      alignItems: 'center',
      marginTop: 10,
  },
  searchButtonText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: 'bold',
  },
  sectionTitle: { // Added style for the "Recommended Destinations" title
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
    color: '#111827',
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
    height: 180,
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
    flexShrink: 1, // Allow text to shrink if needed
  },
  cityTextDark: {
    color: '#f9fafb',
  },
  cardDetails: {
    gap: 4,
    flexDirection: 'row', // Align price and date horizontally
    justifyContent: 'space-between', // Space them out
    alignItems: 'center',
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
  dateText: { // Style for the date in the card
    fontSize: 14,
    color: '#6b7280',
  },
  dateTextDark: {
    color: '#9ca3af',
  },
});

export default Index;
