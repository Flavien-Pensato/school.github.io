import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { autoLogin } from '../../modules/account/account.actions';
import { getUid, getAutoLoginDone } from '../../modules/account/account.selectors';
import { HeaderDefaultConnected } from '../headers/headerDefault.header';
import { Loader } from '../pages/loader.page';

import Preview from '../../modules/school/components/preview.connector';
import { LoginPage } from '../pages/login.page';
import { Students } from '../pages/students.page';
import { Calendar } from '../pages/calendar.page';
import { LoadableHomePage } from '../pages/home.loadable';
import { Tasks } from '../pages/tasks.page';


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
      <div>
        <HeaderDefaultConnected />
        <Route path="/:_id?" exact component={LoadableHomePage} />
        <Route path="/eleves/:id?" component={Students} />
        <Route path="/preview" component={Preview} />
        <Route path="/calendrier" component={Calendar} />
        <Route path="/taches" component={Tasks} />
      </div>
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


const LayoutDefaultConnected = connect(mapStateToProps, mapDispatchToProps)(LayoutDefault);

export { LayoutDefaultConnected };
