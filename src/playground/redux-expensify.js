import { createStore, combineReducers } from 'redux';
import uuid from 'uuid';

const demoState = {
  expenses: [{
    id: 'dummyid',
    description: 'January Rent',
    note: 'This was the final payment for that address',
    amount: 54500,
    createAt: 0
  }],
  filters: {
    text: 'rent',
    sortBy: 'amount', //date or amount
    startDate: undefined,
    endDate: undefined
  }
}

// ADD_EXPENSE
// REMOVE_EXPENSE
// EDIT_EXPENSE
// SET_TEXT_FILTER
// SORT_BY_DATE
// SORT_BY_AMOUNT
// SET_START_DATE
// SET_END_DATE

/**
 * Expenses Genarators
 */
// Add Expense Generator
const addExpense = (
  {
    description = '',
    note = '',
    amount = 0,
    createAt = 0
  } = {}) => ({ 
  type: 'ADD_EXPENSE',
  expense: {
    id: uuid(),
    description,
    note,
    amount,
    createAt
  }
});

// Remove Expense Generator
const removeExpense = ({ id } = {} ) => ({
  type: 'REMOVE_EXPENSE',
  id
});

// Edit Expense Generator
const editExpense = (id, updates ) => ({
  type: 'EDIT_EXPENSE',
  id,
  updates
});

/**
 * Filter Generators
 */

 // Set Text Filter
 const setTextFilter = (text = '') => ({
   type: 'SET_TEXT_FILTER',
   text
 })

// Expenses Reducer
const expensesReducerDefaultState = [];
const expensesReducer = (state = expensesReducerDefaultState, action) => {
  switch (action.type) {
    case 'ADD_EXPENSE':
      return [...state, action.expense];
    case 'REMOVE_EXPENSE':
      return state.filter( ({ id }) => id !== action.id );
    case 'EDIT_EXPENSE':
      return state.map((expense) => {
        return expense.id === action.id ? {...expense, ...action.updates} : expense;
      });
    default:
      return state;
  }
};

// Filters Reducer
const filterReducerDefaultState = {
  text: '',
  sortBy: 'date',
  startDate: undefined,
  endDate: undefined
}
const filterReducers = (state = filterReducerDefaultState, action) => {
  switch (action.type) {
    case 'SET_TEXT_FILTER':
      return  { ...state, ...action};
    default:
      return state;
  }
}

// Store creation
const store = createStore(
  combineReducers({
    expenses: expensesReducer,
    filter: filterReducers
  })
);

store.subscribe(() => {
  console.log(store.getState());
});

// Expense Dispatchers
const expenseOne = store.dispatch(addExpense({ description: 'Rent', amount: 100 }));
const expenseTwo = store.dispatch(addExpense({ description: 'Cofee', amount: 300 }));
store.dispatch(removeExpense({ id: expenseOne.expense.id }));
store.dispatch(editExpense( expenseTwo.expense.id, { amount: 700 }));

// Filter Dispatcher
store.dispatch(setTextFilter('rent'));
