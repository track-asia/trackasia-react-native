import React from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import Map from '../components/Map';

const MapPage: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>TrackAsia Map Demo</Text>
        <Text style={styles.subtitle}>Hiển thị bản đồ và vị trí người dùng</Text>
      </View>
      <View style={styles.mapContainer}>
        <Map />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 16,
    backgroundColor: '#f5f5f5',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
  },
  mapContainer: {
    flex: 1,
  },
});

export default MapPage; 