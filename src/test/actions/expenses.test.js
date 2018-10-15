import { addExpense, editExpense, removeExpense } from '../../actions/expenses';

test('should setup remove expense action object', () => {
  const action = removeExpense({ id: 'asdf123'});

  expect(action).toEqual({
    type: 'REMOVE_EXPENSE',
    id: 'asdf123'
  });
});

test('should setup remove expense action object', () => {
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

test('should setup add expense action object', () => {
  const expenseData = {
    description: 'Cofee Bill',
    note: 'Cofee taste so sweet',
    amount: 1000,
    createdAt: 2000,
  }
  const action = addExpense(expenseData);

  expect(action).toEqual({
    type: 'ADD_EXPENSE',
    expense: {
      id: expect.any(String),
      ...expenseData
    }
  });
});

test('should setup add expense action object with default values', () => {
  const expenseDefaultData = {
    description: '',
    note: '',
    amount: 0,
    createdAt: 0,
  }
  const action = addExpense(expenseDefaultData);

  expect(action).toEqual({
    type: 'ADD_EXPENSE',
    expense: {
      id: expect.any(String),
      ...expenseDefaultData
    }
  });
});