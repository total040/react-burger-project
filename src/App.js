import React, { Component } from 'react';
import {connect} from 'react-redux';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import Logout from './containers/Auth/Logout/Logout';

import {Route, Switch, withRouter, Redirect} from 'react-router-dom';

import * as actions from './store/actions/index';
import asyncCmp from './hoc/asyncComponent/asyncComponent';

const asyncAuth = asyncCmp(() => {
    return import('./containers/Auth/Auth');
});

const asyncOrders = asyncCmp(() => {
    return import('./containers/Orders/Orders');
});

class App extends Component {

  componentDidMount() {
      this.props.onAutoSignUp();
  }

  render() {
    let routes = (
        <Switch>
            <Route path="/auth" component={asyncAuth}/>
            <Route path="/" exact component={BurgerBuilder}/>
            <Redirect to='/'/>
        </Switch>
    );
    if (this.props.isAuthenticated) {
        routes = (
            <Switch>
                <Route path="/checkout" component={Checkout}/>
                <Route path="/orders" component={asyncOrders}/>
                <Route path="/logout" component={Logout}/>
                <Route path="/auth" component={asyncAuth}/>
                <Route path="/" exact component={BurgerBuilder}/>
                <Redirect to='/'/>
            </Switch>
        );
    }
    return (
      <div>
          <Layout>
              {routes}
          </Layout>
      </div>
    );
  }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAutoSignUp: () => dispatch(actions.checkAuthState())
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
