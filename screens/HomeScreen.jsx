import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import axios from "axios";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CryptoCard from "../components/CryptoCard";

export default function HomeScreen() {
  const [prices, setPrices] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const favorites = await loadFavorites();

        const response = await axios.get(
          "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,cardano,solana,tether,dogecoin&vs_currencies=eur&include_24hr_change=true"
        );
        const data = response.data;

        const formattedData = Object.keys(data).map((key) => ({
          name: key,
          price: data[key].eur,
          change: data[key].eur_24h_change,
          isFavorite: favorites.includes(key),
        }));

        formattedData.sort((a, b) =>
          a.isFavorite === b.isFavorite ? 0 : a.isFavorite ? -1 : 1
        );

        setPrices(formattedData);
      } catch (err) {
        setError(err);
      }
    };

    fetchPrices();
  }, []);

  const saveFavorites = async (favorites) => {
    try {
      await AsyncStorage.setItem("favorites", JSON.stringify(favorites));
    } catch (err) {
      console.error("Failed to save favorites", err);
    }
  };

  const loadFavorites = async () => {
    try {
      const storedFavorites = await AsyncStorage.getItem("favorites");
      return storedFavorites ? JSON.parse(storedFavorites) : [];
    } catch (err) {
      console.error("Failed to load favorites", err);
      return [];
    }
  };

  const toggleFavorite = (name) => {
    const updatedPrices = prices.map((item) =>
      item.name === name ? { ...item, isFavorite: !item.isFavorite } : item
    );
    updatedPrices.sort((a, b) =>
      a.isFavorite === b.isFavorite ? 0 : a.isFavorite ? -1 : 1
    );
    setPrices(updatedPrices);
    saveFavorites(
      updatedPrices.filter((item) => item.isFavorite).map((item) => item.name)
    );
  };

  const renderItem = ({ item }) => (
    <CryptoCard item={item} toggleFavorite={toggleFavorite} />
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>Precios de Criptomonedas</Text>
        <FlatList
          data={prices}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#112026",
  },
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginBottom: 20,
  },
});
