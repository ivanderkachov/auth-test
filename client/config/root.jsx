import React from 'react'
import { Provider, useSelector } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import { Switch, Route, Redirect, StaticRouter } from 'react-router-dom'

import store, { history } from '../redux'

import Home from '../components/home'
import Private from '../components/private'
import NotFound from '../components/404'

import Startup from './startup'

const OnlyAnonymousRoute = ({ component: Component, ...rest }) => {

  const auth = useSelector((state) => state.authtest)

  const func = (props) => {
    if (!!auth.user && !!auth.token) return <Redirect to={{ pathname: '/private' }} />
    return <Component {...props} />
  }
  return <Route {...rest} render={func} />
}

const PrivateRoute = ({ component: Component, ...rest }) => {

  const auth = useSelector((state) => state.authtest)

  const func = (props) => {
    if (!!auth.user && !!auth.token) return <Component {...props} />

    return (
      <Redirect
        to={{
          pathname: '/login'
        }}
      />
    )
  }
  return <Route {...rest} render={func} />
}

const RouterSelector = (props) =>
  typeof window !== 'undefined' ? <ConnectedRouter {...props} /> : <StaticRouter {...props} />

const RootComponent = (props) => {
  return (
    <Provider store={store}>
      <RouterSelector history={history} location={props.location} context={props.context}>
        <Startup>
          <Switch>
            <Route exact path="/" component={Home} />
            <OnlyAnonymousRoute exact path="/login" component={Home} />
            <Route exact path="/dashboard" component={Home} />
            <PrivateRoute exact path="/private" component={Private} />
            {/* <OnlyAnonymousRoute exact path="/anonymous-route" component={DummyView} /> */}

            <Route component={NotFound} />
          </Switch>
        </Startup>
      </RouterSelector>
    </Provider>
  )
}

export default RootComponent
