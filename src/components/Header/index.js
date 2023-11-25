import './index.css'
import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import {MdHome} from 'react-icons/md'
import {FaEnvelope} from 'react-icons/fa'
import {FiLogOut} from 'react-icons/fi'

const Header = props => {
  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <div className="header-container">
      <Link to="/">
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          alt="website logo"
          className="website-logo"
        />
      </Link>
      <div className="header-icons-container">
        <MdHome className="home-icon" />
        <FaEnvelope className="home-icon" />
        <FiLogOut className="home-icon" />
      </div>
      <ul className="home-jobs-container">
        <Link to="/" className="link-style">
          <li className="home-button">Home</li>
        </Link>
        <Link to="/jobs" className="link-style">
          <li className="home-button">Jobs</li>
        </Link>
      </ul>
      <button type="button" className="logout-button" onClick={onClickLogout}>
        Logout
      </button>
    </div>
  )
}

export default Header
