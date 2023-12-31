import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import * as React from "react";
import NotificationDetail from "../NotificationScreen/NotificationDetail.js";
import NotificationScreen from "../NotificationScreen/NotificationScreen.js";
import { createStackNavigator } from "@react-navigation/stack";

const detail = "Notification Detail";
const screen = "Notification Screen";

const Stack = createStackNavigator();
//20521495_LeDinhTuanKiet

const Notification = () => {
  return (
    <Stack.Navigator initialRouteName={screen}>
      <Stack.Screen name={detail} component={NotificationDetail} />
      <Stack.Screen name={screen} component={NotificationScreen} />
    </Stack.Navigator>
  );
};

export default Notification;
