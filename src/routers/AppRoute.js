import React from 'react';
import { BrowserRouter, Route, Switch, Link, NavLink } from 'react-router-dom';

// Import Components
import Header from '../components/Header';
import HelpPage from '../components/HelpPage';
import EditExpensePage from '../components/EditExpensePage';
import AddExpensePage from '../components/AddExpensePage';
import ExpenseDashboardPage from '../components/ExpenseDashboardPage';
import NotFoundPage from "../components/NotFound";


const AppRouter = () => (
  <BrowserRouter>
    <div>
      <Header/>
      <Switch>
        <Route path='/' component={ExpenseDashboardPage} exact={true}/>
        <Route path='/create' component={AddExpensePage} />
        <Route path='/edit/:id' component={EditExpensePage} />
        <Route path='/help' component={HelpPage} />
        <Route component={NotFoundPage} /> 
      </Switch>
    </div>
  </BrowserRouter>
)

export default AppRouter;