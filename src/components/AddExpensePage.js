import React from 'react';
import { connect } from 'react-redux';
import ExpenseForm from './ExpenseForm';
import { addExpense } from '../actions/expenses';

export class AddExpensePage extends React.Component {
  onSumbit = (expense) => {
    this.props.onSumbit(expense);
    this.props.history.push('/');
  }

  render() {
    return (
      <div>
        <h1>Add Expense</h1>
        <ExpenseForm 
          onSubmit={this.onSumbit}
        />
    </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  onSumbit: (expense) => dispatch(addExpense(expense))
});

export default connect(undefined, mapDispatchToProps)(AddExpensePage);