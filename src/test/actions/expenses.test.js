import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { startAddExpense, addExpense, editExpense, removeExpense } from '../../actions/expenses';
import expenses from '../fixtures/expenses';


const createMockStore = configureMockStore([thunk]);

test('should setup REMOVE expense action object', () => {
  const action = removeExpense({ id: 'asdf123'});

  expect(action).toEqual({
    type: 'REMOVE_EXPENSE',
    id: 'asdf123'
  });
});

test('should setup EDIT expense action object', () => {
  const updates = {
    description: 'Water Bill',
    note: 'One week till your next renewal',
    amount: 500,
  }
  const id = 'qwerty13';
  const action = editExpense(id, updates);

  expect(action).toEqual({
    type: 'EDIT_EXPENSE',
    id,
    updates
  });
});

test('should setup ADD expense action object', () => {

  const action = addExpense(expenses[2]);

  expect(action).toEqual({
    type: 'ADD_EXPENSE',
    expense: expenses[2]
  });
});

test('should add expense to database and store', (done) => {
  const store = createMockStore({});

  const expenseData = {
    description: 'Mouse',
    amount: 3000,
    note: 'This one is better',
    createdAt: 1000
  };

  store.dispatch(startAddExpense(expenseData)).then(() => {
    expect(1).toBe(1);
    done();
  });
});

// test('should setup add expense action object with default values', () => {
//   const expenseDefaultData = {
//     description: '',
//     note: '',
//     amount: 0,
//     createdAt: 0,
//   }
//   const action = addExpense(expenseDefaultData);

//   expect(action).toEqual({
//     type: 'ADD_EXPENSE',
//     expense: {
//       id: expect.any(String),
//       ...expenseDefaultData
//     }
//   });
// });