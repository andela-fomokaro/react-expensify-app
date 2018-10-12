// Filters Reducer
const filterReducerDefaultState = {
  text: '',
  sortBy: 'date',
  startDate: undefined,
  endDate: undefined
}
export default (state = filterReducerDefaultState, action) => {
  switch (action.type) {
    case 'SET_TEXT_FILTER':
      return  { ...state, ...action};
    case 'SORT_BY_AMOUNT':
      return {
        ...state,
        sortBy: 'amount'
      };
    case 'SORT_BY_DATE':
      return {
        ...state,
        sortBy: 'date'
      };
    case 'SET_START_DATE':
      const { startDate } = action;
      return { ...state, startDate };
    case 'SET_END_DATE':
      const { endDate } = action;
      return { ...state, endDate } ;
    default:
      return state;
  }
}
