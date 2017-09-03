import React, { Component } from 'react';
import { Redirect, NavLink, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import moment from 'moment';
import { withRouter } from 'react-router-dom'

import { autoLogin, signOut } from '../../modules/account/account.actions';
import { getUid, getAutoLoginDone } from '../../modules/account/account.selectors';

import Home from '../pages/Home';

class LayoutDefault extends Component {
  componentWillMount() {
    const { autoLogin, uid } = this.props;

    if (!uid) {
      autoLogin();
    }
  }

  render() {
    const { uid, autoLoginDone } = this.props;

    if (!uid && autoLoginDone) {
      return <Redirect to={{ pathname: '/login' }} />;
    }

    return (
      <div>
        <button className="btn btn-signout" onClick={this.props.signOut}>
          Se déconnecter
        </button>
        <span>
          Nous sommes le {moment().format('LL')}
        </span>
        <nav>
          <NavLink to="/eleves" activeClassName="selected">
            Élèves
          </NavLink>
          <NavLink to="/calendrier" activeClassName="selected">
            Calendrier
          </NavLink>
        </nav>
        {/* <Route path="/calendrier" component={} /> */}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  uid: getUid(state),
  autoLoginDone: getAutoLoginDone(state)
});

const mapDispatchToProps = dispatch => ({
  autoLogin: () => dispatch(autoLogin()),
  signOut: () => dispatch(signOut())
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LayoutDefault));
