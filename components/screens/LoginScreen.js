// screens/LoginScreen.js

import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Alert,
  Button,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FIREBASE_AUTH } from "../../FirebaseConfig";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
const LoginScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const auth = FIREBASE_AUTH;
  const [loading, setLoading] = useState("false");

  const handleLogin = () => {
    console.log("Đăng nhập thành công!");
    Alert.alert("Success", "Đăng nhập thành công!", [{ text: "OK" }]);
    navigation.navigate("Home");
  };
  const signIn = async () => {
    setLoading(true);
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      console.log(response);
      alert("check your emails");
    } catch (error) {
      console.log(error);
      alert("login failed:" + error.message);
    } finally {
      setLoading(false);
    }
  };
  const signUp = async () => {
    setLoading(true);
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log(response);
      alert("check your emails");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>Login</Text>
      <TextInput
        placeholder="Email"
        style={styles.TextInput}
        onChangeText={(text) => setEmail(text)}
        value={email}
      />
      <TextInput
        placeholder="Password"
        secureTextEntry
        style={styles.TextInput}
        onChangeText={(text) => setPassword(text)}
        value={password}
      />

      <TouchableOpacity style={styles.button} onPress={signIn}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={signUp}>
        <Text style={styles.buttonText}>SignUp</Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text style={styles.Text}> Forgot the Password?</Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text style={styles.Text} onPress={() => navigation.navigate("Signup")}>
          Don’t have an account yet? Sign Up
        </Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    width: 375,
    height: 667,
  },
  headerTitle: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    color: "#000000",
    marginTop: 100,
    marginBottom: 50,
    alignSelf: "center",
  },
  text: {
    fontSize: 15,
    fontWeight: "bold",
    textAlign: "left",
    color: "#0D0E0F",
    marginTop: 5,
    marginBottom: 5,
    marginLeft: 20,
  },
  Text: {
    fontSize: 15,
    fontWeight: "normal",
    textAlign: "center",
    color: "#7F3DFF",
    marginBottom: 20,
    alignSelf: "center",
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
  button: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
    padding: 5,
    width: 380,
    alignItems: "center",
    borderRadius: 16,
  },
  buttonText: {
    backgroundColor: "#7F3DFF",
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    padding: 10,
    marginBottom: 5,
    width: 343,
    height: 56,
    // alignItems: "center",
    borderRadius: 16,
  },
});
export default LoginScreen;
