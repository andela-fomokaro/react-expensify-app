import React from 'react';
import ExpenseList from './ExpenseList';
import ExpenseSummary from './ExpensesSummary'


const ExpenseDashboardPage = () => (
  <div>
    <ExpenseSummary />
    <ExpenseList/>
  </div>
)

export default ExpenseDashboardPage;