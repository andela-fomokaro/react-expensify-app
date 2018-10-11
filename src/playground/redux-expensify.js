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


/**
 * Expenses Genarators
 */
// Add Expense Generator
const addExpense = (
  {
    description = '',
    note = '',
    amount = 0,
    createdAt = 0
  } = {}) => ({ 
  type: 'ADD_EXPENSE',
  expense: {
    id: uuid(),
    description,
    note,
    amount,
    createdAt
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
 });

 // Sort By Date
 const sortByDate = () => ({
   type: 'SORT_BY_DATE',
 });

  // Sort By Amount
  const sortByAmount = () => ({
    type: 'SORT_BY_AMOUNT',
  });

  // Set Start Date
  const setStartDate = (startDate) => ({
    type: 'SET_START_DATE',
    startDate
  });

  // Set End Date
  const setEndDate = (endDate) => ({
    type: 'SET_END_DATE',
    endDate
  });

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
    case 'SORT_BY_AMOUNT':
      return {
        ...state,
        sortBy: 'amount'
      };
    case 'SORT_BY_DATE':
      return {
        ...state,
        sortBy: 'date'
      };
    case 'SET_START_DATE':
      const { startDate } = action;
      return { ...state, startDate };
    case 'SET_END_DATE':
      const { endDate } = action;
      return { ...state, endDate } ;
    default:
      return state;
  }
}

// Get Visisble Expenses
const getVisibleExpenses = (expenses, { text, sortBy, startDate, endDate }) => {
  return expenses.filter((expense) => {
    let endDateMatch = typeof endDate !== 'number' || expense.createdAt <= startDate;
    let startDateMatch = typeof startDate !== 'number' || expense.createdAt >= startDate;
    let textMatch  = expense.description.toLowerCase().includes(text.toLowerCase());

    return startDateMatch && endDateMatch && textMatch;
  }).sort((a, b) => {
    if (sortBy === 'date') {
      return a.createdAt < b.createdAt ? 1 : -1;
    } else if ( sortBy === 'amount') {
      return a.amount < b.amount ? 1 : -1;
    }
  })
};

// Store creation
const store = createStore(
  combineReducers({
    expenses: expensesReducer,
    filter: filterReducers
  })
);

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
