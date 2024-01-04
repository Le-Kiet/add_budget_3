// Import các thư viện và thành phần cần thiết
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { CheckBox } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { FIREBASE_AUTH } from "../../FirebaseConfig";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { FIREBASE_DB } from "../../FirebaseConfig";
import { ref as sRef, set } from "firebase/database";
// Component chính cho giao diện đăng ký
const SignUpScreen = () => {
  const navigation = useNavigation();
  const [isChecked, setChecked] = useState(false);
  const [nickname, setNickname] = useState("");
  const [loading, setLoading] = useState("false");
  const auth = FIREBASE_AUTH;
  // State để lưu thông tin người dùng nhập vào
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [checkPassword, setCheckPassword] = useState(true);
  const handleLogin = () => {
    navigation.navigate("Login");
  };
  const signUp = async () => {
    setLoading(true);
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = response.user;

      // Tham chiếu đến nút người dùng trong Firebase Realtime Database
      const userRef = sRef(FIREBASE_DB, "users/" + user.uid);

      // Lưu trữ giá trị UserName vào Firebase Realtime Database
      await set(userRef, { email, userName: username }); // Thêm trường UserName vào đây

      console.log(response);
      alert("Check your emails");
    } catch (error) {
      console.log(error);
      alert("Sign up failed: " + error.message);
    } finally {
      setLoading(false);
    }
  };
  // Hàm xử lý sự kiện khi người dùng nhấn nút đăng ký
  const handleSignUp = () => {
    if (!username && !email && !password && !confirmPassword) {
      alert("Please fill in all required fields");
      return;
    }
    if (!username) {
      alert("Please enter your username");
      return;
    }
    if (!email) {
      alert("Please enter your email");
      return;
    }
    if (!password) {
      alert("Please enter your password");
      return;
    }
    if (password !== confirmPassword) {
      setCheckPassword(false);
      alert("Passwords do not match");
      return;
    }
    if (!isChecked) {
      alert("Please agree to the Terms of Service and Privacy Policy", [
        { text: "OK" },
      ]);
      return;
    }
    alert("Verify your email to complete the registration", [{ text: "OK" }]);
    navigation.navigate("SignUpVerification");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>Sign Up</Text>
      <Text style={styles.textWelcome}>Welcome to Montra ! </Text>
      <TextInput
        placeholder="User Name"
        style={styles.TextInput}
        onChangeText={(text) => setUsername(text)}
        value={username}
      />
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
      <TextInput
        placeholder="Confirm Password"
        secureTextEntry
        style={styles.TextInput}
        onChangeText={(text) => setConfirmPassword(text)}
        value={confirmPassword}
        onBlur={() => {
          // Xử lý sự kiện khi TextInput bị mất focus
          if (password !== confirmPassword) {
            setCheckPassword(false);
          } else {
            setCheckPassword(true);
          }
        }}
      />
      {checkPassword ? (
        <View></View>
      ) : (
        <View>
          <Text style={{ color: "red", fontWeight: "bold" }}>
            Password does not match, please check again
          </Text>
        </View>
      )}
      <CheckBox
        title="I agree to the Terms of Service and Privacy Policy"
        checked={isChecked}
        onPress={() => setChecked(!isChecked)}
        checkedColor="#7F3DFF"
        textStyle={styles.checkbox}
      />

      <TouchableOpacity style={styles.button} onPress={signUp}>
        <Text style={styles.buttonText}>Sign Up FireBase</Text>
      </TouchableOpacity>
      {/* <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity> */}
      <TouchableOpacity>
        <Text style={styles.Text} onPress={handleLogin}>
          Already have an account? Login
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    color: "#000000",
    marginBottom: 30,
    alignSelf: "center",
  },
  signInText: {
    marginTop: 20,
    color: "blue",
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    padding: 5,
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
    marginBottom: 10,
    width: 343,
    height: 56,
    // alignItems: "center",
    borderRadius: 16,
  },
  textWelcome: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    color: "#7F3DFF",
    marginBottom: 10,
    alignSelf: "center",
  },
  Text: {
    fontSize: 15,
    fontWeight: "normal",
    textAlign: "center",
    color: "#7F3DFF",
    marginBottom: 10,
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
  checkbox: {
    backgroundColor: "#ffffff",
    alignSelf: "center",
    fontWeight: "normal",
    color: "#0D0E0F",
  },
});

export default SignUpScreen;
