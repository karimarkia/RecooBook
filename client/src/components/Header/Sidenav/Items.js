import { Link } from 'react-router-dom'
import { RouteLinks } from '../../../Utils/RouterLinks'
import FontAwesome from 'react-fontawesome'

const Items = ({onHideNav}) => {
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
      <div>
        <div className="nav_split">Admin Options</div>
        {showAdminLinks()}
      </div>
    </div>
  )
}

export default Items
