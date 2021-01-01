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

const App = () => {
  const { username } = useUserContext()

  return (
    <Router>
      <NavBar />
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
    </Router>
  )
}

export default App
