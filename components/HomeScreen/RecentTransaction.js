import React, { useContext } from "react";
import { GlobalContext } from "../contextAPI/GlobalState";
import {
  ScrollView,
  Text,
  StyleSheet,
  View,
  Image,
  FlatList,
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
        groupedExpenses[key].push({
          id: expense.id,
          location,
          description,
          total,
          icon,
          name,
          color,
        });
      } else {
        // Nếu khóa chưa tồn tại, tạo khóa mới và gán một mảng chứa expense
        groupedExpenses[key] = [
          {
            id: expense.id,
            location,
            description,
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
                {expense.name}
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
      </ListItem>
    );
  };
  // Hàm render dữ liệu gom nhóm
  const renderGroupedExpenses = (groupedExpenses) => {
    const sortedEntries = Object.entries(groupedExpenses).sort(
      ([dateA], [dateB]) => new Date(dateB) - new Date(dateA)
    );

    let renderedItemCount = 0; // Biến đếm số lượng mục đã hiển thị
    const maxItemCount = 10; // Số lượng mục tối đa được hiển thị

    return (
      <View style={styles.ListItemContainer}>
        {sortedEntries.map(([date, expenses]) => {
          if (renderedItemCount >= maxItemCount) {
            return null; // Không hiển thị nếu đã đạt đến giới hạn
          }
          const limitedExpenses = expenses.slice(
            0,
            maxItemCount - renderedItemCount
          ); // Giới hạn số lượng mục hiển thị
          renderedItemCount += limitedExpenses.length; // Cập nhật biến đếm
          return (
            <View key={date} style={styles.groupContainer}>
              <Text
                style={{ fontSize: 20, fontWeight: "bold", marginVertical: 10 }}
              >
                {getFormattedDate(date)}
              </Text>
              <FlatList
                data={limitedExpenses}
                keyExtractor={(expense) =>
                  `${expense.total}-${expense.location}`
                }
                renderItem={({ item }) => <ExpenseItem expense={item} />}
              />
            </View>
          );
        })}
      </View>
    );
  };
  return <View>{renderGroupedExpenses(groupedExpenses)}</View>;
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
  ListItemContainer: {
    flex: 1,
    width: 400,
    alignItems: "center",
  },
  groupContainer: {
    width: "100%",
    padding: 10,
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
