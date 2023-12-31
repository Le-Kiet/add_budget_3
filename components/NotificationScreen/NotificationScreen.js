// import { View, Text } from "react-native";
// import * as React from "react";
// const NotificationScreen = ({ navigation }) => {
//   return (
//     <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
//       <Text>Notification Screen</Text>
//     </View>
//   );
// };
// export default NotificationScreen;
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import * as React from "react";
import { useNavigation } from "@react-navigation/native";

export default function NotificationScreen() {
  const navigation = useNavigation();

  const handleGoToDetail = () => {
    navigation.navigate("Notification Detail");
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Notification Screen</Text>
      <TouchableOpacity style={styles.button} onPress={handleGoToDetail}>
        <Text style={styles.textWhite}>Go to detail</Text>
      </TouchableOpacity>
    </View>
  );
}
//20521495_LeDinhTuanKiet

const styles = StyleSheet.create({
  button: {
    marginTop: 10,
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 4,
  },
  textWhite: {
    color: "white",
  },
});
