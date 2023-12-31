import { View, Text, StyleSheet, TextInput } from "react-native";
import React, { useState } from "react";
import Slider from "@react-native-community/slider";
import { TouchableOpacity } from "react-native-gesture-handler";
import { GlobalContext } from "../contextAPI/GlobalState";
const AddBudget = ({ navigation }) => {
  const [budget, setBudget] = useState(0);
  const addBudget = () => {
    navigation.navigate();
  };
  const onBudgetChange = (value) => {
    setBudget(value);
  };

  const onInputChange = (text) => {
    const numericValue = parseInt(text, 10);
    setBudget(numericValue);
  };

  return (
    <View style={styles.container}>
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
        onChangeText={onInputChange}
      />
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
  },
  budgetText: {
    fontSize: 18,
  },
  slider: {
    marginTop: 20,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginTop: 10,
    paddingHorizontal: 10,
  },
});

export default AddBudget;
