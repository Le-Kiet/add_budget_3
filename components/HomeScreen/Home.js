import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import * as React from "react";
import HomeDetails from "./HomeDetails";
import HomeScreen from "./HomePage";
import TransactionForm from "../form/TransactionForm";
import { createStackNavigator } from "@react-navigation/stack";
const Stack = createStackNavigator();

const Notification = () => {
  return (
    <Stack.Navigator initialRouteName="HomeScreen">
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: "Expense Tracker" }}
        // options={{ headerShown: false }}
      />
      <Stack.Screen
        name="HomeDetails"
        component={HomeDetails}
        options={{ title: "Add Expense" }}

        // options={{ headerShown: false }}
      />
      <Stack.Screen
        name="TransactionForm"
        component={TransactionForm}
        options={{ title: "Add Expense" }}

        // options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};
//20521495_LeDinhTuanKiet
export default Notification;
