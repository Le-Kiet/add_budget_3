import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Button,
} from "react-native";
import * as React from "react";
import StatusCard from "../StatusCard/Card";
import { useNavigation } from "@react-navigation/native";
import TransactionForm from "../form/TransactionForm";
import { useState, useContext } from "react";
import RecentTransaction from "../HomeScreen/RecentTransaction";
import { GlobalContext } from "../contextAPI/GlobalState";
import LineChartComponent from "../LineChartComponent";
import Chart from "../Chart";
import History from "./History";

const HomePage = () => {
  const navigation = useNavigation();
  const handleClick = () => {
    navigation.navigate("HomeDetails");
  };
  const { addTransaction, transactions, incomes } = useContext(GlobalContext);
  const [openTransaction, setOpenTransaction] = useState("false");
  const [addIncome, setAddIncome] = useState(true);
  const [addExpense, setAddExpense] = useState(false);
  const handleClickAddIncome = () => {
    navigation.navigate("TransactionForm", { addIncome: true });

    if (addIncome === true) {
    } else {
      setAddIncome(!addIncome);
      setAddExpense(!addExpense);
    }
  };
  const handleClickAddExpense = () => {
    navigation.navigate("TransactionForm", { addExpense: true });

    if (addExpense === true) {
    } else {
      setAddIncome(!addIncome);
      setAddExpense(!addExpense);
    }
  };
  const handleOpenTransaction = () => {
    setOpenTransaction(!openTransaction);
  };

  const educationExpenses = transactions.find(
    (transaction) => transaction.name === "Education"
  ).expenses;

  function renderHeaderRecentTransactions() {
    return (
      <View style={styles.recentTransactionHeader}>
        <Text style={styles.textBold}>Recent Transaction</Text>
        <TouchableOpacity style={styles.seeAllButton} onPress={handleClick}>
          <Text style={styles.textPurple}>See All</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        backgroundColor: "#F8EFFF",
      }}
    >
      {/* <TransactionForm /> */}
      <View
        style={{
          marginTop: 10,
        }}
      ></View>
      <LineChartComponent />

      <StatusCard />
      <View style={{ marginTop: 10 }}>{renderHeaderRecentTransactions()}</View>
      <RecentTransaction transactions={transactions} incomes={incomes} />
      {/* <History /> */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={{
            backgroundColor: "#6ab04c",
            marginRight: 5,
            padding: 10,
            borderRadius: 16,
          }}
          // style={[styles.button, styles.cashInButton]}
          onPress={handleClickAddIncome}
        >
          <Text style={[styles.textWhite, styles.textBold]}>+ CASH IN</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: "#eb4d4b",
            marginRight: 5,
            padding: 10,
            borderRadius: 16,
          }}
          // style={[styles.button, styles.cashOutButton]}
          onPress={handleClickAddExpense}
        >
          <Text style={[styles.textWhite, styles.textBold]}>- CASH OUT</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: "row",
    alignSelf: "center",
    marginTop: 10,
  },
  cashOutButton: {
    backgroundColor: "#eb4d4b",
    marginRight: 5,
  },
  cashInButton: {
    backgroundColor: "#6ab04c",
    marginLeft: 5,
  },
  recentTrans: {
    marginTop: 150,
  },
  // button: {
  //   width: 150,
  //   borderRadius: 30,
  // },
  button: {
    padding: 10,
    marginTop: 5,
    borderRadius: 5,
  },
  textWhite: {
    color: "white",
  },
  recentTransactionHeader: {
    width: 300,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textBold: {
    fontWeight: "bold",
  },
  seeAllButton: {
    backgroundColor: "#EEE5FF",
    borderRadius: 40,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  textPurple: {
    fontWeight: "bold",
    color: "#7F3DFF",
  },
});
export default HomePage;
