import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import Slider from "@react-native-community/slider";
import AddBudget from "../BudgetScreen/AddBudget";
import BudgetController from "../BudgetScreen/BudgetController";
// import { TouchableOpacity } from "react-native-gesture-handler";
import { createStackNavigator } from "@react-navigation/stack";
const Stack = createStackNavigator();
const Favorites = () => {
  return (
    <Stack.Navigator initialRouteName="BudgetController">
      <Stack.Screen
        name="Budget Controller"
        component={BudgetController}
        options={{ title: "Budget Controller", headerShown: false }}
      />
      <Stack.Screen
        name="AddBudget"
        component={AddBudget}
        // options={{ title: "Add Budget", headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default Favorites;
