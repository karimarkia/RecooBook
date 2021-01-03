import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { authUser } from '../../store/actions/usersAction'
import { useHistory } from 'react-router-dom'

const PrivateRoute = ({ component: Component }, props) => {

  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()
  let history = useHistory()

  const user = useSelector((state) => state.usersReducer.auth)
  console.log(user,'user');

  useEffect(() => {
    dispatch(authUser())
    setLoading(false)
    if (!user) {
      history.push('/login')
    } else {
      history.push('/admin')
    }
  }, [user,dispatch,history])

  return (
    <>
      {loading ? (
        <div className="loader">Loading...</div>
      ) : (
        <Component {...props} user={user} />
      )}
    </>
  )
}

export default PrivateRoute
