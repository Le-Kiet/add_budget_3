import { View, Text, TouchableOpacity, StyleSheet, Image, Button } from "react-native";
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
// import { LinearGradient, Stop } from "react-native-svg";
// import { LineChart, AreaChart, Grid } from "react-native-gifted-charts";
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
  const dv = [
    { value: 170 },
    { value: 220 },
    { value: 170 },
    { value: 196 },
    { value: 176 },
    { value: 141 },
    { value: 172 },
  ];
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

        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F8EFFF",

        //backgroundColor: "white",
      }}
    >
      {/* <AreaChart
        data={[10, 20, 30, 40, 50]} // Dữ liệu cho biểu đồ
        strokeColor="#297AB1" // Màu đường kẻ
        fillColor="rgba(41, 122, 177, 0.3)" // Màu vùng bên dưới đường kẻ
        strokeWidth={2} // Độ dày đường kẻ
        fillGradient={["#297AB1", "#FFFFFF"]} // Gradient cho vùng bên dưới đường kẻ
        style={{ height: 200 }} // Kích thước biểu đồ
      >
        <Grid /> // Hiển thị lưới
      </AreaChart> */}
      <TouchableOpacity onPress={handleOpenTransaction}>
        <Text>New Transaction</Text>
      </TouchableOpacity>
      {openTransaction === true && (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <TouchableOpacity onPress={handleOpenTransaction}>
            <Text>Close Transaction</Text>
          </TouchableOpacity>
          <View style={styles.buttonContainer}>
            <Button
              buttonStyle={[styles.button, styles.cashOutButton]}
              title="- CASH OUT"
              onPress={handleClickAddExpense}
            />
            <Button
              buttonStyle={[styles.button, styles.cashInButton]}
              title="+ CASH IN"
              onPress={handleClickAddIncome}
            />
          </View>
        </View>
      )}
      {/* <TransactionForm /> */}

      <View style={{ marginTop: 400 }}></View>
      {/* <LineChartComponent data={transactions} width={300} height={300} /> */}
      <LineChartComponent />
      {/* <Chart /> */}
      <StatusCard />
      <View style={{ marginTop: 10 }}>{renderHeaderRecentTransactions()}</View>
      <RecentTransaction transactions={transactions} incomes={incomes} />

      {/* <History /> */}
    </View>
  );
  //20521495_LeDinhTuanKiet
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
  button: {
    width: 150,
    borderRadius: 30,
  },
  button: {
    backgroundColor: "blue",
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
