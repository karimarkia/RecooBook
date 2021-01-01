import SideNav from 'react-simple-sidenav'
import Items from './Items'

const MainNav = ({ showNav, onHideNav }) => {
  return (
    <div>
      <SideNav
        showNav={showNav}
        onHideNav={onHideNav}
        navStyle={{ background: '#242424', maxWidth: '220px' }}
      >
        <Items onHideNav={onHideNav}/>
      </SideNav>
    </div>
  )
}

export default MainNav
