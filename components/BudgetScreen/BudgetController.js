import React, { useState, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  Image,
} from "react-native";
import Slider from "@react-native-community/slider";
import AddBudget from "../BudgetScreen/AddBudget";
import ProgressBar from "react-native-progress-bar-animated";
import Svg, { Circle } from "react-native-svg";
// import { TouchableOpacity } from "react-native-gesture-handler";

import { GlobalContext } from "../contextAPI/GlobalState";

import { createStackNavigator } from "@react-navigation/stack";
const Stack = createStackNavigator();
const Favorites = ({ navigation }) => {
  const { transactions, incomes } = useContext(GlobalContext);

  const [budgetCounter, setBudgetCounter] = useState(1);
  const [budget, setBudget] = useState(0);
  const [goal, setGoal] = useState(0);
  const [debt, setDebt] = useState(0);
  const [financialBalance, setFinancialBalance] = useState(budget - debt);
  const progress = 80; // Giá trị tiến độ là 70%

  let backgroundColorOnComplete = "#6CC644"; // Mặc định là màu đỏ

  if (progress >= 75) {
    backgroundColorOnComplete = "#FF0000"; // Xanh lá cây
  } else if (progress >= 50) {
    backgroundColorOnComplete = "#FFA500"; // Màu vàng
  } else if (progress >= 25) {
    backgroundColorOnComplete = "#FFD700"; // Màu cam
  }
  const addBudget = () => {
    navigation.navigate("AddBudget");
    console.log("AddBudget");
  };
  const onBudgetChange = (value) => {
    setBudget(value);
    updateFinancialBalance(value, debt);
  };
  const onGoalChange = (value) => {
    setGoal(value);
  };

  const onDebtChange = (value) => {
    setDebt(value);
    updateFinancialBalance(budget, value);
  };
  const updateFinancialBalance = (budgetValue, debtValue) => {
    const balance = budgetValue - debtValue;
    setFinancialBalance(balance);
  };

  const onSaveBudget = () => {
    console.log(
      "Lưu thành công",
      `Ngân sách hiện tại: ${budget}$, Mục tiêu tài chính: ${goal}$`
    );
    Alert.alert("Saved");
  };

  return (
    <View style={styles.container}>
      <Text style={{ color: "white" }}>Current Month</Text>
      {budgetCounter == 0 ? (
        <View>
          <Text style={styles.noBudgetText}>You dont have budget.</Text>
          <Text style={styles.noBudgetText}>
            Let's make one so you in control
          </Text>
        </View>
      ) : (
        <View style={styles.budgetContainer}>
          {/* BudgetComponent */}
          <View>
            <View style={styles.budgetHeader}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  borderWidth: 1,
                  borderRadius: 32,
                  borderColor: "#91919F",
                  padding: 3,
                }}
              >
                <Svg width="14" height="14" style={{ margin: 3 }}>
                  <Circle cx="7" cy="7" r="7" fill="red" />
                </Svg>
                <Text style={{ marginTop: -3 }}>aaaaaaaaaaaa</Text>
              </View>
              <View>
                <Image
                  source={require("../../assets/warning.png")}
                  style={{ height: 28, width: 28 }}
                ></Image>
              </View>
            </View>
            <View>
              <Text style={{ fontSize: 22, fontWeight: "bold" }}>
                Remaining $0
              </Text>
              <ProgressBar
                width={200}
                value={progress}
                backgroundColor={backgroundColorOnComplete}
              />
              <Text style={{ fontSize: 14, color: backgroundColorOnComplete }}>
                1000$ of 1200$
              </Text>
            </View>
          </View>
        </View>
      )}

      <TouchableOpacity onPress={addBudget} style={styles.addBudgetButton}>
        <Text style={styles.addBudgetText}>Create a budget</Text>
      </TouchableOpacity>
      {/* <Text style={styles.title}>Planner</Text>
      <Text style={styles.label}>Current budget:</Text>
      <View>
        <Text>budgets area</Text>
      </View>
      <TouchableOpacity onPress={addBudget}>
        <Text>Add New Budget</Text>
      </TouchableOpacity>
      <View>
        <Text>budgets area</Text>
      </View>
      <TouchableOpacity onPress={addBudget}>
        <Text>Add New Budget</Text>
      </TouchableOpacity>
      <Text style={styles.title}>Budget Planner</Text>
      <Text style={styles.title}>Your Balanced: 2000$</Text>
      <Text style={styles.budgetText}>Current Budget: {budget}$</Text>
      <Slider
        style={styles.slider}
        minimumValue={0}
        maximumValue={2000}
        step={100}
        value={budget}
        onValueChange={onBudgetChange}
      />
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={budget.toString()}
        onChangeText={onBudgetChange}
      />
      <Text style={styles.label}>Goal: </Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={goal.toString()}
        onChangeText={onGoalChange}
      />
      <Text style={styles.label}>Debt: </Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={debt.toString()}
        onChangeText={onDebtChange}
      />
      <Text style={styles.label}>Current Balanced: </Text>
      <Text>{financialBalance}$</Text>
      <TouchableOpacity style={styles.buttonSave} onPress={onSaveBudget}>
        <Text style={styles.text}>Save</Text>
      </TouchableOpacity> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    marginBottom: 10,
    fontWeight: "bold",
    color: "#7F3DFF",
    alignSelf: "center",
  },
  label: {
    fontSize: 18,
    marginTop: 10,
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginTop: 5,
    paddingHorizontal: 10,
  },
  buttonSave: {
    marginTop: 40,
    alignItems: "center",
    alignSelf: "center",
    paddingVertical: 10,
    paddingHorizontal: 50,
    borderRadius: 10,
    color: "#7F3DFF",
    backgroundColor: "#7F3DFF",
  },
  text: {
    fontSize: 15,
    fontWeight: "bold",
    textAlign: "center",
    color: "#fff",
  },
  noBudgetText: {
    fontSize: 12,
    color: "#91919F",
  },
  addBudgetText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  addBudgetButton: {
    padding: 8,
    gap: 10,
    backgroundColor: "#7F3DFF",
    borderRadius: 16,
    alignItems: "center",
    width: 300,
    marginTop: 20,
  },
  budgetHeader: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default Favorites;
