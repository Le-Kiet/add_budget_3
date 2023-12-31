import { View, Text, Dimensions } from "react-native";
import React from "react";
import { Svg } from "react-native-svg";
import { COLORS, FONTS, SIZES, icons, images } from "../constants";

import { PieChart } from "react-native-chart-kit";
import { GlobalContext } from "../components/contextAPI/GlobalState";
import { useState, useContext } from "react";
export default function MyPieChart() {
  const { addTransaction, transactions, incomes } = useContext(GlobalContext);

  const [categories, setCategories] = React.useState(transactions);

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
      };
    });

    // filter out categories with no data/expenses
    let filterChartData = chartData.filter((a) => a.y > 0);

    // Calculate the total expenses
    let totalExpense = filterChartData.reduce((a, b) => a + (b.y || 0), 0);

    // Calculate percentage and repopulate chart data
    let finalChartData = filterChartData.map((item) => {
      let percentage = ((item.y / totalExpense) * 100).toFixed(0);
      return {
        label: `${percentage}%`,
        y: Number(item.y),
        expenseCount: item.expenseCount,
        color: item.color,
        name: item.name,
        id: item.id,
      };
    });

    return finalChartData;
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

    return (
      <View style={{ alignItems: "center", justifyContent: "center" }}>
        <Svg width={600} height={600} style={{ width: 600, height: "auto" }}>
          <PieChart
            data={chartData}
            width={Dimensions.get("window").width}
            height={200}
            chartConfig={{
              color: (opacity = 3) => `rgba(255, 255, 255, ${opacity})`,
            }}
            accessor="population"
            backgroundColor="transparent"
            paddingLeft="15"
            absolute
          />
        </Svg>
        <View style={{ position: "absolute", top: "42%", left: "37%" }}>
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
  const pieData = [
    {
      name: "Bitcoin",
      population: 63,
      color: "orange",
    },
    {
      name: "Dogecoin",
      population: 9,
      color: "gold",
    },
    {
      name: "Ethereum",
      population: 19,
      color: "darkblue",
    },
    {
      name: "Tether",
      population: 6,
      color: "green",
    },
    {
      name: "Polygon",
      population: 3,
      color: "purple",
    },
  ];
  return (
    <View>
      <Text>My Pie Chart</Text>
      {renderChart()}
      {/* <PieChart
        data={chartData}
        width={Dimensions.get("window").width}
        height={200}
        chartConfig={{
          color: (opacity = 3) => `rgba(255, 255, 255, ${opacity})`,
        }}
        accessor="population"
        backgroundColor="transparent"
        paddingLeft="15"
        absolute
      /> */}
    </View>
  );
}
