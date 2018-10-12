import { createStore, combineReducers } from 'redux';
import expensesReducer from '../reducers/expenses';
import filterReducers from '../reducers/filters';

// Store creation
export default () => {
  const store = createStore(
    combineReducers({
      expenses: expensesReducer,
      filters: filterReducers
    })
  );

  return store;
}