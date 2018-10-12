import { createStore, combineReducers } from 'redux';
import uuid from 'uuid';

const demoState = {
  expenses: [{
    id: 'dummyid',
    description: 'January Rent',
    note: 'This was the final payment for that address',
    amount: 54500,
    createdAt: 0
  }],
  filters: {
    text: 'rent',
    sortBy: 'amount', //date or amount
    startDate: undefined,
    endDate: undefined
  }
}

store.subscribe(() => {
  const state = store.getState();
  const visibleExpenses = getVisibleExpenses(state.expenses, state.filter);
});

// Expense Dispatchers
const expenseOne = store.dispatch(addExpense({ description: 'Rent', amount: 100, createdAt: -21000 }));
const expenseTwo = store.dispatch(addExpense({ description: 'Coffee', amount: 300, createdAt: -1000}));
store.dispatch(removeExpense({ id: expenseOne.expense.id }));
store.dispatch(editExpense( expenseTwo.expense.id, { amount: 700 }));

// Filter Dispatcher
store.dispatch(setTextFilter('Rent'));

// Sort By dispatcher
store.dispatch(sortByAmount());
store.dispatch(sortByDate());

// Set Dispatcher
store.dispatch(setStartDate(2000));
store.dispatch(setEndDate(12500));
