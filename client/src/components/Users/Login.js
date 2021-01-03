import { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { useSelector, useDispatch } from 'react-redux'
import { loginUser } from '../../store/actions/usersAction'

const LoginSchema = Yup.object().shape({
  password: Yup.string().min(6, 'Too Short password !').required('Required !'),
  email: Yup.string().email('Invalid Email !').required('Required !'),
})

const Login = () => {
  // const [success, setSuccess] = useState(false)
  // const [validation, setValidation] = useState(false)
  let history = useHistory()
  const auth = useSelector((state) => state.usersReducer.auth)
  const dispatch = useDispatch()

  useEffect(() => {
    if (auth) {
      history.push('/admin')
    }
  }, [auth])

  return (
    <div className="container form_container">
      <h1>Welcome Back</h1>
      <hr />
      <h4>Sign in here </h4>
      <Formik
        initialValues={{ email: 'karim1@gmail.com', password: '1234567' }}
        validationSchema={LoginSchema}
        onSubmit={(values) => {
          dispatch(loginUser(values))
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
        }) => (
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="twelve columns">
                <input
                  type="email"
                  name="email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                  className="u-full-width"
                />
                {errors.email && touched.email ? (
                  <div className="error_label">{errors.email}</div>
                ) : null}
              </div>
            </div>
            <div className="row">
              <div className="twelve columns">
                <input
                  type="password"
                  name="password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                  className="u-full-width"
                />
                {errors.password && touched.password ? (
                  <div className="error_label">{errors.password}</div>
                ) : null}
              </div>
            </div>
            <button type="submit">Login</button>
            <br />
            {/* {!auth ? null : (
              <div className="error_label">
                Something Wrong, please try again
              </div>
            )} */}
          </form>
        )}
      </Formik>
    </div>
  )
}

export default Login
