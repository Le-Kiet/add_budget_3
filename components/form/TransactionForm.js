import React, { useState, useContext } from "react";
import {
  View,
  Text,
  Picker,
  StyleSheet,
  Image,
  Dimensions,
  TouchableWithoutFeedback,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import { Input, Button, Icon, TouchableOpacity } from "react-native-elements";
import { GlobalContext } from "../contextAPI/GlobalState";
import RecentTransaction from "../HomeScreen/RecentTransaction";
import { COLORS, FONTS, SIZES, icons, images } from "../../constants";
import ColorPicker from "react-native-wheel-color-picker";
import DropDownPicker from "react-native-dropdown-picker";
import moment from "moment";
const TransactionForm = ({ navigation }) => {
  const route = useRoute();
  const { addIncome, addExpense } = route.params;
  const confirmStatus = "C";
  const pendingStatus = "P";
  const [text, setText] = useState("");
  const [amount, setAmount] = useState("0");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [selectedColor, setSelectedColor] = useState("#000000");
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [recentTransactions, setRecentTransactions] = useState([]);
  const handleColorPress = () => {
    setSelectedColor();
  };

  const handleColorChange = (color) => {
    setSelectedColor(color);
    console.log(selectedColor);
  };

  const handleColorPickerClose = () => {
    setShowColorPicker(false);
  };
  const addRecentTransaction = (transaction) => {
    setRecentTransactions((prevTransactions) => [
      ...prevTransactions,
      transaction,
    ]);
  };

  const { addTransaction, transactions, incomes } = useContext(GlobalContext);
  const [selectedTransaction, setSelectedTransaction] = useState(
    transactions[0].name
  );
  const [otherTransaction, setOtherTransaction] = useState("");
  const [selectedIcon, setSelectedIcon] = useState(null);
  const [icon, setIcon] = useState(transactions[0].icon);
  const [color, setColor] = useState(transactions[0].color);
  const handleOnValueChange = (itemValue) => {
    setSelectedTransaction(itemValue);

    if (itemValue === "Others") {
      setIcon(null);
      setColor(null);
    } else {
      const foundTransaction = transactions.find(
        (transaction) => transaction.name === itemValue
      );

      if (foundTransaction) {
        setIcon(foundTransaction.icon);
        setColor(foundTransaction.color);
      }
    }
  };
  const handleOtherTransactionChange = (text) => {
    setOtherTransaction(text);
  };

  const handleIconChange = (selectedIcon) => {
    setSelectedIcon(selectedIcon);
  };
  const onSubmit = () => {
    let checkAmount = String(amount);

    if (
      selectedTransaction.length === 0 ||
      description.length === 0 ||
      amount === 0 ||
      typeof amount !== "number"
    ) {
      alert(`please fill the fields!`);
    } else if (checkAmount[0] == "-" || checkAmount == "NaN") {
      alert("Special characters are not allowed 1");
    } else {
      const category = transactions.find(
        (transaction) =>
          transaction.name === selectedTransaction ||
          transaction.name === otherTransaction
      );
      console.log(transactions);
      if (category) {
        // Tạo đối tượng giao dịch mới
        const currentDate = new Date();
        const formattedDate = currentDate.toISOString().slice(0, 10);
        const newTransaction = {
          id: Math.floor(Math.random() * 100000000),
          title: description,
          icon: icon,
          color: color,
          description: selectedTransaction,
          location: location,
          total: +amount,
          status: confirmStatus,
          date: formattedDate,
        };
        category.expenses.push(newTransaction);
        addTransaction("expenses", newTransaction); // Truyền "expenses" làm categoryId và newTransaction
        addRecentTransaction(newTransaction);
        setText("");
        setAmount("0");
      } else if (selectedTransaction === "Others") {
        // Create a new category for "Others"
        console.log(selectedIcon, 1);
        const newCategory = {
          id: Math.floor(Math.random() * 100000000),
          name: otherTransaction,
          icon: selectedIcon,
          color: selectedColor,
          expenses: [],
        };
        const currentDate = new Date();

        const formattedDate = currentDate.toISOString().slice(0, 10);

        const newTransaction = {
          id: Math.floor(Math.random() * 100000000),
          title: description,
          icon: icon,
          color: color,
          description: selectedTransaction,
          location: location,
          total: +amount,
          status: confirmStatus,
          date: formattedDate,
        };

        newCategory.expenses.push(newTransaction);
        transactions.push(newCategory);

        addTransaction("expenses", newTransaction);
        addRecentTransaction(newTransaction);

        setText("");
        setAmount("0");
      } else {
        alert("Category not found");
      }
    }
  };

  const onWithdraw = () => {
    let checkAmount = String(amount);
    if (
      selectedTransaction.length === 0 ||
      amount === 0 ||
      description.length === 0 ||
      typeof amount !== "number"
    ) {
      alert(`please fill the fields!`);
    } else if (checkAmount[0] == "-" || checkAmount == "NaN") {
      alert("Special characters are not allowed 1");
    } else {
      const category = incomes.find(
        (income) =>
          income.name === selectedTransaction ||
          income.name === otherTransaction
      );
      if (category) {
        const currentDate = new Date();
        const formattedDate = currentDate.toISOString().slice(0, 10);
        // Tạo đối tượng giao dịch mới
        const newIncome = {
          id: Math.floor(Math.random() * 100000000),
          title: description,
          description: selectedTransaction,
          location: "ByProgrammers' Location",
          icon: icon,
          color: color,
          total: +amount,
          status: confirmStatus,
          date: formattedDate,
        };

        category.income.push(newIncome);
        addTransaction("income", newIncome); // Truyền "expenses" làm categoryId và newTransaction
        addRecentTransaction(newIncome);
        setText("");
        setAmount("0");
      } else if (selectedTransaction === "Others") {
        // Create a new category for "Others"
        console.log(selectedIcon, 1);
        const newCategory = {
          id: Math.floor(Math.random() * 100000000),
          name: otherTransaction,
          icon: selectedIcon,
          color: selectedColor,
          income: [],
        };
        const currentDate = new Date();

        const formattedDate = currentDate.toISOString().slice(0, 10);

        const newIncome = {
          id: Math.floor(Math.random() * 100000000),
          title: description,
          icon: icon,
          color: color,
          description: selectedTransaction,
          location: location,
          total: +amount,
          status: confirmStatus,
          date: formattedDate,
        };

        newCategory.income.push(newIncome);
        transactions.push(newCategory);

        addTransaction("income", newIncome);
        addRecentTransaction(newIncome);

        setText("");
        setAmount("0");
      } else {
        alert("Category not found");
      }
    }
  };
  const [recentHistory, setRecentHistory] = useState([]);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: "Apple", value: "apple" },
    { label: "Banana", value: "banana" },
  ]);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create new Transaction</Text>
      <View style={styles.pickerContainer}>
        <Picker
          style={styles.picker}
          selectedValue={selectedTransaction}
          onValueChange={(itemValue) => handleOnValueChange(itemValue)}
        >
          {addExpense === true &&
            transactions.map((transaction) => (
              <Picker.Item
                key={transaction.id}
                label={transaction.name}
                value={transaction.name}
              />
            ))}
          {addIncome === true &&
            incomes.map((income) => (
              <Picker.Item
                key={income.id}
                label={income.name}
                value={income.name}
              />
            ))}
          <Picker.Item label="Others" value="Others" />
        </Picker>
      </View>
      {selectedTransaction === "Others" && (
        <View>
          <View>{/* <View style={{ marginTop: 100 }}></View> */}</View>
          <Input
            style={styles.input}
            value={otherTransaction}
            onChangeText={handleOtherTransactionChange}
            placeholder="Enter other transaction"
          />

          <ColorPicker
            color={selectedColor}
            onColorChange={handleColorChange}
            onColorChangeComplete={handleColorPickerClose}
          />
        </View>
      )}
      <Input
        label="TRANSACTION DESCRIPTION"
        labelStyle={styles.label}
        placeholder="Enter Description . . ."
        value={description}
        onChangeText={(text) => setDescription(text)}
        inputContainerStyle={styles.inputContainer}
      />
      <Input
        label="Location"
        labelStyle={styles.label}
        placeholder="Enter Location . . ."
        value={location}
        onChangeText={(text) => setLocation(text)}
        inputContainerStyle={styles.inputContainer}
      />
      <Input
        label="TRANSACTION AMOUNT"
        labelStyle={styles.label}
        keyboardType="numeric"
        placeholder="Enter Amount . . ."
        value={isNaN(amount) ? "0" : String(amount)}
        onChangeText={(text) => {
          const numericValue = Number(text);
          setAmount(isNaN(numericValue) ? 0 : numericValue);
        }}
        leftIcon={
          <Icon
            name="attach-money"
            type="material-icons"
            size={18}
            color="#2ed573"
          />
        }
        inputContainerStyle={styles.inputContainer}
      />
      {selectedTransaction === "Others" && (
        <View>
          <DropDownPicker
            items={Object.keys(icons).map((iconName) => ({
              label: iconName,
              value: icons[iconName],
              // icon: () => (
              //   <Image source={icons[iconName]} style={styles.otherIcons} />
              // ),
            }))}
            value={selectedIcon}
            setValue={setSelectedIcon}
            open={open}
            setOpen={setOpen}
            setItems={setItems}
            defaultValue={selectedIcon}
            containerStyle={styles.dropDownContainer}
            style={styles.dropDownContainer}
            itemStyle={styles.dropDownItem}
            dropDownStyle={styles.dropDownMenu}
            onChangeItem={(item) => setSelectedIcon(item.value)}
          />

          {/* <ColorPicker
              color={selectedColor}
              onColorChange={handleColorChange}
              onColorChangeComplete={handleColorPickerClose}
            /> */}
        </View>
      )}
      <View style={{ marginTop: 100 }}></View>
      <View style={styles.buttonContainer}>
        {addExpense === true && (
          <Button
            buttonStyle={[styles.button, styles.cashOutButton]}
            title="- CASH OUT"
            onPress={() => onSubmit()}
          />
        )}
        {addIncome === true && (
          <Button
            buttonStyle={[styles.button, styles.cashInButton]}
            title="+ CASH IN"
            onPress={() => onWithdraw()}
          />
        )}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 24,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#757575",
    borderRadius: 4,
    marginBottom: 16,
    backgroundColor: "#fff",
  },
  picker: {
    height: 40,
    color: "#757575",
    paddingLeft: 10,
  },
  label: {
    color: "#757575",
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: "#757575",
    borderRadius: 4,
    paddingHorizontal: 10,
    marginBottom: 16,
  },
  buttonContainer: {
    flexDirection: "row",
    alignSelf: "center",
    marginTop: 10,
  },
  button: {
    width: 150,
    borderRadius: 30,
  },
  cashOutButton: {
    backgroundColor: "#eb4d4b",
    marginRight: 5,
  },
  cashInButton: {
    backgroundColor: "#6ab04c",
    marginLeft: 5,
  },
  otherIcons: {
    width: 40,
    height: 40,
    borderRadius: 10,
    padding: 5,
    backgroundColor: "white",
  },
  buttonIcon: {
    width: 60,
    height: 60,
  },
  selectedButtonContainer: {
    backgroundColor: "yellow",
  },
  selectedTitle: {
    fontWeight: "bold",
  },
  selectedImage: {
    tintColor: "red",
  },
});
export default TransactionForm;
