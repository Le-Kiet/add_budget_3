import React, { useRef } from "react";
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Image,
  ImageBackground,
  TouchableOpacity,
  FlatList,
  Animated,
  Platform,
} from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { VictoryPie, VictoryLegend, VictoryTooltip } from "victory-native";
import { PieChart } from "react-native-chart-kit";
import { GlobalContext } from "../contextAPI/GlobalState";
import { useState, useContext } from "react";
import { Svg } from "react-native-svg";
import { categoriesData } from "../../data/categoriesData";
import { incomeData } from "../../data/incomeData";
import { COLORS, FONTS, SIZES, icons, images } from "../../constants";

const Tab = createMaterialTopTabNavigator();

const Categories = () => {
  const confirmStatus = "C";
  const pendingStatus = "P";
  const ItemSeparator = () => {
    return <View style={{ marginTop: 5 }} />;
  };
  const categoryListHeightAnimationValue = useRef(
    new Animated.Value(115)
  ).current;
  const { addTransaction, transactions, incomes } = useContext(GlobalContext);
  const [currentPage, setCurrentPage] = useState(13);

  const [categories, setCategories] = React.useState(transactions);
  const [income, setIncome] = React.useState(incomeData);
  const [expenseIncome, setExpenseIncome] = React.useState("expense");
  const [viewMode, setViewMode] = React.useState("chart");
  const [selectedCategory, setSelectedCategory] = React.useState(null);
  const [showMoreToggle, setShowMoreToggle] = React.useState(false);
  //Lấy từ BudgetController
  const [todayIndex, setTodayIndex] = useState(12);
  const [selectedMonth, setSelectedMonth] = useState(getCurrentMonth());
  const [previousMonth1, setPreviousMonth] = React.useState(getPreviousMonth());

  function getCurrentMonth() {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = (currentDate.getMonth() + 1)
      .toString()
      .padStart(2, "0");
    return `${currentYear}-${currentMonth}`;
  }
  console.log(selectedMonth, "selectedMonth");
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
      setPreviousMonth(monthsInRange[todayIndex]);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setTodayIndex(todayIndex - 1);
      setSelectedMonth(monthsInRange[todayIndex - 1]);
      setPreviousMonth(monthsInRange[todayIndex - 2]);
    }
  };
  function getCurrentMonth() {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = (currentDate.getMonth() + 1)
      .toString()
      .padStart(2, "0");
    return `${currentYear}-${currentMonth}`;
  }
  function getPreviousMonth() {
    const currentDate = new Date();
    let currentYear = currentDate.getFullYear();
    let currentMonth = currentDate.getMonth();

    // Trừ đi 1 để lấy tháng trước đó
    currentMonth--;

    // Nếu tháng hiện tại là tháng 1, cần trở về tháng 12 của năm trước
    if (currentMonth === -1) {
      currentMonth = 12;
      currentYear--;
    }

    currentMonth = currentMonth.toString().padStart(2, "0");

    return `${currentYear}-${currentMonth}`;
  }
  console.log(previousMonth1, 1);
  let totalExpenseInMonth = [];
  transactions.forEach((transaction) => {
    let totalExpenseInMonth = {};
    transaction.expenses.forEach((expense) => {
      const [year, month] = expense.date.split("-");
      const totalExpense = parseFloat(expense.total);
      if (totalExpenseInMonth[year] && totalExpenseInMonth[year][month]) {
        totalExpenseInMonth[year][month] += totalExpense;
      } else {
        if (!totalExpenseInMonth[year]) {
          totalExpenseInMonth[year] = {};
        }
        totalExpenseInMonth[year][month] = totalExpense;
      }
    });

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
  //Lấy từ BudgetController
  const [toggleCategoriesStyle, setToggleCategoriesStyle] =
    React.useState(true);
  function renderHeader() {
    const currentMonthData = processIncomeDataToDisplay();
    const previousMonthData = processIncomeDataToDisplayPreviousMonth();
    const currentCategoryData = processCategoryDataToDisplay();
    const previousCategoryData = processCategoryDataToDisplayPreviousMonth();
    let currentMonthTotal = 0;
    let previousMonthTotal = 0;
    let currentCategoryTotal = 0;
    let previousCategoryTotal = 0;
    currentMonthData.forEach((item) => {
      currentMonthTotal += item.y;
    });

    previousMonthData.forEach((item) => {
      previousMonthTotal += item.y;
    });
    currentCategoryData.forEach((item) => {
      currentCategoryTotal += item.y;
    });
    previousCategoryData.forEach((item) => {
      previousCategoryTotal += item.y;
    });
    const difference = (
      (currentMonthTotal / previousMonthTotal) * 100 -
      100
    ).toFixed(2);

    const differenceCategory = (
      (currentCategoryTotal / previousCategoryTotal) * 100 -
      100
    ).toFixed(2);

    return (
      <View
        style={{
          flex: 1,
          alignItems: "flex-start",
          left: 0,
          top: 0,
          width: "100%",
          paddingHorizontal: SIZES.padding,
          paddingVertical: SIZES.padding,
          backgroundColor: COLORS.white,
        }}
      >
        <View
          style={{
            left: 0,
            top: 0,
            alignSelf: "flex-start",
          }}
        >
          <Text
            style={{
              color: "#7F3DFF",
              fontWeight: "bold",
              ...FONTS.h2,
            }}
          >
            My Expenses
          </Text>
          <Text style={{ ...FONTS.h3, color: COLORS.darkgray }}>
            Summary (private)
          </Text>
        </View>

        <View
          style={{
            flexDirection: "row",
            marginTop: SIZES.padding,
          }}
        >
          <View
            style={{
              backgroundColor: COLORS.lightGray,
              height: 50,
              width: 50,
              borderRadius: 25,
            }}
          >
            <Image
              source={icons.calendar}
              style={{
                width: 20,
                height: 20,
                tintColor: COLORS.lightBlue,
              }}
            />
          </View>

          <View>
            <Text style={{ color: COLORS.primary, ...FONTS.h3 }}>
              {selectedMonth}
            </Text>
            {expenseIncome === "expense" ? (
              differenceCategory > 0 ? (
                <View>
                  <Text style={{ ...FONTS.body3, color: COLORS.darkgray }}>
                    {Math.abs(differenceCategory)}% more than last month
                  </Text>
                </View>
              ) : (
                <View>
                  <Text style={{ ...FONTS.body3, color: COLORS.darkgray }}>
                    {Math.abs(differenceCategory)}% less than last month
                  </Text>
                </View>
              )
            ) : difference > 0 ? (
              <View>
                <Text style={{ ...FONTS.body3, color: COLORS.darkgray }}>
                  {Math.abs(difference)}% more than last month
                </Text>
              </View>
            ) : (
              <View>
                <Text style={{ ...FONTS.body3, color: COLORS.darkgray }}>
                  {Math.abs(difference)}% less than last month
                </Text>
              </View>
            )}
          </View>
        </View>
      </View>
    );
  }
  function setSelectCategoryByName(name) {
    let category = categories.filter((a) => a.name == name);
    setSelectedCategory(category[0]);
  }
  function renderCategoryList() {
    const renderItem = ({ item }) => (
      <TouchableOpacity
        onPress={() => setSelectedCategory(item)}
        style={{
          flex: 1,
          flexDirection: "row",
          alignItems: "flex-start",
          margin: 5,
          paddingVertical: SIZES.radius,
          paddingHorizontal: SIZES.padding,
          borderRadius: 5,
          backgroundColor: COLORS.white,
          ...styles.shadow,
        }}
      >
        <Image
          source={item.icon}
          style={{
            width: 20,
            height: 20,
            tintColor: item.color,
          }}
        />
        <Text
          style={{ marginLeft: SIZES.base, color: COLORS.primary, ...FONTS.h4 }}
        >
          {item.name}
        </Text>
      </TouchableOpacity>
    );

    return (
      <View style={{ paddingHorizontal: SIZES.padding - 5 }}>
        <Animated.View style={{ height: categoryListHeightAnimationValue }}>
          <FlatList
            data={categories}
            renderItem={renderItem}
            keyExtractor={(item) => `${item.id}`}
            numColumns={2}
          />
        </Animated.View>

        <TouchableOpacity
          style={{
            flexDirection: "row",
            marginVertical: SIZES.base,
            justifyContent: "center",
          }}
          onPress={() => {
            if (showMoreToggle) {
              Animated.timing(categoryListHeightAnimationValue, {
                toValue: 115,
                duration: 500,
                useNativeDriver: false,
              }).start();
            } else {
              Animated.timing(categoryListHeightAnimationValue, {
                toValue: 172.5,
                duration: 500,
                useNativeDriver: false,
              }).start();
            }

            setShowMoreToggle(!showMoreToggle);
          }}
        >
          <Text style={{ ...FONTS.body4 }}>
            {showMoreToggle ? "LESS" : "MORE"}
          </Text>
          <Image
            source={showMoreToggle ? icons.up_arrow : icons.down_arrow}
            style={{
              marginLeft: 5,
              width: 15,
              height: 15,
              alignSelf: "center",
            }}
          />
        </TouchableOpacity>
      </View>
    );
  }
  function renderIncomeList() {
    let data = processIncomeDataToDisplay();
    const renderItem = ({ item }) => (
      <TouchableOpacity
        onPress={() => setSelectedCategory(item)}
        style={{
          flex: 1,
          flexDirection: "row",
          margin: 5,
          paddingVertical: SIZES.radius,
          paddingHorizontal: SIZES.padding,
          borderRadius: 5,
          backgroundColor: COLORS.white,
          ...styles.shadow,
        }}
      >
        <Image
          source={item.icon}
          style={{
            width: 20,
            height: 20,
            tintColor: item.color,
          }}
        />
        <Text
          style={{ marginLeft: SIZES.base, color: COLORS.primary, ...FONTS.h4 }}
        >
          {item.name}
        </Text>
      </TouchableOpacity>
    );

    return (
      <View style={{ paddingHorizontal: SIZES.padding - 5 }}>
        <Animated.View style={{ height: categoryListHeightAnimationValue }}>
          <FlatList
            data={income}
            renderItem={renderItem}
            keyExtractor={(item) => `${item.id}`}
            numColumns={2}
          />
        </Animated.View>

        <TouchableOpacity
          style={{
            flexDirection: "row",
            marginVertical: SIZES.base,
            justifyContent: "center",
          }}
          onPress={() => {
            if (showMoreToggle) {
              Animated.timing(categoryListHeightAnimationValue, {
                toValue: 115,
                duration: 500,
                useNativeDriver: false,
              }).start();
            } else {
              Animated.timing(categoryListHeightAnimationValue, {
                toValue: 172.5,
                duration: 500,
                useNativeDriver: false,
              }).start();
            }

            setShowMoreToggle(!showMoreToggle);
          }}
        >
          {data.incomeCount > 4 ? (
            <>
              <Text style={{ ...FONTS.body4 }}>
                {showMoreToggle ? "LESS" : "MORE"}
              </Text>

              <Image
                source={showMoreToggle ? icons.up_arrow : icons.down_arrow}
                style={{
                  marginLeft: 5,
                  width: 15,
                  height: 15,
                  alignSelf: "center",
                }}
              />
            </>
          ) : (
            <Text></Text>
          )}
        </TouchableOpacity>
      </View>
    );
  }
  function renderExpenseIncomeSection() {
    return (
      <View style={styles.expenseIncome}>
        <TouchableOpacity
          style={[
            expenseIncome === "expense"
              ? {
                  backgroundColor: "#7F3DFF",
                  padding: 7,
                  borderRadius: 12,
                  marginRight: 10,
                  marginTop: 10,
                  color: "white",
                }
              : {
                  padding: 7,
                  backgroundColor: "white",
                  borderRadius: 12,
                  marginTop: 10,
                },
          ]}
          onPress={() => setExpenseIncome("expense")}
        >
          <Text
            style={[
              expenseIncome === "expense"
                ? {
                    color: "white",
                  }
                : null,
            ]}
          >
            Expenses
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            expenseIncome === "income"
              ? {
                  backgroundColor: "#7F3DFF",
                  padding: 7,
                  borderRadius: 12,
                  color: "white",
                  marginRight: 10,
                  marginTop: 10,
                  marginLeft: 10,
                }
              : {
                  padding: 7,
                  backgroundColor: "white",
                  borderRadius: 12,
                  marginTop: 10,
                },
          ]}
          onPress={() => setExpenseIncome("income")}
        >
          <Text
            style={[
              expenseIncome === "income"
                ? {
                    color: "white",
                  }
                : null,
            ]}
          >
            Income
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
  function renderCategoryHeaderSection() {
    return (
      <View
        style={{
          flexDirection: "row",
          padding: SIZES.padding,
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {/* Title */}
        <View>
          <Text style={{ color: COLORS.primary, ...FONTS.h3 }}>CATEGORIES</Text>
          <Text style={{ color: COLORS.darkgray, ...FONTS.body4 }}>
            {categories.length} Total
          </Text>
        </View>

        {/* Button */}
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            style={{
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: viewMode == "chart" ? COLORS.secondary : null,
              height: 50,
              width: 50,
              borderRadius: 25,
            }}
            onPress={() => setViewMode("chart")}
          >
            <Image
              source={icons.chart}
              resizeMode="contain"
              style={{
                width: 20,
                height: 20,
                tintColor: viewMode == "chart" ? COLORS.white : COLORS.darkgray,
              }}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: viewMode == "list" ? COLORS.secondary : null,
              height: 50,
              width: 50,
              borderRadius: 25,
              marginLeft: SIZES.base,
            }}
            onPress={() => setViewMode("list")}
          >
            <Image
              source={icons.menu}
              resizeMode="contain"
              style={{
                width: 20,
                height: 20,
                tintColor: viewMode == "list" ? COLORS.white : COLORS.darkgray,
              }}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
  function renderIncomeHeaderSection() {
    return (
      <View
        style={{
          flexDirection: "row",
          padding: SIZES.padding,
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {/* Title */}
        <View>
          <Text style={{ color: COLORS.primary, ...FONTS.h3 }}>CATEGORIES</Text>
          <Text style={{ color: COLORS.darkgray, ...FONTS.body4 }}>
            {categories.length} Total
          </Text>
        </View>

        {/* Button */}
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            style={{
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: viewMode == "chart" ? COLORS.secondary : null,
              height: 50,
              width: 50,
              borderRadius: 25,
            }}
            onPress={() => setViewMode("chart")}
          >
            <Image
              source={icons.chart}
              resizeMode="contain"
              style={{
                width: 20,
                height: 20,
                tintColor: viewMode == "chart" ? COLORS.white : COLORS.darkgray,
              }}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: viewMode == "list" ? COLORS.secondary : null,
              height: 50,
              width: 50,
              borderRadius: 25,
              marginLeft: SIZES.base,
            }}
            onPress={() => setViewMode("list")}
          >
            <Image
              source={icons.menu}
              resizeMode="contain"
              style={{
                width: 20,
                height: 20,
                tintColor: viewMode == "list" ? COLORS.white : COLORS.darkgray,
              }}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
  function processIncomeDataToDisplay() {
    let chartDataByMonth = incomes.map((item) => {
      let dataByMoth = item.income.filter(
        (a) => a.date.slice(0, 7) === selectedMonth
      );
      let dataByMonth = item.income.filter(
        (a) => a.date.slice(0, 7) === selectedMonth
      );
      console.log(dataByMonth, "dataByMonth");

      var total = dataByMonth.reduce((a, b) => a + (b.total || 0), 0);
      console.log(selectedMonth, "selectedMonth");
      var total = dataByMonth.reduce((a, b) => a + (b.total || 0), 0);
      return {
        name: item.name,
        y: total,
        // expenseCount: confirmExpenses.length,
        color: item.color,
        id: item.id,
        date: selectedMonth,
      };
    });
    console.log(chartDataByMonth, "IncomechartDataByMonth");
    console.log(1, "incomechartDataByMonth");
    let filterChartDataByMonth = chartDataByMonth.filter((a) => a.y > 0);
    let totalExpenseByMonth = filterChartDataByMonth.reduce(
      (a, b) => a + (b.y || 0),
      0
    );

    let finalChartDataByMonth = filterChartDataByMonth.map((item) => {
      let percentage = ((item.y / totalExpenseByMonth) * 100).toFixed(0);
      return {
        label: `${percentage}%`,
        y: Number(item.y),
        // expenseCount: item.expenseCount,
        color: item.color,
        name: item.name,
        id: item.id,
      };
    });
    return finalChartDataByMonth;
  }
  function processIncomeDataToDisplayPreviousMonth() {
    let chartDataByMonth = incomes.map((item) => {
      let dataByMoth = item.income.filter(
        (a) => a.date.slice(0, 7) === previousMonth
      );
      let dataByMonth = item.income.filter(
        (a) => a.date.slice(0, 7) === previousMonth
      );
      console.log(dataByMonth, "dataByMonth");

      var total = dataByMonth.reduce((a, b) => a + (b.total || 0), 0);
      console.log(previousMonth, "previousMonth");
      var total = dataByMonth.reduce((a, b) => a + (b.total || 0), 0);
      return {
        name: item.name,
        y: total,
        // expenseCount: confirmExpenses.length,
        color: item.color,
        id: item.id,
        date: previousMonth,
      };
    });
    console.log(chartDataByMonth, "IncomechartDataByMonth");
    console.log(1, "incomechartDataByMonth");
    let filterChartDataByMonth = chartDataByMonth.filter((a) => a.y > 0);
    let totalExpenseByMonth = filterChartDataByMonth.reduce(
      (a, b) => a + (b.y || 0),
      0
    );

    let finalChartDataByMonth = filterChartDataByMonth.map((item) => {
      let percentage = ((item.y / totalExpenseByMonth) * 100).toFixed(0);
      return {
        label: `${percentage}%`,
        y: Number(item.y),
        // expenseCount: item.expenseCount,
        color: item.color,
        name: item.name,
        id: item.id,
      };
    });
    return finalChartDataByMonth;
  }
  function processCategoryDataToDisplay() {
    // Filter expenses with "Confirmed" status
    let chartData = categories.map((item) => {
      let confirmExpenses = item.expenses.filter((a) => a.status == "C");
      var total = confirmExpenses.reduce((a, b) => a + (b.total || 0), 0);
      var totalExpenses = confirmExpenses.reduce(
        (a, b) => a + (b.total || 0),
        0
      );
      return {
        name: item.name,
        y: total,
        expenseCount: confirmExpenses.length,
        color: item.color,
        id: item.id,
        date: item.date,
      };
    });
    let chartDataByMonth = categories.map((item) => {
      let dataByMoth = item.expenses.filter(
        (a) => a.date.slice(0, 7) == selectedMonth
      );
      var total = dataByMoth.reduce((a, b) => a + (b.total || 0), 0);
      return {
        name: item.name,
        y: total,
        // expenseCount: confirmExpenses.length,
        color: item.color,
        id: item.id,
        date: selectedMonth,
      };
    });
    // filter out categories with no data/expenses
    let filterChartDataByMonth = chartDataByMonth.filter((a) => a.y > 0);
    let filterChartData = chartData.filter((a) => a.y > 0);

    // Calculate the total expenses
    let totalExpenseByMonth = filterChartDataByMonth.reduce(
      (a, b) => a + (b.y || 0),
      0
    );
    let totalExpense = filterChartData.reduce((a, b) => a + (b.y || 0), 0);
    // Calculate percentage and repopulate chart data
    let finalChartDataByMonth = filterChartDataByMonth.map((item) => {
      let percentage = ((item.y / totalExpenseByMonth) * 100).toFixed(0);
      return {
        label: `${percentage}%`,
        y: Number(item.y),
        // expenseCount: item.expenseCount,
        color: item.color,
        name: item.name,
        id: item.id,
      };
    });
    return finalChartDataByMonth;
  }
  function processCategoryDataToDisplayPreviousMonth() {
    // Filter expenses with "Confirmed" status
    let chartData = categories.map((item) => {
      let confirmExpenses = item.expenses.filter((a) => a.status == "C");
      var total = confirmExpenses.reduce((a, b) => a + (b.total || 0), 0);
      var totalExpenses = confirmExpenses.reduce(
        (a, b) => a + (b.total || 0),
        0
      );
      return {
        name: item.name,
        y: total,
        expenseCount: confirmExpenses.length,
        color: item.color,
        id: item.id,
        date: item.date,
      };
    });
    let chartDataByMonth = categories.map((item) => {
      let dataByMoth = item.expenses.filter(
        (a) => a.date.slice(0, 7) == previousMonth
      );
      var total = dataByMoth.reduce((a, b) => a + (b.total || 0), 0);
      return {
        name: item.name,
        y: total,
        // expenseCount: confirmExpenses.length,
        color: item.color,
        id: item.id,
        date: previousMonth,
      };
    });
    // filter out categories with no data/expenses
    let filterChartDataByMonth = chartDataByMonth.filter((a) => a.y > 0);
    let filterChartData = chartData.filter((a) => a.y > 0);

    // Calculate the total expenses
    let totalExpenseByMonth = filterChartDataByMonth.reduce(
      (a, b) => a + (b.y || 0),
      0
    );
    let totalExpense = filterChartData.reduce((a, b) => a + (b.y || 0), 0);
    // Calculate percentage and repopulate chart data
    let finalChartDataByMonth = filterChartDataByMonth.map((item) => {
      let percentage = ((item.y / totalExpenseByMonth) * 100).toFixed(0);
      return {
        label: `${percentage}%`,
        y: Number(item.y),
        // expenseCount: item.expenseCount,
        color: item.color,
        name: item.name,
        id: item.id,
      };
    });
    return finalChartDataByMonth;
  }
  console.log(processCategoryDataToDisplay(), "processCategoryDataToDisplay");
  function renderCategoryList() {
    const renderItem = ({ item }) => (
      <TouchableOpacity
        onPress={() => setSelectedCategory(item)}
        style={{
          flex: 1,
          flexDirection: "row",
          margin: 5,
          paddingVertical: SIZES.radius,
          paddingHorizontal: SIZES.padding,
          borderRadius: 5,
          backgroundColor: COLORS.white,
          ...styles.shadow,
        }}
      >
        <Image
          source={item.icon}
          style={{
            width: 20,
            height: 20,
            tintColor: item.color,
          }}
        />
        <Text
          style={{ marginLeft: SIZES.base, color: COLORS.primary, ...FONTS.h4 }}
        >
          {item.name}
        </Text>
      </TouchableOpacity>
    );

    return (
      <View style={{ paddingHorizontal: SIZES.padding - 5 }}>
        <Animated.View style={{ height: categoryListHeightAnimationValue }}>
          <FlatList
            data={categories}
            renderItem={renderItem}
            keyExtractor={(item) => `${item.id}`}
            numColumns={2}
          />
        </Animated.View>

        <TouchableOpacity
          style={{
            flexDirection: "row",
            marginVertical: SIZES.base,
            justifyContent: "center",
          }}
          onPress={() => {
            if (showMoreToggle) {
              Animated.timing(categoryListHeightAnimationValue, {
                toValue: 115,
                duration: 500,
                useNativeDriver: false,
              }).start();
            } else {
              Animated.timing(categoryListHeightAnimationValue, {
                toValue: 172.5,
                duration: 500,
                useNativeDriver: false,
              }).start();
            }

            setShowMoreToggle(!showMoreToggle);
          }}
        >
          <Text style={{ ...FONTS.body4 }}>
            {showMoreToggle ? "LESS" : "MORE"}
          </Text>
          <Image
            source={showMoreToggle ? icons.up_arrow : icons.down_arrow}
            style={{
              marginLeft: 5,
              width: 15,
              height: 15,
              alignSelf: "center",
            }}
          />
        </TouchableOpacity>
      </View>
    );
  }
  function renderChart() {
    let chartData = processCategoryDataToDisplay();
    let colorScales = chartData.map((item) => item.color);
    let totalExpenseCount = chartData.reduce(
      (a, b) => a + (b.expenseCount || 0),
      0
    );
    let totalExpense = chartData.reduce((a, b) => a + (b.y || 0), 0);
    console.log("Check Chart");
    console.log(chartData);

    if (Platform.OS == "ios") {
      return (
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          <VictoryPie
            data={chartData}
            labels={(datum) => `${datum.y}`}
            radius={({ datum }) =>
              selectedCategory && selectedCategory.name == datum.name
                ? SIZES.width * 0.4
                : SIZES.width * 0.4 - 10
            }
            padAngle={({ datum }) => datum.y}
            innerRadius={200}
            labelRadius={({ innerRadius }) =>
              (SIZES.width * 0.1 + innerRadius) / 2.5
            }
            style={{
              labels: { fill: "white" },
              parent: {
                ...styles.shadow,
              },
            }}
            width={SIZES.width * 0.8}
            height={SIZES.width * 0.8}
            colorScale={colorScales}
            events={[
              {
                target: "data",
                eventHandlers: {
                  onPress: () => {
                    return [
                      {
                        target: "labels",
                        mutation: (props) => {
                          let categoryName = chartData[props.index].name;
                          setSelectCategoryByName(categoryName);
                        },
                      },
                    ];
                  },
                },
              },
            ]}
          />

          <View style={{ position: "absolute", top: "42%", left: "42%" }}>
            <Text style={{ ...FONTS.h1, textAlign: "center" }}>
              {totalExpenseCount}
            </Text>
            <Text style={{ ...FONTS.body3, textAlign: "center" }}>
              Expenses
            </Text>
          </View>
        </View>
      );
    } else {
      // Android workaround by wrapping VictoryPie with SVG
      return (
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          <Svg width={600} height={600} style={{ width: 600, height: "auto" }}>
            <VictoryPie
              labels={(datum) => `${datum.y}`}
              standalone={false}
              data={chartData}
              radius={({ datum }) =>
                selectedCategory && selectedCategory.name == datum.name
                  ? 600 * 0.4
                  : 600 * 0.4 - 10
              }
              innerRadius={100}
              labelRadius={({ innerRadius }) => (600 * 0.4 + innerRadius) / 2.5}
              style={{
                labels: { fill: "white" },
                parent: {
                  ...styles.shadow,
                },
              }}
              width={600}
              height={600}
              colorScale={colorScales}
              // events={[
              //   {
              //     target: "data",
              //     eventHandlers: {
              //       onPress: () => {
              //         return [
              //           {
              //             target: "labels",
              //             mutation: (props) => {
              //               let categoryName = chartData[props.index].name;
              //               setSelectCategoryByName(categoryName);
              //             },
              //           },
              //         ];
              //       },
              //     },
              //   },
              // ]}
            />
          </Svg>
          <View
            style={{
              position: "absolute",
              top: "42%",
              left: "37%",
              transform: [{ scale: 0.8 }],
            }}
          >
            <Text style={{ ...FONTS.body3, textAlign: "center" }}>
              Total Expended Amount
            </Text>
            <Text style={{ ...FONTS.h1, textAlign: "center" }}>
              {totalExpense} $
            </Text>
          </View>
        </View>
      );
    }
  }
  function renderIncomeChart() {
    let chartData = processIncomeDataToDisplay();
    console.log(processIncomeDataToDisplay(), "asd");

    let colorScales = chartData.map((item) => item.color);
    let totalIncomeCount = chartData.reduce(
      (a, b) => a + (b.expenseCount || 0),
      0
    );
    let totalIncome = chartData.reduce((a, b) => a + (b.y || 0), 0);
    console.log("Check Chart");
    console.log(chartData);

    if (Platform.OS == "ios") {
      return (
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          <VictoryPie
            data={chartData}
            labels={(datum) => `${datum.y}`}
            radius={({ datum }) =>
              selectedCategory && selectedCategory.name == datum.name
                ? SIZES.width * 0.4
                : SIZES.width * 0.4 - 10
            }
            padAngle={({ datum }) => datum.y}
            innerRadius={200}
            labelRadius={({ innerRadius }) =>
              (SIZES.width * 0.1 + innerRadius) / 2.5
            }
            style={{
              labels: { fill: "white" },
              parent: {
                ...styles.shadow,
              },
            }}
            width={SIZES.width * 0.8}
            height={SIZES.width * 0.8}
            colorScale={colorScales}
            events={[
              {
                target: "data",
                eventHandlers: {
                  onPress: () => {
                    return [
                      {
                        target: "labels",
                        mutation: (props) => {
                          let categoryName = chartData[props.index].name;
                          setSelectCategoryByName(categoryName);
                        },
                      },
                    ];
                  },
                },
              },
            ]}
          />

          <View style={{ position: "absolute", top: "42%", left: "42%" }}>
            <Text style={{ ...FONTS.h1, textAlign: "center" }}>
              {totalIncomeCount}
            </Text>
            <Text style={{ ...FONTS.body3, textAlign: "center" }}>
              Expenses
            </Text>
          </View>
        </View>
      );
    } else {
      // Android workaround by wrapping VictoryPie with SVG
      return (
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          <Svg width={600} height={600} style={{ width: 600, height: "auto" }}>
            <VictoryPie
              labels={(datum) => `${datum.y}`}
              standalone={false}
              data={chartData}
              radius={({ datum }) =>
                selectedCategory && selectedCategory.name == datum.name
                  ? 600 * 0.4
                  : 600 * 0.4 - 10
              }
              innerRadius={100}
              labelRadius={({ innerRadius }) => (600 * 0.4 + innerRadius) / 2.5}
              style={{
                labels: { fill: "white" },
                parent: {
                  ...styles.shadow,
                },
              }}
              width={600}
              height={600}
              colorScale={colorScales}
              // events={[
              //   {
              //     target: "data",
              //     eventHandlers: {
              //       onPress: () => {
              //         return [
              //           {
              //             target: "labels",
              //             mutation: (props) => {
              //               let categoryName = chartData[props.index].name;
              //               setSelectCategoryByName(categoryName);
              //             },
              //           },
              //         ];
              //       },
              //     },
              //   },
              // ]}
            />
          </Svg>
          <View style={{ position: "absolute", top: "42%", left: "37%" }}>
            <Text style={{ ...FONTS.body3, textAlign: "center" }}>
              Total Income Amount
            </Text>
            <Text style={{ ...FONTS.h1, textAlign: "center" }}>
              {totalIncome} $
            </Text>
          </View>
        </View>
      );
    }
  }
  function renderExpenseSummary() {
    let data = processCategoryDataToDisplay();

    const renderItem = ({ item }) => (
      <TouchableOpacity
        style={{
          flexDirection: "row",
          height: 40,
          paddingHorizontal: SIZES.radius,
          borderRadius: 10,
          backgroundColor:
            selectedCategory && selectedCategory.name == item.name
              ? item.color
              : COLORS.white,
        }}
        onPress={() => {
          let categoryName = item.name;
          setSelectCategoryByName(categoryName);
        }}
      >
        {/* Name/Category */}
        <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
          <View
            style={{
              width: 20,
              height: 20,
              backgroundColor:
                selectedCategory && selectedCategory.name == item.name
                  ? COLORS.white
                  : item.color,
              borderRadius: 5,
            }}
          />

          <Text
            style={{
              marginLeft: SIZES.base,
              color:
                selectedCategory && selectedCategory.name == item.name
                  ? COLORS.white
                  : COLORS.primary,
              ...FONTS.h3,
            }}
          >
            {item.name}
          </Text>
        </View>

        {/* Expenses */}
        <View style={{ justifyContent: "center" }}>
          <Text
            style={{
              color:
                selectedCategory && selectedCategory.name == item.name
                  ? COLORS.white
                  : COLORS.primary,
              ...FONTS.h3,
            }}
          >
            {item.y} USD - {item.label}
          </Text>
        </View>
      </TouchableOpacity>
    );

    return (
      <View style={{ padding: SIZES.padding }}>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => `${item.id}`}
          ItemSeparatorComponent={ItemSeparator}
        />
      </View>
    );
  }
  function renderIncomeSummary() {
    let data = processIncomeDataToDisplay();

    const renderItem = ({ item }) => (
      <TouchableOpacity
        style={{
          flexDirection: "row",
          height: 40,
          paddingHorizontal: SIZES.radius,
          borderRadius: 10,
          backgroundColor:
            selectedCategory && selectedCategory.name == item.name
              ? item.color
              : COLORS.white,
        }}
        onPress={() => {
          let categoryName = item.name;
          setSelectCategoryByName(categoryName);
        }}
      >
        {/* Name/Category */}
        <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
          <View
            style={{
              width: 20,
              height: 20,
              backgroundColor:
                selectedCategory && selectedCategory.name == item.name
                  ? COLORS.white
                  : item.color,
              borderRadius: 5,
            }}
          />

          <Text
            style={{
              marginLeft: SIZES.base,
              color:
                selectedCategory && selectedCategory.name == item.name
                  ? COLORS.white
                  : COLORS.primary,
              ...FONTS.h3,
            }}
          >
            {item.name}
          </Text>
        </View>

        {/* Expenses */}
        <View style={{ justifyContent: "center" }}>
          <Text
            style={{
              color:
                selectedCategory && selectedCategory.name == item.name
                  ? COLORS.white
                  : COLORS.primary,
              ...FONTS.h3,
            }}
          >
            {item.y} USD - {item.label}
          </Text>
        </View>
      </TouchableOpacity>
    );

    return (
      <View style={{ padding: SIZES.padding }}>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => `${item.id}`}
          ItemSeparatorComponent={ItemSeparator}
        />
      </View>
    );
  }
  const previousMonthIndex = todayIndex - 1;
  const previousMonth = monthsInRange[previousMonthIndex];
  // function compareTotalY(currentMonthData, previousMonthData) {
  //   let currentMonthTotal = 0;
  //   let previousMonthTotal = 0;
  //   console.log("compareTotalY");
  //   currentMonthData.forEach((item) => {
  //     currentMonthTotal += item.y;
  //   });

  //   previousMonthData.forEach((item) => {
  //     previousMonthTotal += item.y;
  //   });

  //   // So sánh tổng giá trị hoặc tính phần trăm thay đổi tùy theo nhu cầu của bạn
  //   const difference = (currentMonthTotal / previousMonthTotal) * 100 - 100;
  //   console.log("Tổng giá trị tháng hiện tại:", currentMonthTotal);
  //   console.log("Tổng giá trị tháng trước:", previousMonthTotal);
  //   console.log("Sự khác biệt:", difference);
  // }
  // console.log(
  //   // processIncomeDataToDisplay(selectedMonth),
  //   // processIncomeDataToDisplay(previousMonth),
  //   compareTotalY(
  //     processIncomeDataToDisplay(selectedMonth),
  //     processIncomeDataToDisplay(previousMonth)
  //   ),
  //   "compare"
  // );
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {renderHeader()}
      {renderExpenseIncomeSection()}
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
      {expenseIncome == "expense" && (
        <View>
          {renderChart()}
          {renderCategoryHeaderSection()}
          {viewMode == "chart" && <View>{renderCategoryList()}</View>}
          {viewMode == "list" && <View>{renderExpenseSummary()}</View>}
        </View>
      )}
      {expenseIncome == "income" && (
        <View>
          {renderIncomeChart()}
          {renderIncomeHeaderSection()}
          {viewMode == "chart" && <View>{renderIncomeList()}</View>}
          {viewMode == "list" && <View>{renderIncomeSummary()}</View>}
        </View>
      )}
    </ScrollView>
  );
};

export default Categories;
const styles = StyleSheet.create({
  container: {
    width: 600,
    justifyContent: "center",
    alignItems: "center",
  },
  expenseIncome: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
});
