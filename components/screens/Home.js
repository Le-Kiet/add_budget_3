import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import * as React from "react";
import BottomTab from "../BottomTab";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
const Stack = createStackNavigator();
//20521495_LeDinhTuanKiet

const Notification = () => {
  return (
    <NavigationContainer independent={true}>
      <BottomTab />
    </NavigationContainer>
  );
};

export default Notification;
