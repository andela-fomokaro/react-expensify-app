import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { 
  startAddExpense, 
  addExpense, 
  editExpense, 
  removeExpense, 
  setExpenses,
  setStartExpenses, 
  startRemoveExpense,
  startEditExpense
 } from '../../actions/expenses';
import expenses from '../fixtures/expenses';
import database from '../../firebase/firebase';


const createMockStore = configureMockStore([thunk]);

beforeEach((done) => {
  const expenseData = {};
  expenses.forEach(({ id, description, note, amount, createdAt }) => {
    expenseData[id] = { id, description, note, amount, createdAt };
  });
  database.ref('expenses').set(expenseData).then(() => done());
});


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

// test('should add expense to database and store', (done) => {
//   const store = createMockStore({});

//   const expenseData = {
//     description: 'Mouse',
//     amount: 3000,
//     note: 'This one is better',
//     createdAt: 1000
//   };

//   store.dispatch(startAddExpense(expenseData)).then(() => {
//     const actions = store.getActions();
//     console.log('actions is here:', actions);
//     expect(actions[0].toEqual({
//       type: 'ADD_EXPENSE',
//       expense: {
//         id: expect.any(String),
//         ...expenseData
//       }
//     })),
//     done();
//   });
// });

test('should add expense to database and store', async () => {
  const store = createMockStore({});
  let actions = null;
  const expenseData = {
    description: 'Mouse',
    amount: 3000,
    note: 'This one is better',
    createdAt: 1000
  };
 
  await store.dispatch(startAddExpense(expenseData)).then(() => {
    actions = store.getActions();
    expect(actions[0]).toEqual({
      type: 'ADD_EXPENSE',
      expense: { 
        id: expect.any(String),
        ...expenseData
      }
    });
  });

    await database.ref(`expenses/${actions[0].expense.id}`).once('value').then((snapshot) => {
      expect(snapshot.val()).toEqual(expenseData);
    });
});

test('should add expense with defaults to database and store', async () => {
  const store = createMockStore({});
  let actions = null;
  const defaultData = {
    description: '',
    note: '',
    amount: 0, 
    createdAt: 0
  }

  await store.dispatch(startAddExpense({})).then(()=> {
    actions = store.getActions();
    expect(actions[0]).toEqual({
      type: 'ADD_EXPENSE',
      expense: { 
        id: expect.any(String),
        ...defaultData
      }
    });
  });

  await database.ref(`expenses/${actions[0].expense.id}`).once('value').then((snapshot) => {
    expect(snapshot.val()).toEqual(defaultData);
  });
})

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

test('should set up expense action object with data', () => {
  const action = setExpenses(expenses);
  const expense = expenses;
  expect(action).toEqual({
    type: 'SET_EXPENSES',
    expense
  });
});


test('should fetch expenses from firebase', async () => {
  const expense = expenses;
  const store = createMockStore({});
  let actions = null;
  await store.dispatch(setStartExpenses()).then(() => {
    actions = store.getActions();
    expect(actions[0]).toEqual({
      type: 'SET_EXPENSES',
      expense
    });
  });
});

test('should remove expense from firebase', async () => {
  const store = createMockStore({});
  let actions = null;
  const id = expenses[1].id;
  await store.dispatch(startRemoveExpense({ id })).then(() => {
    actions = store.getActions();
    expect(actions[0]).toEqual({
      type: 'REMOVE_EXPENSE',
      id
    });
    return database.ref(`expenses/${id}`).once('value').then((snapshot) => {
      expect(snapshot.val()).toBeFalsy();
    });
  });
});

test('should update expense from firebase', async () => {
  const store = createMockStore({});
  let actions = null;
  const id = expenses[2].id;
  const updates = {
    description: 'GumTest',
  }

  await store.dispatch(startEditExpense(id, updates)).then(() => {
    actions = store.getActions();
    expect(actions[0]).toEqual({
      type: 'EDIT_EXPENSE',
      id,
      updates
    });
    return database.ref(`expenses/${id}`).once('value').then(snapshot => {
      expect(snapshot.val().description).toEqual(updates.description);
    });
  });
});