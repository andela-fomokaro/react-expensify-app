import expensesReducer from '../../reducers/expenses';
import expense from '../fixtures/expenses';


test('should setup default expense values', () => {
  const state = expensesReducer(undefined, { type: '@@INIT'});

  expect(state).toEqual([]);
});


test('should add expense', () => {
  const expensesReducerDefaultState = [];
  const action = {
    type: 'ADD_EXPENSE',
    expense
  }
  const state = expensesReducer(undefined, action);

  expect(state).toEqual([
    ... expensesReducerDefaultState,
    action.expense
  ])
});

test('should remove expense by id', () => {
  const action = {
      type: 'REMOVE_EXPENSE',
      id: expense[1].id
  }
  const state = expensesReducer(expense, action);

  expect(state).toEqual([expense[0], expense[2]]);
});

test('should not remove expense if id is not found', () => {
  const action = {
    type: 'REMOVE_EXPENSE',
    id: '-1'
}
const state = expensesReducer(expense, action);

expect(state).toEqual(expense);
});

test('should edit expense by id', () => {
  const updates = {
    description: 'Sandwich',
  }
  const action = {
    type: 'EDIT_EXPENSE',
    id: expense[0].id,
    updates
  }
  const state = expensesReducer(expense, action);

  expect(state[0].description).toBe('Sandwich');
});

test('should not edit expense if id is not found', () => {
  const updates = {
    id: '1',
    description: 'Sandwich',
  }
  const action = {
    type: 'EDIT_EXPENSE',
    id: '-1',
    updates
  }
  const state = expensesReducer(expense, action);

  expect(state).toEqual(expense);
});

test('should set expenses', () => {
  const action = {
    type: 'SET_EXPENSES',
    expense
  }

  const state = expensesReducer(expense, action);
  expect(state).toEqual(expense);
});
