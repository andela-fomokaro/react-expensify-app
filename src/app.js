import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import 'normalize.css/normalize.css';
import '../styles/styles.scss';

const ExpenseDashboardPage = () => (
  <div>
    This is my add Dashboard Page
  </div>
)

const AddExpensePage = () => (
  <div>
    This is my Expense Page
  </div>
)

const EditExpensePage = () => (
  <div>
    This is my Edit Expense Page
  </div>
)

const HelpPage = () => (
  <div>
    This is my Help Page
  </div>
)

const notFoundPage = () => (
  <div>
    404!
  </div>
)
const route = (
  <BrowserRouter>
    <Switch>
      <Route path='/' component={ExpenseDashboardPage} exact={true}/>
      <Route path='/create' component={AddExpensePage} />
      <Route path='/edit' component={EditExpensePage} />
      <Route path='/help' component={HelpPage} />
      <Route component={notFoundPage} />
    </Switch>
  </BrowserRouter>
)

ReactDOM.render(route, document.getElementById('app'));