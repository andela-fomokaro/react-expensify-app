import { database } from '../firebase/firebase';
/**
 * Expenses Genarators
 */
// Add Expense Generator
export const addExpense = (expense) => ({
  type: 'ADD_EXPENSE',
  expense
});

export const startAddExpense = (expenseData = {}) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    const {
      description = '',
      note = '',
      amount = 0, 
      createdAt = 0
    } = expenseData;
    const expense = { description, note, amount, createdAt };

    return database.ref(`users/${uid}/expenses`).push(expense).then((ref) => {
      dispatch(addExpense({
        id: ref.key,
        ...expense
      }
      ));
    });
    };
  };

// Remove Expense Generator
export const removeExpense = ({ id } = {} ) => ({
  type: 'REMOVE_EXPENSE',
  id
});

// Start Remove Generator
export const startRemoveExpense = ({ id } = {}) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    return database.ref(`users/${uid}/expenses/${id}`).remove().then(() => {
      dispatch(removeExpense({ id }));
    });
  }
}

// Edit Expense Generator
export const editExpense = (id, updates ) => ({
  type: 'EDIT_EXPENSE',
  id,
  updates
});

//Set Start Edit Expense
export const startEditExpense = (id, updates) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    return database.ref(`users/${uid}/expenses/${id}`).update(updates).then(() => {
      dispatch(editExpense(id, updates));
    });
  }
}

// Set Expenses Generator
export const setExpenses = (expense) => ({
  type: 'SET_EXPENSES',
  expense
});


//Set Start Expense Generator
export const setStartExpenses = (expenseData = {}) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    return database.ref(`users/${uid}/expenses`).once('value').then(snapshot => {
      const expenses = [];
      snapshot.forEach((childSnapShot) => {
        expenses.push({
          id: childSnapShot.key,
          ...childSnapShot.val()
        });
      });
      dispatch(setExpenses(expenses));
    }).catch(e => {
      console.log('Error fetching data', e);
    });
  }
}
