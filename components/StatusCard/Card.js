import React, { useContext } from "react";
import { GlobalContext } from "../contextAPI/GlobalState";
import { View, Text, Image, StyleSheet } from "react-native";

const Card = () => {
  const { transactions, incomes } = useContext(GlobalContext);

  const amountsIncome = incomes.flatMap((transaction) => transaction.income);

  const income = amountsIncome
    .filter((item) => item.total > 0)
    .reduce((acc, item) => (acc += item.total), 0)
    .toFixed(2);

  const amountExpense = transactions.flatMap(
    (transaction) => transaction.expenses
  );

  const expense = amountExpense
    .filter((item) => item.total > 0)
    .reduce((acc, item) => (acc += item.total), 0)
    .toFixed(2);

  return (
    <View>
      <View style={styles.spending}>
        <View style={styles.income}>
          <Image
            style={styles.iconBgWhite}
            source={require("../../assets/income.png")}
          />
          <View style={{ marginLeft: 10 }}>
            <Text style={styles.balanced}>Income</Text>
            <Text style={styles.balanced}>{income} $</Text>
          </View>
        </View>
        <View style={styles.outcome}>
          <Image
            style={styles.iconBgWhite}
            source={require("../../assets/expense.png")}
          />
          <View style={{ marginLeft: 10 }}>
            <Text style={styles.balanced}>Outcome</Text>
            <Text style={styles.balanced}>{expense} $</Text>
          </View>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  spending: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
  },
  income: {
    backgroundColor: "green",
    flexDirection: "row",
    padding: 10,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  outcome: {
    backgroundColor: "red",
    flexDirection: "row",
    padding: 10,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
  },
  balanced: {
    fontSize: 15,
    fontWeight: "bold",
    color: "white",
  },
});
export default Card;
