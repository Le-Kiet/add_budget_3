// export default (state, action) => {
//   switch (action.type) {
//     case "DELETE_TRANSACTION":
//       return {
//         ...state,
//         transactions: state.transactions.filter(
//           (transaction) => transaction.id !== action.payload
//         ),
//       };
//     case "ADD_TRANSACTION":
//       return {
//         ...state,
//         transactions: [action.payload, ...state.transactions],
//       };
//     default:
//       return state;
//   }
// };
export default function reducer(state, action) {
  switch (action.type) {
    case "DELETE_TRANSACTION":
      const { categoryId, transactionId } = action.payload;
      const categoryToDelete = state.transactions.find(
        (category) => category.id === categoryId
      );

      if (categoryToDelete) {
        const updatedExpenses = categoryToDelete.expenses.filter(
          (expense) => expense.id !== transactionId
        );

        const updatedCategory = {
          ...categoryToDelete,
          expenses: updatedExpenses,
        };

        return {
          ...state,
          transactions: state.transactions.map((category) =>
            category.id === categoryId ? updatedCategory : category
          ),
        };
      }
      return state;

    case "DELETE_INCOME":
      const { incomeId } = action.payload;
      const updatedIncomes = state.incomes.filter(
        (income) => income.id !== incomeId
      );

      return {
        ...state,
        incomes: updatedIncomes,
      };

    case "ADD_TRANSACTION":
      const { categoryIds, transaction } = action.payload;

      return {
        ...state,
        transactions: state.transactions.map((category) => {
          if (category.id === categoryIds) {
            return {
              ...category,
              expenses: [transaction, ...category.expenses],
            };
          }
          return category;
        }),
      };

    default:
      return state;
  }
}
