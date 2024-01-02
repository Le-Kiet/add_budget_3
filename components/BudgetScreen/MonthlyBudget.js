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

import { GlobalContext } from "../contextAPI/GlobalState";
const MonthlyBudget = ({ navigation }) => {
  const { transactions, incomes } = useContext(GlobalContext);
  const [budgetCounter, setBudgetCounter] = useState(1);
  const [budget, setBudget] = useState(0);
  const [goal, setGoal] = useState(0);
  const [debt, setDebt] = useState(0);
  const [financialBalance, setFinancialBalance] = useState(budget - debt);
  const [filteredBudgets, setFilteredBudgets] = useState([]);
  ///////////////////////////
  const [todayIndex, setTodayIndex] = useState(12);
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const initialSelectedMonth = `${year}-${month}`;
  const [currentPage, setCurrentPage] = useState(13);
  const [itemsPerPage, setItemsPerPage] = useState(1);
  const [selectedMonth, setSelectedMonth] = useState(getCurrentMonth());

  function getCurrentMonth() {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = (currentDate.getMonth() + 1)
      .toString()
      .padStart(2, "0");
    return `${currentYear}-${currentMonth}`;
  }

  const uniqueMonths = Array.from(
    new Set(
      transactions
        .flatMap((transaction) => transaction.budget)
        .map((budget) => budget.date)
    )
  );
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
      const budgets = transaction.budget.filter(
        (budget) => budget.date === selectedMonth
      );

      return [...filtered, ...budgets];
    }, []);

    setFilteredBudgets(filteredBudgets);
  }, [selectedMonth, transactions]);

  // const filteredBudgets = transactions.reduce((filtered, transaction) => {
  //   const budgets = transaction.budget.filter(
  //     (budget) => budget.date === selectedMonth
  //   );

  //   return [...filtered, ...budgets];
  // }, []);
  // console.log(123);
  // console.log(filteredBudgets, "filteredBudgetss");
  // console.log(
  //   filteredBudgets.map((item) => item.id),
  //   "filteredBudgets"
  // );
  // const renderItem = ({ item }) => {
  //   console.log(item, "aaaaa");
  //   return (
  //     <View>
  //       <Text>{item.total}</Text>
  //       <Text>{item.spent}</Text>
  //     </View>
  //   );
  // };
  return (
    <View>
      {/* {renderItem(currentMonths[0])} */}
      <FlatList
        data={filteredBudgets}
        keyExtractor={(item) => `${item.id}-${item.name}`}
        renderItem={({ item }) => {
          console.log(item, "aaaaa");
          return (
            <View key={`${item.id}-${item.name}`}>
              <Text>{item.total}</Text>
              <Text>{item.spent}</Text>
            </View>
          );
        }}
      />
      <View style={{ flexDirection: "row", justifyContent: "center" }}>
        <Button title="Prev" onPress={prevPage} disabled={currentPage === 1} />
        <Text style={{ marginHorizontal: 10 }}>
          {monthsInRange[todayIndex]}
        </Text>
        <Button
          title="Next"
          onPress={nextPage}
          disabled={currentPage === totalPages}
        />
      </View>
    </View>
  );
};
export default MonthlyBudget;
