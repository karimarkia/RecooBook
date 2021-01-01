import { useState } from 'react'
import { Link } from 'react-router-dom'
import FontAwesome from 'react-fontawesome'
import MainNav from './Sidenav/Sidenav'

const Header = () => {
  const [mainNav, setMainNav] = useState(false)

  const setShowNav = () => {
    setMainNav(!mainNav)
  }

  return (
    <header>
      <div className="open_nav">
        <FontAwesome
          name="bars"
          onClick={setShowNav}
          style={{
            color: '#ffffff',
            padding: '10px',
            cursor: 'pointer',
            fontSize: '25px',
          }}
        />
      </div>
      <MainNav
      showNav={mainNav}
      onHideNav={setShowNav}
      />
      <Link to="/" className="logo">
        Recoo Books
      </Link>
    </header>
  )
}

export default Header
