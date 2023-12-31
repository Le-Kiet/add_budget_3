import React from "react";
import { View, Text, Button } from "react-native";
import Popover from "react-native-popover-view";
import { LineChart } from "react-native-chart-kit";
// import {
//   Chart,
//   Line,
//   Area,
//   HorizontalAxis,
//   VerticalAxis,
// } from "react-native-responsive-linechart";
import { GlobalContext } from "../components/contextAPI/GlobalState";
import { COLORS, FONTS, SIZES, icons, images } from "../constants";
import { useState, useContext } from "react";

const data = [
  { date: "2023-12-21", total: 100.0 },
  { date: "2023-12-20", total: 30.0 },
  { date: "2023-12-20", total: 20.0 },
  { date: "2023-12-21", total: 20.0 },
  { date: "2023-11-21", total: 100.0 },
  { date: "2023-11-20", total: 30.0 },
  { date: "2023-11-20", total: 20.0 },
  { date: "2023-11-21", total: 20.0 },
  { date: "2023-11-21", total: 100.0 },
  { date: "2023-11-20", total: 30.0 },
  { date: "2023-10-20", total: 20.0 },
  { date: "2023-10-21", total: 20.0 },
  { date: "2023-10-21", total: 100.0 },
  { date: "2023-10-20", total: 30.0 },
  { date: "2023-10-20", total: 20.0 },
  { date: "2023-10-21", total: 20.0 },
];

const LineChartComponent = () => {
  const { addTransaction, transactions, incomes } = useContext(GlobalContext);
  const { filteredIncomes, setFilterIncomes } = useState([]);
  function addIncomes(data) {
    setFilterIncomes(...data);
  }
  const [chartType, setChartType] = useState("month");
  const getWeekNumber = (date) => {
    const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
    const daysOffset = firstDayOfYear.getDay() - 1;
    const firstMondayOfYear = new Date(
      date.getFullYear(),
      0,
      1 + (daysOffset > 0 ? 7 - daysOffset : 0)
    );
    const daysDiff = (date - firstMondayOfYear) / (1000 * 60 * 60 * 24);
    const weekNumber = Math.ceil((daysDiff + 1) / 7);
    return weekNumber;
  };
  const getIncomeGroupedData = (type) => {
    const names = incomes.map((income) => income.name);
    const filteredIncomes = [];
    names.forEach((name) => {
      if (name) {
        const incomesOfType = incomes.filter((income) => income.name === name);
        filteredIncomes.push(...incomesOfType);
      }
    });
    const incomeData = filteredIncomes.map((income) => income.income);
    const groupedData = {};
    incomeData.forEach((item) => {
      item.forEach((data) => {
        console.log(data.date, data.total, "data");
        const date = data.date;
        if (!groupedData[date]) {
          groupedData[date] = {
            label: date,
            total: 0,
          };
        }
        groupedData[date].total += data.total;
      });
    });
    const incomeGroupedData = Object.values(groupedData);
    switch (type) {
      case "month":
        return incomeGroupedData.reduce((accumulator, income) => {
          const incomeDate = new Date(income.label);
          const year = incomeDate.getFullYear();
          const month = incomeDate.getMonth() + 1;

          console.log(income, "income");
          console.log(accumulator, "accumulator1");
          const key = `${month}/${year}`;

          if (!accumulator[key]) {
            accumulator[key] = {
              label: key,
              total: 0,
            };
          }
          accumulator[key].total += income.total;
          console.log(accumulator, "accumulator");
          return accumulator;
        }, []);
      case "week":
        return incomeGroupedData.reduce((accumulator, income) => {
          const incomeDate = new Date(income.date);
          const year = incomeDate.getFullYear();
          const week = getWeekNumber(incomeDate);
          const existingItem = accumulator.find(
            (item) => item.label === `${week}/${year}`
          );

          if (existingItem) {
            existingItem.total += income.total;
          } else {
            accumulator.push({
              label: `${week}/${year}`,
              total: income.total,
            });
          }

          return accumulator;
        }, []);
      case "day":
        return incomeGroupedData.reduce((accumulator, income) => {
          const incomeDate = new Date(income.date);
          const year = incomeDate.getFullYear();
          const day = incomeDate.getDate();
          const month = incomeDate.getMonth() + 1;
          const label = `${month}/${day}/${year}`;

          const existingItem = accumulator.find((item) => item.label === label);

          if (existingItem) {
            existingItem.total += income.total;
          } else {
            accumulator.push({ label, total: income.total });
          }

          return accumulator;
        }, []);
      default:
        return [];
    }
  };
  const getExpenseGroupedData = (type) => {
    const names = transactions.map((income) => income.name);
    const filteredExpense = [];
    names.forEach((name) => {
      if (name) {
        const incomesOfType = transactions.filter(
          (income) => income.name === name
        );
        filteredExpense.push(...incomesOfType);
        // console.log(filteredExpense, "filtered expense");
      }
    });
    const incomeData = filteredExpense.map((income) => income.expenses);
    // console.log(incomeData, "income data");
    const groupedData = {};
    incomeData.forEach((item) => {
      // console.log(item, "item");
      item.forEach((data) => {
        console.log(data.date, data.total, "data");
        const date = data.date;
        if (!groupedData[date]) {
          groupedData[date] = {
            label: date,
            total: 0,
          };
        }
        groupedData[date].total += data.total;
      });
    });
    const expenseGroupedData = Object.values(groupedData);
    switch (type) {
      case "month":
        return expenseGroupedData.reduce((accumulator, income) => {
          const incomeDate = new Date(income.label);
          const year = incomeDate.getFullYear();
          const month = incomeDate.getMonth() + 1;

          console.log(income, "income");
          const key = `${month}/${year}`;

          if (!accumulator[key]) {
            accumulator[key] = {
              label: key,
              total: 0,
            };
          }
          accumulator[key].total += income.total;
          console.log(accumulator, "accumulatorexpensemonth");
          return accumulator;
        }, []);
      case "week":
        return data.reduce((accumulator, expense) => {
          const expenseDate = new Date(expense.date);
          const year = expenseDate.getFullYear();
          const week = getWeekNumber(expenseDate);
          const existingItem = accumulator.find(
            (item) => item.label === `${week}/${year}`
          );

          if (existingItem) {
            existingItem.total += expense.total;
          } else {
            accumulator.push({
              label: `${week}/${year}`,
              total: expense.total,
            });
          }
          console.log(accumulator, "accumulatorexpenseweek");

          return accumulator;
        }, []);
      case "day":
        return data.reduce((accumulator, expense) => {
          const expenseDate = new Date(expense.date);
          const year = expenseDate.getFullYear();
          const day = expenseDate.getDate();
          const month = expenseDate.getMonth() + 1;
          const label = `${month}/${day}`;

          const existingItem = accumulator.find((item) => item.label === label);

          if (existingItem) {
            existingItem.total += expense.total;
          } else {
            accumulator.push({ label, total: expense.total });
          }
          console.log(accumulator, "accumulatorexpenseday");

          return accumulator;
        }, []);
      default:
        return [];
    }
  };
  const getGroupedData = (type) => {
    const expenseGroupedData = getExpenseGroupedData(type);
    const incomeGroupedData = getIncomeGroupedData(type);
    const expenses = Object.values(expenseGroupedData);
    const incomes = Object.values(incomeGroupedData);

    // console.log(expenses, "expenses");
    const values = Object.values(incomeGroupedData);
    console.log(expenseGroupedData, "expenseGroupedData");

    const sortedExpense = expenses.sort((a, b) => {
      const [monthA, yearA] = a.label.split("/");
      const [monthB, yearB] = b.label.split("/");

      if (yearA !== yearB) {
        return yearA - yearB;
      } else {
        return monthA - monthB;
      }
    });
    const sortedIncome = incomes.sort((a, b) => {
      console.log(incomes, "sortedIncome");
      const [monthA, yearA] = a.label.split("/");
      const [monthB, yearB] = b.label.split("/");

      if (yearA !== yearB) {
        return yearA - yearB;
      } else {
        return monthA - monthB;
      }
    });
    const mergedData = expenses.map((expense, index) => ({
      label: sortedExpense[index].label,
      expenseTotal: sortedExpense[index] ? sortedExpense[index].total : 0,
      incomeTotal: sortedIncome[index] ? sortedIncome[index].total : 0,
      // incomeTotal: 0,
    }));
    console.log(mergedData, "merged data");
    return mergedData;
  };
  const groupedData = getGroupedData(chartType);
  const expenseTotals = groupedData.map((item) => item.expenseTotal);
  const incomeTotals = groupedData.map((item) => item.incomeTotal);

  const labels = groupedData.map((item) => item.label);
  const datasets = [
    {
      data: expenseTotals,
      color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`,
    },
    {
      data: incomeTotals,
      color: (opacity = 1) => `rgba(0, 255, 0, ${opacity})`,
    },
  ];

  const handleChartTypeChange = () => {
    let newChartType = "";

    switch (chartType) {
      case "month":
        newChartType = "week";
        break;
      case "week":
        newChartType = "day";
        break;
      case "day":
        newChartType = "month";
        break;
      default:
        newChartType = "month";
        break;
    }
    setChartType(newChartType);
  };
  const [tooltipData, setTooltipData] = useState(null); // Tooltip data state

  const handleTooltipToggle = (data, index) => {
    setTooltipData({ data, index }); // Update tooltip data on point hover
  };

  const renderTooltip = () => {
    if (tooltipData) {
      const { data, index } = tooltipData;
      const { label, total } = data[index];

      return (
        <Popover isVisible={true} popoverStyle={styles.tooltipContainer}>
          <Text style={styles.tooltipText}>Date: {label}</Text>
          <Text style={styles.tooltipText}>Amount: {total}</Text>
        </Popover>
      );
    }

    return null;
  };

  const chartConfig = {
    backgroundGradientFrom: "#ffffff",
    backgroundGradientTo: "#ffffff",
    decimalPlaces: 2,
    color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`,
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: "6",
      strokeWidth: "2",
    },
    propsForBackgroundLines: {
      strokeDasharray: "", // Remove dashed lines
    },
    propsForLabels: {
      fontSize: 10,
    },
    fillShadowGradient: "rgba(134, 65, 244, 0.1)", // Optional: Add shadow gradient
    fillShadowGradientOpacity: 1, // Optional: Adjust shadow gradient opacity
    yAxisLabel: "₫", // Label for the yAxis
    yMin: 0, // Minimum value for the yAxis
  };

  // Xóa thuộc tính không hợp lệ onStartShouldSetResponder
  const chartProps = {
    ...chartConfig,
    onStartShouldSetResponder: null,
  };
  return (
    <View>
      <LineChart
        data={{
          labels: labels,
          datasets: datasets,
        }}
        width={300} // Width of the chart
        height={220} // Height of the chart
        chartConfig={chartProps}
        bezier // Use bezier curve for smooth lines
        onDataPointClick={({ value, getIndex }) =>
          handleTooltipToggle(groupedData, getIndex())
        }
      />
      {renderTooltip()}
      <Button
        title={`Switch to ${
          chartType === "month"
            ? "week"
            : chartType === "week"
            ? "day"
            : "month"
        } chart`}
        onPress={handleChartTypeChange}
      />
    </View>
  );
};

export default LineChartComponent;
// const LineChartComponent = () => {
//   const { addTransaction, transactions, incomes } = useContext(GlobalContext);
//   const [date, setDate] = useState("");
//   const [categories, setCategories] = React.useState(transactions);
//   // Tạo một đối tượng Map để lưu trữ tổng tiền tiêu trong từng ngày
//   const dailyExpenseMap = new Map();

//   // Duyệt qua các mục tiêu trong dữ liệu
//   transactions.forEach((category) => {
//     category.expenses.forEach((expense) => {
//       const expenseDate = new Date(expense.date).toLocaleDateString();

//       // Nếu ngày đã tồn tại trong Map, cộng tổng tiền tiêu vào
//       if (dailyExpenseMap.has(expenseDate)) {
//         const currentTotal = dailyExpenseMap.get(expenseDate);
//         dailyExpenseMap.set(expenseDate, currentTotal + expense.total);
//       }
//       // Nếu ngày chưa tồn tại trong Map, khởi tạo tổng tiền tiêu cho ngày đó
//       else {
//         dailyExpenseMap.set(expenseDate, expense.total);
//       }
//     });
//   });

//   // Chuyển đổi đối tượng Map thành mảng các đối tượng với ngày tăng dần
//   const dailyExpenses = Array.from(dailyExpenseMap).map(([date, total]) => ({
//     date,
//     total,
//   }));

//   // Sắp xếp mảng theo ngày tăng dần
//   dailyExpenses.sort((a, b) => new Date(a.date) - new Date(b.date));
//   console.log(dailyExpenses, "daily");
//   return (
//     <View>
//       <Chart
//         style={{ height: 200, width: 400 }}
//         padding={{ left: 40, bottom: 20, right: 20, top: 20 }}
//         xDomain={{
//           type: Date,
//           min: 0,
//           max: 100,
//           // min: new Date(2023, 11, 31), // Ngày tháng bắt đầu
//           // max: new Date(2023, 12, 31), // Ngày tháng kết thúc

//           //   min: new Date(dailyExpenses[0].date),
//           //   max: new Date(dailyExpenses[dailyExpenses.length - 1].date),
//         }}
//         yDomain={{ min: 0, max: 20 }}
//       >
//         <VerticalAxis
//           tickCount={10}
//           theme={{ labels: { formatter: (v) => v.toFixed(2) } }}
//         />
//         <HorizontalAxis />
//         <Line
//           theme={{
//             stroke: { color: "#1abc9c", width: 1 },
//           }}
//           data={dailyExpenses.map((expense) => ({
//             x: new Date(expense.date),
//             y: expense.total,
//           }))}
//         />
//       </Chart>
//       {/* <Area
//           theme={{
//             gradient: {
//               from: { color: "#1abc9c", opacity: 0.4 },
//               to: { color: "#1abc9c", opacity: 0.4 },
//             },
//           }}
//           smoothing="cubic-spline"
//           data={[
//             { x: -2, y: 15 },
//             { x: -1, y: 10 },
//             { x: 0, y: 12 },
//             { x: 5, y: 8 },
//             { x: 6, y: 12 },
//             { x: 9, y: 13.5 },
//             { x: 10, y: 15 },
//           ]}
//         />
//         <Area
//           theme={{
//             gradient: {
//               from: { color: "#f39c12", opacity: 0.4 },
//               to: { color: "#f39c12", opacity: 0.4 },
//             },
//           }}
//           smoothing="cubic-spline"
//           data={[
//             { x: -2, y: 0 },
//             { x: -1, y: 2 },
//             { x: 0, y: 7 },
//             { x: 2, y: 5 },
//             { x: 3, y: 12 },
//             { x: 7, y: 16 },
//             { x: 9, y: 17 },
//             { x: 10, y: 12 },
//           ]}
//         /> */}
//       {/* </Chart> */}
//     </View>
//   );
// };
// export default LineChartComponent;
