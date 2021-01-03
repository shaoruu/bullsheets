import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom'
import Edit from './pages/Edit'
import Home from './pages/Home'
import Sheets from './pages/Sheets'

import NavBar from '../components/NavBar'
import useUserContext from '../utils/useUserContext'

const PrivateRoute = ({ children, ...rest }) => {
  const { username } = useUserContext()

  return (
    <Route
      {...rest}
      render={(props) =>
        username ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/',
              state: { from: props.location }
            }}
          />
        )
      }
    />
  )
}

const App = () => {
  return (
    <Router>
      <NavBar />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <PrivateRoute path="/sheets">
          <Sheets />
        </PrivateRoute>
        <PrivateRoute path="/edit/:id">
          <Edit />
        </PrivateRoute>
        <Redirect to="/" />
      </Switch>
    </Router>
  )
}

export default App
