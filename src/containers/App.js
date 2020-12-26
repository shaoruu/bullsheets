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
import styled from 'styled-components'

const AppBodyWrapper = styled.div`
  margin-top: 60px;
`

const App = () => {
  const { username } = useUserContext()

  return (
    <Router>
      <NavBar />
      <AppBodyWrapper>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          {username && (
            <>
              <Route path="/sheets">
                <Sheets />
              </Route>
              <Route path="/edit/:id">
                <Edit />
              </Route>
            </>
          )}
          <Redirect to="/" />
        </Switch>
      </AppBodyWrapper>
    </Router>
  )
}

export default App
