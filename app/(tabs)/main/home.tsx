import { useTheme } from './theme-context';
import { MapPin } from "lucide-react";
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  ImageBackground,
  ScrollView,
} from "react-native";
import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

const destinations = [
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

  return (
    <View style={[styles.container, isDarkMode && styles.containerDark]}>
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

     
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.grid}>
          {destinations.map((destination) => (
            <TouchableOpacity
              key={destination.city}
              style={styles.touchable}
              onPress={() => console.log("Navigating to preview")}
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
                      Gare outiare ⇆ {destination.city}
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
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9ff',
    paddingBottom: 0,
    paddingHorizontal: 16,
    paddingTop: 40,
  },
  containerDark: {
    backgroundColor: '#111827',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#111827',
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
  subheading: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 16,
    fontWeight: 'bold',

    color: '#6b7280',
  },
  subheadingDark: {
    color: '#9ca3af',
  },
  content: {
    padding: 20,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
  },
  touchable: {
    width: '100%',
    marginBottom: 16,
  },
  card: {
    borderWidth: 1,
    borderColor: '#c7d2fe',
    borderRadius: 12,
    overflow: 'hidden',
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
  },
  cityTextDark: {
    color: '#f9fafb',
  },
  cardDetails: {
    gap: 4,
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
});

export default Index;
