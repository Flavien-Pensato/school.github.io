import React, { Component } from 'react';
import { Route, Redirect } from 'react-router';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { autoLogin } from '../../modules/account/account.actions';
import { getUid, getAutoLoginDone } from '../../modules/account/account.selectors';
import { HeaderDefaultConnected } from '../headers/headerDefault.header';
import { Loader } from '../pages/loader.page';

import { LoginPage } from '../pages/login.page';
import { Classes } from '../pages/classes.page';
import { Students } from '../pages/students.page';
import { Calendar } from '../pages/calendar.page';
import { LoadableHomePage } from '../pages/home.loadable';
import { Tasks } from '../pages/tasks.page';
import { ToasterConnected } from '../../modules/display/components/toaster.connector';


class LayoutDefault extends Component {
  componentWillMount() {
    const { autoLoginAction } = this.props;

    autoLoginAction();
  }

  render() {
    const {
      uid, autoLoginDone,
    } = this.props;

    if (!autoLoginDone) {
      return <Loader />;
    }
    if (!uid) {
      return <LoginPage />;
    }

    return (
      <React.Fragment>
        <ToasterConnected />
        <HeaderDefaultConnected />
        <Route path="/home/:_id?" render={({ match }) => <LoadableHomePage match={match} />} />
        <Route path="/classes" exact component={Classes} />
        <Route path="/classes/:classeId" exact component={Students} />
        <Route path="/calendrier" component={Calendar} />
        <Route path="/taches" component={Tasks} />
        <Route path="/" exact render={() => <Redirect to="/home" from="/" />} />
      </React.Fragment>
    );
  }
}

LayoutDefault.defaultProps = {
  uid: '',
};


LayoutDefault.propTypes = {
  uid: PropTypes.string,
  autoLoginDone: PropTypes.bool.isRequired,
  autoLoginAction: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  uid: getUid(state),
  autoLoginDone: getAutoLoginDone(state),
});

const mapDispatchToProps = dispatch => ({
  autoLoginAction: () => dispatch(autoLogin()),
});


const LayoutDefaultConnected = withRouter(connect(mapStateToProps, mapDispatchToProps)(LayoutDefault));

export { LayoutDefaultConnected };
