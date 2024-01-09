import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  ScrollView,
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
  // const groupedTransactions = transactions.reduce(
  //   (groupedExpenses, category) => {
  //     category.expenses.forEach((expense) => {
  //       const transactionDate = new Date(expense.date).toDateString();

  //       if (!groupedExpenses[transactionDate]) {
  //         groupedExpenses[transactionDate] = [];
  //       }

  //       groupedExpenses[transactionDate].push({
  //         category: category,
  //         expense: expense,
  //       });
  //     });

  //     return groupedExpenses;
  //   },
  //   {}
  // );
  const [thisDate, setThisDate] = useState("null");
  const groupedTransactions = {};
  transactions.forEach((transaction) => {
    const date = transaction.date;
    if (!groupedTransactions[date]) {
      groupedTransactions[date] = [transaction];
    } else {
      groupedTransactions[date].push(transaction);
    }
  });

  // In ra kết quả gom nhóm
  console.log(groupedTransactions);
  // Tạo đối tượng chứa thông tin tổng hợp theo ngà
  // Khởi tạo một đối tượng để lưu trữ dữ liệu gom nhóm
  const groupedExpenses = {};

  // Duyệt qua mảng "transactions"
  transactions.forEach((transaction) => {
    // Duyệt qua mảng "expenses" trong mỗi giao dịch
    transaction.expenses.forEach((expense) => {
      // Lấy giá trị của trường "title", "description", "location", "total", "date", "icon", "name" và "color" từ mục chi tiêu
      const { title, description, location, total, date } = expense;
      const { icon, name, color } = transaction;

      // Tách ngày, tháng và năm từ trường "date"
      const [year, month, day] = date.split("-");

      // Tạo khóa cho đối tượng groupedExpenses dựa trên ngày, tháng và năm
      const key = `${year}-${month}-${day}`;

      // Kiểm tra xem khóa đã tồn tại trong groupedExpenses chưa
      if (groupedExpenses[key]) {
        // Nếu khóa đã tồn tại, thêm expense vào mảng tương ứng
        let truncatelocation = location;
        let truncatedescription = description;
        if (truncatelocation.length > 17) {
          truncatelocation = truncatelocation.substring(0, 17) + "...";
        }
        if (truncatedescription.length > 13) {
          truncatedescription = truncatedescription.substring(0, 13) + "...";
        }
        groupedExpenses[key].push({
          categoryId: transaction.id,
          id: expense.id,
          truncatelocation,
          truncatedescription,
          total,
          icon,
          name,
          color,
        });
      } else {
        // Nếu khóa chưa tồn tại, tạo khóa mới và gán một mảng chứa expense
        let truncatelocation = location;
        let truncatedescription = description;
        if (truncatelocation.length > 17) {
          truncatelocation = truncatelocation.substring(0, 13) + "...";
        }
        if (truncatedescription.length > 13) {
          truncatedescription = truncatedescription.substring(0, 13) + "...";
        }
        groupedExpenses[key] = [
          {
            categoryId: transaction.id,
            id: expense.id,
            truncatelocation,
            truncatedescription,
            total,
            icon,
            name,
            color,
          },
        ];
      }
    });
  });
  const getFormattedDate = (date) => {
    const currentDate = new Date();
    const formattedDate = new Date(date);

    if (
      formattedDate.getDate() === currentDate.getDate() &&
      formattedDate.getMonth() === currentDate.getMonth() &&
      formattedDate.getFullYear() === currentDate.getFullYear()
    ) {
      return "Today";
    }

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    if (
      formattedDate.getDate() === yesterday.getDate() &&
      formattedDate.getMonth() === yesterday.getMonth() &&
      formattedDate.getFullYear() === yesterday.getFullYear()
    ) {
      return "Yesterday";
    }

    return date;
  };
  const ExpenseItem = ({ expense }) => {
    return (
      <ListItem
        key={expense.id}
        title={expense.title}
        subtitle={expense.description}
      >
        <ListItem.Content>
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
            <View>
              <Text
                style={{
                  fontSize: 16,
                  color: "#57606f",
                  fontWeight: "bold",
                }}
              >
                {expense.truncatedescription}
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  color: "#a4b0be",
                }}
              >
                {expense.truncatelocation}
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
          <Icon
            name="delete-forever"
            type="material-icons"
            size={28}
            color="#EA2027"
            onPress={() => deleteTransaction(expense.categoryId, expense.id)}
          />
        </ListItem>
      </ListItem>
    );
  };
  const renderGroupedExpenses = (groupedExpenses) => {
    const sortedEntries = Object.entries(groupedExpenses).sort(
      ([dateA], [dateB]) => new Date(dateB) - new Date(dateA)
    );
    let renderedItemCount = 0;
    return (
      <ScrollView style={styles.ListItemContainer}>
        {sortedEntries.map(([date, expenses]) => (
          <View key={date} style={styles.groupContainer}>
            <Text
              style={{ fontSize: 20, fontWeight: "bold", marginVertical: 10 }}
            >
              {getFormattedDate(date)}
            </Text>
            {expenses.map((expense) => (
              <ExpenseItem
                key={`${expense.total}-${expense.location}`}
                expense={expense}
              />
            ))}
          </View>
        ))}
      </ScrollView>
    );
  };
  return (
    <Animated.View
      style={{
        flex: 1,
        alignItems: "center",
        paddingVertically: 10,
        width: 400,
        paddingHorizontal: 50,
      }}
    >
      <View
        style={{
          padding: 10,
          backgroundColor: "#4CAF50",
          borderRadius: 10,
          width: 350,
          height: 150,
        }}
      >
        <Text style={styles.balanced}>VCB</Text>
        <Text style={styles.balanced}>Current Balanced</Text>
        <Text style={styles.currentBalanced}>{currentBalancedBalance} $</Text>
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
      <View>{renderGroupedExpenses(groupedExpenses)}</View>
      <View style={styles.transaction}></View>
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
    maxWidth: 200,
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
  ListItemContainer: {
    flex: 1,
    width: 400,
  },
  groupContainer: {
    width: "100%",
    padding: 10,
  },
});
