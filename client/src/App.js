import { Switch, Route, BrowserRouter as Router } from 'react-router-dom'
import Header from './components/Header/Header'
import Home from './components/Home/Home'

const App = () => {
  return (
    <Router>
      <Header/>
      <Switch>
        <Route path="/" component={Home} />
      </Switch>
    </Router>
  )
}
export default App
