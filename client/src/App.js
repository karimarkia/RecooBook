import { Switch, Route, BrowserRouter as Router } from 'react-router-dom'
import Header from './components/Header/Header'
import Home from './components/Home/Home'
import Login from './components/Users/Login'
const App = () => {
  return (
    <Router>
      <Header />
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/" component={Home} />
      </Switch>
    </Router>
  )
}
export default App
