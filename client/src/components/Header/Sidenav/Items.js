import { Link } from 'react-router-dom'
import { RouteLinks } from '../../../Utils/RouterLinks'
import FontAwesome from 'react-fontawesome'
import { useSelector } from 'react-redux'

const Items = ({ onHideNav }) => {
  const auth = useSelector((state) => state.usersReducer.auth)

  const elemntsToShow = (item, i) => (
    <div key={i} className="navItem">
      <Link to={item.link} onClick={onHideNav}>
        <FontAwesome name={item.icon} />
        {item.text}
      </Link>
    </div>
  )

  const showCommonLinks = () => {
    return RouteLinks.common.map((item, i) => {
      return elemntsToShow(item, i)
    })
  }

  const showAdminLinks = () =>
    RouteLinks.admin.map((item, i) => {
      return elemntsToShow(item, i)
    })

  return (
    <div>
      {showCommonLinks()}
      {auth ? (
        <div>
          <div className="nav_split">Admin Options</div>
          {showAdminLinks()}
        </div>
      ) : null}
    </div>
  )
}

export default Items
