import selectExpenses from '../../selectors/expenses';
import moment from  'moment';

const expenses = [{
  id: '123qwerty',
  description: 'Gum',
  note: '',
  amount: 195,
  createdAt: 0
},
{
  id: '456qwerty',
  description: 'Rent',
  note: '',
  amount: 28000,
  createdAt: moment(0).subtract(4, 'days').valueOf()
},
{
  id: '789qwerty',
  description: 'Credit Card',
  note: '',
  amount: 4500,
  createdAt: moment(0).add(4, 'days').valueOf()
}];

test('should filter by text value', () => {
  const filters = {
    text: 'e',
    sortBy: 'date',
    startDate: undefined,
    endDate: undefined
  }
  const result = selectExpenses(expenses, filters)

  expect(result).toEqual([expenses[2], expenses[1]]);
});

test('should filter by startDate value', () => {
  const filters = {
    text: '',
    sortBy: 'date',
    startDate: moment(0),
    endDate: undefined
  }
  const result = selectExpenses(expenses, filters)

  expect(result).toEqual([expenses[2], expenses[0]]);
});

test('should filter by endDate value', () => {
  const filters = {
    text: '',
    sortBy: 'date',
    startDate: undefined,
    endDate: moment(0)
  }
  const result = selectExpenses(expenses, filters)

  expect(result).toEqual([expenses[0], expenses[1]]);
});

test('should filter by date value', () => {
  const filters = {
    text: '',
    sortBy: 'date',
    startDate: undefined,
    endDate: undefined
  }
  const result = selectExpenses(expenses, filters)

  expect(result).toEqual([expenses[2], expenses[0], expenses[1]]);
});

test('should filter by date amount', () => {
  const filters = {
    text: '',
    sortBy: 'amount',
    startDate: undefined,
    endDate: undefined
  }
  const result = selectExpenses(expenses, filters)

  expect(result).toEqual([expenses[1], expenses[2], expenses[0]]);
});