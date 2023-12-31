import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import * as React from "react";
import { useState } from "react";
import { useContext } from "react";
import { VictoryPie } from "victory-native";
// import LinearGradient from "react-native-linear-gradient";
import { COLORS, FONTS, SIZES, icons, images } from "../../constants";
import { ListItem, Icon } from "react-native-elements";
import Animated from "react-native-reanimated";
import { GlobalContext } from "../contextAPI/GlobalState";

const HomeDetails = ({ navigation }) => {
  const { deleteTransaction, transactions, incomes } =
    useContext(GlobalContext);
  // const amounts = transactions.map((transaction) => transaction.expenses.total);
  // const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);
  let totalExpense = 0;
  let totalIncome = 0;
  const confirmStatus = "C";
  const pendingStatus = "P";
  console.log(incomes);
  const filteredTransactions = [];
  const currentDate = new Date();
  const threeDaysBefore = new Date(
    currentDate.getTime() - 3 * 24 * 60 * 60 * 1000
  );
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  incomes.forEach((incomes) => {
    incomes.income.forEach((income) => {
      totalIncome += income.total;
    });
  });
  transactions.forEach((transaction) => {
    transaction.expenses.forEach((expense) => {
      totalExpense += expense.total;
    });
  });
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

  const sortedTransactions = filteredTransactions.sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateB - dateA;
  });
  let currentBalancedBalance = totalIncome - totalExpense;
  console.log(totalExpense);
  const Transactionlist = ({ transactions }) => {
    const allExpenses = transactions.reduce(
      (accumulator, currentTransaction) => {
        return [...accumulator, ...currentTransaction.expenses];
      },
      []
    );
    const renderItem = ({ item }) => (
      <View>
        <View style={styles.transaction}>
          <Image
            style={styles.iconBgYellow}
            source={require("../../assets/shopping-bag.png")}
          />
          <View style={{ marginLeft: 10 }}>
            <Text>{item.title}</Text>
            <Text style={styles.textSmallGrey}>{item.description}</Text>
          </View>
        </View>
        <View style={{ marginLeft: 100, marginTop: 10 }}>
          {/* <Text style={styles.textColorRed}>{item.expenses.total}</Text>   */}
          <Text>{item.location}</Text>
          <Text>{item.total}</Text>
          {item.expenses &&
            item.expenses.map((expense) => (
              <Text key={expense.id} style={styles.textSmallGrey}>
                {expense.location}
              </Text>
            ))}
        </View>
      </View>
    );
    return (
      <FlatList
        data={allExpenses}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString() + item.title}
        initialNumToRender={2}
      />
    );
  };
  const groupedTransactions = transactions.reduce(
    (groupedExpenses, category) => {
      category.expenses.forEach((expense) => {
        const transactionDate = new Date(expense.date).toDateString();

        if (!groupedExpenses[transactionDate]) {
          groupedExpenses[transactionDate] = [];
        }

        groupedExpenses[transactionDate].push({
          category: category,
          expense: expense,
        });
      });

      return groupedExpenses;
    },
    {}
  );
  const [thisDate, setThisDate] = useState("null");
  return (
    <Animated.View
      style={{
        flex: 1,
        alignItems: "center",
        paddingVertically: 10,
        paddingHorizontal: 50,
      }}
    >
      <View
        style={{
          // paddingVertical: 60,
          padding: 10,
          backgroundColor: "#4CAF50", // Màu nền xanh lá
          borderRadius: 10,
          width: 400, // Đặt chiều rộng là 80
          height: 150, // Đặt chiều dài là 200
        }}
      >
        <Text style={styles.balanced}>VCB</Text>
        <Text style={styles.balanced}>Current Balanced</Text>
        <Text style={styles.currentBalanced}>{currentBalancedBalance} $</Text>
        {/* Thêm các thành phần khác của thẻ tín dụng */}
      </View>
      <View style={styles.spending}>
        <View style={styles.income}>
          <Image
            style={styles.iconBgWhite}
            source={require("../../assets/income.png")}
          />
          <View style={{ marginLeft: 10 }}>
            <Text style={styles.balanced}>Income</Text>
            <Text style={styles.balanced}>{totalIncome} $</Text>
          </View>
        </View>
        <View style={styles.outcome}>
          <Image
            style={styles.iconBgWhite}
            source={require("../../assets/expense.png")}
          />
          <View style={{ marginLeft: 10 }}>
            <Text style={styles.balanced}>Outcome</Text>
            <Text style={styles.balanced}>{totalExpense} $</Text>
          </View>
        </View>
      </View>
      <View>
        {/* {Object.entries(groupedTransactions).map(([date, entries]) => (
          <View key={date}>
            <Text>{date}</Text>
            {entries.map(({ category, expense }) => (
              <View key={category.id}>
                <ListItem
                  key={expense.id}
                  title={expense.title}
                  subtitle={expense.description}
                >
                  <ListItem.Content>
                    <View style={styles.transaction}>
                      <View style={styles.transaction}>
                        <Image
                          source={expense.icon}
                          style={{
                            width: 40,
                            height: 40,
                            marginRight: 10,
                            tintColor: expense.color,
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
                          {expense.title}
                        </Text>
                        <Text
                          style={{
                            fontSize: 12,
                            color: "#a4b0be",
                          }}
                        >
                          {expense.location}
                        </Text>
                      </View>
                    </View>
                  </ListItem.Content>
                  <ListItem color="black">
                    <ListItem.Subtitle style={styles.title}>
                      -${Math.abs(expense.total)}
                    </ListItem.Subtitle>
                  </ListItem>
                  <ListItem color="black">
                    <ListItem.Subtitle style={styles.title}>
                      <Icon
                        name="delete-forever"
                        type="material-icons"
                        size={28}
                        color="#EA2027"
                        onPress={() =>
                          deleteTransaction(category.id, expense.id)
                        }
                      />
                    </ListItem.Subtitle>
                  </ListItem>
                </ListItem>
              </View>
            ))}
          </View>
        ))} */}
        {/* {transactions.map((category) => (
          <View key={category.id}>
            <Text>{category.name}</Text>
            {[0, 1, 2, 3].map((daysAgo) => {
              const targetDate = new Date(); // Ngày mục tiêu, mặc định là ngày hôm nay
              targetDate.setDate(targetDate.getDate() - daysAgo); // Đặt ngày mục tiêu cho ngày trước

              return category.expenses.map((expense) => {
                const transactionDate = new Date(expense.date);

                if (
                  transactionDate.getDate() === targetDate.getDate() &&
                  transactionDate.getMonth() === targetDate.getMonth() &&
                  transactionDate.getFullYear() === targetDate.getFullYear()
                ) {
                  return (
                    <ListItem
                      key={expense.id}
                      title={expense.title}
                      subtitle={expense.description}
                    >
                      <ListItem.Content>
                        <View style={styles.transaction}>
                          <View style={styles.transaction}>
                            <Image
                              source={expense.icon}
                              style={{
                                width: 40,
                                height: 40,
                                marginRight: 10,
                                tintColor: expense.color,
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
                              {expense.title}
                            </Text>
                            <Text
                              style={{
                                fontSize: 12,
                                color: "#a4b0be",
                              }}
                            >
                              {expense.location}
                            </Text>
                          </View>
                        </View>
                      </ListItem.Content>
                      <ListItem color="black">
                        <ListItem.Subtitle style={styles.title}>
                          -${Math.abs(expense.total)}
                        </ListItem.Subtitle>
                      </ListItem>
                      <ListItem color="black">
                        <ListItem.Subtitle style={styles.title}>
                          <Icon
                            name="delete-forever"
                            type="material-icons"
                            size={28}
                            color="#EA2027"
                            onPress={() =>
                              deleteTransaction(category.id, expense.id)
                            }
                          />
                        </ListItem.Subtitle>
                      </ListItem>
                    </ListItem>
                  );
                }

                return null;
              });
            })}
          </View>
        ))} */}
        {/* {sortedTransactions.map((transaction, index) => (
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
            <ListItem color="black">
              <ListItem.Subtitle style={styles.title}>
                <Icon
                  name="delete-forever"
                  type="material-icons"
                  size={28}
                  color="#EA2027"
                  onPress={() => deleteTransaction(category.id, expense.id)}
                />
              </ListItem.Subtitle>
            </ListItem>
          </ListItem>
        ))} */}
        {transactions.map((category) => (
          <View key={category.id}>
            <View>
              <Text>{category.name}</Text>
              {category.expenses
                .sort((a, b) => new Date(a.date) - new Date(b.date)) // Sắp xếp theo ngày cũ đến ngày mới
                .map((expense) => (
                  <ListItem key={expense.id} bottomDivider>
                    <ListItem.Content>
                      <View style={styles.transaction}>
                        <View style={styles.transaction}>
                          <Image
                            source={category.icon}
                            style={{
                              width: 40,
                              height: 40,
                              marginRight: 10,
                              tintColor: category.color,
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
                            {expense.title}
                          </Text>
                          <Text
                            style={{
                              fontSize: 12,
                              color: "#a4b0be",
                            }}
                          >
                            {expense.location}
                          </Text>
                        </View>
                      </View>
                    </ListItem.Content>
                    <ListItem color="black">
                      <ListItem.Subtitle style={styles.title}>
                        -${Math.abs(expense.total)}
                      </ListItem.Subtitle>
                    </ListItem>
                    <ListItem>
                      <ListItem.Subtitle style={styles.title}>
                        <Icon
                          name="delete-forever"
                          type="material-icons"
                          size={28}
                          color="#EA2027"
                          onPress={() =>
                            deleteTransaction(category.id, expense.id)
                          }
                        />
                      </ListItem.Subtitle>
                    </ListItem>
                  </ListItem>
                ))}
            </View>
          </View>
        ))}
      </View>

      <View style={styles.transaction}>
        <Text>Recent Transaction</Text>
        {/* <TouchableOpacity style={styles.seeAllButton}>
          <Text>See All</Text>
        </TouchableOpacity> */}
      </View>
      <Transactionlist transactions={transactions} />
      {/* This View will be a component */}
      <View style={styles.transaction}>
        <View style={styles.transaction}>
          <Image
            style={styles.iconBgYellow}
            source={require("../../assets/shopping-bag.png")}
          ></Image>
          <View style={{ marginLeft: 10 }}>
            <Text>shopping</Text>
            <Text style={styles.textSmallGrey}>a</Text>
          </View>
        </View>
        <View style={{ marginLeft: 100, marginTop: 10 }}>
          <Text style={styles.textColorRed}>-100,000đ</Text>
          <Text style={styles.textSmallGrey}>10:00AM</Text>
        </View>
      </View>
    </Animated.View>
  );
};
export default HomeDetails;

const styles = StyleSheet.create({
  balanced: {
    fontSize: 15,
    fontWeight: "bold",
    color: "white",
  },
  currentBalanced: {
    fontSize: 32,
    fontWeight: "bold",
    color: "white",
  },
  cardID: {
    marginTop: 20,
    fontSize: 15,
    fontWeight: "bold",
    color: "white",
  },
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
  iconBgWhite: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 5,
  },
  iconBgYellow: {
    backgroundColor: "#f5edb5",
    borderRadius: 10,
    padding: 5,
  },
  seeAllButton: {
    color: "purple",
    backgroundColor: "#dbb5f5",
    padding: 6,
    borderRadius: 10,
  },
  transaction: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
  },
  textColorRed: {
    color: "red",
    fontWeight: "bold",
  },
  textSmallGrey: {
    color: "grey",
    fontSize: 10,
  },
  title: {
    fontSize: 20,
    color: "red",
    fontWeight: "bold",
  },
});
