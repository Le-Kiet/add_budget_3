import { View, Text, StyleSheet, TextInput, Alert } from "react-native";
import { Picker } from "@react-native-picker/picker";
import React, { useState, useContext } from "react";
import Slider from "@react-native-community/slider";
import { TouchableOpacity } from "react-native-gesture-handler";
import DropDownPicker from "react-native-dropdown-picker";
import { GlobalContext } from "../contextAPI/GlobalState";
const AddBudget = ({ navigation }) => {
  const { addBudget, transactions, incomes } = useContext(GlobalContext);
  const [budget, setBudget] = useState(0);
  const [selectedValue, setSelectedValue] = useState("");

  // const [selectedTransaction, setSelectedTransaction] = useState(
  //   transactions[0].name
  // );
  const selectedTransaction = transactions.map(
    (transaction) => transaction.name
  );
  const handleSelectChange = (itemValue) => {
    setSelectedValue(itemValue);
    // Thực hiện xử lý khi giá trị được chọn thay đổi
  };

  const onBudgetChange = (value) => {
    setBudget(value);
  };
  function replaceBudget(newBudget) {
    const updatedBudget = {
      id: newBudget.id,
      total: newBudget.total,
      spent: newBudget.spent,
      date: newBudget.date,
    };

    return updatedBudget;
  }
  const NewBudget = () => {
    if (budget == 0) {
      alert("Please enter money amount");
    } else if (selectedValue.length == 0) {
      alert("Please enter category");
    } else {
      const category = transactions.find(
        (transaction) => transaction.name === selectedValue
      );
      console.log(category);
      if (category) {
        // Tạo đối tượng giao dịch mới
        let shouldStop = false;
        const currentDate = new Date();
        const formattedDate = currentDate.toISOString().slice(0, 7);
        category.budget.some((budgets, index) => {
          if (formattedDate === budgets.date) {
            const confirmMessage =
              "Bạn có muốn thay thế giá trị mới cho budget không?";
            Alert.alert(
              "Xác nhận",
              confirmMessage,
              [
                {
                  text: "Không",
                  style: "cancel",
                },
                {
                  text: "Có",
                  onPress: () => {
                    const newBudget = {
                      id: category.budget[index].id,
                      total: budget,
                      spent: 0,
                      date: formattedDate,
                    };
                    console.log(newBudget, "new budget");
                    category.budget[index] = replaceBudget(newBudget); // Thay thế budget mới
                  },
                },
              ],
              { cancelable: false }
            );

            shouldStop = true;
            return true;
          }
        });

        if (shouldStop) {
          return; // Dừng lại ngay tại điểm này
        }

        console.log(formattedDate, "formattedDate");
        const newBudget = {
          id: Math.floor(Math.random() * 100000000),
          total: +budget,
          spent: 0,
          date: formattedDate,
        };
        console.log(newBudget, "budget");
        category.budget.push(newBudget);
        addBudget(category.id, newBudget);
        console.log(transactions[1]);
      }
    }
  };
  const onInputChange = (text) => {
    const numericValue = parseInt(text, 10);
    setBudget(numericValue);
  };
  const [open, setOpen] = useState(false);
  const transactionNames = transactions.map((transaction) => ({
    label: transaction.name,
    value: transaction.name,
  }));
  const [pickerItem, setPickerItem] = useState(transactionNames);

  console.log(selectedTransaction, "...");
  return (
    <View style={styles.container}>
      <Text style={styles.budgetText}>Current Budget: {budget}$</Text>
      <Slider
        style={styles.slider}
        minimumValue={0}
        maximumValue={100000}
        step={100}
        value={budget}
        onValueChange={onBudgetChange}
      />
      <DropDownPicker
        style={{ marginTop: 20 }}
        items={pickerItem}
        value={selectedValue}
        open={open}
        setOpen={setOpen}
        setValue={handleSelectChange}
      />

      <TextInput
        style={styles.input}
        keyboardType="numeric"
        // value={budget}
        // onChangeText={onInputChange}
        placeholder="Enter Amount . . ."
        value={isNaN(budget) ? "0" : String(budget)}
        onChangeText={(text) => {
          const numericValue = Number(text);
          setBudget(isNaN(numericValue) ? 0 : numericValue);
        }}
      />
      <View style={{ alignItems: "center" }}>
        <TouchableOpacity
          onPress={() => NewBudget()}
          style={styles.addBudgetButton}
        >
          <Text style={styles.addBudgetText}>Create a budget</Text>
        </TouchableOpacity>
      </View>
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
  addBudgetButton: {
    padding: 8,
    gap: 10,
    backgroundColor: "#7F3DFF",
    borderRadius: 16,
    alignItems: "center",
    width: 300,
    marginTop: 20,
  },
  addBudgetText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default AddBudget;
