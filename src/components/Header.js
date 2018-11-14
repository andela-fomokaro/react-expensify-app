import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { startLogout } from '../actions/auth';

export class Header extends React.Component {
  render(){
    return(
      <div>
      <header>
        <h1> Expensify </h1>
        <NavLink to="/dashboard" activeClassName="is-active"> Dashboard </NavLink>
        <NavLink to="/create" activeClassName="is-active"> Add Expense </NavLink>
        <button onClick={this.props.startLogout}>Log Out</button>
        </header>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  startLogout: () => dispatch(startLogout())
});

export default connect(null, mapDispatchToProps)(Header);