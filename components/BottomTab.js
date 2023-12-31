import * as React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet, View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Favorites from "./Tabs/Favorites";
import Categories from "./Tabs/Categories";
import Profile from "./Tabs/Profile";
import Home from "./HomeScreen/Home";

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  const [favoriteCount, setFavoriteCount] = React.useState(3);
  //20521495_LeDinhTuanKiet

  return (
    <Tab.Navigator initialRouteName="Home" tabBarOptions={styles.tabBarOptions}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="home"
              size={size}
              style={[styles.tabIcon, { color: color === "blue" ? "blue" : "gray" }]}
            />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Categories"
        component={Categories}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="grid"
              size={size}
              style={[styles.tabIcon, { color: color === "blue" ? "blue" : "gray" }]}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Budgets"
        component={Favorites}
        options={{
          tabBarIcon: ({ color, size }) => (
            <View>
              <Ionicons
                name="wallet"
                size={size}
                style={[styles.tabIcon, { color: color === "blue" ? "blue" : "gray" }]}
              />
              {favoriteCount > 0 && (
                <View style={styles.badgeContainer}>
                  <Text style={styles.badgeText}>{favoriteCount}</Text>
                </View>
              )}
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="person"
              size={size}
              style={[styles.tabIcon, { color: color === "blue" ? "blue" : "gray" }]}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
//20521495_LeDinhTuanKiet

const styles = StyleSheet.create({
  tabBarOptions: {
    activeTintColor: "blue",
    inactiveTintColor: "gray",
    style: {
      borderTopWidth: 1,
      borderTopColor: "gray",
    },
    tabStyle: {
      paddingTop: 8,
    },
  },
  tabIcon: {
    borderRadius: 50,
    color: "gray",
  },
  badgeContainer: {
    position: "absolute",
    top: 0,
    right: -5,
    backgroundColor: "red",
    borderRadius: 10,
    paddingHorizontal: 5,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  badgeText: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
  },
});

export default BottomTabNavigator;
