import React, { useState, useContext, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  FlatList,
  Button,
  Image,
} from "react-native";
import Slider from "@react-native-community/slider";
import AddBudget from "./AddBudget";
import ProgressBar from "react-native-progress-bar-animated";
import Svg, { Circle } from "react-native-svg";
// import { TouchableOpacity } from "react-native-gesture-handler";
import MonthlyBudget from "./MonthlyBudget";
import { GlobalContext } from "../contextAPI/GlobalState";

const Favorites = ({ navigation }) => {
  // const { transactions, incomes } = useContext(GlobalContext);
  // const [budgetCounter, setBudgetCounter] = useState(1);
  // const [budget, setBudget] = useState(0);
  // const [goal, setGoal] = useState(0);
  // const [debt, setDebt] = useState(0);
  // const [financialBalance, setFinancialBalance] = useState(budget - debt);

  ///////////////////////////
  // const [todayIndex, setTodayIndex] = useState(0);
  // const currentDate = new Date();
  // const year = currentDate.getFullYear();
  // const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  // const initialSelectedMonth = `${year}-${month}`;
  // const [currentPage, setCurrentPage] = useState(1);
  // const [itemsPerPage, setItemsPerPage] = useState(1);
  // const [selectedMonth, setSelectedMonth] = useState(getCurrentMonth());

  //11111111111111
  const { transactions, incomes } = useContext(GlobalContext);
  const [budgetCounter, setBudgetCounter] = useState(1);
  const [budget, setBudget] = useState(0);
  const [goal, setGoal] = useState(0);
  const [debt, setDebt] = useState(0);
  const [financialBalance, setFinancialBalance] = useState(budget - debt);

  ///////////////////////////
  const [todayIndex, setTodayIndex] = useState(12);
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const initialSelectedMonth = `${year}-${month}`;
  const [currentPage, setCurrentPage] = useState(13);
  const [itemsPerPage, setItemsPerPage] = useState(1);
  const [selectedMonth, setSelectedMonth] = useState(getCurrentMonth());
  const [filteredBudgets, setFilteredBudgets] = useState([]);

  function getCurrentMonth() {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = (currentDate.getMonth() + 1)
      .toString()
      .padStart(2, "0");
    return `${currentYear}-${currentMonth}`;
  }

  const currentYear = new Date().getFullYear();
  const monthsInRange = [];
  for (let year = currentYear - 1; year <= currentYear; year++) {
    for (let month = 1; month <= 12; month++) {
      const formattedMonth = `${year}-${month.toString().padStart(2, "0")}`;
      monthsInRange.push(formattedMonth);
    }
  }
  console.log(monthsInRange, "monthsInRange");

  const totalPages = Math.ceil(monthsInRange.length);

  const nextPage = () => {
    if (currentPage < totalPages) {
      setTodayIndex(todayIndex + 1);
      setSelectedMonth(monthsInRange[todayIndex + 1]);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setTodayIndex(todayIndex - 1);
      setSelectedMonth(monthsInRange[todayIndex - 1]);
    }
  };
  useEffect(() => {
    const todayIndex = monthsInRange.findIndex(
      (item) => item === selectedMonth
    );
    console.log(todayIndex, "todayindex1");
  }, [selectedMonth, monthsInRange]);
  useEffect(() => {
    const filteredBudgets = transactions.reduce((filtered, transaction) => {
      const budgets = transaction.budget
        .filter((budget) => budget.date === selectedMonth)
        .map((budget) => ({ ...budget, categoryName: transaction.name }));

      return [...filtered, ...budgets];
    }, []);

    setFilteredBudgets(filteredBudgets);
  }, [selectedMonth, transactions]);

  console.log(filteredBudgets, "filteredBudgets");
  function getCurrentMonth() {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = (currentDate.getMonth() + 1)
      .toString()
      .padStart(2, "0");
    return `${currentYear}-${currentMonth}`;
  }

  console.log(selectedMonth, "selectedMonth");
  const uniqueMonths = Array.from(
    new Set(
      transactions
        .flatMap((transaction) => transaction.budget)
        .map((budget) => budget.date)
    )
  );
  // Duyệt qua mảng "transactions"
  transactions.forEach((transaction) => {
    // Duyệt qua mảng "expenses" trong mỗi giao dịch
    transaction.expenses.forEach((expense) => {
      // Lấy giá trị của trường "total" và trường "date" từ mục chi tiêu
      const { total, date } = expense;

      // Tách năm và tháng từ trường "date"
      const [year, month] = date.split("-");

      // Tìm mục trong mảng "budget" có trường "date" tương ứng
      const budgetItem = transaction.budget.find((item) => item.date === date);

      // Kiểm tra xem mục "budgetItem" có tồn tại hay không
      if (budgetItem) {
        // Cộng giá trị total vào trường "spent" của mục "budgetItem"
        budgetItem.spent += total;
      }
    });
  });

  // In ra mảng "transactions" đã được cập nhật
  console.log(transactions, "updatedtransactions");

  // Khởi tạo mảng totalExpenseInMonth
  let totalExpenseInMonth = [];

  // Duyệt qua từng giao dịch
  transactions.forEach((transaction) => {
    // Tạo một đối tượng để lưu tổng tiền chi tiêu từng tháng
    let totalExpenseInMonth = {};

    // Duyệt qua từng khoản chi tiêu
    transaction.expenses.forEach((expense) => {
      // Tách năm và tháng từ trường date
      const [year, month] = expense.date.split("-");

      // Chuyển đổi sang dạng số nguyên
      const totalExpense = parseFloat(expense.total);

      // Kiểm tra xem tháng đã tồn tại trong đối tượng totalExpenseInMonth chưa
      if (totalExpenseInMonth[year] && totalExpenseInMonth[year][month]) {
        // Nếu tháng đã tồn tại, cộng tổng chi tiêu vào
        totalExpenseInMonth[year][month] += totalExpense;
      } else {
        // Nếu tháng chưa tồn tại, tạo một mục mới
        if (!totalExpenseInMonth[year]) {
          totalExpenseInMonth[year] = {};
        }
        totalExpenseInMonth[year][month] = totalExpense;
      }
    });

    // Duyệt qua từng tháng trong totalExpenseInMonth và cập nhật spent trong budget
    for (const year in totalExpenseInMonth) {
      for (const month in totalExpenseInMonth[year]) {
        const budget = transaction.budget.find(
          (item) => item.date === `${year}-${month}`
        );
        if (budget) {
          budget.spent = totalExpenseInMonth[year][month];
        }
      }
    }
  });

  // In ra transactions đã được cập nhật
  console.log(transactions, "afterbudget");
  // // Duyệt qua từng giao dịch
  // transactions.forEach((transaction) => {
  //   // Duyệt qua từng khoản chi tiêu
  //   transaction.expenses.forEach((expense) => {
  //     // Tách năm và tháng từ trường date
  //     const [year, month] = expense.date.split("-");

  //     // Chuyển đổi sang dạng số nguyên
  //     const totalExpense = parseFloat(expense.total);

  //     // Kiểm tra xem tháng đã tồn tại trong mảng totalExpenseInMonth chưa
  //     const existingMonth = totalExpenseInMonth.find(
  //       (item) => item.year === year && item.month === month
  //     );

  //     if (existingMonth) {
  //       // Nếu tháng đã tồn tại, cộng tổng chi tiêu vào spent của budget
  //       existingMonth.total += totalExpense;
  //     } else {
  //       // Nếu tháng chưa tồn tại, thêm một mục mới vào mảng totalExpenseInMonth
  //       totalExpenseInMonth.push({
  //         year,
  //         month,
  //         total: totalExpense,
  //       });
  //     }
  //   });
  // });

  // In ra tổng tiền chi tiêu từng tháng
  console.log(totalExpenseInMonth, "totalExpenseInMonth");

  const indexOfLastMonth = currentPage * itemsPerPage;
  const indexOfFirstMonth = indexOfLastMonth - itemsPerPage;
  const currentMonths = monthsInRange.slice(
    indexOfFirstMonth,
    indexOfLastMonth
  );

  const progress = 80;

  let backgroundColorOnComplete = "#6CC644";

  const addBudget = () => {
    navigation.navigate("AddBudget");
  };
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
    console.log(
      "Lưu thành công",
      `Ngân sách hiện tại: ${budget}$, Mục tiêu tài chính: ${goal}$`
    );
    Alert.alert("Saved");
  };
  const renderBudget = (transactions) => {
    return (
      <View>
        {transactions.map((category) => {
          if (category.budget.length > 0) {
            return (
              <View key={category.id}>
                <View style={[styles.budgetHeader]}>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "center",
                      marginTop: 10,
                      borderWidth: 1,
                      borderRadius: 32,
                      borderColor: "#91919F",
                      padding: 3,
                    }}
                  >
                    <Svg width="14" height="14" style={{ margin: 3 }}>
                      <Circle cx="7" cy="7" r="7" fill="red" />
                    </Svg>
                    <Text style={{ marginTop: -3 }}>{category.name}</Text>
                  </View>
                  <View>
                    <Image
                      source={require("../../assets/warning.png")}
                      style={{ height: 28, width: 28 }}
                    ></Image>
                  </View>
                </View>
                {category.budget.map((budgetItem) => {
                  const progress = (budgetItem.spent / budgetItem.total) * 100;
                  console.log(progress, "progressbar");
                  if (progress >= 75) {
                    backgroundColorOnComplete = "#FF0000"; // Xanh lá cây
                  } else if (progress >= 50) {
                    backgroundColorOnComplete = "#FFA500"; // Màu vàng
                  } else if (progress >= 25) {
                    backgroundColorOnComplete = "#FFD700"; // Màu cam
                  } else if (progress >= 0) {
                    backgroundColorOnComplete = "#6CC644";
                  }
                  return (
                    <View key={budgetItem.date}>
                      <Text style={{ fontSize: 22, fontWeight: "bold" }}>
                        Remaining ${budgetItem.total - budgetItem.spent}
                      </Text>
                      <ProgressBar
                        width={200}
                        value={progress}
                        backgroundColor={backgroundColorOnComplete}
                      />
                      <Text
                        style={{
                          fontSize: 14,
                          color: backgroundColorOnComplete,
                        }}
                      >
                        {budgetItem.spent} of {budgetItem.total}
                      </Text>
                      {progress >= 75 && (
                        <View>
                          <Text style={{ color: backgroundColorOnComplete }}>
                            Your budget is running low
                          </Text>
                        </View>
                      )}
                    </View>
                  );
                })}
              </View>
            );
          } else {
            return null; // Không hiển thị giao dịch nếu không có ngân sách
          }
        })}
      </View>
    );
  };
  useEffect(() => {
    const todayIndex = monthsInRange.findIndex(
      (item) => item === selectedMonth
    );
  }, [selectedMonth, monthsInRange]);
  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <TouchableOpacity onPress={prevPage} disabled={currentPage === 1}>
          <Text style={{ fontSize: 30, marginRight: 10 }}>&#8249;</Text>
        </TouchableOpacity>
        <Text style={{ marginHorizontal: 10, marginTop: 5 }}>
          {selectedMonth}
        </Text>
        <TouchableOpacity
          onPress={nextPage}
          disabled={currentPage === totalPages}
        >
          <Text style={{ fontSize: 30, marginLeft: 10 }}>&#8250;</Text>
        </TouchableOpacity>
      </View>
      {filteredBudgets.length > 0 ? (
        <FlatList
          data={filteredBudgets}
          keyExtractor={(item, index) => `${item.categoryName}`}
          renderItem={({ item }) => {
            const progress = (item.spent / item.total) * 100;
            let backgroundColorOnComplete = "";
            if (progress > 100) progress = 100;
            if (progress >= 75) {
              backgroundColorOnComplete = "#FF0000"; // Xanh lá cây
            } else if (progress >= 50) {
              backgroundColorOnComplete = "#FFA500"; // Màu vàng
            } else if (progress >= 25) {
              backgroundColorOnComplete = "#FFD700"; // Màu cam
            } else backgroundColorOnComplete = "#6CC644";
            return (
              <View
                key={`${item.categoryName}`}
                style={{
                  borderWidth: 2,
                  borderColor: backgroundColorOnComplete,
                  borderRadius: 20,
                  padding: 10,
                  margin: 5,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    marginTop: 10,
                    borderWidth: 1,
                    borderRadius: 32,
                    borderColor: "#91919F",
                    padding: 3,
                  }}
                >
                  <Svg width="14" height="14" style={{ margin: 3 }}>
                    <Circle
                      cx="7"
                      cy="7"
                      r="7"
                      fill={backgroundColorOnComplete}
                    />
                  </Svg>
                  <Text style={{ marginTop: -3 }}>{item.categoryName}</Text>
                </View>
                <View>
                  <Image
                    source={require("../../assets/warning.png")}
                    style={{ height: 28, width: 28 }}
                  />
                </View>
                <Text style={{ fontSize: 22, fontWeight: "bold" }}>
                  Remaining ${item.total - item.spent}
                </Text>
                <ProgressBar
                  width={200}
                  value={progress}
                  backgroundColor={backgroundColorOnComplete}
                />
                <Text
                  style={{
                    fontSize: 14,
                    color: backgroundColorOnComplete,
                  }}
                >
                  {item.spent} of {item.total}
                </Text>
                {progress === 100 ? (
                  <>
                    <Text style={{ color: backgroundColorOnComplete }}>
                      Your budget has run out
                    </Text>
                  </>
                ) : progress > 75 ? (
                  <>
                    <Text style={{ color: backgroundColorOnComplete }}>
                      Your budget is running low
                    </Text>
                  </>
                ) : (
                  <></>
                )}
              </View>
            );
          }}
        />
      ) : (
        <Text>No budgets found for the selected month</Text>
      )}
      <TouchableOpacity onPress={addBudget} style={styles.addBudgetButton}>
        <Text style={styles.addBudgetText}>Create a budget</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: "center",
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
  noBudgetText: {
    fontSize: 12,
    color: "#91919F",
  },
  addBudgetText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
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
  budgetHeader: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default Favorites;
