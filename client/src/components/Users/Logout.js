import { useEffect } from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { logoutUser } from '../../store/actions/usersAction'

const Logout = () => {
    
    // const logout = useSelector(state => state.usersReducer.auth)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(logoutUser())
    }, [dispatch])
    

    return (
        <div className='logout_container'>
            Have a Good Day ':)' !
        </div>
    )
}

export default Logout
