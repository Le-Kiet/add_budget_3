import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Button,
  FlatList,
} from "react-native";
import * as React from "react";
import StatusCard from "../StatusCard/Card";
import { useNavigation } from "@react-navigation/native";
import TransactionForm from "../form/TransactionForm";
import { useState, useContext } from "react";
import RecentTransaction from "../HomeScreen/RecentTransaction";
import { GlobalContext } from "../contextAPI/GlobalState";
import LineChartComponent from "../LineChartComponent";
import Chart from "../Chart";
import History from "./History";

const HomePage = () => {
  const navigation = useNavigation();
  const handleClick = () => {
    navigation.navigate("HomeDetails");
  };
  const { addTransaction, transactions, incomes } = useContext(GlobalContext);
  const [openTransaction, setOpenTransaction] = useState("false");
  const [addIncome, setAddIncome] = useState(true);
  const [addExpense, setAddExpense] = useState(false);
  const newData = JSON.parse(JSON.stringify(transactions));
  console.log(newData, "newData");
  const handleClickAddIncome = () => {
    navigation.navigate("TransactionForm", { addIncome: true });

    if (addIncome === true) {
    } else {
      setAddIncome(!addIncome);
      setAddExpense(!addExpense);
    }
  };
  const handleClickAddExpense = () => {
    navigation.navigate("TransactionForm", { addExpense: true });

    if (addExpense === true) {
    } else {
      setAddIncome(!addIncome);
      setAddExpense(!addExpense);
    }
  };
  const handleOpenTransaction = () => {
    setOpenTransaction(!openTransaction);
  };

  const educationExpenses = transactions.find(
    (transaction) => transaction.name === "Education"
  ).expenses;

  function renderHeaderRecentTransactions() {
    return (
      <View style={styles.recentTransactionHeader}>
        <Text style={styles.textBold}>Recent Transaction</Text>
        <TouchableOpacity style={styles.seeAllButton} onPress={handleClick}>
          <Text style={styles.textPurple}>See All</Text>
        </TouchableOpacity>
      </View>
    );
  }
  //gom nhóm theo date
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
      <View style={styles.expenseContainer}>
        <Text style={styles.location}>{expense.location}</Text>
        <Text style={styles.description}>{expense.description}</Text>
        <Text style={styles.total}>{expense.total}</Text>
      </View>
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
      <View style={styles.container}>
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
              <Text style={styles.date}>{getFormattedDate(date)}</Text>
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

  // In ra dữ liệu theo dạng yêu cầu
  console.log(groupedExpenses, "groupedExpenses");
  // Gom nhóm các giao dịch lại theo ngày
  // transactions.forEach((category) => {
  //   let { expenses, budget } = category;
  //   expenses = Object.values(expenses);
  //   console.log(expenses, "expenses", expenses);
  //   const groupedExpenses = {};
  //   expenses.forEach((expense) => {
  //     const date = expense.date;
  //     if (!groupedExpenses[date]) {
  //       groupedExpenses[date] = [expense];
  //     } else {
  //       groupedExpenses[date].push(expense);
  //     }
  //   });
  //   category.expenses = groupedExpenses;
  // });
  // Gom nhóm giao dịch trong budget theo ngày
  // const groupedBudget = {};
  // budget.forEach((item) => {
  //   const date = item.date;
  //   if (!groupedBudget[date]) {
  //     groupedBudget[date] = [item];
  //   } else {
  //     groupedBudget[date].push(item);
  //   }
  // });
  // category.budget = groupedBudget;
  // In ra kết quả gom nhóm
  console.log(transactions);
  console.log(groupedTransactions, "grouped transactions");
  // Render giao dịch gom nhóm theo ngày
  const renderGroupedTransactions = () => {
    return Object.entries(groupedTransactions).map(([date, transactions]) => (
      <View key={date}>
        <Text>{date}</Text>
        {transactions.map((transaction) => (
          <Text key={transaction.id}>{transaction.title}</Text>
          // Hiển thị thông tin giao dịch khác tùy ý
        ))}
      </View>
    ));
  };
  //gom nhóm theo date

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        backgroundColor: "#F8EFFF",
      }}
    >
      {/* <TransactionForm /> */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={{
            backgroundColor: "#6ab04c",
            marginRight: 5,
            padding: 10,
            borderRadius: 16,
          }}
          // style={[styles.button, styles.cashInButton]}
          onPress={handleClickAddIncome}
        >
          <Text style={[styles.textWhite, styles.textBold]}>+ CASH IN</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: "#eb4d4b",
            marginRight: 5,
            padding: 10,
            borderRadius: 16,
          }}
          // style={[styles.button, styles.cashOutButton]}
          onPress={handleClickAddExpense}
        >
          <Text style={[styles.textWhite, styles.textBold]}>- CASH OUT</Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          marginTop: 10,
        }}
      ></View>
      <LineChartComponent />

      <StatusCard />
      <View style={{ marginTop: 10 }}>{renderHeaderRecentTransactions()}</View>
      <RecentTransaction transactions={transactions} incomes={incomes} />
      {/* <History /> */}
    </View>
  );
};
const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: "row",
    alignSelf: "center",
    marginTop: 10,
  },
  cashOutButton: {
    backgroundColor: "#eb4d4b",
    marginRight: 5,
  },
  cashInButton: {
    backgroundColor: "#6ab04c",
    marginLeft: 5,
  },
  recentTrans: {
    marginTop: 150,
  },
  // button: {
  //   width: 150,
  //   borderRadius: 30,
  // },
  button: {
    padding: 10,
    marginTop: 5,
    borderRadius: 5,
  },
  textWhite: {
    color: "white",
  },
  recentTransactionHeader: {
    width: 300,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textBold: {
    fontWeight: "bold",
  },
  seeAllButton: {
    backgroundColor: "#EEE5FF",
    borderRadius: 40,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  textPurple: {
    fontWeight: "bold",
    color: "#7F3DFF",
  },
  groupContainer: {
    marginBottom: 16,
  },
  date: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  expenseContainer: {
    marginBottom: 8,
  },
  location: {
    fontSize: 16,
    fontWeight: "bold",
  },
  description: {
    fontSize: 14,
    marginBottom: 4,
  },
  total: {
    fontSize: 14,
    color: "gray",
  },
});
export default HomePage;
