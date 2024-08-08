import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import HomeScreen from "./screens/HomeScreen";
import NewsScreen from "./screens/NewsScreen";
import { StyleSheet, View } from "react-native";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <View style={{ flex: 1, backgroundColor: "#112026" }}>
          <StatusBar style="inverted" />
          <Tab.Navigator
            screenOptions={({ route }) => ({
              headerShown: false,

              tabBarIcon: ({ focused, color, size }) => {
                const iconName = route.name === "Inicio" ? "home" : "newspaper";
                return (
                  <Ionicons
                    name={focused ? iconName : `${iconName}-outline`}
                    size={focused ? 28 : 24}
                    color={color}
                  />
                );
              },
              tabBarActiveTintColor: "#2A9D8F",
              tabBarInactiveTintColor: "gray",
              tabBarStyle: {
                position: "absolute",
                height: 85,
                paddingBottom: 20,
                paddingTop: 5,
                backgroundColor: "#0d191f",
                borderTopWidth: 0,
              },
              tabBarLabelStyle: { fontSize: 15 },
            })}
          >
            <Tab.Screen name="Inicio" component={HomeScreen} />
            <Tab.Screen name="Noticias" component={NewsScreen} />
          </Tab.Navigator>
        </View>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
