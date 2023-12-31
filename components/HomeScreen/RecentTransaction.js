import React, { useContext } from "react";
import { GlobalContext } from "../contextAPI/GlobalState";
import {
  ScrollView,
  Text,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { ListItem, Icon } from "react-native-elements";
const RecentTransaction = ({ transactions, incomes }) => {
  // Lấy ngày hiện tại
  const currentDate = new Date();
  const filteredTransactions = [];
  const threeDaysBefore = new Date(
    currentDate.getTime() - 3 * 24 * 60 * 60 * 1000
  );
  console.log(transactions);
  transactions.forEach((transactionCategory) => {
    transactionCategory.expenses.forEach((expense) => {
      const transactionDate = new Date(expense.date);
      expense.icon = transactionCategory.icon;
      expense.color = transactionCategory.color;
      const oneDayBefore = new Date(
        currentDate.getTime() - 3 * 24 * 60 * 60 * 1000
      );

      if (
        transactionDate >= threeDaysBefore &&
        transactionDate <= currentDate
      ) {
        // Giao dịch nằm trong khoảng thời gian cần lọc
        filteredTransactions.push(expense);
      }
    });
  });
  incomes.forEach((transactionCategory) => {
    transactionCategory.income.forEach((item) => {
      const transactionDate = new Date(item.date);
      item.icon = transactionCategory.icon;
      item.color = transactionCategory.color;
      const oneDayBefore = new Date(
        currentDate.getTime() - 3 * 24 * 60 * 60 * 1000
      );

      if (
        transactionDate >= threeDaysBefore &&
        transactionDate <= currentDate
      ) {
        // Giao dịch nằm trong khoảng thời gian cần lọc
        filteredTransactions.push(item);
      }
    });
  });
  const sortedTransactions = filteredTransactions.sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateB - dateA;
  });
  const earliestTransactions = sortedTransactions.slice(0, 5);
  return (
    <View>
      <View>
        {/* {transactions.map((transaction, index) => (
        <ListItem
          key={index}
          title={transaction.title}
          subtitle={transaction.description}
        >
          <ListItem.Content>
            <View style={styles.transaction}>
              <View style={styles.transaction}>
                <Image
                  source={transaction.icon}
                  style={{
                    width: 40,
                    height: 40,
                    marginRight: 10,
                    tintColor: transaction.color,
                  }}
                ></Image>
              </View>
              <View>
                <Text
                  style={{
                    fontSize: 16,
                    color: "#57606f",
                    fontWeight: "bold",
                  }}
                >
                  {transaction.title}
                </Text>
                <Text
                  style={{
                    fontSize: 12,
                    color: "#a4b0be",
                  }}
                >
                  {transaction.location}
                </Text>
              </View>
            </View>
          </ListItem.Content>
          <ListItem color="black">
            <ListItem.Subtitle style={styles.title}>
              -${Math.abs(transaction.total)}
            </ListItem.Subtitle>
          </ListItem>
        </ListItem>
      ))} */}
      </View>
      <ScrollView>
        {earliestTransactions.map((transaction, index) => (
          <ListItem
            key={index}
            title={transaction.title}
            subtitle={transaction.description}
          >
            <ListItem.Content>
              <View style={styles.transaction}>
                <View style={styles.transaction}>
                  <Image
                    source={transaction.icon}
                    style={{
                      width: 40,
                      height: 40,
                      marginRight: 10,
                      tintColor: transaction.color,
                    }}
                  ></Image>
                </View>
                <View>
                  <Text
                    style={{
                      fontSize: 16,
                      color: "#57606f",
                      fontWeight: "bold",
                    }}
                  >
                    {transaction.title}
                  </Text>
                  <Text
                    style={{
                      fontSize: 12,
                      color: "#a4b0be",
                    }}
                  >
                    {transaction.location}
                  </Text>
                </View>
              </View>
            </ListItem.Content>
            <ListItem color="black">
              <ListItem.Subtitle style={styles.title}>
                -${Math.abs(transaction.total)}
              </ListItem.Subtitle>
            </ListItem>
          </ListItem>
        ))}
      </ScrollView>
      <Text>aa</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  list: {
    borderLeftWidth: 5,
    marginTop: 2,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 20,
    color: "red",
    fontWeight: "bold",
  },
  subtitle: {
    marginLeft: 10,
  },
  text1: { fontSize: 16, color: "#57606f", fontWeight: "bold" },
  text2: { fontSize: 12, marginTop: 1, color: "#a4b0be" },
  transaction: {
    flexDirection: "row",
    justifyContent: "center",
  },
  textColorRed: {
    color: "red",
    fontWeight: "bold",
  },
  textSmallGrey: {
    color: "grey",
    fontSize: 10,
  },
  iconBgYellow: {
    backgroundColor: "#f5edb5",
    borderRadius: 10,
    padding: 5,
  },
});
export default RecentTransaction;
