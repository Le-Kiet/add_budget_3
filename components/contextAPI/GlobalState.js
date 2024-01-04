import React, { createContext, useReducer } from "react";
import { COLORS, FONTS, SIZES, icons, images } from "../../constants";
import AppReducer from "./AppReducer";

const confirmStatus = "C";
const pendingStatus = "P";
const initialState = {
  transactions: [
    {
      id: 1,
      name: "Education",
      icon: icons.education,
      color: COLORS.yellow,
      budget: [
        {
          id: 1,
          total: 300,
          spent: 100,
          date: "2024-01", //yyyy-mm
        },
        {
          id: 2,
          total: 300,
          spent: 75,
          date: "2023-12", //yyyy-mm
        },
        {
          id: 3,
          total: 400,
          spent: 350,
          date: "2023-11", //yyyy-mm
        },
      ],
      expenses: [
        {
          id: 1,
          title: "Tuition Fee",
          description: "Tuition fee",
          location: "ByProgrammers' tuition center",
          total: 350.0,
          status: confirmStatus,
          date: "2023-11-21",
        },
        {
          id: 2,
          title: "Arduino",
          description: "Hardward",
          location: "ByProgrammers' tuition center",
          total: 30.0,
          status: confirmStatus,
          date: "2023-12-20",
        },
        {
          id: 3,
          title: "Javascript Books",
          description: "Javascript books",
          location: "ByProgrammers' Book Store",
          total: 20.0,
          status: confirmStatus,
          date: "2023-12-20",
        },
        {
          id: 4,
          title: "PHP Books",
          description: "PHP books",
          location: "ByProgrammers' Book Store",
          total: 200,
          status: confirmStatus,
          date: "2024-01-01",
        },
      ],
    },
    {
      id: 2,
      name: "Nutrition",
      icon: icons.food,
      color: COLORS.lightBlue,
      budget: [
        {
          id: 1,
          total: 2000,
          spent: 900,
          date: "2024-01", //yyyy-mm
        },
        {
          id: 2,
          total: 3000,
          spent: 800,
          date: "2023-12", //yyyy-mm
        },
        {
          id: 2,
          total: 1200,
          spent: 400,
          date: "2023-11", //yyyy-mm
        },
      ],
      income: [
        {
          id: 1,
          title: "drug",
          description: "fee",
          location: "ByProgrammers' tuition center",
          total: 250.0,
          status: confirmStatus,
          date: "2023-12-20",
        },
      ],
      expenses: [
        {
          id: 3,
          title: "Vitamins",
          description: "Vitamin",
          location: "ByProgrammers' Pharmacy",
          total: 250,
          status: confirmStatus,
          date: "2023-11-21",
        },
        {
          id: 4,
          title: "Vitamins",
          description: "Vitamin",
          location: "ByProgrammers' Pharmacy",
          total: 100,
          status: confirmStatus,
          date: "2024-01-01",
        },
        {
          id: 5,
          title: "Vitamins",
          description: "Vitamin",
          location: "ByProgrammers' Pharmacy",
          total: 25.0,
          status: confirmStatus,
          date: "2023-12-21",
        },
        {
          id: 6,
          title: "Protein powder",
          description: "Protein",
          location: "ByProgrammers' Pharmacy",
          total: 50.0,
          status: confirmStatus,
          date: "2023-12-20",
        },
      ],
    },
    {
      id: 3,
      name: "Child",
      icon: icons.baby_car,
      color: COLORS.darkgreen,
      budget: [
        {
          id: 1,
          total: 2000,
          spent: 900,
          date: "2024-01", //yyyy-mm
        },
        {
          id: 2,
          total: 3000,
          spent: 800,
          date: "2023-12", //yyyy-mm
        },
        {
          id: 2,
          total: 1200,
          spent: 400,
          date: "2023-11", //yyyy-mm
        },
      ],
      expenses: [
        {
          id: 7,
          title: "Toys",
          description: "toys",
          location: "ByProgrammers' Toy Storeb",
          total: 125.0,
          status: confirmStatus,
          date: "2024-01-04",
        },
        {
          id: 8,
          title: "Baby Car Seat",
          description: "Baby Car Seat",
          location: "ByProgrammers' Baby Care Storae",
          total: 100.0,
          status: confirmStatus,
          date: "2023-12-20",
        },
        {
          id: 9,
          title: "Pampers",
          description: "Pampers",
          location: "ByProgrammers' Supermarkect",
          total: 100.0,
          status: confirmStatus,
          date: "2023-12-19",
        },
        {
          id: 10,
          title: "Baby T-Shirt",
          description: "T-Shirt",
          location: "ByProgrammers' Fashion Stodre",
          total: 20.0,
          status: confirmStatus,
          date: "2023-12-21",
        },
      ],
    },
    {
      id: 4,
      name: "Beauty & Care",
      icon: icons.healthcare,
      color: COLORS.peach,
      budget: [
        {
          id: 2,
          total: 3000,
          spent: 800,
          date: "2023-12", //yyyy-mm
        },
        {
          id: 2,
          total: 1200,
          spent: 400,
          date: "2023-11", //yyyy-mm
        },
      ],
      income: [
        {
          id: 1,
          title: "necklake",
          description: "necklake",
          location: "diamond store",
          total: 400.0,
          status: confirmStatus,
          date: "2023-12-21",
        },
      ],
      expenses: [
        {
          id: 11,
          title: "Skin Care product",
          description: "skin care",
          location: "ByProgrammeres' Pharmacy",
          total: 10.0,
          status: confirmStatus,
          date: "2023-12-18",
        },
        {
          id: 12,
          title: "Lotion",
          description: "Lotion",
          location: "ByProgrammerfs' Pharmacy",
          total: 50.0,
          status: confirmStatus,
          date: "2023-12-20",
        },
        {
          id: 13,
          title: "Face Mask",
          description: "Face Mask",
          location: "ByProgrammerqs' Pharmacy",
          total: 50.0,
          status: confirmStatus,
          date: "2023-12-22",
        },
        {
          id: 14,
          title: "Sunscreen cream",
          description: "Sunscreen cream",
          location: "ByProgrammesrs' Pharmacy",
          total: 50.0,
          status: confirmStatus,
          date: "2023-12-22",
        },
      ],
    },
    {
      id: 5,
      name: "Sports",
      icon: icons.sports_icon,
      color: COLORS.purple,
      budget: [
        {
          id: 2,
          total: 3000,
          spent: 800,
          date: "2023-12", //yyyy-mm
        },
        {
          id: 2,
          total: 1200,
          spent: 400,
          date: "2023-11", //yyyy-mm
        },
      ],
      income: [
        {
          id: 1,
          title: "soccer ball",
          description: "3 balls",
          location: "zxczxc",
          total: 150.0,
          status: confirmStatus,
          date: "2023-12-20",
        },
      ],
      expenses: [
        {
          id: 15,
          title: "Gym Membership",
          description: "Monthly Fee",
          location: "ByProgrammers' Gym",
          total: 45.0,
          status: confirmStatus,
          date: "2023-12-12",
        },
        {
          id: 16,
          title: "Gloves",
          description: "Gym Equipment",
          location: "ByProgramzmers' Gym",
          total: 15.0,
          status: confirmStatus,
          date: "2023-12-23",
        },
      ],
    },
    {
      id: 6,
      name: "Clothing",
      icon: icons.cloth_icon,
      color: COLORS.red,
      budget: [
        {
          id: 2,
          total: 3000,
          spent: 800,
          date: "2023-12", //yyyy-mm
        },
        {
          id: 2,
          total: 1200,
          spent: 400,
          date: "2023-11", //yyyy-mm
        },
      ],
      income: [
        {
          id: 1,
          title: "pant",
          description: "3 pant",
          location: "clothces store",
          total: 40.0,
          status: confirmStatus,
          date: "2023-12-21",
        },
      ],
      expenses: [
        {
          id: 17,
          title: "T-Shirt",
          description: "Plain Color T-Shirt",
          location: "ByProgrammercs' Mall",
          total: 20.0,
          status: confirmStatus,
          date: "2023-11-18",
        },
        {
          id: 18,
          title: "Jeans",
          description: "Blue Jeans",
          location: "ByProgrammaders' Mall",
          total: 50.0,
          status: confirmStatus,
          date: "2023-12-02",
        },
      ],
    },
    {
      id: 7,
      name: "Holiday",
      icon: icons.holiday,
      color: COLORS.pink,
      budget: [],
      income: [
        {
          id: 1,
          title: "necklake",
          description: "necklake",
          location: "diamond store",
          total: 400.0,
          status: confirmStatus,
          date: "2023-12-21",
        },
      ],
      expenses: [
        {
          id: 17,
          title: "Vacation",
          description: "trip to Japan",
          location: "Hokkaido and Tokyo",
          total: 1000.0,
          status: confirmStatus,
          date: "2023-12-01",
        },
        {
          id: 18,
          title: "Summer Vacation",
          description: "go on holiday",
          location: "The beach",
          total: 200.0,
          status: confirmStatus,
          date: "2023-12-11",
        },
      ],
    },
    {
      id: 8,
      name: "House",
      icon: icons.house,
      color: COLORS.blue,
      budget: [],
      expenses: [
        {
          id: 17,
          title: "Electricity bill",
          description: "Electricity bill",
          location: "Viet Nam",
          total: 20.0,
          status: confirmStatus,
          date: "2023-12-22",
        },
        {
          id: 18,
          title: "Family tools",
          description: "Buyed hammer, toilet unclog, knife,...",
          location: "The mall",
          total: 100.0,
          status: confirmStatus,
          date: "2023-12-22",
        },
      ],
    },
  ],
  incomes: [
    {
      id: 1,
      name: "salary",
      icon: icons.salary,
      color: COLORS.lightgreen,
      income: [
        {
          id: 1,
          title: "Full Time Job",
          description: "Fully Time Job salary",
          location: "company",
          total: 1000.0,
          status: confirmStatus,
          date: "2024-01-21",
        },
        {
          id: 2,
          title: "Full Time Job",
          description: "Full Time Job salary",
          location: "company",
          total: 1000.0,
          status: confirmStatus,
          date: "2023-12-21",
        },
        {
          id: 3,
          title: "Full Time Job",
          description: "part Time Job salary",
          location: "company",
          total: 1000.0,
          status: confirmStatus,
          date: "2023-12-20",
        },
      ],
    },
    {
      id: 2,
      name: "Stock",
      icon: icons.stock,
      color: COLORS.darkgreen,
      income: [
        {
          id: 1,
          title: "Full Time Job",
          description: "a Time Job salary",
          location: "company",
          total: 200.0,
          status: confirmStatus,
          date: "2024-01-21",
        },
        {
          id: 5,
          title: "bitcoin",
          description: "Vitamin",
          location: "ByProgrammers' Pharmacy",
          total: 500.0,
          status: confirmStatus,
          date: "2023-12-22",
        },
        {
          id: 6,
          title: "Vitamins",
          description: "Vitamin",
          location: "ByProgrammers' Pharmacy",
          total: 25.0,
          status: confirmStatus,
          date: "2023-11-23",
        },
      ],
    },
    {
      id: 3,
      name: "estate",
      icon: icons.salary,
      color: COLORS.lightgreen,
      income: [
        {
          id: 1,
          title: "Full Time Job",
          description: "Full Time Job salary",
          location: "company",
          total: 400.0,
          status: confirmStatus,
          date: "2024-01-21",
        },
        {
          id: 2,
          title: "Full Time Job",
          description: "Full Time Job salary",
          location: "company",
          total: 1000.0,
          status: confirmStatus,
          date: "2023-12-21",
        },
        {
          id: 3,
          title: "Fádasd",
          description: "zxczcx",
          location: "cxz",
          total: 2000.0,
          status: confirmStatus,
          date: "2023-11-20",
        },
        {
          id: 4,
          title: "xxxxxxxxxxx",
          description: "zzzzz",
          location: "cccccccccccc",
          total: 1000.0,
          status: confirmStatus,
          date: "2023-10-20",
        },
      ],
    },
  ],
};

// export const GlobalProvider = ({ children }) => {
//   const [state, dispatch] = useReducer(AppReducer, initialState);

//   //Actions
//   function deleteTransactions(id) {
//     dispatch({
//       type: "DELETE_TRANSACTION",
//       payload: id,
//     });
//   }
//   function addTransactions(transaction) {
//     dispatch({
//       type: "ADD_TRANSACTION",
//       payload: transaction,
//     });
//   }

//   return (
//     <GlobalContext.Provider
//       value={{
//         transactions: state.transactions,
//         deleteTransactions,
//         addTransactions,
//       }}
//     >
//       {children}
//     </GlobalContext.Provider>
//   );
// };
export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  // Actions
  function deleteTransaction(categoryId, transactionId) {
    dispatch({
      type: "DELETE_TRANSACTION",
      payload: {
        categoryId: categoryId,
        transactionId: transactionId,
      },
    });
  }

  function addTransaction(categoryId, transaction) {
    dispatch({
      type: "ADD_TRANSACTION",
      payload: {
        categoryId: categoryId,
        transaction: transaction,
      },
    });
  }
  function addBudget(categoryId, budget) {
    dispatch({
      type: "ADD_TRANSACTION",
      payload: {
        categoryId: categoryId,
        budget: budget,
      },
    });
  }
  return (
    <GlobalContext.Provider
      value={{
        transactions: state.transactions,
        incomes: state.incomes,
        deleteTransaction,
        addTransaction, // Đảm bảo truyền đúng tên hàm ở đây
        addBudget,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
