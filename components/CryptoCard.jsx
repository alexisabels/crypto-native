import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

const CryptoCard = ({ item, toggleFavorite }) => {
  const color = item.change >= 0 ? "green" : "red";
  const icon = item.change >= 0 ? "arrow-up" : "arrow-down";

  return (
    <View style={[styles.card, { flexDirection: "row", alignItems: "center" }]}>
      <FontAwesome
        name={item.isFavorite ? "star" : "star-o"}
        size={24}
        color={item.isFavorite ? "gold" : "white"}
        onPress={() => toggleFavorite(item.name)}
        style={{ marginRight: 10 }}
      />
      <Text style={[styles.cardTitle, { flex: 1 }]}>
        {item.name.toUpperCase()}
      </Text>
      <View
        style={[
          styles.priceContainer,
          { flexDirection: "row", alignItems: "center" },
        ]}
      >
        <Text
          style={[
            styles.cardDescription,
            { color: color, marginRight: 5, fontSize: 16 },
          ]}
        >
          {item.price.toFixed(2)} € ({item.change.toFixed(2)}%)
        </Text>
        <FontAwesome name={icon} size={20} color={color} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#264653",
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cardTitle: {
    fontSize: 18,
    color: "white",
    fontWeight: "bold",
    marginLeft: 10,
  },
  cardDescription: {
    fontSize: 14,
    marginLeft: "auto",
  },
});

export default CryptoCard;
