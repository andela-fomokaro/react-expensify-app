import React from 'react';
import { connect } from 'react-redux';
import ExpenseListItem from './ExpenseListItem';
import ExpenseListFilters from './ExpenseListFilters'
import selectExpenses from '../selectors/expenses';

const ExpenseList = (props) =>  {
  return (
    <div>
      <h1>Expense List</h1>
      <ExpenseListFilters />
      {props.expenses.map((expense) => {
        return <ExpenseListItem {...expense} key={expense.id}/>
      })}
  </div>
)};



const mapStateToProps = (state) => ({
  expenses: selectExpenses(state.expenses, state.filters)
});

export default connect(mapStateToProps)(ExpenseList);