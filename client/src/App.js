import { Switch, Route, BrowserRouter as Router } from 'react-router-dom'
import Header from './components/Header/Header'
import Home from './components/Home/Home'
import Login from './components/Users/Login'
import PrivateRoute from './components/HOC/PrivateRoute'
import Admin from './components/Users/Admin/Admin'
import Logout from './components/Users/Logout'
import AddPost from './components/Users/Admin/Posts/AddPost'
import EditPost from './components/Users/Admin/Edit/EditPost'

const App = () => {
  return (
   <>
      <Header />
      <Switch>
        <Route path="/admin/posts/edit/:id" component={EditPost} exact />
        <PrivateRoute path="/admin/posts/create" component={AddPost} exact />
        <PrivateRoute path="/admin" component={Admin} exact />
        <PrivateRoute path="/logout" component={Logout} exact />
        <PrivateRoute path="/login" component={Login} exact />
        <Route path="/" component={Home} exact />
      </Switch>
    </>
  )
}
export default App
