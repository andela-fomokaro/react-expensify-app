import { createStore } from 'redux';

const store = createStore( (state = { count: 0 }, action) => {
  switch (action.type) {
    case 'INCREMENT':
    const incrementBy = typeof action.incrementBy === 'number' ? action.incrementBy : 1;
      return  {
        count: state.count + incrementBy
      };
    case 'DECREMENT':
    const decrementBy = typeof action.decrementBy === 'number' ? action.decrementBy : 1;
      return  {
        count: state.count - decrementBy
      };
    case 'RESET':
      return  {
        count: 0
      };
    default: 
      return state;
  }
});

// Actions -- An object that gets sent to the store 

// Using subsrcibe and unsubscribe
const unsubscribe = store.subscribe(() => {
  console.log(store.getState());
});

// unsubscribe(); // Used if you want to unsubscribe


// I'd like to increment the count
store.dispatch({
  type: 'INCREMENT',
  incrementBy: 5
});

// I'd like to decrement the count
store.dispatch({
  type: 'DECREMENT',
  decrementBy: 10
});

// I'd like to reset the count
store.dispatch({
  type: 'RESET',
});
