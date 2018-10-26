import React from 'react';
import { connect } from 'react-redux';
import ExpenseListItem from './ExpenseListItem';
import ExpenseListFilters from './ExpenseListFilters'
import selectExpenses from '../selectors/expenses';

export const ExpenseList = (props) =>  {
  return (
    <div>
      <ExpenseListFilters />
      {
        props.expenses.length ? props.expenses.map((expense) => {
        return <ExpenseListItem {...expense} key={expense.id}/>
        }) 
        : 
        <p>No expenses Found</p>
      }
  </div>
)};



const mapStateToProps = (state) => ({
  expenses: selectExpenses(state.expenses, state.filters)
});

export default connect(mapStateToProps)(ExpenseList);