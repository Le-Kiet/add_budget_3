import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from "react-native";

const AddBudget = () => {
  const [budget, setBudget] = useState(0);
  const [goal, setGoal] = useState(0);
  const [debt, setDebt] = useState(0);
  const [financialBalance, setFinancialBalance] = useState(budget - debt);
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
    console.log("Lưu thành công", `Ngân sách hiện tại: ${budget}$, Mục tiêu tài chính: ${goal}$`);
    Alert.alert("Saved");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Budget</Text>
      <Text style={styles.label}>Current budget:</Text>
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
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
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
});

export default AddBudget;
