import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  Linking,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function NewsScreen() {
  const [news, setNews] = useState([]);
  const apiKey = "pub_50424750c1e629c56c2cbdfafef4c0a8e104e";

  useEffect(() => {
    fetch(
      `https://newsdata.io/api/1/news?apikey=${apiKey}&q=crypto&language=es&image=1&size=10`
    )
      .then((response) => response.json())
      .then((data) => setNews(data.results))
      .catch((error) => console.error(error));
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.image_url }} style={styles.image} />

      <Text style={styles.cardTitle}>{item.title}</Text>
      <Text style={styles.cardDescription}>{item.description}</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => Linking.openURL(item.link)}
      >
        <Text style={styles.buttonText}>Leer más</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>Noticias Crypto</Text>

        <FlatList
          data={news}
          showsVerticalScrollIndicator={false}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
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
  card: {
    backgroundColor: "#264653",
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
  },
  image: {
    width: "100%",
    height: 150,
    borderRadius: 10,
    marginBottom: 15,
  },
  noImage: {
    fontSize: 16,
    color: "gray",
    marginBottom: 15,
    textAlign: "center",
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    marginBottom: 10,
  },
  cardDescription: {
    fontSize: 14,
    color: "white",
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#2A9D8F",
    paddingVertical: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
  },
});
