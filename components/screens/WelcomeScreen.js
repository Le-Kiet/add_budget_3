// screens/WelcomeScreen.js

import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import LaunchScreen from "./LaunchScreen";
//19521445_DuongThiNganGiang
const WelcomeScreen = ({ navigation }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate("Launch");
    }, 2000);
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Montra</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#7F3DFF",
  },
  text: {
    fontSize: 40,
    fontFamily: "Roboto",
    fontWeight: "bold",
    color: "#ffffff",
  },
});

export default WelcomeScreen;
