import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import * as React from "react";
import ProfileScreen from "../ProfileScreen";
import AccountScreen from "./AccountScreen";
import { createStackNavigator } from "@react-navigation/stack";
const Stack = createStackNavigator();

const ProfileDetail = () => {
  return (
    <Stack.Navigator initialRouteName="ProfileScreen">
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        //options={{ title: "Expense Tracker" }}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Account"
        component={AccountScreen}
        //options={{ title: "Add Expense" }}

        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};
export default ProfileDetail;
