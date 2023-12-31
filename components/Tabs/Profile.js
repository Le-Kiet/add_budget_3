import { View, Text, Button, StyleSheet, TouchableOpacity, Image } from "react-native";
import * as React from "react";
import { FIREBASE_AUTH } from "../../FirebaseConfig";
import Ionicons from "react-native-vector-icons/Ionicons";
const Profile = ({ navigation }) => {
  const userData = {
    username: "Ngan Giang",
    email: "ngangiang22@gmail.com",
    avatarUrl: "https://i.imgur.com/ehzRLWS.jpg",
  };

  const handleLogout = () => {
    navigation.navigate("Home");
  };

  const handleEditProfile = () => {
    // navigation.navigate("EditProfile");
  };

  const handleChangePassword = () => {
    // navigation.navigate("ChangePassword");
  };

  return (
    <View style={styles.container}>
      <View style={styles.avatarContainer}>
        <Image source={{ uri: userData.avatarUrl }} style={styles.avatar} />
        <Text style={styles.textProfileA}>{userData.username}</Text>
      </View>
      <View style={styles.title}>
        <Text style={styles.title}> SETTING</Text>
      </View>
      <View style={styles.optionSetting}>
        <TouchableOpacity style={styles.lineOption}>
          <Text style={styles.textProfile}>Quản lý tài khoản/thẻ</Text>
          <Ionicons name="arrow-forward" size={20} color="#0D0E0F" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.lineOption}>
          <Text style={styles.textProfile}>Chi tiết thống kê</Text>
          <Ionicons name="arrow-forward" size={20} color="#0D0E0F" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.lineOption}>
          <Text style={styles.textProfile}>Đăng nhập và bảo mật</Text>
          <Ionicons name="arrow-forward" size={20} color="#0D0E0F" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.lineOption}>
          <Text style={styles.textProfile}>Cài đặt thông báo</Text>
          <Ionicons name="arrow-forward" size={20} color="#0D0E0F" />
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={handleLogout}>
        <Button color={"#7F3DFF"} title="Log out" onPress={() => FIREBASE_AUTH.signOut()}></Button>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },

  avatarContainer: {
    flex: 1,

    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
    marginTop: 16,
    position: "absolute",
    top: 0,
    margin: 16,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 50,
  },
  title: {
    right: 0,
    left: 0,
    fontSize: 15,
    fontWeight: "bold",
    color: "#7F3DFF",
    alignSelf: "flex-start",
    marginBottom: 10,
  },
  optionSetting: {
    right: 0,
    left: 0,
    width: "100%",
    fontStyle: "normal",
    alignSelf: "flex-start",
    backgroundColor: "#ffffff",
    borderRadius: 20,
    marginBottom: 16,
  },
  lineOption: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    borderRadius: 8,
    marginBottom: 1,
    backgroundColor: "#ffffff",
  },

  buttonTextOut: {
    flexDirection: "row",
    color: "#ffffff",
    padding: 5,
    borderRadius: 8,
    marginBottom: 1,
    alignItems: "center",
  },
  textProfile: {
    flexDirection: "row",
    fontSize: 13,
    fontWeight: "bold",
    textAlign: "center",
    color: "#0D0E0F",
    marginLeft: 20,
    padding: 12,
    alignSelf: "flex-start",
  },
  textProfileA: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    color: "#0D0E0F",
    padding: 10,
    alignSelf: "center",
  },
  logoutButton: {
    flexDirection: "row",
    backgroundColor: "#7F3DFF",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
    alignSelf: "flex-end",
  },
});

export default Profile;
