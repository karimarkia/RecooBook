import { Switch, Route, BrowserRouter as Router } from 'react-router-dom'
import Header from './components/Header/Header'
import Home from './components/Home/Home'
import Login from './components/Users/Login'
import PrivateRoute from './components/HOC/PrivateRoute'
import Admin from './components/Users/Admin/Admin'
import Logout from './components/Users/Logout'

const App = () => {
  return (
    <Router>
      <Header />
      <Switch>
        <PrivateRoute path="/admin" component={Admin} exact />
        <PrivateRoute path="/logout" component={Logout} exact />
        <PrivateRoute path="/login" component={Login} exact />
        <Route path="/" component={Home} exact />
      </Switch>
    </Router>
  )
}
export default App
