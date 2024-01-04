// Account.js
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

const AccountScreen = () => {
  const accountData = [
    { name: "PayPal", balance: 100 },
    { name: "BIDV", balance: 200 },
    { name: "Momo", balance: 300 },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Account Balance</Text>
      {accountData.map((account, index) => (
        <View key={index} style={styles.accountContainer}>
          <Text style={styles.accountName}>{account.name}</Text>
          <Text style={styles.accountBalance}>Balance: {account.balance}</Text>
        </View>
      ))}
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
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
  },
  accountContainer: {
    borderWidth: 1,
    borderColor: "#7F3DFF",
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  accountName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  accountBalance: {
    fontSize: 16,
  },
});

export default AccountScreen;
