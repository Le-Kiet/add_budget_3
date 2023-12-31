import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
//19521445_DuongThiNganGiang
const SignUpVerificationScreen = () => {
  const navigation = useNavigation();
  const [verificationCode, setVerificationCode] = useState("");

  const handleLogin = () => {
    const generatedCode = "123456";
    if (!verificationCode) {
      alert("Please enter the verification code");
      return;
    }
    if (verificationCode !== generatedCode) {
      Alert.alert("Error", "Invalid verification code. Please try again.", [{ text: "OK" }]);
    } else {
      Alert.alert("Success", "Your account has been created successfully!", [{ text: "OK" }]);
      navigation.navigate("Login");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>Verification Code</Text>
      <Text style={styles.text}>Please enter the verification code sent to your email.</Text>

      <TextInput
        style={styles.TextInput}
        placeholder="Verification Code"
        keyboardType="numeric"
        value={verificationCode}
        onChangeText={(text) => setVerificationCode(text)}
      />

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText} onPress={handleLogin}>
          Verify
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  text: {
    fontSize: 16,
    marginBottom: 30,
    textAlign: "center",
  },
  input: {
    height: 40,
    width: "100%",
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: "#7F3DFF",
    padding: 10,
    borderRadius: 8,
    marginTop: 20,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "bold",
  },
  TextInput: {
    backgroundColor: "#ffffff",
    color: "#0D0E0F",
    padding: 10,
    marginBottom: 10,
    width: 300,
    alignSelf: "center",
    borderRadius: 16,
    borderColor: "#91919F",
    borderWidth: 1,
  },
});
export default SignUpVerificationScreen;
