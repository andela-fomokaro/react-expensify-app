import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { startLogout } from '../actions/auth';

export class Header extends React.Component {
  render(){
    return(
      <div className="header">
        <header>
          <div className="content-container">
            <div className="header__content">
              <Link className="header__title" to="/dashboard"> 
                <h1> Expensify </h1>
              </Link>
              <button className="button button--link" onClick={this.props.startLogout}>Logout</button>
            </div>
          </div>
        </header>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  startLogout: () => dispatch(startLogout())
});

export default connect(null, mapDispatchToProps)(Header);