import moment from 'moment';
import filtersReducer from '../../reducers/filters';

test('should setup default filter values', () => {
  const state = filtersReducer(undefined, { type: '@@INIT'});

  expect(state).toEqual({
    text: '',
    sortBy: 'date',
    startDate: moment().startOf('month'),
    endDate: moment().endOf('month')
  });
});

test('should set sortBy to amount', () => {
  const state = filtersReducer(undefined, { type: 'SORT_BY_AMOUNT'} );

  expect(state.sortBy).toBe('amount');
});

test('should set sortBy to date', () => {
  const currentState = {
    text: '',
    sortBy: 'amount',
    startDate: undefined,
    endDate: undefined
  }
  const state = filtersReducer(currentState, { type: 'SORT_BY_DATE'} );

  expect(state.sortBy).toBe('date');
});

test('should set text', () => {
  const text = 'This is my filter';
  const action = {
    type: 'SET_TEXT_FILTER',
    text
  }
  const state = filtersReducer(undefined, action );

  expect(state).toEqual({
    ...state,
    text
  });
});

test('should set startDate', () => {
  const startDate = moment().startOf('month');
  const action = {
    type: 'SET_START_DATE',
    startDate
  }
  const state = filtersReducer(undefined, action );

  expect(state).toEqual({
    ...state,
    startDate
  });
});

test('should set endDate', () => {
  const endDate = moment().endOf('month');
  const action = {
    type: 'SET_START_DATE',
    endDate
  }
  const state = filtersReducer(undefined, action );

  expect(state).toEqual({
    ...state,
    endDate
  });
});