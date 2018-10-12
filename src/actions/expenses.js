import uuid  from 'uuid';
/**
 * Expenses Genarators
 */
// Add Expense Generator
export const addExpense = (
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
export const removeExpense = ({ id } = {} ) => ({
  type: 'REMOVE_EXPENSE',
  id
});

// Edit Expense Generator
export const editExpense = (id, updates ) => ({
  type: 'EDIT_EXPENSE',
  id,
  updates
});